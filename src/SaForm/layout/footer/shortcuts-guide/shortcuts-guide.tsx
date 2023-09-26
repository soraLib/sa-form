import { defineComponent } from 'vue'
import { NButton, NCard, NModal, NTable } from 'naive-ui'
import { useToggle } from '@vueuse/core'

import './shortcuts-guide.scss'
import { HelpCircleOutline } from '@vicons/ionicons5'

export default defineComponent({
  name: 'SaFormShortcutsGuide',

  setup() {
    const [visible, toggleVisible] = useToggle(false)

    const shortcuts: [string, string[]][] = [
      ['Move', ['ctrl', 'arrow']],
      ['Delete ', ['del']],
      ['Copy', ['ctrl', 'c']],
      ['Cut', ['ctrl', 'x']],
      ['Paste', ['ctrl', 'v']],
      ['Undo', ['ctrl', 'z']],
      ['Redo', ['ctrl', 'y']],
      ['Unselect All', ['esc']],
      ['Toggle Terminal', ['ctrl', '`']],
      ['Toggle Primary Sidebar', ['ctrl', 'p']],
      ['Toggle Layer', ['ctrl', 'l']],
      ['Toggle Element Properties', ['ctrl', 'e']],
    ]

    return () => (
      <div class="flex align-center">
        <NButton
          onClick={() => toggleVisible(true)}
          size="small"
          type="warning"
          class="!rounded-none"
          v-slots={{ icon: () => <HelpCircleOutline /> }}
        >
          Shortcuts Guide
        </NButton>

        <NModal show={visible.value} onUpdate:show={toggleVisible}>
          <NCard
            title="Shortcuts Guide"
            role="dialog"
            aria-modal="true"
            class="shortcuts-guide-card"
          >
            <NTable bordered single-line striped>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Shortcut</th>
                </tr>
              </thead>
              <tbody>
                {shortcuts.map(([name, keys]) => (
                  <tr>
                    <td>{name}</td>
                    <td>
                      {keys.map((key) => (
                        <span class="key">{key}</span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </NTable>
          </NCard>
        </NModal>
      </div>
    )
  },
})
