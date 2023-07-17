<template>
  <div id="app">
    <!-- 路由入口程序 -->
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
  * {
    margin: 0px;
    padding: 0px;
  }
  #app {
    width: 100%;
    height: 100%;
  }
</style>
