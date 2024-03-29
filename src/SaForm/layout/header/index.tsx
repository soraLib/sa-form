import { defineComponent } from 'vue'
import { NScrollbar } from 'naive-ui'
import Toolkit from './toolkit'
import Layout from './layout'
import type { PropType } from 'vue'
import type { BasicGraph } from '../../graph'
import './index.scss'
import type { HeaderToolkit } from './toolkit'

export default defineComponent({
  name: 'SaFormLayoutHeader',
  props: {
    toolkits: {
      required: true,
      type: Array as PropType<HeaderToolkit[]>,
    },
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },
  setup(props) {
    return () => (
      <div class="sa-form-header overflow-auto">
        <NScrollbar x-scrollable>
          <div class="flex flex-col p-1">
            <Layout graph={props.graph} />
            <Toolkit toolkits={props.toolkits} graph={props.graph} />
          </div>
        </NScrollbar>
      </div>
    )
  },
})
