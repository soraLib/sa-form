import { defineComponent, ref } from 'vue'
import { NButton, NDataTable, NIcon } from 'naive-ui'
import { Array as SaArray } from 'sugar-sajs'
import { Add } from '@vicons/ionicons5'
import { isPcElementAttribute } from '../../element'
import { ShowOrEdit } from './ShowOrEdit'
import type { SelectOption } from '../../plugins/select'
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
    const selectOptions = ref<SelectOption[]>([])
    if (
      isPcElementAttribute(props.plugin.attr, props.graph.selected[0]) &&
      props.plugin.attr === 'options'
    ) {
      selectOptions.value = props.graph.selected[0].attrs[
        props.plugin.attr
      ]!.map((option) => ({
        label: option.label,
        value: option.value ?? option.label,
      }))
    }

    ctx.expose({
      update() {
        return selectOptions.value
      },
    })

    function onAddRow() {
      selectOptions.value.push({ label: '', value: '' })
    }

    function onDeleteRow(row: SelectOption) {
      SaArray.remove(selectOptions.value, selectOptions.value.indexOf(row))
    }

    const getDataIndex = (row: SelectOption) => selectOptions.value.indexOf(row)

    return () => (
      <section class="widget-options">
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
            Add Option
          </NButton>

          <p class="text-gray-500 font-bold">Please add at least one option.</p>
        </header>
        <NDataTable
          max-height="300"
          class="!w-min"
          striped
          data={selectOptions.value}
          columns={[
            {
              title: 'Label',
              key: 'label',
              width: 200,
              render: (row: SelectOption) => {
                const index = getDataIndex(row)
                return (
                  <ShowOrEdit
                    value={row.label}
                    onUpdate:value={(v: SelectOption['label']) =>
                      (selectOptions.value[index].label = v)
                    }
                  />
                )
              },
            },
            {
              title: 'Value',
              key: 'value',
              width: 200,
              render: (row) => {
                const index = getDataIndex(row)
                return (
                  <ShowOrEdit
                    value={row.value}
                    onUpdate:value={(v: SelectOption['value']) =>
                      (selectOptions.value[index].value = v)
                    }
                  />
                )
              },
            },
            {
              title: 'Action',
              key: 'actions',
              width: 100,
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
        ></NDataTable>
      </section>
    )
  },
})
