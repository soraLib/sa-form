import { PartialOptional } from 'sugar-sajs'
import { computed, defineComponent, PropType, Ref, ref, watch } from 'vue'
import { BasicGraph } from '../../graph'
import { BasicElement } from '../../element'

import NativeItem from './native'

import './index.scss'

type NeededKeys = 'type' | 'name' | 'width' | 'height'
// native stencil config
export type NativeStencil = (graph: any /** TODO: */) => {
  groups: { name: string }[]
  nodes: {
    [key in ReturnType<NativeStencil>['groups'][number]['name']]: ({
      icon: string
      title?: string
      attrs: PartialOptional<BasicElement['attrs'], Exclude<keyof BasicElement['attrs'], NeededKeys>>
    })[]
  }
}
type Nodes = ReturnType<NativeStencil>['nodes']
export type NativeItem = Nodes[keyof Nodes][number]
type ComposedNativeStencil = ReturnType<NativeStencil>['groups'][number] & NativeItem

export default defineComponent({
  name: 'CoFormLayoutSidebar',

  props: {
    stencil: {
      required: true,
      type: Function as PropType<NativeStencil>
    },
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>
    }
  },

  setup(props) {
    const refStencil: Ref<HTMLDivElement | null> = ref(null)

    const nativeStencil: Ref<ReturnType<NativeStencil> | null> = ref(null)
    const nativeStencilGroups = computed(() => {
      if (!nativeStencil.value) return null

      const gMap: Map<ComposedNativeStencil['name'], ComposedNativeStencil[]> = new Map(nativeStencil.value.groups.map(g => [g.name, []]))
      for (const [key, value] of Object.entries(nativeStencil.value.nodes)) {
        const list = gMap.get(key)
        if (list) {
          gMap.set(key, value.map(v => ({ ...v, name: key })))
        }
      }

      return [...gMap]
    })

    nativeStencil.value = (props.stencil as NativeStencil)(props.graph)

    return {
      refStencil,
      nativeStencil,
      nativeStencilGroups
    }
  },

  render() {
    return (
      <div class={'sa-form-side flex flex-col justify-start p-1 box-border relative'}>
        {
          this.nativeStencilGroups?.map(group =>
            group[1].map(item => <NativeItem item={item} />)
          )
        }
      </div>
    )
  }
})