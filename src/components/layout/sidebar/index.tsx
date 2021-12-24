import { Addon } from '@antv/x6';
import { Shape } from '@antv/x6';
import { computed, defineComponent, PropType, Ref, ref, VNode, watch } from 'vue';
import { BasicDrawer } from '../../drawer';

import './index.scss';

export interface SideTool {
  /** icon title on dom */
  title: string;
  /** icon */
  icon: VNode;
}

export default defineComponent({
  name: 'CoFormLayoutSidebar',

  props: {
    options: {
      required: true,
      type: Array as PropType<SideTool[]>
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
        console.log('GRAPH CHANGE');
        if (graph.value && !stencil) {
          console.log(graph.value, refStencil.value);

          stencil = new Addon.Stencil({
            title: 'Components',
            target: graph.value,
            search(cell, keyword) {
              return cell.shape.indexOf(keyword) !== -1;
            },
            placeholder: 'Search by shape name',
            notFoundText: 'Not Found',
            collapsable: true,
            stencilGraphWidth: 208,
            stencilGraphHeight: 180,
            groups: [
              {
                name: 'group1',
                title: 'Group(Collapsable)'
              },
              {
                name: 'group2',
                title: 'Group',
                collapsable: false
              }
            ]
          });

          const r = new Shape.Rect({
            width: 80,
            height: 40,
            attrs: {
              rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 1 },
              text: { text: 'Button', fill: 'white' }
            }
          });

          refStencil.value?.appendChild(stencil.container);

          stencil.load([r], 'group1');
        }});

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