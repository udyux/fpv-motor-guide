import type { Ref, ComputedRef } from 'vue';
import type { PropSize, QuadType, CellCount } from '@/types';

export enum UserInputModelFields {
  Prop = 'prop',
  QuadType = 'quadType',
  CellCount = 'cellCount',
  Weight = 'weight',
}

export interface UserInputModel {
  [UserInputModelFields.Prop]: PropSize;
  [UserInputModelFields.QuadType]: QuadType;
  [UserInputModelFields.CellCount]: CellCount;
  [UserInputModelFields.Weight]: number;
}

export type UserInputModelRef = Ref<UserInputModel> | ComputedRef<UserInputModel>;
