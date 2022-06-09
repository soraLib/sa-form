import { ElIcon } from 'element-plus'
import { computed, defineComponent, inject, PropType, ref, VNode } from 'vue'

import { CLASSES } from '../constants'

const ContextmenuItem = defineComponent({
  name: 'VContextmenuItem',

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    hideOnClick: {
      type: Boolean,
      default: true
    },
    icon: {
      required: false,
      type: Object as PropType<VNode>
    },
    type: {
      requred: false,
      type: String as PropType<'default' | 'primary' | 'danger'>
    }
  },

  emits: ['click', 'mouseenter', 'mouseleave'],

  setup(props, { emit }) {
    const rootHide = inject<() => void>('hide')

    const hover = ref(false)
    const classes = computed(() => ({
      [CLASSES.contextmenuItem]: true,
      [CLASSES.contextmenuItemDisabled]: props.disabled,
      [CLASSES.contextmenuItemHover]: hover.value,
      [CLASSES.contextmenuItemDanger]: props.type === 'danger'
    }))

    const handleClick = (evt: Event) => {
      if (props.disabled) return

      emit('click', evt)

      props.hideOnClick && rootHide?.()
    }

    const handleMouseenter = (evt: Event) => {
      if (props.disabled) return

      hover.value = true

      emit('mouseenter', evt)
    }

    const handleMouseleave = (evt: Event) => {
      if (props.disabled) return

      hover.value = false

      emit('mouseleave', evt)
    }

    return {
      classes,

      handleClick,
      handleMouseenter,
      handleMouseleave
    }
  },

  render() {
    const Icon = this.icon

    return (
      <li
        class={this.classes}
        onClick={this.handleClick}
        onMouseenter={this.handleMouseenter}
        onMouseleave={this.handleMouseleave}
      >
        {Icon ? <ElIcon class="mr-1 leading-0">{Icon}</ElIcon> : <span style={{ width: '18px'}}></span>}
        {this.$slots.default?.()}
      </li>
    )
  }
})

export default ContextmenuItem
