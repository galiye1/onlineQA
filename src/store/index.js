import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '', // 当前登录用户
    region: '',
    allComments: [], // 当前数据库的所有评论
    currentComments: [], // 当前用户的所有评论
    searchCommentsResult: [], // 搜索评论结果
    currentQuesId: 0, // 当前问题的id
    userId: 0, // 当前登录用户id
    visible: false,
    showContentVisible: true,
    loginVisible: false,
    regisVisible: false,
    collapseVisible: false,
    isOpenChildrenData: false,
    newComment: {}
  },
  mutations: {
    setVisible (state, visible) {
      state.visible = visible
    },
    setData (state, data) {
      const newCurrentCommentsId = JSON.parse(JSON.stringify(state.currentComments))
      for (let i = 0, j = newCurrentCommentsId.length; i < j; i++) {
        newCurrentCommentsId[i] = newCurrentCommentsId[i].id
      }
      for (let i = state.userId * 10000; ; i++) {
        if (!newCurrentCommentsId.includes(i)) {
          data.id = i
          break
        }
      }
      state.currentComments.unshift(data)
      state.allComments.unshift(data)
      state.newComment = data
    },
    setChildrenData (state, data) {
      const newCurrentCommentsId = JSON.parse(JSON.stringify(state.currentComments))
      for (let i = 0, j = newCurrentCommentsId.length; i < j; i++) {
        newCurrentCommentsId[i] = newCurrentCommentsId[i].id
      }
      for (let i = state.userId * 10000; ; i--) {
        if (!newCurrentCommentsId.includes(i)) {
          data.id = i
          break
        }
      }
      state.currentComments.unshift(data)
      state.allComments.map((item, index) => {
        if (item.id === state.currentQuesId) {
          state.allComments[index].reply.unshift(data)
        }
      })
      state.newComment = data
    },
    setIsOpenChildrenData (state, isOpenChildrenData) {
      state.isOpenChildrenData = isOpenChildrenData
    }
  },
  actions: {
  },
  modules: {
  }
})
