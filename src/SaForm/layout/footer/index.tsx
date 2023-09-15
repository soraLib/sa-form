import { defineComponent } from 'vue'

import GraphHistory from './history'
import GraphShortcuts from './shortcuts/shortcuts'
import GraphScaler from './scaler/scaler'
import GraphShortcutsGuide from './shortcuts-guide/shortcuts-guide'

import type { BasicGraph } from '../../graph'
import type { PropType } from 'vue'

import './index.scss'

export default defineComponent({
  name: 'SaFormLayoutFooter',

  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  setup(props) {
    return () => (
      <div class="sa-form-footer flex justify-start items-center gap-4">
        <GraphHistory graph={props.graph} />
        <GraphShortcuts class="grow" graph={props.graph} />
        <GraphScaler graph={props.graph} />
        <GraphShortcutsGuide />
      </div>
    )
  },
})
