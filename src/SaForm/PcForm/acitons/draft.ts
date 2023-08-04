import type { PcGraph } from '../graph'

export const toggleDraft = (graph: PcGraph) => {
  graph.setIsDraft(!graph.isDraft)
  graph.setSelected()
}
