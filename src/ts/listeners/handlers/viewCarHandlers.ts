import { getExistentElement } from '../../utils/utils';
import { renderGarage } from '../../app';
import { state, updateState } from '../../components/state';
import { getCar, createCar, updateCar, deleteCar } from '../../api/api';
import generateRandomCars from '../../utils/generateCars';
import { buttonDisable } from './paginationHandlers';
import { removeWinners, renderWinners } from '../../winners/winnersPage';
import { getWinner, deleteWinner } from '../../api/winnersApi';

const createCarHandler = async (e: Event) => {
  e.preventDefault();
  const name = getExistentElement<HTMLInputElement>('#create .options__input-text');
  const color = getExistentElement<HTMLInputElement>('#create .options__input-color');
  const carParams = new Map().set('name', name.value).set('color', color.value);
  const newCar = Object.fromEntries(carParams);
  await createCar(newCar);
  await updateState();
  renderGarage();
  name.value = '';
  color.value = '#ffffff';
  buttonDisable();
};

const updateCarHandler = async (e: Event) => {
  e.preventDefault();
  const name = getExistentElement<HTMLInputElement>('#update .options__input-text');
  const color = getExistentElement<HTMLInputElement>('#update .options__input-color');
  const button = getExistentElement<HTMLInputElement>('#update button');
  const updateParams = new Map().set('name', name.value).set('color', color.value);
  const car = Object.fromEntries(updateParams);
  if (state.selectedId !== null) {
    await updateCar(state.selectedId, car);
    await updateState();
    renderGarage();
  }
  name.value = '';
  color.value = '#ffffff';
  name.disabled = true;
  color.disabled = true;
  button.disabled = true;
  state.selectedId = null;
};

const selectCarHandler = async (target: HTMLButtonElement) => {
  if (!target.dataset.id) return;
  const { id } = target.dataset;
  getExistentElement<HTMLButtonElement>(`#race`).disabled = true;
  getExistentElement<HTMLButtonElement>(`#start-${id}`).disabled = true;
  const name = getExistentElement<HTMLInputElement>('#update .options__input-text');
  const color = getExistentElement<HTMLInputElement>('#update .options__input-color');
  const button = getExistentElement<HTMLInputElement>('#update button');
  const selectedCar = await getCar(+id);
  state.selectedId = +id;
  name.value = selectedCar.name;
  color.value = selectedCar.color;
  name.disabled = false;
  color.disabled = false;
  button.disabled = false;
};

const deleteCarHandler = async (target: HTMLButtonElement) => {
  if (!target.dataset.id) return;
  const id = +target.dataset.id;
  await deleteCar(id);
  if (await getWinner(id)) await deleteWinner(id);
  await updateState();
  renderGarage();
  removeWinners();
  renderWinners();
  buttonDisable();
};

const generateHandler = async (e: Event) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  e.target.disabled = true;
  const cars = generateRandomCars();
  await Promise.all(cars.map(async (car) => createCar(car)));
  await updateState();
  renderGarage();
  e.target.disabled = false;
  buttonDisable();
};

export { createCarHandler, updateCarHandler, selectCarHandler, deleteCarHandler, generateHandler };
