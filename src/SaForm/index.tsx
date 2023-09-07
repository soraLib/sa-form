/** sa-form entry */

import { defineComponent, reactive } from 'vue'

import { LAYOUTS } from './config'

import SaFormHeader from './layout/header'
import SaFormStencil from './layout/stencil'
import SaFormProperty from './layout/property'
import SaFormFooter from './layout/footer'
import SaFormLayer from './layout/layer'
import SaFormPanel from './layout/panel'
import type { GraphType } from './graph'
import type { ILayout } from './config'
import type { PropType } from 'vue'

import './styles/index.scss'

export default defineComponent({
  props: {
    type: {
      required: true,
      type: String as PropType<GraphType>,
    },
    id: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const layout = reactive(LAYOUTS[props.type]()) as unknown as ReturnType<
      ILayout[keyof ILayout]
    >

    const SaFormWorkspace = layout.workspace

    return () => (
      <section key={layout.graph.canvas.attrs.id} class="flex flex-col h-full">
        <main class="mt-1 flex flex-grow gap-1 h-full overflow-auto">
          <section>
            <SaFormStencil
              stencil={layout.stencil}
              graph={layout.graph}
              class="sa-bg h-full"
            />
          </section>

          <SaFormLayer class="shrink-0" graph={layout.graph} />

          <main class="flex item-center flex-col flex-grow overflow-auto">
            <header>
              <SaFormHeader
                toolkits={layout.toolkits}
                graph={layout.graph}
                class="mb-1"
              />
            </header>

            <main class="flex-grow flex overflow-auto">
              <section class="flex flex-grow flex-col overflow-auto">
                <section
                  class="sa-bg workspace-bg grow"
                  data-graph-type={layout.graph.type}
                >
                  <SaFormWorkspace
                    class="workspace w-full h-full"
                    graph={layout.graph}
                  />
                </section>

                <SaFormPanel
                  class="sa-bg mt-1"
                  graph={layout.graph}
                  controller={layout.controller}
                />
              </section>

              <SaFormProperty
                class="sa-property sa-bg shrink-0 ml-1"
                graph={layout.graph}
                controller={layout.controller}
              />
            </main>
          </main>
        </main>

        <SaFormFooter class="sa-bg" graph={layout.graph} />
      </section>
    )
  },
})
