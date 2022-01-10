import { Addon, Node } from '@antv/x6';
import { computed, defineComponent, PropType, Ref, ref, watch } from 'vue';
import { BasicDrawer } from '../../drawer';

export type SideStencil = (drawer: any /** TODO: */) => {
  groups: Addon.Stencil.Group[];
  getDragNode: (node: Node, drawer: BasicDrawer) => Node;
  getDropNode: (node: Node, drawer: BasicDrawer) => Node;
  validateNode: (node: Node, drawer: BasicDrawer) => boolean;
  nodes: {
    /** TODO: node keys */
    [key in ReturnType<SideStencil>['groups'][number]['name']]: Node[];
  };
};

export default defineComponent({
  name: 'CoFormLayoutSidebar',

  props: {
    stencil: {
      type: Function as PropType<SideStencil>
    },
    drawer: {
      required: true,
      type: Object as PropType<BasicDrawer>
    }
  },

  setup(props) {
    const refStencil: Ref<HTMLDivElement | null> = ref(null);
    const graph = computed(() => props.drawer.graph);
    let stencil: Addon.Stencil | undefined = undefined;

    watch(
      () => graph.value,
      () => {
        if (graph.value && !stencil && props.stencil) {
          const stencilProp = props.stencil(props.drawer);

          stencil = new Addon.Stencil({
            title: 'Components',
            target: graph.value,
            scaled: false,
            animation: true,
            search(cell, keyword) {
              const text = cell.attrs!.text.text as string;

              return new RegExp(keyword, 'i').test(text);
            },
            placeholder: 'Search by shape name',
            notFoundText: 'Not Found',
            collapsable: true,
            stencilGraphWidth: 208,
            stencilGraphHeight: 180,
            groups: stencilProp.groups,
            getDragNode: (node) => stencilProp.getDragNode(node, props.drawer),
            getDropNode: (node) => stencilProp.getDropNode(node, props.drawer),
            validateNode: (node) => stencilProp.validateNode(node, props.drawer)
          });

          refStencil.value?.appendChild(stencil.container);

          for(const group of stencilProp.groups) {
            stencil.load(stencilProp.nodes[group.name], group.name);
          }
        }
      });

    return {
      graph,
      refStencil,
      stencil
    };
  },

  render() {
    return <div class="sa-form-side flex flex-col justify-start p-1 relative w-52"><div ref="refStencil" /></div>;
  }
});