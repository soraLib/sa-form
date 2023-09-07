import { findNode } from '../../PcForm/utils/node'
import type { PcGraph } from '../../PcForm/graph'
import type { ElementEvent, EventAttributes } from '../../PcForm/element'
import type { BasicGraph } from '../../graph'

export const onEvnetMap: Record<string, keyof EventAttributes> = {
  // form
  evt_onformopen: 'on-form-open',
  evt_onformsave: 'on-form-beforesave',
  evt_onafterformsave: 'on-form-aftersave',
  evt_onformrightck: 'on-form-contextmenu',
  // common
  evt_setfocus: 'on-focus',
  evt_killfocus: 'on-blur',
  evt_alterdata: 'on-change',
  evt_click: 'on-click',
  evt_lclick: 'on-click',
  evt_rclick: 'on-contextmenu',
  evt_doubleclick: 'on-doubleclick',
  evt_enterdown: 'on-enter-key',
  // tab
  evt_selchange: 'on-tab-change',
  evt_drag: 'on-tree-node-drag',
  // table
  evt_dclick: 'on-table-row-doubleclick',
  evt_addrow: 'on-table-row-added',
  evt_delrow: 'on-table-row-removed',
  evt_start: 'on-table-row-edit-started',
  evt_close: 'on-table-row-edit-ended',
}
export const onEventReverseEntreis: [keyof EventAttributes, string][] =
  Object.entries(onEvnetMap).map(([a, b]) => [b, a])

type ServerEvent = any

export type ServerElementEvent = {
  con: string
  evt: string
}
export const eventsTransformer = (
  events: ServerElementEvent[]
): ElementEvent[] =>
  events?.map((event) => ({
    script: event.evt,
    condition: event.con,
  }))

export const setElementEvent = (
  events: ServerEvent | undefined,
  id: string,
  graph: BasicGraph | PcGraph
) => {
  if (!events) return

  // TODO: diff find node impls
  const element = findNode(graph.canvas, (a) => a.attrs.id === id)
  if (!element) return

  // canvas
  if (!element.parent) {
    events.forEach((event: Record<string, ServerElementEvent[]>) => {
      if (event.evt_onformopen)
        graph.updateElemData(
          element,
          {
            'on-form-open': eventsTransformer(event.evt_onformopen),
          },
          false
        )
      if (event.evt_onformsave)
        graph.updateElemData(
          element,
          {
            'on-form-beforesave': eventsTransformer(event.evt_onformsave),
          },
          false
        )
      if (event.evt_onafterformsave)
        graph.updateElemData(
          element,
          {
            'on-form-aftersave': eventsTransformer(event.evt_onafterformsave),
          },
          false
        )
      if (event.evt_onformrightck)
        graph.updateElemData(
          element,
          {
            'on-form-contextmenu': eventsTransformer(event.evt_onformrightck),
          },
          false
        )
    })
  }

  if (events.evt_setfocus)
    graph.updateElemData(
      element,
      {
        'on-focus': eventsTransformer(events.evt_setfocus),
      },
      false
    )
  if (events.evt_killfocus)
    graph.updateElemData(
      element,
      {
        'on-blur': eventsTransformer(events.evt_killfocus),
      },
      false
    )
  if (events.evt_alterdata)
    graph.updateElemData(
      element,
      {
        'on-change': eventsTransformer(events.evt_alterdata),
      },
      false
    )
  if (events.evt_click)
    graph.updateElemData(
      element,
      {
        'on-click': eventsTransformer(events.evt_click),
      },
      false
    )
  if (events.evt_doubleclick)
    graph.updateElemData(
      element,
      {
        'on-doubleclick': eventsTransformer(events.evt_doubleclick),
      },
      false
    )
  if (events.evt_enterdown)
    graph.updateElemData(
      element,
      {
        'on-enter-key': eventsTransformer(events.evt_enterdown),
      },
      false
    )
  if (events.evt_selchange)
    graph.updateElemData(
      element,
      {
        'on-tab-change': eventsTransformer(events.evt_selchange),
      },
      false
    )
  if (events.evt_lclick)
    graph.updateElemData(
      element,
      {
        'on-click': eventsTransformer(events.evt_lclick),
      },
      false
    )
  if (events.evt_rclick)
    graph.updateElemData(
      element,
      {
        'on-contextmenu': eventsTransformer(events.evt_rclick),
      },
      false
    )
  if (events.evt_drag)
    graph.updateElemData(
      element,
      {
        'on-tree-node-drag': eventsTransformer(events.evt_drag),
      },
      false
    )
  if (events.evt_dclick)
    graph.updateElemData(
      element,
      {
        'on-table-row-doubleclick': eventsTransformer(events.evt_dclick),
      },
      false
    )
  if (events.evt_addrow)
    graph.updateElemData(
      element,
      {
        'on-table-row-added': eventsTransformer(events.evt_addrow),
      },
      false
    )
  if (events.evt_delrow)
    graph.updateElemData(
      element,
      {
        'on-table-row-removed': eventsTransformer(events.evt_delrow),
      },
      false
    )
  if (events.evt_start)
    graph.updateElemData(
      element,
      {
        'on-table-row-edit-started': eventsTransformer(events.evt_start),
      },
      false
    )
  if (events.evt_close)
    graph.updateElemData(
      element,
      {
        'on-table-row-edit-ended': eventsTransformer(events.evt_close),
      },
      false
    )
}
