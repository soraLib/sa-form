import type { InjectionKey } from 'vue'
import type { PcGraph } from './graph'

export const PcGraphInjectionKey: InjectionKey<PcGraph> = Symbol('pc-graph')
