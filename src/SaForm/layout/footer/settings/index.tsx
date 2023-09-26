import { defineComponent } from 'vue'
import {
  NDivider,
  NIcon,
  NInputNumber,
  NModal,
  NRadio,
  NRadioGroup,
  NSelect,
  NSwitch,
} from 'naive-ui'
import { Settings } from '@vicons/ionicons5'
import { useToggle } from '@vueuse/core'
import { isNumber } from 'lodash-es'
import type { PropType } from 'vue'
import { type BasicGraph, ModifierKey } from '@/SaForm/graph'

import './index.scss'

export default defineComponent({
  name: 'SaPcFormSettings',
  props: {
    graph: {
      required: true,
      type: Object as PropType<BasicGraph>,
    },
  },

  setup(props, ctx) {
    const [visible, toggleVisible] = useToggle(false)

    return () => (
      <>
        <div
          {...ctx.attrs}
          title="Settings"
          onClick={() => toggleVisible(true)}
        >
          <div class="setting-button">
            <NIcon size={18} class="setting-button-icon">
              <Settings />
            </NIcon>
          </div>
        </div>
        <NModal
          title="Settings"
          show={visible.value}
          preset="card"
          class="!w-fit"
          close-on-esc
          onUpdate:show={toggleVisible}
        >
          <div class="form-settings">
            <h3>Grid</h3>

            <div class="form-settings-row">
              <div>Visible</div>
              <div>
                <NSwitch
                  value={props.graph.grid.visible}
                  onUpdate:value={(visible) => props.graph.setGrid({ visible })}
                />
              </div>
            </div>

            <div class="form-settings-row">
              <div>Enabled</div>
              <div>
                <NSwitch
                  value={props.graph.grid.enabled}
                  onUpdate:value={(enabled) => props.graph.setGrid({ enabled })}
                />
              </div>
            </div>

            <div class="form-settings-row">
              <div>Type</div>
              <NSelect
                value={props.graph.grid.type}
                options={[
                  {
                    label: 'Dot',
                    value: 'dot',
                  },
                  {
                    label: 'Mesh',
                    value: 'mesh',
                  },
                  {
                    label: 'Double Mesh',
                    value: 'double-mesh',
                  },
                ]}
                onUpdate:value={(type) => props.graph.setGrid({ type })}
              />
            </div>

            <div class="form-settings-row">
              <div>Size</div>
              <NInputNumber
                class="ml-0"
                min={1}
                max={100}
                value={props.graph.grid.size}
                onUpdate:value={(size) =>
                  isNumber(size) && props.graph.setGrid({ size })
                }
              />
            </div>

            <NDivider />

            <h3>Snap</h3>

            <div class="form-settings-row">
              <div>Enabled</div>
              <div>
                <NSwitch
                  value={props.graph.snapline.enabled}
                  onUpdate:value={(enabled) => props.graph.setSnap({ enabled })}
                />
              </div>
            </div>

            <div class="form-settings-row">
              <div>Radius</div>
              <NInputNumber
                class="ml-0"
                min={0}
                max={100}
                value={props.graph.snapline.radius}
                onUpdate:value={(radius) =>
                  isNumber(radius) && props.graph.setSnap({ radius })
                }
              />
            </div>

            <NDivider />

            <h3>Multiple Selection</h3>

            <div class="form-settings-row">
              <div>Enabled</div>
              <div>
                <NSwitch
                  value={props.graph.selection.enabled}
                  onUpdate:value={(enabled) =>
                    props.graph.setSelection({ enabled })
                  }
                />
              </div>
            </div>

            <div class="form-settings-row">
              <div>ShowSelectionBox</div>
              <div>
                <NSwitch
                  value={props.graph.selection.showSelectionBox}
                  onUpdate:value={(showSelectionBox) =>
                    props.graph.setSelection({ showSelectionBox })
                  }
                />
              </div>
            </div>

            <div class="form-settings-row">
              <div>Modifier</div>
              <div>
                <NRadioGroup
                  value={props.graph.selection.modifier}
                  onUpdate:value={(modifier) =>
                    props.graph.setSelection({ modifier })
                  }
                >
                  <NRadio key="Ctrl" value={ModifierKey.Ctrl}>
                    Ctrl
                  </NRadio>
                  <NRadio key="Alt" value={ModifierKey.Alt}>
                    Alt
                  </NRadio>
                  <NRadio key="Shift" value={ModifierKey.Shift}>
                    Shift
                  </NRadio>
                </NRadioGroup>
              </div>
            </div>
          </div>
        </NModal>
      </>
    )
  },
})
