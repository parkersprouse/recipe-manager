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
          <th colspan="2">Conversion Results</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Cup</td><td>{{ result.cup }}</td></tr>
        <tr><td>Gallon</td><td>{{ result.gallon }}</td></tr>
        <tr><td>Liter</td><td>{{ result.liter }}</td></tr>
        <tr><td>Milliliter</td><td>{{ result.milliliter }}</td></tr>
        <tr><td>Ounce</td><td>{{ result.ounce }}</td></tr>
        <tr><td>Pint</td><td>{{ result.pint }}</td></tr>
        <tr><td>Quart</td><td>{{ result.quart }}</td></tr>
        <tr><td>Tablespoon</td><td>{{ result.tablespoon }}</td></tr>
        <tr><td>Teaspoon</td><td>{{ result.teaspoon }}</td></tr>
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
          'Quart',
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
          quart: 0,
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
        this.result.quart = 0;
        this.result.tablespoon = 0;
        this.result.teaspoon = 0;
      },
      recalculate() {
        this.resetValues();
        
        const numericValue = this.convertToNumeric(this.valueToConvert);
        if (numericValue === null)
          return;

        switch(this.measurement) {
          case this.measurements[0]: // Cup
            this.calculateCup(numericValue);
            break;
          case this.measurements[1]: // Gallon
            this.calculateGallon(numericValue);
            break;
          case this.measurements[2]: // Liter
            this.calculateLiter(numericValue);
            break;
          case this.measurements[3]: // Milliliter
            this.calculateMilliliter(numericValue);
            break;
          case this.measurements[4]: // Ounce
            this.calculateOunce(numericValue);
            break;
          case this.measurements[5]: // Pint
            this.calculatePint(numericValue);
            break;
          case this.measurements[6]: // Quart
            this.calculateQuart(numericValue);
            break;
          case this.measurements[7]: // Tablespoon
            this.calculateTablespoon(numericValue);
            break;
          case this.measurements[8]: // Teaspoon
            this.calculateTeaspoon(numericValue);
            break;
        }
      },
      convertToNumeric(value) {
        const trimmedValue = validator.blacklist(value.trim(), ' ');
        let numericValue = 0;
        if (trimmedValue.indexOf('/') > -1) {
          const halves = trimmedValue.split('/');
          if (halves.length > 2)
            return null;
          else {
            if (!validator.isFloat(halves[0]) || !validator.isFloat(halves[1]))
              return null;
            numericValue = parseFloat(halves[0]) / parseFloat(halves[1]);
          }
        }
        else {
          if (!validator.isFloat(trimmedValue))
            return null;
          numericValue = parseFloat(trimmedValue);
        }

        if (numericValue < 0)
          return null;

        return numericValue;
      },
      calculateCup(value) {
        this.result.cup = value;
        this.result.gallon = value / 16;
        this.result.liter = value / 0.24;
        this.result.milliliter = value * 240;
        this.result.ounce = value * 8;
        this.result.pint = value / 2;
        this.result.quart = value / 4;
        this.result.tablespoon = value * 16;
        this.result.teaspoon = value * 48;
      },
      calculateGallon(value) {
        this.result.cup = value * 16;
        this.result.gallon = value;
        this.result.liter = value * 3.785;
        this.result.milliliter = value * 3785;
        this.result.ounce = value * 128;
        this.result.pint = value * 8;
        this.result.quart = value * 4;
        this.result.tablespoon = value * 256;
        this.result.teaspoon = value * 768;
      },
      calculateLiter(value) {
        this.result.liter = value;
      },
      calculateMilliliter(value) {
        this.result.milliliter = value;
      },
      calculateOunce(value) {
        this.result.ounce = value;
      },
      calculatePint(value) {
        this.result.pint = value;
      },
      calculateQuart(value) {
        this.result.quart = value;
      },
      calculateTablespoon(value) {
        this.result.tablespoon = value;
      },
      calculateTeaspoon(value) {
        this.result.teaspoon = value;
      }
    }
  }
</script>

<style scoped>
  th {
    text-align: center !important;
    background-color: #fafafa !important;
  }
  tr > td:first-child {
    text-align: right !important;
    width: 50%;
  }
</style>
