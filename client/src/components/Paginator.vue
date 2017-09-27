<template>
  <nav aria-label="Recipe pagination">
    <ul class="pagination justify-content-center">

      <li :class="'page-item' + (leftDisabled || bothDisabled ? ' disabled' : '')">
        <a class="page-link" :href="baseUrl + 'p=1&n=' + toShow"><i class="fa fa-angle-double-left" aria-hidden="true"></i></a>
      </li>

      <li :class="'page-item' + (leftDisabled || bothDisabled ? ' disabled' : '')">
        <a class="page-link" :href="baseUrl + 'p=' + (parseInt(page, 10) - 1) + '&n=' + toShow"><i class="fa fa-angle-left" aria-hidden="true"></i></a>
      </li>

      <li class="page-item disabled" v-if="parseInt(page, 10) > 3 && numPages > 5">
        <a class="page-link" href="#">...</a>
      </li>

      <li :class="'page-item' + (num == page ? ' active' : '')" v-for="num in linksToShow">
        <a :class="'page-link' + (num == page ? ' active' : '')" :href="baseUrl + 'p=' + num + '&n=' + toShow">
          {{ num }}
        </a>
      </li>

      <li class="page-item disabled" v-if="parseInt(page, 10) + 3 <= numPages && numPages > 5">
        <a class="page-link" href="#">...</a>
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
    mounted: function() {
      if (this.numPages > 5) {
        const numNumPages = parseInt(this.numPages, 10);
        const numCurPage = parseInt(this.page, 10);
        if (numCurPage < 4)
          this.linksToShow = [1, 2, 3, 4, 5];
        else if (numCurPage > numNumPages - 3)
          this.linksToShow = [numNumPages - 4, numNumPages - 3, numNumPages - 2, numNumPages - 1, numNumPages];
        else
          this.linksToShow = [numCurPage - 2, numCurPage - 1, numCurPage, numCurPage + 1, numCurPage + 2];
      }
      else {
        for (let i = 1; i <= this.numPages; i++) {
          this.linksToShow.push(i);
        }
      }
    },
    data: function() {
      return {
        leftDisabled: this.page == 1,
        rightDisabled: this.page == this.numPages,
        bothDisabled: parseInt(this.page, 10) < 1 || parseInt(this.page, 10) > this.numPages,
        linksToShow: []
      }
    }
  }
</script>
