import { computed, defineComponent } from 'vue'

import { useMagicKeys } from '@vueuse/core'
import ShortCutKey from './key'
import type { BasicGraph } from '../../../graph'
import type { PropType } from 'vue'

import './shotcuts.scss'

export default defineComponent({
  name: 'SaFormShortcuts',
  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  setup(props) {
    const { current } = useMagicKeys()
    const keys = computed(() => Array.from(current))

    return () => (
      <span class="shortcuts">
        {keys.value.map((key, index) => (
          <>
            <ShortCutKey>{key}</ShortCutKey>
            {index < keys.value.length - 1 && <span class="join">+</span>}
          </>
        ))}
      </span>
    )
  },
})
