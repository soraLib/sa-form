import { computed, defineComponent, onMounted, ref } from 'vue'
import Sortable from 'sortablejs'
import { Plus } from '@element-plus/icons-vue'
import { NButton, NIcon, NInput, NTable } from 'naive-ui'
import { Array as SaArray } from 'sugar-sajs'
import { isPcElementAttribute } from '../../element'
import type { PropType, Ref } from 'vue'
import type { SaPlugin } from '../../../plugin'
import type { PcGraph } from '../../graph'

import './index.scss'

export default defineComponent({
  name: 'WidgetOptions',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
    plugin: {
      required: true,
      type: Object as PropType<SaPlugin>,
    },
  },
  setup(props, ctx) {
    const table: Ref<null | any> = ref<any>(null)

    interface Option {
      id: string
      name: string
    }

    interface Scope {
      $index: number
      row: Option
    }

    const selectOptions: Ref<Option[]> = ref([])
    const tableData = computed(() => selectOptions.value)

    if (
      isPcElementAttribute(props.plugin.attr, props.graph.selected[0]) &&
      props.plugin.attr === 'options'
    ) {
      selectOptions.value = props.graph.selected[0].attrs[
        props.plugin.attr
      ]!.map((option, index) => ({
        name: option.name,
        id: String(index),
      }))
    }

    const expose = {
      update() {
        return selectOptions.value
      },
    }

    ctx.expose({
      ...expose,
    })

    function addRow() {
      selectOptions.value.push({ name: '', id: new Date().toTimeString() })
    }

    function deleteRow({ $index }: Scope) {
      SaArray.remove(selectOptions.value, $index)
    }

    onMounted(() => {
      const child = table.value.$el?.children[2]?.children[0]?.children[1]

      if (child)
        Sortable.create(child, {
          delay: 100,
          sort: !0,
          forceFallback: !0,
          scrollSensitivity: 100,
          animation: 150,
          onEnd({ newIndex, oldIndex }) {
            if (newIndex === undefined || oldIndex === undefined) return

            SaArray.swap(selectOptions.value, oldIndex, newIndex)
          },
        })
    })

    return () => (
      <section class="widget-options">
        <header>
          {/* <NButton type="primary" size="small" class="text-sm" icon={<ElIcon><Plus /></ElIcon>} onClick={addRow}>add select option</NButton> */}

          <p class="text-gray-500 font-bold">
            please add one select option at least.
          </p>
        </header>

        {/* TODO: naive table <ElTable
        ref={table}
        data={tableData.value}
        max-height="500px"
        border
        rowKey={row => row.id}
        header-cell-style={{ 'text-align': 'center', 'background': '#eef1f6' }}
        cell-style={{ 'text-align': 'center', 'padding': 0 }}>

        <ElTableColumn label="option name" v-slots={{
          default: ({ row }: { row: Option }) => <ElInput v-model={row.name} class="option-input" />
        }} />

        <ElTableColumn label="operations" width="280" v-slots={{
          default: (scope: Scope) => <>
            <NButton type="danger" plain onClick={() => deleteRow(scope)}>delete</NButton>
          </>
        }}/>
      </ElTable> */}
      </section>
    )
  },
})
