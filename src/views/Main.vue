<!-- 问答内容组件 -->
<template>
  <div id="aMain">
    <Comment v-bind:current="current"></Comment>
    <a-pagination  v-if="(1 + (this.$store.state.allComments.length - 1) * 10 / 3) > 0" v-model="current" :total="1 + (this.$store.state.allComments.length - 1) * 10 / 3" show-less-items />
  </div>
</template>

<script>
import Comment from '../components/Comment'

export default {
  name: 'Main',
  components: {
    Comment
  },
  data () {
    return {
      current: 1
    }
  }
}
</script>

<style lang="less" scoped>
  #aMain{
    height: auto;
    width: 100%;
    padding: 24px;
    opacity: 0.95;
  }
  .ant-pagination{
    margin: 10px;
    display: flex;
    justify-content: center;
  }
</style>
