<template>
    <a-list
      class="comment-list"
      :data-source="this.$store.state.allComments[params.index].reply"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment :author="item.author">
          <a-avatar icon="user" slot="avatar" alt="avatar"/>
          <p slot="content">
            {{ item.content }}
          </p>
          <a-tooltip slot="datetime" :title="item.datetime">
            <span>{{ item.datetime}}</span>
          </a-tooltip>
          <Actions v-bind:params="{ isOrder: false,action: { id: params.index, index, item }, isReplyVisible: false}"></Actions>
        </a-comment>
      </a-list-item>
    </a-list>
</template>

<script>
import Actions from './Actions'
export default {
  name: 'SecondComment',
  components: {
    Actions
  },
  props: {
    params: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/ .ant-list-empty-text{
    display: none;
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
  .ant-list-item{
    transform: scale(0.7,0.7);
    height: 90px;
  }
  .ant-list-item{
    border-bottom: none !important;
  }
</style>
