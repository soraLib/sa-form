import { HeaderTool } from '../../../layout/header'
import { PcGraph } from '../../graph'

export const PcHeaderOptions: HeaderTool[] = [{
  title: 'undo',
  icon: <i class="iconfont iconchexiao1"></i>,
  click: (graph: PcGraph) => graph.undo()
}, {
  title: 'redo',
  icon: <i class="iconfont iconhuifu1"></i>,
  click: (graph: PcGraph) => graph.redo()
}]