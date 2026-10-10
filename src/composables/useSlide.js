import { computed, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { loadLesson, getCachedLesson } from '@/data';
import { provideStep } from './useStep';

export function useSlide(props) {
  const router = useRouter();

  const lessonKey = computed(() => `lesson-${props.lesson}`);
  const slideId = computed(() => parseInt(props.slide, 10));

  const lessonData = ref(null);
  const slide = ref(null);
  const loaded = ref(false);
  const error = ref(null);

  // ============================================
  // 异步加载讲次数据
  // ============================================
  watch(
    lessonKey,
    async (key) => {
      if (!key) return;
      loaded.value = false;
      error.value = null;

      // 命中缓存直接拿
      let data = getCachedLesson(key);
      if (!data) {
        data = await loadLesson(key);
      }

      if (!data) {
        error.value = `未找到 ${key}`;
        loaded.value = true;
        return;
      }

      lessonData.value = data;
      slide.value = data.slides.find(s => s.id === slideId.value) || null;
      loaded.value = true;
    },
    { immediate: true }
  );

  // ============================================
  // 换页时（同一讲内）只更新 slide
  // ============================================
  watch(slideId, (id) => {
    if (!lessonData.value) return;
    slide.value = lessonData.value.slides.find(s => s.id === id) || null;
  });

  const totalSlides = computed(() => lessonData.value?.total || 1);

  const stepCtx = provideStep(1);
  watch(slideId, () => stepCtx.reset(), { immediate: true });

  function next() {
    if (stepCtx.next()) return;
    const cur = slideId.value;
    if (cur < totalSlides.value) {
      router.push(`/slide/${props.lesson}/${cur + 1}`);
    } else {
      router.push(`/lesson/${props.lesson}`);
    }
  }

  function prev() {
    if (stepCtx.prev()) return;
    const cur = slideId.value;
    if (cur > 1) {
      router.push(`/slide/${props.lesson}/${cur - 1}`);
    } else {
      router.push(`/lesson/${props.lesson}`);
    }
  }

  return {
    slide,
    lessonData,
    slideId,
    totalSlides,
    loaded,
    error,
    stepCtx,
    current: stepCtx.current,
    max: stepCtx.max,
    next,
    prev
  };
}