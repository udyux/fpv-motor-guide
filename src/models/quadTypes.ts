import { QuadType } from '@/types';

export const defaultQuadType: QuadType = { label: 'Freestyle', thrustRatio: 13, discLoad: 1.25 };

export const quadTypes: QuadType[] = [
  defaultQuadType,
  { label: 'Racer', thrustRatio: 17, discLoad: 1 },
  { label: 'Long Range', thrustRatio: 8, discLoad: 0.8 },
  { label: 'Cinewhoop', thrustRatio: 5, discLoad: 1.9 },
];
