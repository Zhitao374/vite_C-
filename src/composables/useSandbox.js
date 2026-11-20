import { shallowRef } from 'vue';
const sandboxApi = shallowRef(null);
export function registerSandbox(api) { sandboxApi.value = api; }
export function unregisterSandbox() { sandboxApi.value = null; }
export function useSandbox() {
  return {
    open(code) { if (sandboxApi.value?.open) return sandboxApi.value.open(code); console.warn('[sandbox] 未注册'); },
    isAvailable: () => !!sandboxApi.value,
  };
}