import { ref, watchEffect, unref } from 'vue';
import { UserInputModelRef, UserInputModel } from '@/types';
import { motorSizes } from '@/models';

export default (model: UserInputModelRef) => {
  const validMotors = ref<string[]>([]);

  watchEffect(() => {
    const modelValue = unref<UserInputModel>(model);
    const minVolume = (modelValue.weight * (modelValue.quadType.thrustRatio - 3)) / 4;
    const maxVolume = (modelValue.weight * (modelValue.quadType.thrustRatio + 2)) / 4;

    validMotors.value = motorSizes
      .filter(({ volume }) => volume >= minVolume && volume <= maxVolume)
      .map(({ label }) => label);
  });

  return { validMotors };
};
