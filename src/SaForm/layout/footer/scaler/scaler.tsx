import { computed, defineComponent } from 'vue'
import { NSelect, NSlider } from 'naive-ui'
import { isNumber } from 'lodash-es'
import type { PropType } from 'vue'
import type { BasicGraph } from '@/SaForm/graph'
import { addUnit } from '@/SaForm/utils/style'

import './scaler.scss'

export default defineComponent({
  name: 'SaFormLayoutFooter',

  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  setup(props) {
    const scaleRatio = computed(() => props.graph.scale.ratio)
    const scaleType = computed(() => props.graph.scale.type)

    const scaleSelectorValue = computed(() => {
      if (scaleType.value === 'adaptive') return 'adaptive'

      return scaleRatio.value
    })

    return () => (
      <div class="scale-ratio flex gap-4 items-center">
        <NSelect
          value={scaleSelectorValue.value}
          class="scale-ratio-selector"
          renderTag={({ option }) => (
            <span>
              {isNumber(option.value) ? addUnit(option.value, '%') : 'Adaptive'}
            </span>
          )}
          size="tiny"
          options={[
            {
              label: '150%',
              value: 150,
            },
            {
              label: '125%',
              value: 125,
            },
            {
              label: '100%',
              value: 100,
            },
            {
              label: '75%',
              value: 75,
            },
            {
              label: '50%',
              value: 50,
            },
            {
              label: 'Adaptive',
              value: 'adaptive',
            },
          ]}
          onUpdate:value={(v: number | 'adaptive') => {
            if (v === 'adaptive') {
              props.graph.setScale({
                type: 'adaptive',
              })
            } else {
              props.graph.setScale({
                type: 'fixed',
                ratio: v,
              })
            }
          }}
        />

        <NSlider
          class="scale-ratio-slider"
          value={scaleRatio.value}
          min={25}
          max={200}
          step={5}
          formatTooltip={(v) => addUnit(v, '%')}
          onUpdate:value={(v) =>
            props.graph.setScale({
              type: 'fixed',
              ratio: v,
            })
          }
        />
      </div>
    )
  },
})
