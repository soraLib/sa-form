import { defineComponent } from 'vue'

import './key.scss'

export default defineComponent({
  name: 'ShortcutKey',
  props: {
    value: Boolean,
  },
  setup(props, ctx) {
    return () => (
      <div class="font-mono px-2 py-1 rounded pressed-key">
        {() => ctx.slots.default?.()}
      </div>
    )
  },
})
