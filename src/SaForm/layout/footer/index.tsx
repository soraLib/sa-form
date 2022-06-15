import { defineComponent, PropType, computed } from 'vue'
import { BasicGraph } from '../../graph'
import { NButton, NPopover, NScrollbar } from 'naive-ui'

import './index.scss'
import { BasicRecordType } from '../../record'
import { PcRecord } from '../../PcForm/record'
import { useClazs } from '../../utils/class'

export default defineComponent({
  name: 'SaFormLayoutFooter',

  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>
    }
  },

  setup(props) {
    const recordsRef = computed(() => props.graph.history.records)
    const currentRef = computed(() => props.graph.history.index)

    return () => (
      <div class="sa-form-footer flex justify-start p-1">
        <NPopover class="history-popover" placement="top-start" trigger="click" showArrow={false}>
          {{
            trigger: () => <NButton type="primary">history</NButton>,
            default: () => <NScrollbar style={{ maxHeight: '400px' }}>
              <ol class="history-container">{
                recordsRef.value.length ? recordsRef.value.map((record, index) =>
                  <li
                    class={ useClazs('history', {
                      active: currentRef.value === index
                    })}
                    onClick={() => props.graph.historyTo(record)}
                  >
                    <span class="type">{BasicRecordType[record.type]}:</span>
                    <span class="name">{record.data.map(d => d.name).join(', ')}</span>
                  </li>
                )
                  : <div class="empty">empty history record</div>
              }</ol>
            </NScrollbar>
          }}
        </NPopover>
      </div>
    )
  }
})