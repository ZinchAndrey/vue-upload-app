import { createRouter, createWebHistory } from 'vue-router'
import FileListPage from '@/pages/FileListPage.vue';
import FormPage from '@/pages/FormPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/form'
    },
    {
      path: '/form',
      name: 'form',
      component: FormPage
    },
    {
      path: '/file-list',
      name: 'file-list',
      component: FileListPage
    }
  ]
})

export default router
