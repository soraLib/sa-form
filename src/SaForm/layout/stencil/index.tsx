import { Transition, computed, defineComponent, ref } from 'vue'
import { FlashOutline } from '@vicons/ionicons5'
import { NIcon, NInput } from 'naive-ui'
import StencilGroup from './group'
import type { PropType } from 'vue'
import type { PartialOptional } from 'sugar-sajs'
import type { BasicGraph } from '../../graph'
import type { BasicElement } from '../../element'

import './index.scss'

export type StencilAttrKey = 'type' | 'name' | 'width' | 'height'
export type StencilAttrs = PartialOptional<
  BasicElement['attrs'],
  Exclude<keyof BasicElement['attrs'], StencilAttrKey>
>
// native stencil config
export type NativeStencil = (graph: any /** TODO: */) => {
  groups: { name: string }[]
  nodes: {
    [key in ReturnType<NativeStencil>['groups'][number]['name']]: {
      icon: string
      title?: string
      attrs: StencilAttrs
    }[]
  }
}
type Nodes = ReturnType<NativeStencil>['nodes']
export type NativeItem = Nodes[keyof Nodes][number]
export type ComposedNativeStencil =
  ReturnType<NativeStencil>['groups'][number] & NativeItem

export default defineComponent({
  name: 'SaFormLayoutStencil',

  props: {
    stencil: {
      required: true,
      type: Function as PropType<NativeStencil>,
    },
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  setup(props) {
    const visible = computed(() => props.graph.layout.component)
    const refStencil = ref<HTMLDivElement | null>(null)
    const stencilSearch = ref('')
    const stencilSearchChange = (search: string) => {
      stencilSearch.value = search
    }

    const nativeStencil = ref<ReturnType<NativeStencil> | null>(null)
    const nativeStencilGroups = computed(() => {
      if (!nativeStencil.value) return null

      const gMap: Map<ComposedNativeStencil['name'], ComposedNativeStencil[]> =
        new Map(nativeStencil.value.groups.map((g) => [g.name, []]))
      for (const [key, value] of Object.entries(nativeStencil.value.nodes)) {
        const list = gMap.get(key)
        if (list) {
          gMap.set(
            key,
            value.map((v) => ({ ...v, name: key }))
          )
        }
      }

      return [...gMap]
    })
    const filteredNativeStencilGroups = computed(() => {
      if (!stencilSearch.value) return nativeStencilGroups.value

      return nativeStencilGroups.value?.map(
        (group): [string, ComposedNativeStencil[]] => [
          group[0],
          group[1].filter((item) => {
            return new RegExp(stencilSearch.value, 'i').test(item.attrs.name)
          }),
        ]
      )
    })

    nativeStencil.value = (props.stencil as NativeStencil)(props.graph)

    return {
      visible,
      stencilSearch,
      stencilSearchChange,
      refStencil,
      nativeStencil,
      nativeStencilGroups,
      filteredNativeStencilGroups,
    }
  },

  render() {
    return (
      <Transition name="collapse-transition">
        {this.visible && (
          <div
            class={
              'sa-form-stencil flex flex-col justify-start p-1 box-border relative'
            }
          >
            <NInput
              class="stencil-search"
              value={this.stencilSearch}
              onUpdateValue={this.stencilSearchChange}
              clearable
              placeholder="Search Component"
            >
              {{
                prefix: () => <NIcon component={FlashOutline} />,
              }}
            </NInput>

            {
              // groups
              this.filteredNativeStencilGroups
                ?.map(
                  (group) => group[1].length && <StencilGroup group={group} />
                )
                .filter(Boolean)
            }
          </div>
        )}
      </Transition>
    )
  },
})
