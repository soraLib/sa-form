/** sa-form entry */

import { defineComponent, PropType, reactive } from 'vue';
import { DrawerType } from './drawer';

import { ILayout, LAYOUTS } from './config';

import SaFormHeader from './layout/header';
import SaFormSidebar from './layout/sidebar';
import SaFormController from './layout/properties-controller';

import { ElScrollbar } from 'element-plus';

export default defineComponent({
  props: {
    type: {
      required: true,
      type: String as PropType<DrawerType>
    },
    id: {
      required: true,
      type: String
    }
  },
  setup(props) {
    const layout = reactive(LAYOUTS[props.type]()) as unknown as ReturnType<ILayout[keyof ILayout]>;

    const SaFormWorkspace = layout.workspace;

    return () => (
      <section class="flex flex-col">
        <header>
          <ElScrollbar>
            <SaFormHeader options={layout.header} drawer={layout.drawer} class="bg-slate-500" />
          </ElScrollbar>
        </header>

        <main class="mt-1 flex flex-grow">
          <aside>
            <SaFormSidebar stencil={layout.side} drawer={layout.drawer} class="bg-slate-500 h-full" />
          </aside>

          <main class="flex-grow justify-center bg-slate-500 mx-1 overflow-auto">
            <SaFormWorkspace drawer={layout.drawer} />
          </main>

          <aside class="w-64 bg-slate-500 shrink-0">
            <SaFormController drawer={layout.drawer} controller={layout.controller} />
          </aside>
        </main>
      </section>
    );
  }
});