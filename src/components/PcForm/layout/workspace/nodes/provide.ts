import { InjectionKey } from 'vue';
import { PcNode } from '.';

export const PcNodeInjectionKey: InjectionKey<() => PcNode> = Symbol('pc-node');