import { getExistentElement } from '../utils/utils';
import { renderGarage } from '../app';
import { state, updateState } from '../components/state';
import { getCar, createCar, updateCar, deleteCar } from '../api/api';

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
  const name = getExistentElement<HTMLInputElement>('#update .options__input-text');
  const color = getExistentElement<HTMLInputElement>('#update .options__input-color');
  const button = getExistentElement<HTMLInputElement>('#update button');
  const selectedCar = await getCar(+target.dataset.id);
  state.selectedId = +target.dataset.id;
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
  await updateState();
  renderGarage();
};

export { createCarHandler, updateCarHandler, selectCarHandler, deleteCarHandler };
