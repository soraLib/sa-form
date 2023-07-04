import { alignElements } from '../../acitons/align'
import { equalElementsSize } from '../../acitons/size'
import type { HeaderTool } from '../../../layout/header'
import type { PcGraph } from '../../graph'

export const PcHeaderOptions: HeaderTool[] = [
  // history
  {
    title: 'Undo',
    icon: <i class="iconfont iconchexiao1" />,
    click: (graph: PcGraph) => graph.undo(),
  },
  {
    title: 'Redo',
    icon: <i class="iconfont iconhuifu1" />,
    click: (graph: PcGraph) => graph.redo(),
    divider: true,
  },
  // align
  {
    title: 'Align Left',
    icon: <i class="iconfont iconzuoduiqi" />,
    click: (graph: PcGraph) => alignElements('left', graph),
  },
  {
    title: 'Align Right',
    icon: <i class="iconfont iconyouduiqi" />,
    click: (graph: PcGraph) => alignElements('right', graph),
  },
  {
    title: 'Align Top',
    icon: <i class="iconfont iconshangduiqi" />,
    click: (graph: PcGraph) => alignElements('top', graph),
  },
  {
    title: 'Align Bottom',
    icon: <i class="iconfont iconxiaduiqi" />,
    click: (graph: PcGraph) => alignElements('bottom', graph),
  },
  {
    title: 'Center Vertically',
    icon: <i class="iconfont iconhengxiangjuzhong" />,
    click: (graph: PcGraph) => alignElements('vertical-center', graph),
  },
  {
    title: 'Center Horizontally',
    icon: <i class="iconfont iconzongxiangjuzhong" />,
    click: (graph: PcGraph) => alignElements('horizontal-center', graph),
    divider: true,
  },
  // size
  {
    title: 'Equal Width',
    icon: <i class="iconfont icondenggao" />,
    click: (graph: PcGraph) => equalElementsSize('width', graph),
  },
  {
    title: 'Equal Height',
    icon: <i class="iconfont icondengkuan" />,
    click: (graph: PcGraph) => equalElementsSize('height', graph),
  },
  {
    title: 'Equal Size',
    icon: <i class="iconfont icondengdaxiao" />,
    click: (graph: PcGraph) => equalElementsSize('size', graph),
  },
]
