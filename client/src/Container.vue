<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-quarters is-narrow">
          <navigation-bar />
          <div class="columns is-centered">
            <div class="column is-10 is-narrow">
              <component :is="content" :props="props"></component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'container',
    props: ['content', 'props']
  }
</script>
