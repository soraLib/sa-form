import { Transition, computed, defineComponent, ref } from 'vue'
import { NIcon, NInput, NScrollbar, NTree } from 'naive-ui'
import { ArrowBackOutline, Layers } from '@vicons/ionicons5'
import { type BasicElement, ElementType } from '../../element'
import type { TreeOption } from 'naive-ui'
import type { PropType } from 'vue'
import type { BasicGraph } from '../../graph'

import './index.scss'
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

    return () => (
      <Transition name="collapse-transition">
        {visible.value && (
          <div v-show={visible} class="sa-form-layer sa-bg ml-1 p-2">
            <div class="title flex items-center gap-2 text-base font-medium">
              <NIcon size={20}>
                <Layers />
              </NIcon>
              Layer
              <NIcon
                size={20}
                class="ml-auto cursor-pointer hover:text-[var(--c-brand)]"
                {...{
                  title: 'Close Layer',
                  onClick: () => props.graph.setLayout({ layer: false }),
                }}
              >
                <ArrowBackOutline />
              </NIcon>
            </div>

            <NScrollbar class="my-2">
              <NTree
                data={treeData.value}
                block-line
                block-node
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
              ></NTree>
            </NScrollbar>
          </div>
        )}
      </Transition>
    )
  },
})
