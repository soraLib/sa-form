import { defineComponent, PropType } from 'vue';

export type CoFormType = 'Form' | 'Flow' | 'Print';

export default defineComponent({
  props: {
    CoFormType: {
      requred: true,
      type: String as PropType<CoFormType>
    },
    id: {
      requred: true,
      type: String
    }
  },
  setup(props, ctx) {

  }
});