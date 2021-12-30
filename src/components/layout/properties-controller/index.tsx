import { defineComponent, PropType } from 'vue';
import { BasicDrawer } from '../../drawer';
import { SaPluginLayout } from '../../Plugin';

import PluginItem from './item';

import './index.scss';

export default defineComponent({
  name: 'SaFormLayoutController',
  props: {
    drawer: {
      required: true,
      type: Object as PropType<BasicDrawer>
    },
    controller: {
      required: true,
      type: Object as PropType<SaPluginLayout>
    }
  },

  setup(props) {
    return () => (
      <div class="controller-container">
        {
          props.controller.basic?.map((item =>
            <div class="controller-item">
              <div class="controller-item-label">{item.label}</div>
              <div class="controller-item-plugin">
                <PluginItem plugin={item} drawer={props.drawer} />
              </div>
            </div>
          ))
        }</div>
    );
  }
});