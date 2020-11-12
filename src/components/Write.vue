<template>
  <div>
    <a-comment>
      <a-avatar
        icon="user"
        slot="avatar"
        alt="avatar"
      />
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" :value="value" @change="handleChange" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            提交
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Write',
  data () {
    return {
      comments: {}, // 数条评论的数据
      submitting: false, // 是否可提交
      value: '', // 评论内容
      moment
    }
  },
  methods: {
    handleSubmit () {
      // 评论内容不能为空
      if (!this.value) {
        return
      }

      this.submitting = true
      // 提交时保存评论数据到store中
      setTimeout(() => {
        this.submitting = false
        this.comments =
          {
            author: this.$store.state.username,
            userId: this.$store.state.userId,
            content: this.value,
            datetime: moment().format('MMMM Do YYYY, h:mm:ss a'), // 取当前时间
            reply: []
          }
        if (!this.$store.state.isOpenChildrenData) {
          this.$store.commit('setData', this.comments)
          this.$server.addData({ comment: this.$store.state.newComment, userId: this.$store.state.userId }) // 将一级评论数据发送到后台
        } else {
          delete this.comments.reply
          this.$store.commit('setChildrenData', this.comments)
          this.$server.addChildData({ currentQuesId: this.$store.state.currentQuesId, comment: this.$store.state.newComment, userId: this.$store.state.userId })
          this.$store.state.isOpenChildrenData = false
        }
        this.$store.commit('setVisible', false)
        this.value = ''
      }, 1000)
    },
    // 评论内容修改
    handleChange (e) {
      this.value = e.target.value
    }
  }
}
</script>

<style scoped>

</style>
