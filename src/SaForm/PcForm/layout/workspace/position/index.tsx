import { computed, defineComponent, ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import { use } from 'sa-lambda'
import { getRectangle } from '../graph/renderer/utils/rectangle'
import type { CSSProperties, PropType } from 'vue'
import type { BasicGraph } from '@/SaForm/graph'
import { getDeepOffset } from '@/SaForm/utils/element'
import { addUnit } from '@/SaForm/utils/style'

export default defineComponent({
  name: 'SaFormPositionBlock',
  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },
  setup(props) {
    const rect = computed(() => getRectangle(props.graph.selected))

    const blockRef = ref()
    const { width } = useElementSize(blockRef)

    const blockStyle = computed<CSSProperties>(() => {
      if (props.graph.isDragging) {
        return {
          left: addUnit(
            use(props.graph.selected[0]?.parent, (p) =>
              p ? getDeepOffset(p, 'x') : 0
            ) +
              rect.value.x +
              rect.value.width / 2 -
              (width.value + 16) / 2
          ),
          top: addUnit(
            use(props.graph.selected[0]?.parent, (p) =>
              p ? getDeepOffset(p, 'y') : 0
            ) +
              rect.value.y +
              rect.value.height +
              10
          ),
        }
      }

      return {
        display: 'none',
      }
    })

    return () => (
      <div
        ref={blockRef}
        class="position-block"
        style={{
          position: 'absolute',
          backgroundColor: 'var(--c-bg)',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 100,
          'pointer-events': 'none',
          width: 'fit-content',
          padding: '2px 8px',
          boxShadow: '0 2px 4px var(--c-divider)',
          boxSizing: 'border-box',
          ...blockStyle.value,
        }}
      >
        X: {rect.value.x} <span class="ml-2">Y: {rect.value.y}</span>
      </div>
    )
  },
})
