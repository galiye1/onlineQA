<!-- 问题显示组件 -->
<template>
  <div id="aComment">
    <div class="mainContent">
      <CommitBtn></CommitBtn>
      <a-list
        class="comment-list"
        item-layout="horizontal"
        :data-source="this.$store.state.allComments.slice(3 * (current - 1), 3 + 3 * (current - 1))">
<!--       每页显示3个问题-->
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-comment :author="item.author">
            <a-avatar icon="user" slot="avatar" alt="avatar"/>
            <p slot="content">
              {{ item.content }}
            </p>
            <a-tooltip slot="datetime" :title="item.datetime">
              <span>{{ item.datetime}}</span>
            </a-tooltip>
            <Actions v-bind:params="{ isOrder: true, action: { index: 3 * (current - 1) + index, item}, isReplyVisible: true}"></Actions>
            <a-collapse>
<!--              v-if="comments[3 * (current - 1) + index].reply.length > 0"-->
              <a-collapse-panel header="..." :showArrow=false>
                <SecondComment v-bind:params="{ index: 3 * (current - 1) + index, current: current}"></SecondComment>
              </a-collapse-panel>
            </a-collapse>
          </a-comment>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import SecondComment from './SecondComment'
import CommitBtn from './CommitBtn'
import Actions from './Actions'
import moment from 'moment'
export default {
  name: 'Comment',
  components: {
    CommitBtn,
    SecondComment,
    Actions
  },
  data () {
    return {
      moment,
      comments: []
    }
  },
  props: {
    current: {
      type: Number
    }
  },
  beforeMount () {
    this.comments = this.$store.state.allComments
  }
}
</script>

<style lang="less" scoped>
  #aComment{
    min-height: 600px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .mainContent{
    min-height: 400px;
    width: 720px;
    padding: 20px;
    background-color: white;
  }
  .ant-list-item{
    margin: 10px;
    height: auto;
  }
  .ant-comment{
    height: auto;
  }
  /deep/ .ant-comment-content-detail{
    margin-top: 20px;
    margin-left: 23px;
  }
  /deep/ .ant-comment-content-detail p{
    max-height: 60px;
    overflow: auto;
    width: 100%; /* 必须定义宽度 */
    word-break: break-word; /* 文本行的任意字内断开 */
    word-wrap: break-word; /* IE */
    white-space: -moz-pre-wrap; /* Mozilla */
    white-space: -hp-pre-wrap; /* HP printers */
    white-space: -o-pre-wrap; /* Opera 7 */
    white-space: -pre-wrap; /* Opera 4-6 */
    white-space: pre; /* CSS2 */
    white-space: pre-wrap; /* CSS 2.1 */
    white-space: pre-line; /* CSS 3 (and 2.1 as well, actually) */
  }
  /deep/ .ant-comment-nested{
    margin-left: 32px;
    color: #bdbbbb;
  }
  /deep/ .ant-comment-nested > div > span{
    margin: 15px;
  }
  .ant-collapse{
    border: none !important;
    background-color: white;
  }
  /deep/ .ant-collapse-header{
    border-radius: 0 !important;
  }
</style>
