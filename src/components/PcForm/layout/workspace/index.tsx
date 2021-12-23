import { Graph } from '@antv/x6';
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { PcElement } from '../../element';

export default defineComponent({
  name: 'SaPcFormRender',
  props: {
    canvas: {
      required: true,
      type: Object as PropType<PcElement>
    }
  },

  setup(props) {
    const workspace = ref(null);

    onMounted(() => {
      if (workspace.value) {
        const graph = new Graph({
          container: workspace.value,
          autoResize: true,
          width: props.canvas.attrs.width,
          height: props.canvas.attrs.height,
          snapline: true,
          translating: {
            restrict: true
          },
          grid: {
            visible: true,
            type: 'doubleMesh',
            args: [
              {
                color: '#eee',
                thickness: 1
              },
              {
                color: '#ddd',
                thickness: 1,
                factor: 4
              }
            ]
          },
          selecting: {
            enabled: true,
            rubberband: true,
            showNodeSelectionBox: true,
            showEdgeSelectionBox: true
          },
          rotating: {
            enabled: true,
            grid: 15
          }
        });

        graph.addNode({
          x: 300,
          y: 40,
          width: 80,
          height: 40,
          label: 'Hello'
        });

        graph.addNode({
          x: 200,
          y: 200,
          width: 80,
          height: 40,
          label: 'Hello'
        });
      }
    });

    return {
      workspace
    };
  },

  render() {

    return (<div ref="workspace"></div>);
  }

});