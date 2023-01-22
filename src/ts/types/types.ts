interface Car {
  id: number;
  name: string;
  color: string;
}

interface Cars {
  items: Car[];
  count: number;
}

interface CreateCar {
  name: string;
  color: string;
}

interface UpdateCar {
  name: string;
  color: string;
}

interface StateObj {
  cars: Car[];
  carsCount: number;
  garagePage: number;
  selectedId: number | null;
  animation: ObjObj;
  appPage?: string;
}

export interface ObjObj {
  [id: string]: ObjNum;
}

export interface ObjNum {
  [id: string]: number;
}

interface RaceParams {
  velocity: number;
  distance: number;
}

type Engine = {
  success: boolean;
};

export { Car, Cars, CreateCar, StateObj, UpdateCar, RaceParams, Engine };
