/**
 * useSlideSteps · 统一步数协议
 * total = base(主体) + extra(1)
 * footer 概念已下线，全部走 extra
 */
import { useStepCount } from './useStepCount';
export function useSlideSteps(props, computeBase) {
  useStepCount(() => {
    const data = props.slide?.data || {};
    const base = computeBase(props.slide) || 0;
    return base + (data.extra ? 1 : 0);
  });
}