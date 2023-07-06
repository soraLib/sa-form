import { Transition, computed, defineComponent, ref } from 'vue'
import { NIcon, NInput, NScrollbar, NTree } from 'naive-ui'
import { ChevronBack, Layers } from '@vicons/ionicons5'
import { type BasicElement, ElementType } from '../../element'
import type { PropType } from 'vue'
import type { BasicGraph } from '../../graph'

import './index.scss'
import type { TreeOption } from 'naive-ui'
import { pcStencilIcons } from '@/SaForm/PcForm/layout/stencil/stencil'

export default defineComponent({
  name: 'SaFormLayoutLayer',

  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  setup(props) {
    const visible = computed(() => props.graph.layout.layer)
    const treeData = computed(() => props.graph.canvas.children)
    const selectedKeys = computed(() =>
      props.graph.selected.map(({ key }) => key)
    )

    return () => (
      <Transition name="collapse-transition">
        {visible.value && (
          <div v-show={visible} class="sa-form-layer sa-bg ml-1 p-2">
            <div class="title flex items-center gap-2 text-base font-medium">
              <NIcon size={20}>
                <Layers />
              </NIcon>
              Layer
              <div
                class="layer-close-button ml-auto rounded-full cursor-pointer flex items-center p-1.5"
                title="Close Layer"
                onClick={() => props.graph.setLayout({ layer: false })}
              >
                <NIcon size={20} {...{}}>
                  <ChevronBack />
                </NIcon>
              </div>
            </div>

            <NScrollbar class="my-2">
              <NTree
                block-line
                block-node
                data={treeData.value as unknown as TreeOption[]}
                node-props={({ option }: { option: BasicElement }) => {
                  const index = props.graph.selected.indexOf(option)
                  return {
                    'layer-tree-status':
                      index === -1
                        ? 'not-selected'
                        : index === 0 && props.graph.selected.length > 1
                        ? 'is-reference'
                        : 'is-selected',
                  }
                }}
                selectedKeys={selectedKeys.value}
                render-label={({ option }: { option: BasicElement }) => (
                  <div
                    title={`${ElementType[option.attrs.type]}: ${
                      option.attrs.name
                    }`}
                    class="text-left w-full overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {option.attrs.name}
                  </div>
                )}
                render-prefix={({ option }: { option: BasicElement }) => (
                  <i class={`iconfont ${pcStencilIcons[option.attrs.type]}`} />
                )}
                onUpdate:selectedKeys={props.graph.setSelected.bind(
                  props.graph
                )}
              ></NTree>
            </NScrollbar>
          </div>
        )}
      </Transition>
    )
  },
})
