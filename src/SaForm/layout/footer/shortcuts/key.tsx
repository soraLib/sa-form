import { defineComponent } from 'vue'

import './key.scss'

export default defineComponent({
  name: 'ShortcutKey',
  props: {
    value: Boolean,
  },
  setup(props, ctx) {
    return () => (
      <div class="font-mono text-xs px-2 py-0.5 my-1 rounded pressed-key">
        {() => ctx.slots.default?.()}
      </div>
    )
  },
})
