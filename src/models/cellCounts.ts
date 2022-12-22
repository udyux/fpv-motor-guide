import { CellCount } from '@/types';

export const cellCounts: CellCount[] = Array.from(Array(8), (_, index) => ({
  id: index + 1,
  label: `${index + 1}S`,
  voltage: 3.7 * (index + 1),
}));

export const defaultCellCount = cellCounts[5];
