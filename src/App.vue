<!--主组件-->
<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './views/Header'
export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      route: '/app'
    }
  }
}
</script>

<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 790px;
    width: 100%;
    background: url("assets/img/background.jpg") repeat-y;
    background-size: 100% auto;
  }
</style>
