import { HeaderTool } from '../../../layout/header';

export const PcHeaderOptions: HeaderTool[] = [{
  title: 'undo',
  icon: <span>undo</span>,
  click: (e) => console.log('undo', e)
}, {
  title: 'resume',
  icon: <span>resume</span>,
  click: (e) => console.log('resume', e)
}];