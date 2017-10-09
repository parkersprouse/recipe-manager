<template>
  <textarea v-model="localValue"
            :class="inputClass"
            :style="inputStyle"
            :id="id"
            :name="name"
            :disabled="disabled"
            :placeholder="placeholder"
            :required="required"
            :autocomplete="autocomplete || null"
            :readonly="readonly"
            :rows="rowCount"
            :wrap="wrap">
  </textarea>
</template>

<script>
  export default {
    name: 'dynamic-textarea',
    props: {
      autocomplete: {
        type: String,
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      },
      id: {
        type: String,
        default: null
      },
      inputClass: {
        type: String,
        default: null
      },
      inputStyle: {
        type: String,
        default: null
      },
      maxRows: {
        type: [Number, String],
        default: null
      },
      name: {
        type: String,
        default: null
      },
      noResize: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: null
      },
      readonly: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      rows: {
        type: [Number, String],
        default: null
      },
      value: {
        type: String,
        default: ''
      },
      wrap: {
        // 'soft', 'hard' or 'off'. Browser default is 'soft'
        type: String,
        default: 'hard'
      }
    },
    mounted: function() {
      this.updateRowCount();
    },
    data: function() {
      return {
        localValue: this.value,
        rowCount: 1
      };
    },
    watch: {
      value(newVal, oldVal) {
        // Update our localValue
        if (newVal !== oldVal) {
          this.localValue = newVal;
        }
      },
      localValue(newVal, oldVal) {
        // update Parent value
        if (newVal !== oldVal) {
          this.$emit('input', newVal);
          this.updateRowCount();
        }
      }
    },
    methods: {
      focus() {
        // For external handler that may want a focus method
        if (!this.disabled) {
          this.$el.focus();
        }
      },
      updateRowCount() {
        const rows = parseInt(this.rows, 10) || 1;
        const maxRows = parseInt(this.maxRows, 10) || 0;
        const lines = (this.localValue || '').toString().split('\n').length;
        this.rowCount = maxRows ? Math.min(maxRows, Math.max(rows, lines)) : Math.max(rows, lines);
      }
    }
  };
</script>
