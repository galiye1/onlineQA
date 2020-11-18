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
  },
  created () {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(this.$store.state))
    })
    if (localStorage.getItem('store')) {
      this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem('store'))))
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
