import { useNavLock } from '@/composables/useNavLock';
const navLock = useNavLock();
export default {
  mounted(el, binding) { const on = binding.value !== false; el._navLocked = on; if (on) navLock.lock(); },
  updated(el, binding) {
    const on = binding.value !== false;
    if (on && !el._navLocked) { navLock.lock(); el._navLocked = true; }
    if (!on && el._navLocked) { navLock.unlock(); el._navLocked = false; }
  },
  unmounted(el) { if (el._navLocked) { navLock.unlock(); el._navLocked = false; } },
};