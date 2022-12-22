import { ref, watchEffect, unref } from 'vue';
import { UserInputModelRef } from '@/types';
import { motorSizes } from '@/models';

export default (model: UserInputModelRef) => {
  const validMotors = ref<string[]>([]);

  watchEffect(() => {
    const modelValue = unref(model);
    const { offsets = [] } = modelValue.quadType;
    const [minOffset = 3, maxOffset = 2] = offsets;
    const minVolume = (modelValue.weight * (modelValue.quadType.thrustRatio - minOffset)) / 4;
    const maxVolume = (modelValue.weight * (modelValue.quadType.thrustRatio + maxOffset)) / 4;

    validMotors.value = motorSizes
      .filter(({ volume }) => volume >= minVolume && volume <= maxVolume)
      .map(({ label }) => label);
  });

  return { validMotors };
};
