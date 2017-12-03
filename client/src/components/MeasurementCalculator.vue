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
            <option v-for="measurement in measurements">{{ measurement }}</option>
          </select>
        </div>
      </div>
    </div>
    <table class="table is-bordered is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Conversion Results</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>{{ result.cup }} Cup(s)</td></tr>
        <tr><td>{{ result.gallon }} Gallon(s)</td></tr>
        <tr><td>{{ result.liter }} Liter(s)</td></tr>
        <tr><td>{{ result.milliliter }} Milliliter(s)</td></tr>
        <tr><td>{{ result.ounce }} Ounce(s)</td></tr>
        <tr><td>{{ result.pint }} Pint(s)</td></tr>
        <tr><td>{{ result.tablespoon }} Tablespoon(s)</td></tr>
        <tr><td>{{ result.teaspoon }} Teaspoon(s)</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import validator from 'validator';

  export default {
    name: 'measurement-calculator',
    data: function() {
      return {
        valueToConvert: '',
        measurement: '',
        measurements: [
          'Cup',
          'Gallon',
          'Liter',
          'Milliliter',
          'Ounce',
          'Pint',
          'Tablespoon',
          'Teaspoon'
        ],
        result: {
          cup: 0,
          gallon: 0,
          liter: 0,
          milliliter: 0,
          ounce: 0,
          pint: 0,
          tablespoon: 0,
          teaspoon: 0
        }
      }
    },
    mounted: function() {
      this.measurement = this.measurements[0];
    },
    watch: {
      valueToConvert: function() {
        this.recalculate();
      },
      measurement: function() {
        this.recalculate();
      }
    },
    methods: {
      resetValues() {
        this.result.cup = 0;
        this.result.gallon = 0;
        this.result.liter = 0;
        this.result.milliliter = 0;
        this.result.ounce = 0;
        this.result.pint = 0;
        this.result.tablespoon = 0;
        this.result.teaspoon = 0;
      },
      recalculate() {
        this.resetValues();

        const trimmedValue = validator.blacklist(this.valueToConvert.trim(), ' ');
        let numericValue = 0;

        if (trimmedValue.indexOf('/') > -1) {
          const halves = trimmedValue.split('/');
          if (halves.length > 2)
            return;
          else {
            if (!validator.isFloat(halves[0]) || !validator.isFloat(halves[1]))
              return;
            numericValue = parseFloat(halves[0]) / parseFloat(halves[1]);
          }
        }
        else {
          if (!validator.isFloat(trimmedValue))
            return;
          numericValue = parseFloat(trimmedValue);
        }

        if (Number.isNaN(numericValue) || numericValue < 0)
          return;

        switch(this.measurement) {
          case this.measurements[0]: // Cup
            this.result.cup = numericValue;
            this.result.gallon = numericValue / 16;
            this.result.liter = numericValue / 0.24;
            this.result.milliliter = numericValue * 240;
            this.result.ounce = numericValue * 8;
            this.result.pint = numericValue / 2;
            this.result.tablespoon = numericValue * 16;
            this.result.teaspoon = numericValue * 48;
            break;
          case this.measurements[1]: // Gallon
            this.result.cup = numericValue * 16;
            this.result.gallon = numericValue;
            break;
          case this.measurements[2]: // Liter
            this.result.liter = numericValue;
            break;
          case this.measurements[3]: // Milliliter
            this.result.milliliter = numericValue;
            break;
          case this.measurements[4]: // Ounce
            this.result.ounce = numericValue;
            break;
          case this.measurements[5]: // Pint
            this.result.pint = numericValue;
            break;
          case this.measurements[6]: // Tablespoon
            this.result.tablespoon = numericValue;
            break;
          case this.measurements[7]: // Teaspoon
            this.result.teaspoon = numericValue;
            break;
        }
      }
    }
  }
</script>

<style scoped>
  th {
    background-color: #fafafa !important;
  }
  th, td {
    text-align: center !important;
  }
</style>
