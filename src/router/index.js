import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/IndexView.vue')
  },
  {
    path: '/lesson/:lesson',
    name: 'lesson',
    component: () => import('@/views/LessonView.vue'),
    props: true
  },
  {
    path: '/slide/:lesson/:slide',
    name: 'slide',
    component: () => import('@/views/SlideView.vue'),
    props: true
  },
  {
    path: '/glossary',
    name: 'glossary',
    component: () => import('@/views/GlossaryView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

// ============================================
// 【新增】dev-only 路由
// ============================================
if (import.meta.env.DEV) {
  routes.push({
    path: '/dev/slides',
    name: 'dev-slides',
    component: () => import('@/views/DevSlideGallery.vue')
  });
}

export default createRouter({
  history: createWebHashHistory(),
  routes
});