/** sa-form entry */

import { defineComponent, PropType, reactive, computed, CSSProperties } from 'vue'
import { GraphType } from './graph'

import { ILayout, LAYOUTS } from './config'

import SaFormHeader from './layout/header'
import SaFormSidebar from './layout/sidebar'
import SaFormController from './layout/properties-controller'
import SaFormFooter from './layout/footer'

import './styles/index.scss'

export default defineComponent({
  props: {
    type: {
      required: true,
      type: String as PropType<GraphType>
    },
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const layout = reactive(LAYOUTS[props.type]()) as unknown as ReturnType<ILayout[keyof ILayout]>

    const SaFormWorkspace = layout.workspace

    const gridStyle = computed<CSSProperties>(() => {
      const grid = layout.graph.grid
      if (!grid.enabled) return {}

      if (grid.type === 'dot') return {
        backgroundPositionX: '0.5px', // TODO: use canvas
        backgroundPositionY: '0.5px',
        backgroundImage: `linear-gradient(var(--c-bg) ${grid.size - 1}px, transparent 0), linear-gradient(90deg, transparent ${grid.size - 1}px, var(--c-bg-dark) 0)`,
        backgroundSize: `${grid.size}px ${grid.size}px, ${grid.size}px ${grid.size}px`
      }

      // mesh
      return {
        backgroundPositionX: '-1px',
        backgroundPositionY: '-1px',
        backgroundImage: `linear-gradient(rgba(229,229,229,.5) 1px, transparent 0),
linear-gradient(90deg, rgba(229,229,229,.5) 1px, transparent 0),
linear-gradient(#DEDEDEFF 1px, transparent 0),
linear-gradient(90deg, #DEDEDEFF 1px, transparent 0)`,
        backgroundSize: `${grid.size}px ${grid.size}px, ${grid.size}px ${grid.size}px, ${grid.size * 5}px ${grid.size * 5}px, ${grid.size * 5}px ${grid.size * 5}px`
      }
    })

    return () => (
      <section class="flex flex-col h-full">
        <header>
          <SaFormHeader options={layout.header} graph={layout.graph} class="sa-bg" />
        </header>

        <main class="mt-1 flex flex-grow h-full">
          <aside>
            <SaFormSidebar stencil={layout.side} graph={layout.graph} class="sa-bg h-full" />
          </aside>

          <main class="overflow-auto sa-bg mx-1 flex item-center flex-col grow">
            <section class="workspace-bg grow overflow-auto" >
              <SaFormWorkspace class="workspace" graph={layout.graph} style={gridStyle.value} />
            </section>
            <SaFormFooter class="sa-bg" graph={layout.graph} />
          </main>

          <aside class="w-64 sa-bg shrink-0">
            <SaFormController graph={layout.graph} controller={layout.controller} />
          </aside>
        </main>
      </section>
    )
  }
})