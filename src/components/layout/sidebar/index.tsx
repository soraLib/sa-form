import { Addon } from '@antv/x6';
import { Shape } from '@antv/x6';
import { computed, defineComponent, PropType, Ref, ref, VNode, watch } from 'vue';
import { BasicDrawer } from '../../drawer';

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
            ],

            getDragNode(node) {
              console.log(node);

              switch (node.attrs?.text.text) {
                case 'Button': {
                  return new Shape.Rect({
                    width: 80,
                    height: 40,
                    attrs: {
                      rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 1 },
                      text: { text: 'Button', fill: 'white' }
                    }
                  });
                }

                case 'Container': {
                  return new Shape.Rect({
                    width: 200,
                    height: 100,
                    attrs: {
                      rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 1 },
                      text: { text: 'Container', fill: 'white' }
                    }
                  });
                }

                default: {
                  console.error('[Sa error]: unexpected drag node', node);
                }
              }

              return node;
            }
          });

          const r = new Shape.Rect({
            width: 80,
            height: 40,
            attrs: {
              rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 1 },
              text: { text: 'Button', fill: 'white' }
            }
          });

          const c = new Shape.Rect({
            width: 80,
            height: 40,
            attrs: {
              rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 1 },
              text: { text: 'Container', fill: 'white' }
            }
          });

          refStencil.value?.appendChild(stencil.container);

          stencil.load([r], 'group1');
          stencil.load([c], 'group2');
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