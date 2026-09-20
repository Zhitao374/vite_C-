import { computed, watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getSlide, getLesson } from '@/data';
import { provideStep } from './useStep';

export function useSlide(props) {
  const router = useRouter();

  const lessonKey = computed(() => `lesson-${props.lesson}`);
  const slideId = computed(() => parseInt(props.slide, 10));
  const slide = computed(() => getSlide(lessonKey.value, slideId.value));
  const lessonData = computed(() => getLesson(lessonKey.value));
  const totalSlides = computed(() => lessonData.value?.total || 1);

  const loaded = ref(false);
  watch(slide, () => { loaded.value = true; }, { immediate: true });

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
    stepCtx,
    current: stepCtx.current,
    max: stepCtx.max,
    next,
    prev
  };
}