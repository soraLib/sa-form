import { computed, defineComponent, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { Settings } from '@vicons/ionicons5'
import type { PropType } from 'vue'
import type { PcGraph } from '@/SaForm/PcForm/graph'

export default defineComponent({
  name: 'SaPcFormSettings',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
  },

  setup(props) {
    return () => (
      <div title="Settings">
        <NIcon size={24}>
          <Settings />
        </NIcon>
      </div>
    )
  },
})
