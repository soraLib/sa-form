import { computed, defineComponent } from 'vue'
import { NButton, NPopover, NScrollbar } from 'naive-ui'

import { BasicRecordType } from '../../record'
import { useClazs } from '../../utils/class'
import type { BasicGraph } from '../../graph'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'SaFormHistory',

  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  setup(props) {
    const recordsRef = computed(() => props.graph.history.records)
    const currentRef = computed(() => props.graph.history.index)

    return () => (
      <NPopover
        class="history-popover"
        placement="top-start"
        trigger="click"
        showArrow={false}
      >
        {{
          trigger: () => <NButton type="primary">history</NButton>,
          default: () => (
            <NScrollbar style={{ maxHeight: '400px' }}>
              <ol class="history-container">
                {recordsRef.value.length ? (
                  recordsRef.value.map((record, index) => (
                    <li
                      class={useClazs('history', {
                        active: currentRef.value === index,
                      })}
                      onClick={() => props.graph.historyTo(record)}
                    >
                      <span class="type">{BasicRecordType[record.type]}</span>
                      <span class="name">
                        {record.data.map((d) => d.name).join(', ') || 'graph'}
                      </span>
                    </li>
                  ))
                ) : (
                  <div class="empty">empty history record</div>
                )}
              </ol>
            </NScrollbar>
          ),
        }}
      </NPopover>
    )
  },
})