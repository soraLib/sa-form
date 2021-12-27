import { App } from 'vue';

import directive from './directive';

import Contextmenu from './components/Contextmenu';
import ContextmenuItem from './components/ContextmenuItem';
import ContextmenuDivider from './components/ContextmenuDivider';
import ContextmenuSubmenu from './components/ContextmenuSubmenu';
import ContextmenuGroup from './components/ContextmenuGroup';

const install = (app: App): void => {
  app.directive('contextmenu', directive);

  app.component(Contextmenu.name, Contextmenu);
  app.component(ContextmenuItem.name, ContextmenuItem);
  app.component(ContextmenuDivider.name, ContextmenuDivider);
  app.component(ContextmenuSubmenu.name, ContextmenuSubmenu);
  app.component(ContextmenuGroup.name, ContextmenuGroup);
};

export {
  directive,
  install,
  Contextmenu,
  ContextmenuItem,
  ContextmenuDivider,
  ContextmenuSubmenu,
  ContextmenuGroup
};

const VContextmenu = {
  install
};

export default VContextmenu;
