import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/main.css';

const app = createApp(App);

// ============================================
// 全局错误处理
// ============================================
app.config.errorHandler = (err, instance, info) => {
  console.error('[全局错误]', err);
  console.error('  信息：', info);
  if (import.meta.env.DEV) {
    console.error('  组件：', instance);
  }
};

// 未捕获的 Promise rejection
window.addEventListener('unhandledrejection', (e) => {
  console.error('[未处理的 Promise 拒绝]', e.reason);
});

app.use(router).mount('#app');