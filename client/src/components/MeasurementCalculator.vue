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
        this.result.cup = value * 4.23;
        this.result.gallon = value / 3.7854;
        this.result.liter = value;
        this.result.milliliter = value * 1000;
        this.result.ounce = value * 33.81;
        this.result.pint = value * 2.11;
        this.result.quart = value * 1.06;
        this.result.tablespoon = value * 67.63;
        this.result.teaspoon = value * 202.9;
      },
      calculateMilliliter(value) {
        this.result.cup = value * 0.0042;
        this.result.gallon = value * 0.0003;
        this.result.liter = value / 1000;
        this.result.milliliter = value;
        this.result.ounce = value * 0.034;
        this.result.pint = value * 0.002;
        this.result.quart = value * 0.001;
        this.result.tablespoon = value * 0.07;
        this.result.teaspoon = value * 0.2;
      },
      calculateOunce(value) {
        this.result.cup = value * 0.125;
        this.result.gallon = value * 0.008;
        this.result.liter = value * 0.03;
        this.result.milliliter = value * 29.6;
        this.result.ounce = value;
        this.result.pint = value * 0.0625;
        this.result.quart = value * 0.0313;
        this.result.tablespoon = value * 2;
        this.result.teaspoon = value * 6;
      },
      calculatePint(value) {
        this.result.cup = value * 2;
        this.result.gallon = value * 0.125;
        this.result.liter = value * 0.47;
        this.result.milliliter = value * 473;
        this.result.ounce = value * 16;
        this.result.pint = value;
        this.result.quart = value * 0.5;
        this.result.tablespoon = value * 32;
        this.result.teaspoon = value * 96;
      },
      calculateQuart(value) {
        this.result.cup = value * 4;
        this.result.gallon = value * 0.25;
        this.result.liter = value * 0.95;
        this.result.milliliter = value * 946;
        this.result.ounce = value * 32;
        this.result.pint = value * 2;
        this.result.quart = value;
        this.result.tablespoon = value * 64;
        this.result.teaspoon = value * 192;
      },
      calculateTablespoon(value) {
        this.result.cup = value * 0.0625;
        this.result.gallon = value * 0.004;
        this.result.liter = value * 0.015;
        this.result.milliliter = value * 15;
        this.result.ounce = value * 0.5;
        this.result.pint = value * 0.03125;
        this.result.quart = value * 0.016;
        this.result.tablespoon = value;
        this.result.teaspoon = value * 3;
      },
      calculateTeaspoon(value) {
        this.result.cup = value * 0.0208;
        this.result.gallon = value * 0.0013;
        this.result.liter = value * 0.00493;
        this.result.milliliter = value * 4.93;
        this.result.ounce = value * 0.17;
        this.result.pint = value * 0.0104;
        this.result.quart = value * 0.005;
        this.result.tablespoon = value / 3;
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
