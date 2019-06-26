<template>
  <div style="text-align: center">
  <a-timeline v-bind="aboutInfoLayout">
    <a-timeline-item color="green">Finished design. 2019-06-27</a-timeline-item>
    <a-timeline-item>Started implementing. 2019-06-10</a-timeline-item>
    <a-timeline-item>First-step design finished. 2019-05-07</a-timeline-item>
    <a-timeline-item>Project is assigned 2019-03-05</a-timeline-item>
  </a-timeline>
  </div>
</template>

<script>
  import global from '@/components/GlobalStyle'
  export default {
    name: 'About',
    aboutInfoLayout: global.aboutInfoLayout
  }
</script>

<style scoped>

</style>
