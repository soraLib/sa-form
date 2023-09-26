import { computed, defineComponent, ref, watch } from 'vue'
import { NIcon, NInput, NPopover, NScrollbar, NSwitch, NTree } from 'naive-ui'
import { ChevronBack, Funnel, Layers } from '@vicons/ionicons5'
import {
  useLocalStorage,
  useMagicKeys,
  useStorage,
  whenever,
} from '@vueuse/core'
import { ElementType } from '../../element'
import { isContainerType, isTab } from '../../PcForm/element'
import { createElementTreeData } from '../../PcForm/utils/tree'
import type { BasicElement } from '../../element'
import type { OnUpdateExpandedKeysImpl } from 'naive-ui/es/tree/src/Tree'
import type { ElementTreeDataOption } from '../../PcForm/utils/tree'
import type { PropType } from 'vue'
import type { BasicGraph } from '../../graph'

import './index.scss'
import { pcStencilIcons } from '@/SaForm/PcForm/layout/stencil/stencil'
import { useClazs } from '@/SaForm/utils/class'
import { Resize } from '@/components/Resize'
import { getScrollContainer, isInContainer } from '@/SaForm/utils/domUtils'

export default defineComponent({
  name: 'SaFormLayoutLayer',

  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  setup(props) {
    const treeData = computed(() =>
      createElementTreeData(
        props.graph.canvas.children,
        (elem) =>
          (elem.attrs['is-draft'] && props.graph.isDraft) ||
          (!props.graph.isDraft && !elem.attrs['is-draft'])
      )
    )
    const expandedKeys = ref(new Set<string>())
    const selectedKeys = computed(() =>
      props.graph.selected.map(({ attrs }) => attrs.id)
    )
    watch(
      selectedKeys,
      () => {
        const [head] = props.graph.selected

        let cur: BasicElement | undefined = head
        while (cur) {
          if (cur.parent && isTab(cur.parent)) {
            const tabPane = cur.parent.tabs.find((tab) =>
              tab.children.some((a) => a.attrs.id === cur?.attrs.id)
            )

            if (tabPane) expandedKeys.value.add(tabPane.id)
          }

          expandedKeys.value.add(cur.attrs.id)
          cur = cur.parent
        }

        // scroll selected element into view
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
      expandedKeys.value = new Set(keys as string[])
    }

    // filter
    const pattern = ref('')
    const hideIrrelevantNodes = useStorage('hide-irrelevant-nodes', true)

    const layerWidth = useLocalStorage('form-layer-width', 200)
    const { ctrl_l } = useMagicKeys()
    whenever(ctrl_l, () => {
      layerWidth.value = layerWidth.value < 200 ? 200 : 8
    })

    return () => (
      <Resize
        width={layerWidth}
        onUpdate:width={(width) => (layerWidth.value = width)}
        min={8}
        direction="right"
      >
        <div class="sa-form-layer sa-bg p-2 overflow-hidden">
          <div class="title flex items-center text-base font-medium">
            <NIcon class="mr-2" size={20}>
              <Layers />
            </NIcon>
            <span class="mr-auto">Layer</span>
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
              <div class="flex justify-between">
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
              class="layer-close-button rounded-full cursor-pointer flex items-center p-1.5"
              title="Close Layer"
              onClick={() => (layerWidth.value = 8)}
            >
              <NIcon size={20} {...{}}>
                <ChevronBack />
              </NIcon>
            </div>
          </div>

          <NScrollbar class="my-2 pr-3">
            <NTree
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
              expandedKeys={Array.from(expandedKeys.value)}
              render-label={({ option }: { option: ElementTreeDataOption }) => (
                <div
                  title={`${ElementType[option.type]}: ${option.label}`}
                  class="text-left w-full overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {option.label}
                </div>
              )}
              render-prefix={({
                option,
              }: {
                option: ElementTreeDataOption
              }) => <i class={`iconfont ${pcStencilIcons[option.type]}`} />}
              onUpdate:selectedKeys={onUpdateSelectedKeys}
              onUpdateExpandedKeys={onUpdateExpandedKeys}
            ></NTree>
          </NScrollbar>
        </div>
      </Resize>
    )
  },
})
