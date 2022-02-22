import { Addon, Node } from '@antv/x6';
import { PartialOptional } from 'sugar-sajs';
import { computed, defineComponent, PropType, Ref, ref, watch } from 'vue';
import { SaFormDisplay } from '../..';
import { BasicDrawer } from '../../drawer';
import { BasicElement, ElementType } from '../../element';

import NativeItem from './native';

import './index.scss';

// x6 stencil config
export type SideStencil = (drawer: any /** TODO: */) => {
  groups: Addon.Stencil.Group[];
  getDragNode: (node: Node, drawer: BasicDrawer) => Node;
  getDropNode: (node: Node, drawer: BasicDrawer) => Node;
  validateNode: (node: Node, drawer: BasicDrawer) => boolean;
  nodes: {
    /** TODO: node keys */
    [key in ReturnType<SideStencil>['groups'][number]['name']]: Node[];
  };
};

type NeededKeys = 'type' | 'name' | 'width' | 'height';
// native stencil config
export type NativeStencil = (drawer: any /** TODO: */) => {
  groups: { name: string; }[];
  nodes: {
    [key in ReturnType<NativeStencil>['groups'][number]['name']]: ({
      icon: string;
      title?: string;
      attrs: PartialOptional<BasicElement['attrs'], Exclude<keyof BasicElement['attrs'], NeededKeys>>;
    })[];
  }
}
type Nodes = ReturnType<NativeStencil>['nodes'];
export type NativeItem = Nodes[keyof Nodes][number];
type ComposedNativeStencil = ReturnType<NativeStencil>['groups'][number] & NativeItem;

function isNativeStencil(stencil: SideStencil | NativeStencil, display: SaFormDisplay): stencil is NativeStencil {
  return display === 'native';
}

export default defineComponent({
  name: 'CoFormLayoutSidebar',

  props: {
    stencil: {
      required: true,
      type: Function as PropType<SideStencil | NativeStencil>
    },
    drawer: {
      required: true,
      type: Object as PropType<BasicDrawer>
    },
    display: {
      required: true,
      type: String as PropType<SaFormDisplay>
    }
  },

  setup(props) {
    const refStencil: Ref<HTMLDivElement | null> = ref(null);

    if (props.display === 'x6') {
      let stencil: Addon.Stencil | undefined = undefined;
      const graph = computed(() => props.drawer.graph);

      watch(
        () => graph.value,
        () => {
          if (graph.value && !stencil && props.stencil && !isNativeStencil(props.stencil, props.display)) {
            const stencilProp = props.stencil(props.drawer);

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
              groups: stencilProp.groups,
              getDragNode: (node) => stencilProp.getDragNode(node, props.drawer),
              getDropNode: (node) => stencilProp.getDropNode(node, props.drawer),
              validateNode: (node) => stencilProp.validateNode(node, props.drawer)
            });

            refStencil.value?.appendChild(stencil.container);

            for (const group of stencilProp.groups) {
              stencil.load(stencilProp.nodes[group.name], group.name);
            }
          }
        });
    }

    const nativeStencil: Ref<ReturnType<NativeStencil> | null> = ref(null);
    const nativeStencilGroups = computed(() => {
      if (!nativeStencil.value) return null;

      const gMap: Map<ComposedNativeStencil['name'], ComposedNativeStencil[]> = new Map(nativeStencil.value.groups.map(g => [g.name, []]));
      for (const [key, value] of Object.entries(nativeStencil.value.nodes)) {
        const list = gMap.get(key);
        if (list) {
          gMap.set(key, value.map(v => ({ ...v, name: key })));
        }
      }

      return [...gMap];
    });

    if (isNativeStencil(props.stencil, props.display)) {
      nativeStencil.value = (props.stencil as NativeStencil)(props.drawer);
    }

    return {
      refStencil,
      nativeStencil,
      nativeStencilGroups
    };
  },

  render() {
    return (
      <div class={`sa-form-side flex flex-col justify-start p-1 box-border relative ${this.display === 'x6' && 'w-52'}`}>
        {
          this.display === 'x6'
            ? <div ref="refStencil" />
            : this.nativeStencilGroups?.map(group =>
              group[1].map(item => <NativeItem item={item} />)
            )
        }
      </div>
    );
  }
});