import { StateObj } from '../types/types';
import { getAllCars } from '../api/api';

const state: StateObj = {
  cars: [],
  carsCount: 1,
  garagePage: 1,
  selectedId: null,
  page: 'garage',
  animation: {},
};

const updateCars = async () => {
  const { items, count } = await getAllCars(state.garagePage);
  state.cars = items;
  state.carsCount = count;
};

const updateState = async () => {
  await updateCars();
};

export { state, updateState };