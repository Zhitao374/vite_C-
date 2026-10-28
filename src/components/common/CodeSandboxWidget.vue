<template>
    <Teleport to="body">
        <div v-if="isOpen" class="sandbox-overlay" @click.self="close" @keydown.stop @keyup.stop @pointerdown.stop
            @mousedown.stop @mouseup.stop @keydown.esc="close">
            <div class="sandbox-modal">
                <!-- 精简外层头部 -->
                <div class="modal-header">
                    <div class="modal-title">
                        <span class="dot"></span> 课堂代码沙盒
                    </div>
                    <button class="modal-close" @click="close">✕</button>
                </div>
                <div class="modal-body">
                    <CodePlayground v-model="currentCode" :initial-code="defaultCode" />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue';
import CodePlayground from './CodePlayground.vue';

const props = defineProps({
    modelValue: { type: Boolean, default: false }
});
const emit = defineEmits(['update:modelValue']);

const isOpen = ref(props.modelValue);

// ⚡ 新增：用来保存当前代码状态，这样即使组件销毁，状态还在父组件里
const defaultCode = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
`;
const currentCode = ref(defaultCode);

watch(() => props.modelValue, (val) => {
    isOpen.value = val;
});

function close() {
    emit('update:modelValue', false);
}
</script>

<style scoped>
.sandbox-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.sandbox-modal {
    width: 85vw;
    height: 85vh;
    background: #1e1e1e;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 20px; background: #1a1a1a; border-bottom: 1px solid #333; color: #fff;
}
.modal-title { 
  font-weight: 600; font-size: 15px; letter-spacing: 1px;
  display: flex; align-items: center; gap: 8px;
}
.modal-title .dot {
  width: 8px; height: 8px; border-radius: 50%; background: #165dff;
  box-shadow: 0 0 8px #165dff;
}
.modal-close { 
  background: none; border: none; color: #666; font-size: 18px; cursor: pointer; 
  transition: color 0.2s;
}
.modal-close:hover { color: #fff; }
</style>