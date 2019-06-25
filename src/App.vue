<template>
  <div id="app">
    <a-layout id="layout-basic">
      <a-layout-sider
        breakpoint="lg"
        collapsedWidth="0">
        <sidebar></sidebar>
      </a-layout-sider>
      <a-layout-content :style="{ margin: '24px 16px 0' }">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
  import sidebar from './components/Sidebar'
  export default {
    name: 'App',
    components: {
      sidebar
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
