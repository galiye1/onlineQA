<template>
  <div class="myCommentsParent">
    <div class="myComments">
      <a-list
        class="comment-list"
        item-layout="horizontal"
        :data-source="this.$store.state.currentComments">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-comment :author="item.author">
            <a-avatar icon="user" slot="avatar" alt="avatar"/>
            <p slot="content">
              {{ item.content }}
            </p>
            <a-tooltip slot="datetime" :title="item.datetime">
              <span>{{ item.datetime}}</span>
            </a-tooltip>
          </a-comment>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyComments'
}
</script>

<style lang="less" scoped>
  .myCommentsParent{
    min-height: 600px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .myComments{
    min-height: 400px;
    width: 720px;
    padding: 20px;
    background-color: white;
  }
  .comment-list{
    margin: 10px;
    height: auto;
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
</style>
