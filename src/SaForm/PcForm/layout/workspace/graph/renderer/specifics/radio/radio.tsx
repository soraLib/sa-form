import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { PcElement } from '@/SaForm/PcForm/element'
import type { PcGraph } from '@/SaForm/PcForm/graph'

import './radio.scss'

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
    const rowNumber = computed(() => props.element.attrs['row-number'] ?? 2)
    const columnNumber = computed(
      () => props.element.attrs['column-number'] ?? 2
    )

    return () => (
      <div class="sa-radio">
        {props.element.attrs.options
          ?.slice(0, rowNumber.value * columnNumber.value)
          .map((radio) => {
            return (
              <div
                class="radio-item"
                style={{
                  width: `calc(100% / ${columnNumber.value})`,
                  height: `calc(100% / ${rowNumber.value})`,
                }}
              >
                <span class="radio-item-label">{radio.label}</span>
              </div>
            )
          })}
      </div>
    )
  },
})
