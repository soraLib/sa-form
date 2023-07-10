/** sa-form entry */

import { computed, defineComponent, reactive } from 'vue'

import { LAYOUTS } from './config'

import SaFormHeader from './layout/header'
import SaFormStencil from './layout/stencil'
import SaFormController from './layout/properties-controller'
import SaFormFooter from './layout/footer'
import SaFormLayer from './layout/layer'
import type { ILayout } from './config'
import type { GraphType } from './graph'
import type { CSSProperties, PropType } from 'vue'

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

    const gridStyle = computed<CSSProperties>(() => {
      const grid = layout.graph.grid
      if (!grid.enabled) return {}

      if (grid.type === 'dot')
        return {
          backgroundPositionX: '0.5px',
          backgroundPositionY: '0.5px',
          backgroundImage: `linear-gradient(var(--c-bg) ${
            grid.size - 1
          }px, transparent 0), linear-gradient(90deg, transparent ${
            grid.size - 1
          }px, var(--c-bg-dark) 0)`,
          backgroundSize: `${grid.size}px ${grid.size}px, ${grid.size}px ${grid.size}px`,
        }

      // mesh
      return {
        backgroundPositionX: '-1px',
        backgroundPositionY: '-1px',
        backgroundImage: `linear-gradient(var(--c-line) 1px, transparent 0),
linear-gradient(90deg, var(--c-line) 1px, transparent 0),
linear-gradient(var(--c-line-bold) 1px, transparent 0),
linear-gradient(90deg, var(--c-line-bold) 1px, transparent 0)`,
        backgroundSize: `${grid.size}px ${grid.size}px, ${grid.size}px ${
          grid.size
        }px, ${grid.size * 5}px ${grid.size * 5}px, ${grid.size * 5}px ${
          grid.size * 5
        }px`,
      }
    })

    return () => (
      <section class="flex flex-col h-full">
        <header>
          <SaFormHeader
            toolkits={layout.toolkits}
            graph={layout.graph}
            class="sa-bg"
          />
        </header>

        <main class="mt-1 flex flex-grow h-full overflow-auto">
          <section>
            <SaFormStencil
              stencil={layout.stencil}
              graph={layout.graph}
              class="sa-bg h-full"
            />
          </section>

          <SaFormLayer class="shrink-0" graph={layout.graph} />

          <main class="sa-bg mx-1 flex item-center flex-col grow">
            <section class="workspace-bg grow overflow-auto">
              <SaFormWorkspace
                class="workspace"
                graph={layout.graph}
                style={gridStyle.value}
              />
            </section>
            <SaFormFooter class="sa-bg" graph={layout.graph} />
          </main>

          <aside class="w-64 sa-bg shrink-0">
            <SaFormController
              graph={layout.graph}
              controller={layout.controller}
            />
          </aside>
        </main>
      </section>
    )
  },
})
