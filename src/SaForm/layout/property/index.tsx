import { computed, defineComponent, ref } from 'vue'
import { NCollapse, NCollapseItem, NIcon, NScrollbar } from 'naive-ui'
import { ChevronForward } from '@vicons/ionicons5'
import { useLocalStorage, useMagicKeys, whenever } from '@vueuse/core'
import { useClazs } from '../../utils/class'
import { isGroupPlugin } from '../../plugin'
import { GraphType } from '../../graph'
import PluginItem from './item'
import PluginGroup from './group'
import { usePlugin } from './shared'
import type { BasicGraph } from '../../graph'
import type { SaPlugin, SaPluginCombination } from '../../plugin'
import type { PropType } from 'vue'
import type { SaController } from '../../config'
import { isNullish } from '@/SaForm/utils/function'
import { Resize } from '@/components/Resize'

import './index.scss'

export default defineComponent({
  name: 'SaFormLayoutController',
  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
    controller: {
      required: true,
      type: Object as PropType<SaController>,
    },
  },

  setup(props) {
    const selected = computed(() => props.graph.selected[0])
    const { plugin } = usePlugin(selected, props.controller)

    const getPlugin = (item: SaPluginCombination) => {
      return isGroupPlugin(item) ? (
        <PluginGroup
          plugin={item}
          graph={props.graph}
          controller={props.controller}
        />
      ) : (
        <PluginItem
          plugin={item}
          graph={props.graph}
          controller={props.controller}
        />
      )
    }

    const propertyWidth = useLocalStorage('form-property-width', 350)
    const { ctrl_e } = useMagicKeys()
    whenever(ctrl_e, () => {
      propertyWidth.value = propertyWidth.value < 50 ? 350 : 8
    })

    const type = computed(() => props.graph.selected[0]?.attrs.type ?? 0)

    const defaultExpandedNames = ['base', 'layout', 'extend', 'source']
    const localExpandedNames = useLocalStorage<
      Record<GraphType, Record<number, string[]>>
    >('form-property-expanded', {
      [GraphType.Pc]: {},
    })

    const expandedNames = computed(
      () =>
        localExpandedNames.value[props.graph.type][type.value] ??
        defaultExpandedNames
    )
    const updateExpandedNames = (names: string[]) => {
      localExpandedNames.value[props.graph.type][type.value] = names
    }

    const pluginFilter = (plugin: SaPluginCombination): boolean => {
      const ph = plugin.hidden

      if (isNullish(ph)) return true

      if (typeof ph === 'boolean') {
        if (ph) return false
      } else {
        if (ph(selected.value, props.graph)) {
          return false
        }
      }

      return true
    }

    return () => (
      <Resize
        width={propertyWidth}
        onUpdate:width={(width: number) => (propertyWidth.value = width)}
        min={8}
        max={500}
        direction="left"
      >
        <NScrollbar
          class={useClazs('plugins-container', {
            'w-lt-280': propertyWidth.value < 280,
          })}
        >
          <NCollapse
            expanded-names={expandedNames.value}
            on-update:expanded-names={updateExpandedNames}
            v-slots={{
              arrow: () => (
                <NIcon size={14}>
                  <ChevronForward />
                </NIcon>
              ),
            }}
          >
            {(plugin.value?.basic?.length && (
              <NCollapseItem title={'Base'} name="base">
                {plugin.value.basic
                  ?.filter(pluginFilter)
                  .map((item) => getPlugin(item))}
              </NCollapseItem>
            )) ||
              ''}
          </NCollapse>
        </NScrollbar>
      </Resize>
    )
  },
})
