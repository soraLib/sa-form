import { computed, defineComponent, ref, watch } from 'vue'
import { NIcon, NInput, NPopover, NScrollbar, NSwitch, NTree } from 'naive-ui'
import {
  ChevronDown,
  ChevronUp,
  Funnel,
  Layers,
  Prism,
} from '@vicons/ionicons5'
import {
  promiseTimeout,
  useLocalStorage,
  useMagicKeys,
  useStorage,
  whenever,
} from '@vueuse/core'
import { ElementType } from '../../element'
import { isContainerType, isTab } from '../../PcForm/element'
import { createElementTreeData } from '../../PcForm/utils/tree'
import { type BasicGraph, GraphType } from '../../graph'
import type { BasicElement } from '../../element'
import type { OnUpdateExpandedKeysImpl } from 'naive-ui/es/tree/src/Tree'
import type { ElementTreeDataOption } from '../../PcForm/utils/tree'
import type { PropType, VNode } from 'vue'

import './index.scss'
import { getPaths, getSiblings } from '@/SaForm/utils/element'
import { getScrollContainer, isInContainer } from '@/SaForm/utils/domUtils'
import { pcStencilIcons } from '@/SaForm/PcForm/layout/stencil/stencil'
import { Resize } from '@/components/Resize'
import { useClazs } from '@/SaForm/utils/class'

export default defineComponent({
  name: 'SaFormLayoutLayer',

  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  setup(props) {
    const showCurrentLevelOnly = useLocalStorage(
      'form-layer-show-current-level-only',
      false
    )
    const toggleShowCurrentLevelOnly = (show?: boolean) => {
      showCurrentLevelOnly.value = show ?? !showCurrentLevelOnly.value
    }
    const selected = computed(() => props.graph.selected[0])
    const paths = computed<{ id: string; name: string }[]>(() => {
      if (!showCurrentLevelOnly.value) return []

      return getPaths(selected.value).map((a) => ({
        id: a.attrs.id,
        name: a.attrs.name,
      }))
    })

    const tree = ref<InstanceType<typeof NTree>>()
    const treeData = computed(() => {
      const container = selected.value
        ? showCurrentLevelOnly.value
          ? getSiblings(selected.value)
          : props.graph.canvas.children
        : props.graph.canvas.children

      return createElementTreeData(
        container,
        (elem) =>
          (elem.attrs['is-draft'] && props.graph.isDraft) ||
          (!props.graph.isDraft && !elem.attrs['is-draft'])
      )
    })
    const expandedKeySet = ref(new Set<string>())
    const expandedKeys = computed(() => Array.from(expandedKeySet.value))
    const selectedKeys = computed(() =>
      props.graph.selected.map(({ attrs }) => attrs.id)
    )
    watch(
      selectedKeys,
      async () => {
        const [head] = props.graph.selected

        let cur: BasicElement | undefined = head
        while (cur.parent) {
          if (cur.parent && isTab(cur.parent)) {
            const tabPane = cur.parent.tabs.find((tab) =>
              tab.children.some((a) => a.attrs.id === cur?.attrs.id)
            )

            if (tabPane)
              expandedKeySet.value.add(`${cur.parent.attrs.id}-${tabPane.id}`)
          }

          if (cur.children?.length || isTab(cur))
            expandedKeySet.value.add(cur.attrs.id)
          cur = cur.parent
        }

        await promiseTimeout(100)
        const node = document.querySelector(
          '.n-tree-node[is-reference="true"]'
        ) as HTMLElement
        if (node && !isInContainer(node, getScrollContainer(node) as any))
          node.scrollIntoView({ behavior: 'smooth' })
      },
      { deep: true }
    )
    const onUpdateSelectedKeys = (keys: string[]) => {
      const selected = props.graph.setSelected(keys)
      if (selected) props.graph.scrollIntoView(selected[0])
    }
    const onUpdateExpandedKeys: OnUpdateExpandedKeysImpl = (keys) => {
      expandedKeySet.value = new Set(keys as string[])
    }

    // filter
    const pattern = ref('')
    const hideIrrelevantNodes = useStorage('hide-irrelevant-nodes', true)

    const stencilIcons = computed<Record<number, VNode | string>>(() => {
      if (props.graph.type === GraphType.Pc) return pcStencilIcons

      return {}
    })

    const elemType = computed<Record<number, string>>(() => {
      if (props.graph.type === GraphType.Pc) return ElementType

      return {}
    })

    const layerHeight = useLocalStorage('form-layer-height', 400)
    const { ctrl_l } = useMagicKeys()
    const toggleLayer = () =>
      (layerHeight.value = layerHeight.value < 50 ? 400 : 32)
    whenever(ctrl_l, toggleLayer)

    return () => (
      <Resize
        height={layerHeight}
        onUpdate:height={(height: number) => (layerHeight.value = height)}
        min={32}
        direction="top"
      >
        <div class="sa-form-layer">
          <div class="title flex items-center text-base font-medium">
            <NIcon class="mr-2" size={20} title="Panel">
              <Layers />
            </NIcon>
            <span class="mr-auto"></span>

            <div
              title="Show Current Level Nodes Only"
              onClick={() => toggleShowCurrentLevelOnly()}
              class={useClazs('cursor-pointer flex items-center p-1', {
                'is-actived': showCurrentLevelOnly.value,
              })}
            >
              <NIcon size={16}>
                <Prism />
              </NIcon>
            </div>

            <NPopover
              trigger="click"
              placement="right-start"
              width={200}
              v-slots={{
                trigger: () => (
                  <div
                    title="Filter"
                    class={useClazs(
                      'flex',
                      'items-center',
                      'p-1.5',
                      'cursor-pointer',
                      { 'is-filtered': pattern.value !== '' }
                    )}
                  >
                    <NIcon size={16}>
                      <Funnel />
                    </NIcon>
                  </div>
                ),
              }}
            >
              <div class="flex justify-between gap-2 whitespace-nowrap">
                <span>Hide irrelevant nodes</span>
                <NSwitch
                  value={hideIrrelevantNodes.value}
                  onUpdate:value={(v: boolean) =>
                    (hideIrrelevantNodes.value = v)
                  }
                ></NSwitch>
              </div>
              <NInput
                class="my-2"
                size="small"
                placeholder="Search by id or name"
                clearable
                value={pattern.value}
                onUpdate:value={(v) => (pattern.value = v)}
              ></NInput>
            </NPopover>

            <div
              class="layer-close-button rounded-full cursor-pointer flex items-center p-1"
              title="Close Panel"
              onClick={toggleLayer}
            >
              <NIcon size={20}>
                {layerHeight.value < 50 ? <ChevronUp /> : <ChevronDown />}
              </NIcon>
            </div>
          </div>

          {showCurrentLevelOnly.value && paths.value.length > 1 && (
            <div class="layer-paths">
              {paths.value.map((path, index) => (
                <>
                  <span
                    class="layer-path-item"
                    title={`${path.id}: ${path.name}`}
                    onClick={() => props.graph.setSelected(path.id)}
                  >
                    {path.name}
                  </span>
                  {index !== paths.value.length - 1 && (
                    <span class="layer-path-divider">/</span>
                  )}
                </>
              ))}
            </div>
          )}

          <NScrollbar>
            <NTree
              key={selectedKeys.value.join('-')}
              ref={tree}
              keyField="value"
              block-line
              block-node
              showIrrelevantNodes={!hideIrrelevantNodes.value}
              data={treeData.value}
              pattern={pattern.value}
              filter={(pattern, node: any) =>
                node.value == pattern || node.label.includes(pattern)
              }
              node-props={({ option }: { option: ElementTreeDataOption }) => {
                const index = props.graph.selected.findIndex(
                  (elem) => elem.attrs.id === option.value
                )
                return {
                  'is-empty':
                    isContainerType(option.type) && !option.children?.length,
                  'is-reference': index === 0,
                  'layer-tree-status':
                    index === -1
                      ? 'not-selected'
                      : index === 0 && props.graph.selected.length > 1
                      ? 'is-reference'
                      : index === 0 && props.graph.selected.length === 1
                      ? 'is-only-selection'
                      : 'is-selected',
                }
              }}
              selectedKeys={selectedKeys.value}
              expandedKeys={expandedKeys.value}
              render-label={({ option }: { option: ElementTreeDataOption }) => (
                <div
                  title={`${elemType.value[option.type]}: ${option.label}`}
                  class="text-left w-full overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {option.label}
                </div>
              )}
              render-prefix={({
                option,
              }: {
                option: ElementTreeDataOption
              }) => {
                const icon = stencilIcons.value[option.type]
                if (typeof icon === 'string')
                  return <i class={`iconfont ${icon}`} />

                return icon
              }}
              onUpdate:selectedKeys={onUpdateSelectedKeys}
              onUpdate:expandedKeys={onUpdateExpandedKeys}
            ></NTree>
          </NScrollbar>
        </div>
      </Resize>
    )
  },
})
