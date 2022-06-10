import { defineComponent, PropType } from 'vue'
import { BasicGraph } from '../../graph'
import { NButton } from 'naive-ui'

export default defineComponent({
  name: 'SaFormLayoutFooter',

  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>
    }
  },

  render() {
    return <div class="sa-form-footer flex justify-start p-1">
      <NButton type="primary">历史记录</NButton>

    </div>
  }
})