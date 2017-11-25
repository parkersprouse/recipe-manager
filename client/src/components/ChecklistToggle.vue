<template>
  <span @click="toggle" style="cursor: pointer;" :style="isToggled ? 'text-decoration: line-through; color: rgba(74, 74, 74, 0.5);' : ''">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'checklist-toggle',
  data: function() {
    return {
      isToggled: false
    }
  },
  methods: {
    toggle() {
      this.isToggled = !this.isToggled;
    }
  }
}
</script>
