import { computed, defineComponent, onMounted, PropType, Ref, ref, ShallowRef, shallowRef } from 'vue';
import { PcDrawer } from '../../drawer';
import { createMockPcCanvas } from './mock';

import { DeleteFilled } from '@element-plus/icons-vue';

import NativeWorkspace from './graph/native';
import { ElementType } from '../../../element';

export default defineComponent({
  name: 'SaPcFormRender',
  props: {
    drawer: {
      required: true,
      type: Object as PropType<PcDrawer>
    }
  },

  setup(props) {
    const workspace: Ref<HTMLDivElement | null> = ref(null);
    // TODO: contentmenu type
    const contextmenu: Ref<any | null> = ref(null);
    // const contextmenuEvent: ShallowRef<JQuery.ContextMenuEvent | undefined> = shallowRef();

    onMounted(() => {
      if (workspace.value) {
        const canvas = createMockPcCanvas();

        console.log('create canvas', canvas);
        props.drawer.setCanvas(canvas);
      }
    });

    const graphContextmenu = computed(() => {
      if (props.drawer.selected[0]?.attrs.type !== ElementType.Canvas) {
        return (
          <>
            <v-contextmenu-item onClick={() => props.drawer.clipboard.copy(props.drawer)}>
              copy
            </v-contextmenu-item>
            <v-contextmenu-item onClick={() => props.drawer.clipboard.cut(props.drawer)}>
              cut
            </v-contextmenu-item>
            <v-contextmenu-item disabled={props.drawer.clipboard.isEmpty()} onClick={() => props.drawer.clipboard.paste(props.drawer)}>
              paste
            </v-contextmenu-item>
            {/* <v-contextmenu-item type="danger" icon={<DeleteFilled />} onClick={props.drawer}>
              delete
            </v-contextmenu-item> */}
          </>
        );
      }

      return (
        <v-contextmenu-item disabled={props.drawer.clipboard.isEmpty()} onClick={() => props.drawer.clipboard.paste(props.drawer)}>
          paste
        </v-contextmenu-item>
      );
    });

    return {
      workspace,
      contextmenu,
      graphContextmenu
    };
  },

  render() {
    return (
      <div>
        <NativeWorkspace ref="workspace" drawer={this.drawer} v-contextmenu:contextmenu />

        <v-contextmenu ref="contextmenu">
          {this.graphContextmenu}
        </v-contextmenu>
      </div>
    );
  }
});