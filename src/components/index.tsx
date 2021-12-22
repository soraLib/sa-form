/** sa-form entry */

import { defineComponent, PropType } from 'vue';
import { DrawerType } from './drawer';

export default defineComponent({
  props: {
    DrawerType: {
      requred: true,
      type: Number as PropType<DrawerType>
    },
    id: {
      requred: true,
      type: String
    }
  },
  setup(props, ctx) {
    // TODO: return dynamic sa-form component
  }
});