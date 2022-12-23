import type { MotorSize } from '@/types';

const baseMotorSizes = [
  { label: '1103', diameter: 11, height: 3, bearingDiameter: 9 },
  { label: '1204.5', diameter: 12, height: 4.5, bearingDiameter: 9 },
  { label: '1303.5', diameter: 13, height: 3.5, bearingDiameter: 9 },
  { label: '1404', diameter: 14, height: 4, bearingDiameter: 9 },
  { label: '1404.5', diameter: 14, height: 4.5, bearingDiameter: 9 },
  { label: '1405', diameter: 14, height: 5, bearingDiameter: 9 },
  { label: '1506', diameter: 15, height: 6, bearingDiameter: 9 },
  { label: '1408', diameter: 14, height: 8, bearingDiameter: 9 },
  { label: '1804', diameter: 18, height: 4, bearingDiameter: 9 },
  { label: '1507', diameter: 15, height: 7, bearingDiameter: 9 },
  { label: '1507.5', diameter: 15, height: 7.5, bearingDiameter: 9 },
  { label: '1804.5', diameter: 18, height: 4.5, bearingDiameter: 9 },
  { label: '2004', diameter: 20, height: 4, bearingDiameter: 10 },
  { label: '2203.5', diameter: 22, height: 3.5, bearingDiameter: 10 },
  { label: '1806', diameter: 18, height: 6, bearingDiameter: 10 },
  { label: '2104', diameter: 21, height: 4, bearingDiameter: 10 },
  { label: '2005', diameter: 20, height: 5, bearingDiameter: 10 },
  { label: '2105', diameter: 21, height: 5, bearingDiameter: 10 },
  { label: '2105.5', diameter: 21, height: 5.5, bearingDiameter: 10 },
  { label: '2205', diameter: 22, height: 5, bearingDiameter: 10 },
  { label: '2604', diameter: 26, height: 4, bearingDiameter: 10 },
  { label: '2206', diameter: 22, height: 6, bearingDiameter: 10 },
  { label: '2305.5', diameter: 23, height: 5.5, bearingDiameter: 10 },
  { label: '2107.5', diameter: 21, height: 7.5, bearingDiameter: 10 },
  { label: '2306', diameter: 23, height: 6, bearingDiameter: 10 },
  { label: '2405.5', diameter: 24, height: 5.5, bearingDiameter: 10 },
  { label: '22.6-6.5', diameter: 22.6, height: 6.5, bearingDiameter: 10 },
  { label: '2207', diameter: 22, height: 7, bearingDiameter: 10 },
  { label: '2306.5', diameter: 23, height: 6.5, bearingDiameter: 10 },
  { label: '2207.5', diameter: 22, height: 7.5, bearingDiameter: 10 },
  { label: '2307', diameter: 23, height: 7, bearingDiameter: 10 },
  { label: '2208', diameter: 22, height: 8, bearingDiameter: 10 },
  { label: '2407', diameter: 24, height: 7, bearingDiameter: 10 },
  { label: '2408', diameter: 24, height: 8, bearingDiameter: 10 },
  { label: '2806.5', diameter: 28, height: 6.5, bearingDiameter: 10 },
  { label: '2807', diameter: 28, height: 7, bearingDiameter: 10 },
  { label: '2808', diameter: 28, height: 8, bearingDiameter: 10 },
  { label: '3008', diameter: 30, height: 8, bearingDiameter: 10 },
  { label: '2812', diameter: 28, height: 12, bearingDiameter: 10 },
];

export const motorSizes: MotorSize[] = baseMotorSizes.map(size => {
  const totalVolume = ((Math.PI * Math.pow(size.diameter, 2)) / 4) * size.height;
  const bearingVolume = ((Math.PI * Math.pow(size.bearingDiameter, 2)) / 4) * size.height;
  return { ...size, volume: totalVolume - bearingVolume };
});
