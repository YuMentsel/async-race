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
  appPage?: string;
}

export { Car, Cars, CreateCar, StateObj, UpdateCar };
