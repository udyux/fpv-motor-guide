import { ref, watchEffect } from 'vue';
import { UserInputModel } from '@/types';
import { motorSizes } from '@/models';

export default (model: UserInputModel) => {
  const validMotors = ref<string[]>([]);

  watchEffect(() => {
    const minVolume = (model.weight * (model.quadType.thrustRatio - 3)) / 4;
    const maxVolume = (model.weight * (model.quadType.thrustRatio + 2)) / 4;

    validMotors.value = motorSizes
      .filter(({ volume }) => volume >= minVolume && volume <= maxVolume)
      .map(({ label }) => label);
  });

  return { validMotors };
};
