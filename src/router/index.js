import Vue from 'vue'
import Router from 'vue-router'
import homework from '@/components/homework'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/homework/:workId/:studentId/:courseId/:workName',
      name: 'homework',
      component: homework
    }
  ]
})
