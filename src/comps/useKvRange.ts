import { ref, watchEffect, unref } from 'vue';
import { UserInputModelRef, UserInputModel } from '@/types';
import { roundTo } from '@/helpers';

type KvMap = { kv: number; tipSpeed: number }[];

const kvStep = 50;
const minTipSpeed = 230;
const maxTipSpeed = 290;

export default (model: UserInputModelRef) => {
  const lowestKv = ref(0);
  const highestKv = ref(0);
  const kvMap = ref<KvMap>([]);

  watchEffect(() => {
    const modelValue = unref<UserInputModel>(model);
    const initialKv = roundTo(12000 / (modelValue.cellCount.voltage * Math.PI * modelValue.prop.size * 0.0254), kvStep);

    kvMap.value = Array.from(Array(50), (_, index) => {
      const kv = initialKv + kvStep * index;
      const maxRpm = kv * modelValue.cellCount.voltage;
      const tipSpeed = ((maxRpm * 2 * Math.PI) / 60) * (modelValue.prop.size * 0.0127);
      return { kv, tipSpeed };
    });

    const highestPossibleTipSpeed = kvMap.value[kvMap.value.length - 1];
    const lowestPossibleTipSpeed = kvMap.value[0];

    const [lowestValid, highestValid] = kvMap.value.reduce(
      ([lowest, highest], value) => [
        value.tipSpeed >= minTipSpeed && value.tipSpeed < lowest.tipSpeed ? value : lowest,
        value.tipSpeed <= maxTipSpeed && value.tipSpeed > highest.tipSpeed ? value : highest,
      ],
      [highestPossibleTipSpeed, lowestPossibleTipSpeed]
    );

    lowestKv.value = lowestValid.kv;
    highestKv.value = highestValid.kv;
  });

  return { lowestKv, highestKv, kvMap };
};
