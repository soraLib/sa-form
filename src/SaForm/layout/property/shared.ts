import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { BasicElement } from '../../element'
import type { SaController } from '../../config'

export const usePlugin = (
  element: ComputedRef<BasicElement | undefined>,
  controller: SaController
) => {
  const plugin = computed(() => {
    const type = element.value?.attrs.type

    if (type !== undefined) {
      if (controller.plugins[type]) {
        return controller.plugins[type]
      }

      console.warn(`[Sa warn]: Plugins not found in type ${type}.`)
    }

    return undefined
  })

  return {
    plugin,
  }
}

export type PropertyExposes<A = any> = {
  update?: () => Promise<A>
  internalUpdate?: () => Promise<A>
}
