import { ref, watchEffect } from 'vue';
import { UserInputModel } from '@/types';
import { motorSizes } from '@/models';

export default (model: UserInputModel) => {
  const minMotorSize = ref<string | null>(null);
  const maxMotorSize = ref<string | null>(null);

  watchEffect(() => {
    const minVolume = (model.weight * (model.quadType.thrustRatio - 3)) / 4;
    const maxVolume = (model.weight * (model.quadType.thrustRatio + 2)) / 4;
    const highestPossibleVolume = motorSizes[motorSizes.length - 1];
    const lowestPossibleVolume = motorSizes[0];

    const [smallestMotorSize, biggestMotorSize] = motorSizes.reduce(
      ([lowest, highest], size) => [
        size.volume >= minVolume && size.volume < lowest.volume ? size : lowest,
        size.volume <= maxVolume && size.volume > highest.volume ? size : highest,
      ],
      [highestPossibleVolume, lowestPossibleVolume]
    );

    minMotorSize.value = smallestMotorSize.label;
    maxMotorSize.value = biggestMotorSize.label;
  });

  return { minMotorSize, maxMotorSize };
};
