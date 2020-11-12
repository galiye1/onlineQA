<!--提交问题按钮组件-->
<template>
  <div id="aCommitBtn">
    <a-button type="primary" @click="showModal">
      提问
    </a-button>
    <a-modal v-model="this.$store.state.visible" title="你的评论" :footer="null" :destroyOnClose=true @cancel="handleOk">
      <Write></Write>
    </a-modal>
  </div>
</template>
<script>
import Write from './Write'
export default {
  name: 'CommitBtn',
  components: { Write },
  methods: {
    showModal () { // 显示提问信息框
      if (this.$store.state.region === 'questioner') {
        this.$store.state.visible = true
      } else if (this.$store.state.region === '') {
        alert('请登录您的账户！')
      } else {
        alert('您没有提问权限！')
      }
    },
    handleOk () { // 关闭提问信息框
      this.$store.state.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/ .ant-btn{
    height: 40px;
    width: 200px;
  }
  #aCommitBtn{
    margin-left: 70%;
  }
</style>
