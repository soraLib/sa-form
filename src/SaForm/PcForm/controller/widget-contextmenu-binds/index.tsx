import { computed, defineComponent, ref } from 'vue'
import { NTransfer, NTree } from 'naive-ui'
import { pcStencilIcons } from '../../layout/stencil/stencil'
import { createElementTreeData } from '../../utils/tree'
import type { ElementTreeDataOption } from '../../utils/tree'
import type {
  TransferRenderSourceList,
  TransferRenderTargetLabel,
} from 'naive-ui'
import type { PropType } from 'vue'
import type { SaPlugin } from '../../../plugin'
import type { PcGraph } from '../../graph'

import './index.scss'
import { ElementType } from '@/SaForm/element'

export default defineComponent({
  name: 'WidgetContextmenuBinds',
  props: {
    graph: {
      required: true,
      type: Object as PropType<PcGraph>,
    },
    plugin: {
      required: true,
      type: Object as PropType<SaPlugin>,
    },
  },
  setup(props, ctx) {
    const treeData = computed(() =>
      createElementTreeData(props.graph.canvas.children)
    )
    const checkedKeys = ref<string[]>([
      ...(props.graph.selected[0].attrs['contextmenu-binds'] ?? []),
    ])
    const renderSourceList: TransferRenderSourceList = ({
      onCheck,
      pattern,
    }) => (
      <NTree
        checkable
        blockLine
        checkOnClick
        keyField="value"
        data={treeData.value}
        pattern={pattern}
        filter={(pattern, node: any) =>
          node.value == pattern || node.label.includes(pattern)
        }
        showIrrelevantNodes={false}
        render-label={({ option }: { option: ElementTreeDataOption }) => (
          <div
            title={`${ElementType[option.type]}: ${option.label}`}
            class="text-left w-full overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {option.label}
          </div>
        )}
        render-prefix={({ option }: { option: ElementTreeDataOption }) => (
          <i class={`iconfont ${pcStencilIcons[option.type]}`} />
        )}
        checkedKeys={checkedKeys.value}
        onUpdateCheckedKeys={onCheck}
      />
    )
    const renderTargetLabel: TransferRenderTargetLabel = ({ option }: any) => {
      return (
        <div class="flex items-center gap-2">
          <i class={`iconfont ${pcStencilIcons[option.type as ElementType]}`} />
          {option.label}
        </div>
      )
    }

    ctx.expose({
      update: () => {
        return checkedKeys.value
      },
    })

    return () => (
      <section class="widget-contextmenu-binds">
        <NTransfer
          value={checkedKeys.value}
          onUpdate:value={(v) => (checkedKeys.value = v as string[])}
          options={treeData.value}
          render-source-list={renderSourceList}
          render-target-label={renderTargetLabel}
          source-filterable
        />
      </section>
    )
  },
})
