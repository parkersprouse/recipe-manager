<template>
  <div>
    <div class="field has-addons">
      <div class="control is-expanded has-icons-left">
        <input type="text" v-model="valueToConvert" placeholder="Value" class="input" />
        <span class="icon is-small is-left">
          <i class="fa fa-calculator"></i>
        </span>
      </div>
      <div class="control">
        <div class="select">
          <select v-model="measurement">
            <option>Ounces</option>
            <option>Tablespoons</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'measurement-calculator',
    data: function() {
      return {
        valueToConvert: null,
        measurement: 'Tablespoons'
      }
    },
    watch: {
      valueToConvert: function(newValue) {
        console.log(newValue);
      },
      measurement: function(newMeasurement) {
        console.log(newMeasurement);
      }
    }
  }
</script>
