import { QuadType } from '@/types';

export const defaultQuadType: QuadType = { id: 'freestyle', label: 'Freestyle', thrustRatio: 13, discLoad: 1.25 };

export const quadTypes: QuadType[] = [
  defaultQuadType,
  { id: 'racer', label: 'Racer', thrustRatio: 17, discLoad: 1 },
  { id: 'long-range', label: 'Long Range', thrustRatio: 8, discLoad: 0.8 },
  { id: 'cinewhoop', label: 'Cinewhoop', thrustRatio: 5, discLoad: 1.9 },
];
