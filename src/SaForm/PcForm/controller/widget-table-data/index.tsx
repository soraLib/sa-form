import { defineComponent, ref } from 'vue'
import {
  NButton,
  NColorPicker,
  NDataTable,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NInputNumber,
  NScrollbar,
  NSelect,
  NSwitch,
} from 'naive-ui'
import { Array as SaArray } from 'sugar-sajs'
import { Add } from '@vicons/ionicons5'
import { cloneDeep } from 'lodash-es'
import {
  TableColumnAlign,
  type TableData,
  type TableDataColumn,
} from '../../plugins/table'
import type { PropType } from 'vue'
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
    const tableData = ref<TableData>(
      cloneDeep(props.graph.selected[0].attrs['data'] ?? [])
    )
    const tableDataColumnForm = ref(tableData.value[0])

    ctx.expose({
      update() {
        return tableData.value
      },
    })

    function onAddRow() {
      tableData.value.push({
        title: 'Column A',
        align: TableColumnAlign.Left,
        color: '',
        backgroundColor: '',
        wrappable: true,
        isHtml: false,
        sortable: true,
      })
    }

    function onDeleteRow(row: TableDataColumn) {
      SaArray.remove(tableData.value, tableData.value.indexOf(row))
    }

    const getDataIndex = (row: TableDataColumn) => tableData.value.indexOf(row)

    return () => (
      <section class="widget-table-data">
        <header>
          <NButton
            type="primary"
            size="small"
            class="text-sm"
            onClick={onAddRow}
            v-slots={{
              icon: () => (
                <NIcon>
                  <Add />
                </NIcon>
              ),
            }}
          >
            Add Column
          </NButton>

          <p class="text-gray-500 font-bold">Please add at least one column.</p>
        </header>

        <main class="flex justify-between">
          <NDataTable
            max-height="300"
            class="!w-min"
            data={tableData.value}
            columns={[
              {
                title: 'Title',
                key: 'title',
                width: 150,
                render: (row: TableDataColumn) => {
                  const index = getDataIndex(row)
                  return row.title
                },
              },
              {
                title: 'Action',
                key: 'actions',
                width: 80,
                render: (row) => (
                  <NButton
                    type="error"
                    strong
                    size="small"
                    onClick={() => onDeleteRow(row)}
                  >
                    Delete
                  </NButton>
                ),
              },
            ]}
            rowClassName={(row) =>
              row === tableDataColumnForm.value ? 'is-current-row' : 'row'
            }
            rowProps={(row) => ({
              style: 'cursor: pointer;',
              onClick: () => (tableDataColumnForm.value = row),
            })}
          ></NDataTable>

          <NScrollbar class="widget-table-data-column-form-scrollbar">
            <NForm
              key={tableDataColumnForm.value.title}
              class="widget-table-data-column-form"
              labelWidth={80}
              labelPlacement="left"
              labelAlign="left"
              model={tableDataColumnForm.value}
            >
              <NFormItem required label="Title">
                <NInput
                  value={tableDataColumnForm.value.title}
                  onUpdate:value={(v: string) =>
                    (tableDataColumnForm.value.title = v)
                  }
                  placeholder="Input Column Title"
                />
              </NFormItem>

              <NFormItem label="Width">
                <NInputNumber
                  class="w-full"
                  min={0}
                  value={tableDataColumnForm.value.width}
                  onUpdate:value={(v) =>
                    v !== null && (tableDataColumnForm.value.width = v)
                  }
                  placeholder="Input Column Width"
                />
              </NFormItem>

              <NFormItem label="Align">
                <NSelect
                  value={tableDataColumnForm.value.align}
                  onUpdate:value={(v) => (tableDataColumnForm.value.align = v)}
                  placeholder="Select Column Align"
                  options={[
                    {
                      label: 'Left',
                      value: TableColumnAlign.Left,
                    },
                    {
                      label: 'Center',
                      value: TableColumnAlign.Center,
                    },
                    {
                      label: 'Right',
                      value: TableColumnAlign.Right,
                    },
                  ]}
                />
              </NFormItem>

              <NFormItem label="Color">
                <NColorPicker
                  value={tableDataColumnForm.value.color}
                  onUpdate:value={(v) => (tableDataColumnForm.value.color = v)}
                />
              </NFormItem>

              <NFormItem label="BKG">
                <NColorPicker
                  value={tableDataColumnForm.value.color}
                  onUpdate:value={(v) => (tableDataColumnForm.value.color = v)}
                />
              </NFormItem>

              <NFormItem label="Wrappable">
                <NSwitch
                  value={tableDataColumnForm.value.wrappable}
                  onUpdate:value={(v) =>
                    (tableDataColumnForm.value.wrappable = v)
                  }
                />
              </NFormItem>

              <NFormItem label="Sortable">
                <NSwitch
                  value={tableDataColumnForm.value.sortable}
                  onUpdate:value={(v) =>
                    (tableDataColumnForm.value.sortable = v)
                  }
                />
              </NFormItem>

              <NFormItem label="IsHtml">
                <NSwitch
                  value={tableDataColumnForm.value.isHtml}
                  onUpdate:value={(v) => (tableDataColumnForm.value.isHtml = v)}
                />
              </NFormItem>
            </NForm>
          </NScrollbar>
        </main>
      </section>
    )
  },
})
