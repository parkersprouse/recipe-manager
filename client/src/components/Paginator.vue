<template>
  <nav aria-label="Recipe pagination">
    <ul class="pagination justify-content-center">

      <li :class="'page-item' + (leftDisabled || bothDisabled ? ' disabled' : '')">
        <a class="page-link" :href="baseUrl + 'p=1&n=' + toShow"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a>
      </li>

      <li :class="'page-item' + (leftDisabled || bothDisabled ? ' disabled' : '')">
        <a class="page-link" :href="baseUrl + 'p=' + (parseInt(page, 10) - 1) + '&n=' + toShow"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
      </li>

      <li :class="'page-item' + (num + '' === page ? ' active' : '')" v-for="num in numPages">
        <a :class="'page-link' + (num + '' === page ? ' active' : '')" :href="baseUrl + 'p=' + num + '&n=' + toShow">
          {{ num }}
        </a>
      </li>

      <li :class="'page-item' + (rightDisabled || bothDisabled ? ' disabled' : '')">
        <a class="page-link" :href="baseUrl + 'p=' + (parseInt(page, 10) + 1) + '&n=' + toShow"><i class="fa fa-angle-right" aria-hidden="true"></i></a>
      </li>

      <li :class="'page-item' + (rightDisabled || bothDisabled ? ' disabled' : '')">
        <a class="page-link" :href="baseUrl + 'p=' + numPages + '&n=' + toShow"><i class="fa fa-angle-double-right" aria-hidden="true"></i></a>
      </li>

    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'paginator',
    props: ['numPages', 'page', 'baseUrl', 'toShow'],
    data: function() {
      return {
        leftDisabled: parseInt(this.page, 10) === 1,
        rightDisabled: parseInt(this.page, 10) === this.numPages,
        bothDisabled: parseInt(this.page, 10) < 1 || parseInt(this.page, 10) > this.numPages
      }
    }
  }
</script>
