/**
 * @Description:
 * @author wxj
 * @date 2020-10-12-13:38
 */
import axios from './http'
// import axios from 'axios'
const serve = {
  isLogin (data) {
    return axios('/isLogin', { // return返回res的实例
      method: 'post',
      data
    })
  },
  registerQuestioner (data) {
    return axios('/regisQues', {
      method: 'post',
      data
    })
  },
  registerAnswer (data) {
    return axios('/regisAnswer', {
      method: 'post',
      data
    })
  },
  addData (data) {
    return axios('/add', {
      method: 'post',
      data
    })
  },
  addChildData (data) {
    return axios('/addChild', {
      method: 'post',
      data
    })
  },
  deleteData (data) {
    return axios('/delete', {
      method: 'post',
      data
    })
  },
  deleteChildData (data) {
    return axios('/childDelete', {
      method: 'post',
      data
    })
  }
}

export default serve
