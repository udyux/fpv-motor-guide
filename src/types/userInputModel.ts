import { Ref, ComputedRef } from 'vue';
import { PropSize, QuadType, CellCount } from '@/types';

export interface UserInputModel {
  prop: PropSize;
  quadType: QuadType;
  cellCount: CellCount;
  weight: number;
}

export type UserInputModelRef = Ref<UserInputModel> | ComputedRef<UserInputModel>;
