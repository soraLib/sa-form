import { ElButton, ElDialog } from 'element-plus';
import { computed, DefineComponent, defineComponent, h, PropType, Ref, ref, shallowRef } from 'vue';
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

    const child = computed(() => asyncCompo.value ?
      h(asyncCompo.value, { drawer: props.drawer, plugin: props.plugin })
      : '');

    function handleConfirm() {
      const childExpose = (child.value as any)?.component.exposed;

      if (!childExpose?.update) {
        console.error(`[Sa error]: Plugin ${props.plugin.dialog?.component} doesn't have expose update function.`);

        return;
      }

      const { update } = childExpose;
      try {
        const value = update();
        console.log('update value', value);
      } catch (err) {
        console.error(err);
      }
    }

    return () => (
      <div class="dialog-container">
        <ElButton onClick={() => dialogVisible.value = true}>set</ElButton>

        {
          <ElDialog
            title={props.plugin.dialog?.title ?? props.plugin.label}
            modelValue={dialogVisible.value}
            closeOnClickModal={false}
            onClose={() => dialogVisible.value = false}

            v-slots={{
              footer: () => (
                <div>
                  <ElButton type="default" onClick={() => dialogVisible.value = false}>cancel</ElButton>
                  <ElButton type="primary" onClick={handleConfirm}>submit</ElButton>
                </div>
              )
            }}
          >
            { child.value }
          </ElDialog>
        }
      </div>
    );
  }
});