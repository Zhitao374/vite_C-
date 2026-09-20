<template>
  <div class="not-found">
    <h1>404</h1>
    <p>页面不存在</p>
    <router-link to="/" class="back-home">← 返回首页</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 16px;
  background: linear-gradient(135deg, #eaf2ff 0%, #f7fbff 100%);
}
.not-found h1 {
  font-size: 140px;
  font-weight: 900;
  color: var(--primary);
  letter-spacing: -4px;
  line-height: 1;
  text-shadow: 0 4px 20px rgba(22, 93, 255, 0.15);
}
.not-found p {
  font-size: 20px;
  color: var(--text-sub);
}
.back-home {
  margin-top: 24px;
  padding: 10px 24px;
  background: var(--primary);
  color: #fff;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
}
.back-home:hover {
  background: var(--primary-light);
  transform: translateY(-2px);
}
</style>