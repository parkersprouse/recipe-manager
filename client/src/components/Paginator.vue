<template>
  <nav aria-label="Recipe pagination">
    <ul class="pagination justify-content-center">

      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1">Previous</a>
      </li>

      <li class="page-item" v-for="num in numPages">
        <a class="page-link" :href="baseUrl + '?p=' + num + '&n=' + toShow">
          {{ num }}
        </a>
      </li>

      <li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li>

    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'paginator',
    props: ['numPages', 'page', 'baseUrl', 'toShow']
  }
</script>
