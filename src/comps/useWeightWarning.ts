import { computed } from 'vue';
import { roundTo } from '@/helpers';
import type { UserInputModelRef } from '@/types';

enum WeightWarningType {
  Underweight = 'underweight',
  Overweight = 'overweight',
}

enum WeightWarningSolutionType {
  Gain = 'gain',
  Lose = 'lose',
}

interface WeightWarning {
  warningType: WeightWarningType;
  solutionType: WeightWarningSolutionType;
  optimalWeight: number;
  weightDiff: number;
  idealWeight: number;
}

export default (model: UserInputModelRef) => {
  const weightWarning = computed<WeightWarning | null>(() => {
    const actualDiscLoad = model.value.weight / model.value.prop.area;
    const discLoadDiff = model.value.quadType.discLoad - actualDiscLoad;
    if (Math.abs(discLoadDiff) < 0.2) return null;

    const isOverweight = discLoadDiff < 0;
    const optimalWeightOffset = isOverweight ? 0.2 : -0.2;
    const optimalWeight = roundTo((model.value.quadType.discLoad + optimalWeightOffset) * model.value.prop.area, 1);

    return {
      optimalWeight,
      weightDiff: Math.abs(model.value.weight - optimalWeight),
      idealWeight: roundTo(model.value.quadType.discLoad * model.value.prop.area, 1),
      warningType: isOverweight ? WeightWarningType.Overweight : WeightWarningType.Underweight,
      solutionType: isOverweight ? WeightWarningSolutionType.Lose : WeightWarningSolutionType.Gain,
    };
  });

  return { weightWarning };
};
