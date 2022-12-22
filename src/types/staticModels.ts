export type CellCount = {
  id: number;
  label: string;
  voltage: number;
};

export type QuadType = {
  id: string;
  label: string;
  thrustRatio: number;
  discLoad: number;
};

export type PropSize = {
  id: number;
  label: string;
  size: number;
  area: number;
};

export type MotorSize = {
  label: string;
  diameter: number;
  height: number;
  bearingDiameter: number;
  volume: number;
};
