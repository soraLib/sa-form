import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { BasicGraph } from '../../graph'

export default defineComponent({
  name: 'SaFormLayoutHeaderLayout',
  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  setup(props) {
    return () => <div class="flex w-fit"></div>
  },
})
