import { ref, computed } from 'vue';

// 全局导航锁计数器
const lockCount = ref(0);

export function useNavLock() {
  return {
    isLocked: computed(() => lockCount.value > 0),
    
    // 加锁
    lock() { 
      lockCount.value++; 
    },
    
    // 解锁
    unlock() { 
      if (lockCount.value > 0) lockCount.value--; 
    },
  };
}