<template>
  <div>
    <h3 class="title is-3">Measurement Conversion</h3>

    <div class="columns">
      <div class="column">
        <table class="table is-bordered is-narrow is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th colspan="2">Quick Reference Chart</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1/8 Cup</td><td>2 Tablespoons</td></tr>
            <tr><td>1/4 Cup</td><td>4 Tablespoons</td></tr>
            <tr><td>1/3 Cup</td><td>5 Tablespoons + 1 Teaspoon</td></tr>
            <tr><td>1/2 Cup</td><td>8 Tablespoons</td></tr>
            <tr><td>3/4 Cup</td><td>12 Tablespoons</td></tr>
            <tr><td>1 Cup</td><td>16 Tablespoons</td></tr>
            <tr><td>1 Gallon</td><td></td></tr>
            <tr><td>1 Liter</td><td></td></tr>
            <tr><td>1 Milliliter</td><td></td></tr>
            <tr><td>1 Ounce</td><td></td></tr>
            <tr><td>1 Pint</td><td></td></tr>
            <tr><td>1 Pound</td><td>16 Ounces</td></tr>
            <tr><td>1 Quart</td><td></td></tr>
            <tr><td>1 Tablespoon</td><td></td></tr>
            <tr><td>1 Teaspoon</td><td></td></tr>
          </tbody>
        </table>
      </div>
      <div class="column">
        <measurement-calculator />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'converter-page'
  }
</script>

<style>
th {
  text-align: center !important;
}
tr > td:first-child {
  text-align: right !important;
}
</style>
