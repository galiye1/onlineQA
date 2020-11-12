<!-- 头部组件 -->
<template>
  <div id="aHeader">
    <router-link to="/"><h1>XXX项目技术交流网</h1></router-link>
    <a-input-search placeholder="" enter-button @search="onSearch" />
    <Login></Login>
  </div>
</template>

<script>
import Login from '../components/Login'
export default {
  name: 'Header',
  components: {
    Login
  },
  data () {
    return {
      searchValue: '',
      isCurrentRouter: false
    }
  },
  mounted () {
    this.$router.push('/')
  },
  methods: {
    onSearch (value) {
      const searchCommentsResult = []
      this.$store.state.allComments.map((item, index) => {
        if (item.content.indexOf(value) !== -1) {
          searchCommentsResult.unshift(item)
        }
        item.reply.map((item, index) => {
          if (item.content.indexOf(value) !== -1) {
            searchCommentsResult.unshift(item)
          }
        })
      })
      this.$store.state.searchCommentsResult = searchCommentsResult.reverse()
      this.$router.push({ path: '/searchCommentsResult', query: { value } })
    }
  }
}
</script>

<style lang="less" scoped>
  #aHeader{
    height: 60px;
    width: 100%;
    padding: 10px;
    line-height: 60px;
  }
  h1{
    float: left;
    font-size: 30px;
    font-family: 华文楷体;
    color: white;
  }
  .ant-input-search{
    width: 300px;
    float: left;
    margin-top: 17px;
    margin-left: 23%;
  }
  /deep/ .login{
    float: right;
    margin-top: 5px;
    margin-right: 25px;
  }
</style>
