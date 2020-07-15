import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import Administrators from '@/components/Administrators'
import Students from '@/components/Students'
import Examinations from '@/components/Examinations'
import StudentTests from '@/components/StudentTests'
import StudentTestSession from '@/components/StudentTestSession'
import ViewStudentTests from '@/components/ViewStudentTests'
import BulkUploadStudents from '@/components/BulkUploadStudents'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/administrators',
      name: 'Administrators',
      component: Administrators
    },
    {
      path: '/students',
      name: 'Students',
      component: Students
    },
    {
      path: '/examinations',
      name: 'Examinations',
      component: Examinations
    },
    {
      path: '/studenttests',
      name: 'StudentTests',
      component: StudentTests
    },
    {
      path: '/studenttestsession',
      name: 'StudentTestSession',
      component: StudentTestSession
    },
    {
      path: '/viewstudenttests',
      name: 'ViewStudentTests',
      component: ViewStudentTests
    },
    {
      path: '/bulkUploadStudents',
      name: 'BulkUploadStudents',
      component: BulkUploadStudents
    }
  ]
})
