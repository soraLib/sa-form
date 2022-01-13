import { defineComponent, PropType, Ref, ref } from 'vue';
import { SaPlugin } from '../../../plugin';
import { PcDrawer } from '../../drawer';
import { Plus } from '@element-plus/icons-vue';
import { ElButton, ElIcon, ElInput, ElTable, ElTableColumn } from 'element-plus';

import './index.scss';
import { Array as SaArray } from 'sugar-sajs';
import { cloneDeep } from 'lodash-es';

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
    interface Option {
      name: string;
    }

    interface Scope {
      $index: number;
      row: Option;
    }

    const selectOptions: Ref<Option[]> = ref([]);

    selectOptions.value = cloneDeep(props.drawer.selected[0].attrs[props.plugin.attr]);

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

    function moveUp({ $index }: Scope) {
      if ($index) {
        SaArray.swap(selectOptions.value, $index, $index - 1);
      }
    }

    function moveDown({ $index }: Scope) {
      if ($index < selectOptions.value.length - 1) {
        SaArray.swap(selectOptions.value, $index, $index + 1);
      }
    }

    function deleteRow({ $index }: Scope) {
      SaArray.remove(selectOptions.value, $index);
    }

    return () => <section class="widget-options">
      <header>
        <ElButton type="primary" size="small" class="text-sm" icon={<ElIcon><Plus /></ElIcon>} onClick={addRow}>add select option</ElButton>

        <p class="text-gray-500 font-bold">please add one select option at least.</p>
      </header>

      <ElTable
        data={selectOptions.value}
        max-height="500px"
        border
        header-cell-style={{ 'text-align': 'center', 'background': '#eef1f6' }}
        cell-style={{ 'text-align': 'center', 'padding': 0 }}>

        <ElTableColumn label="option name" v-slots={{
          default: ({ row }: { row: Option }) => <ElInput v-model={row.name} class="option-input" />
        }} />

        <ElTableColumn label="operations" width="280" v-slots={{
          default: (scope: Scope) => <>
            <ElButton type="primary" plain size="mini" onClick={() => moveUp(scope)}>up</ElButton>
            <ElButton type="primary" plain size="mini" onClick={() => moveDown(scope)}>down</ElButton>
            <ElButton type="danger" plain size="mini" onClick={() => deleteRow(scope)}>delete</ElButton>
          </>
        }}/>
      </ElTable>
    </section>;
  }
});