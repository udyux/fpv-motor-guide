export type CellCount = {
  label: string;
  voltage: number;
};

export type QuadType = {
  label: string;
  thrustRatio: number;
  discLoad: number;
};

export type PropSize = {
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
