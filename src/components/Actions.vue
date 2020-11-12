<!--评论点赞，答复组件-->
<template slot="actions">
  <div>
<!--    <span key="comment-basic-like">-->
<!--        <a-tooltip title="Like">-->
<!--          <a-icon type="like" :theme="action === 'liked' ? 'filled' : 'outlined'" @click="like" />-->
<!--        </a-tooltip>-->
<!--        <span style="padding-left: 8px;cursor: auto">-->
<!--          {{ likes }}-->
<!--        </span>-->
<!--      </span>-->
<!--    <span key="comment-basic-dislike">-->
<!--        <a-tooltip title="Dislike">-->
<!--          <a-icon-->
<!--            type="dislike"-->
<!--            :theme="action === 'disliked' ? 'filled' : 'outlined'"-->
<!--            @click="dislike"-->
<!--          />-->
<!--        </a-tooltip>-->
<!--        <span style="padding-left: 8px;cursor: auto">-->
<!--          {{ dislikes }}-->
<!--        </span>-->
<!--      </span>-->
    <span key="comment-basic-delete" @click="remove(params)">删除</span>
    <span key="comment-basic-reply" v-if="params.isReplyVisible" @click="reply(params)">回复</span>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Actions',
  data () {
    return {
      // likes: 0,
      // dislikes: 0,
      action: null,
      moment
    }
  },
  props: {
    params: {
      type: Object
    }
  },
  methods: {
    // like () { // 喜欢点赞
    //   this.likes = 1
    //   this.dislikes = 0
    //   this.action = 'liked'
    // },
    // dislike () { // 不喜欢
    //   this.likes = 0
    //   this.dislikes = 1
    //   this.action = 'disliked'
    // },
    remove (params) { // 删除
      if (!params.isOrder) { // 删除回答
        if (params.action.item.userId !== this.$store.state.userId) {
          alert('您没有删除此解答的权限')
          return
        }
        this.$store.state.currentQuesId = this.$store.state.allComments[params.action.id].id
        this.$server.deleteChildData({
          currentQuesId: this.$store.state.currentQuesId,
          childId: params.action.index,
          userId: params.action.item.userId,
          answerId: params.action.item.id
        })
        this.$store.state.allComments[params.action.id].reply.splice(params.action.index, 1)
        this.$store.state.currentComments.map((item, index) => {
          if (item.id === params.action.item.id) {
            this.$store.state.currentComments.splice(index, 1)
          }
        })
      } else { // 删除问题
        if (params.action.item.userId !== this.$store.state.userId) {
          alert('您没有删除此问题的权限')
          return
        }
        this.$store.state.currentQuesId = this.$store.state.allComments[params.action.index].id
        this.$store.state.userId = this.$store.state.allComments[params.action.index].userId
        this.$store.state.currentComments.map((item, index) => {
          if (item.id === this.$store.state.currentQuesId) {
            this.$store.state.currentComments.splice(index, 1)
          }
        })
        this.$server.deleteData({ currentQuesId: this.$store.state.currentQuesId, userId: this.$store.state.userId })
        this.$store.state.allComments.splice(params.action.index, 1)
      }
    },
    reply (params) { // 回复
      if (this.$store.state.region === 'questioner') {
        alert('您没有回复权限！')
        return
      }
      this.$store.state.visible = true
      this.$store.state.isOpenChildrenData = true
      this.$store.state.currentQuesId = params.action.item.id // 获取当前问题的id
    }
  }
}
</script>

<style scoped>
</style>
