import { ElOption, ElSelect } from 'element-plus';
import { defineComponent, inject, ref } from 'vue';
import { PcNode } from '..';

import './select.scss';

export default defineComponent({
  name: 'SaFormPcSelect',
  setup() {
    const getNode = inject('getNode') as () => PcNode;

    const node = getNode?.();

    const options = ref(node?.data.options ?? []);

    node?.on('change:data', ({ current }) => {
      options.value = current.options ?? [];
    });

    return () => <ElSelect class="sa-graph-vue-component">
      { options.value ? options.value.map(option => <ElOption label={option.name} value={option.name} />) : '' }
    </ElSelect>;
  }
});