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
  winners: WinnerId[];
  winnersCount: number;
  winnersPage: number;
  page: string;
  sortBy: null | string;
  sortOrder: null | string;
  selectedCarID: number | null;
}

interface ObjObj {
  [id: string]: ObjNum;
}

interface ObjNum {
  [id: string]: number;
}

interface RaceParams {
  velocity: number;
  distance: number;
}

type Engine = {
  success: boolean;
};

interface Winners {
  id: number;
  success: boolean;
  time: number;
}
interface Winner {
  id?: number;
  name?: string;
  color?: string;
  time: number;
}
interface NewWinner {
  id: number;
  name?: string;
  color?: string;
  time: number;
}

type GetWinners = {
  id: number;
  wins: number;
  time: number;
};

interface GetWinnersId {
  items: WinnerId[];
  count: number;
}
interface WinnerId {
  id: number;
  wins: number;
  time: number;
  car: Car;
}

type WinnersParams = {
  page: number;
  limit?: number;
  sort: string | null;
  order: string | null;
};

type SaveWinner = {
  id: number;
  time: number;
};

enum StatePage {
  garage = 'garage',
  winners = 'winners',
}

export {
  Car,
  Cars,
  CreateCar,
  StateObj,
  UpdateCar,
  RaceParams,
  Engine,
  Winners,
  WinnerId,
  NewWinner,
  Winner,
  StatePage,
  GetWinners,
  GetWinnersId,
  WinnersParams,
  SaveWinner,
  ObjNum,
};
