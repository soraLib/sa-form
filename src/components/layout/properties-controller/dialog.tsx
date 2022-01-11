import { ElButton, ElDialog } from 'element-plus';
import { DefineComponent, defineComponent, h, PropType, Ref, ref, shallowRef } from 'vue';
import { SaController } from '../../config';
import { BasicDrawer } from '../../drawer';
import { SaPlugin } from '../../plugin';

export default defineComponent({
  name: 'SaFormControllerDialogLayout',
  props: {
    plugin: {
      required: true,
      type: Object as PropType<SaPlugin>
    },
    drawer: {
      required: true,
      type: Object as PropType<BasicDrawer>
    },
    controller: {
      required: true,
      type: Object as PropType<SaController>
    }
  },
  setup(props) {
    const dialogVisible = ref(false);
    let asyncCompoGetter: undefined | (() => Promise<any>);

    if (props.plugin.dialog) {
      const rName = /\.\/.+\/(.+)\/index.tsx/i;

      for (const path of Object.keys(props.controller.components)) {
        const name = path.match(rName)?.[1];

        if (name && name === props.plugin.dialog.component) {
          // eslint-disable-next-line vue/no-setup-props-destructure
          asyncCompoGetter = props.controller.components[path];
        }
      }
    }

    const asyncCompo: Ref<undefined | DefineComponent> = shallowRef();

    init();

    async function init() {
      if (asyncCompoGetter) {
        const res = await asyncCompoGetter();
        asyncCompo.value = res.default;
      }
    }

    return () => (
      <div class="dialog-container">
        <ElButton onClick={() => dialogVisible.value = true}>set</ElButton>

        {
          asyncCompo.value ?
            <ElDialog
              title={props.plugin.dialog?.title ?? props.plugin.label}
              modelValue={dialogVisible.value}
              closeOnClickModal={false}
              onClose={() => dialogVisible.value = false}
            >
              {h(asyncCompo.value, { drawer: props.drawer, plugin: props.plugin })}
            </ElDialog>
            : ''
        }
      </div>
    );
  }
});