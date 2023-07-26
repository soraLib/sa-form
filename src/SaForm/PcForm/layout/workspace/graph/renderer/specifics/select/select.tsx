import { computed, defineComponent } from 'vue'
import { ChevronDown } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import type { PropType } from 'vue'
import type { PcElement } from '@/SaForm/PcForm/element'
import type { PcGraph } from '@/SaForm/PcForm/graph'

import './select.scss'

export default defineComponent({
  name: 'ElementRendererSpecificRadio',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
    element: {
      required: true,
      type: Object as PropType<PcElement>,
    },
  },

  setup(props) {
    const options = computed(() => props.element.attrs.options)

    return () => (
      <div
        class="sa-select"
        title={options.value?.map(({ label }) => label).join('; ')}
      >
        <span>
          {props.element.attrs.name} (
          {options.value?.length && options.value.length})
        </span>
        <NIcon class="sa-select-arrow" size={14}>
          <ChevronDown />
        </NIcon>
      </div>
    )
  },
})
