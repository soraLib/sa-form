import { defineComponent, PropType } from 'vue';
import { BasicDrawer } from '../../drawer';

import PluginItem from './item';

import './index.scss';
import { SaController } from '../../config';

export default defineComponent({
  name: 'SaFormLayoutController',
  props: {
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
    return () => (
      <div class="controller-container">
        {
          props.controller.plugins.basic?.map((item =>
            <div class="controller-item">
              <div class="controller-item-label">{item.label}</div>
              <div class="controller-item-plugin">
                <PluginItem plugin={item} drawer={props.drawer} controller={props.controller} />
              </div>
            </div>
          ))
        }</div>
    );
  }
});