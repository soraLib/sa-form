import { SaFormDisplay } from '../../..';
import { NativePcSideStencil, X6PcSideStencil } from './stencil';

export const getPcSideStencil = (type: SaFormDisplay) => type === 'x6' ? X6PcSideStencil : NativePcSideStencil;