import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from '../views/Header'
import Main from '../views/Main'
import MyComments from '../components/MyComments'
import SearchCommentsResult from '../components/SearchCommentsResult'

Vue.use(VueRouter)

const routes = [
  {
    path: '/header',
    name: 'Header',
    component: Header
  },
  {
    path: '/',
    name: 'Main',
    components: {
      default: Main
    }
  },
  {
    path: '/myComments',
    name: 'MyComments',
    components: {
      default: MyComments
    }
  },
  {
    path: '/searchCommentsResult',
    name: 'SearchCommentsResult',
    components: {
      default: SearchCommentsResult
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
