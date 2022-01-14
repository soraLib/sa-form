import { computed, defineComponent, onMounted, PropType, Ref, ref } from 'vue';
import { SaPlugin } from '../../../plugin';
import { PcDrawer } from '../../drawer';
import { Plus } from '@element-plus/icons-vue';
import { ElButton, ElIcon, ElInput, ElTable, ElTableColumn, rowProps } from 'element-plus';

import './index.scss';
import { Array as SaArray } from 'sugar-sajs';
import { cloneDeep } from 'lodash-es';
import { isPcElementAttribute } from '../../element';
import Sortable from 'sortablejs';

export default defineComponent({
  name: 'widget-options',
  props: {
    drawer: {
      required: true,
      type: Object as PropType<PcDrawer>
    },
    plugin: {
      required: true,
      type: Object as PropType<SaPlugin>
    }
  },
  setup(props, ctx) {
    const table: Ref<null | any> = ref(null);

    interface Option {
      name: string;
    }

    interface Scope {
      $index: number;
      row: Option;
    }

    const selectOptions: Ref<Option[]> = ref([]);
    const tableData = computed(() => selectOptions.value);

    if (isPcElementAttribute(props.plugin.attr, props.drawer.selected[0]) && props.plugin.attr === 'options') {
      selectOptions.value = cloneDeep(props.drawer.selected[0].attrs[props.plugin.attr]!);
    }

    const expose = {
      update() {
        return selectOptions.value;
      }
    };

    ctx.expose({
      ...expose
    });

    function addRow() {
      selectOptions.value.push({ name: '' });
    }

    function deleteRow({ $index }: Scope) {
      SaArray.remove(selectOptions.value, $index);
    }

    onMounted(() => {
      const child = table.value.$el?.children[2]?.children[0]?.children[1];

      if (child)

        Sortable.create(child, {
          delay: 100,
          sort: !0,
          forceFallback: !0,
          scrollSensitivity: 100,
          animation: 150,
          onEnd: function({ newIndex, oldIndex }) {
            if (newIndex === undefined || oldIndex === undefined) return;

            SaArray.swap(selectOptions.value, oldIndex, newIndex);
          }
        });
    });

    return () => <section class="widget-options">
      <header>
        <ElButton type="primary" size="small" class="text-sm" icon={<ElIcon><Plus /></ElIcon>} onClick={addRow}>add select option</ElButton>

        <p class="text-gray-500 font-bold">please add one select option at least.</p>
      </header>

      <ElTable
        ref={table}
        data={tableData.value}
        max-height="500px"
        border
        rowKey={row => row.name}
        header-cell-style={{ 'text-align': 'center', 'background': '#eef1f6' }}
        cell-style={{ 'text-align': 'center', 'padding': 0 }}>

        <ElTableColumn label="option name" v-slots={{
          default: ({ row }: { row: Option }) => <ElInput v-model={row.name} class="option-input" />
        }} />

        <ElTableColumn label="operations" width="280" v-slots={{
          default: (scope: Scope) => <>
            <ElButton type="danger" plain size="mini" onClick={() => deleteRow(scope)}>delete</ElButton>
          </>
        }}/>
      </ElTable>
    </section>;
  }
});