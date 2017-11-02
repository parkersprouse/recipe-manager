<template>
  <span @click="toggle" style="cursor: pointer;" :style="isToggled ? 'text-decoration: line-through;' : ''">
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
