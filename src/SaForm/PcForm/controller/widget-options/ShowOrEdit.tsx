import { defineComponent, nextTick, ref } from 'vue'
import { NInput } from 'naive-ui'

export const ShowOrEdit = defineComponent({
  props: {
    value: String,
  },
  emits: ['update:value'],
  setup(props, ctx) {
    const isEdit = ref(false)
    const inputRef = ref<InstanceType<typeof NInput> | null>(null)
    const inputValue = ref(props.value)
    function handleOnClick() {
      isEdit.value = true
      nextTick(() => {
        inputRef.value?.focus()
      })
    }
    function handleChange() {
      ctx.emit('update:value', inputValue.value)
      isEdit.value = false
    }
    return () => (
      <div style="min-height: 22px" onClick={handleOnClick}>
        {isEdit.value ? (
          <NInput
            ref={inputRef}
            value={inputValue.value}
            onUpdateValue={(v) => (inputValue.value = v)}
            onChange={handleChange}
            onBlur={handleChange}
          ></NInput>
        ) : (
          props.value
        )}
      </div>
    )
  },
})
