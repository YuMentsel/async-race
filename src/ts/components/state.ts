import { StateObj } from '../types/types';
import { getAllCars } from '../api/api';
import { getWinners } from '../api/winnersApi';

const state: StateObj = {
  cars: [],
  carsCount: 1,
  garagePage: 1,
  selectedId: null,
  animation: {},
  winners: [],
  winnersCount: 0,
  winnersPage: 1,
  page: 'garage',
  sortBy: null,
  sortOrder: null,
  selectedCarID: null,
};

const updateWinners = async () => {
  const { items, count } = await getWinners({ page: state.winnersPage, sort: state.sortBy, order: state.sortOrder });
  state.winners = items;
  state.winnersCount = count;
};

const updateCars = async () => {
  const { items, count } = await getAllCars(state.garagePage);
  state.cars = items;
  state.carsCount = count;
};

const updateState = async () => {
  await updateCars();
  await updateWinners();
};

export { state, updateState, updateWinners };
