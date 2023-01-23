import { getExistentElement } from '../../utils/utils';
import { ObjNum } from '../../types/types';
import { state } from '../../components/state';
import { start, drive, stop } from '../../api/api';
import { buttonDisable } from './paginationHandlers';

const getPosition = (el: HTMLElement) => {
  const { left, width } = el.getBoundingClientRect();
  return left + width;
};

const getDistance = (car: HTMLElement, finish: HTMLElement) => getPosition(finish) - getPosition(car);

const animation = (car: HTMLElement, distance: number, animationTime: number) => {
  const animationState: ObjNum = {};
  const startTime = Date.now();
  async function getInterval() {
    const passedDistance = Math.round((Date.now() - startTime) * (distance / animationTime));

    const { style } = car;
    style.transform = `translateX(${Math.min(passedDistance, distance)}px)`;
    if (passedDistance < distance) {
      animationState.id = window.requestAnimationFrame(getInterval);
    }
  }
  animationState.id = window.requestAnimationFrame(getInterval);
  return animationState;
};

const setDisable = (id: number) => {
  getExistentElement<HTMLButtonElement>(`#start-${id}`).disabled = true;
  getExistentElement<HTMLButtonElement>(`#select-${id}`).disabled = true;
  getExistentElement<HTMLButtonElement>(`#remove-${id}`).disabled = true;
  getExistentElement<HTMLButtonElement>(`#race`).disabled = true;
  getExistentElement<HTMLButtonElement>('.prev').disabled = true;
  getExistentElement<HTMLButtonElement>('.next').disabled = true;
  getExistentElement<HTMLButtonElement>('#winners-btn').disabled = true;
  getExistentElement<HTMLButtonElement>('#create button').disabled = true;
  getExistentElement<HTMLButtonElement>('#generate-cars').disabled = true;
};

const startCar = async (id: number) => {
  setDisable(id);
  const { velocity, distance } = await start(id);
  getExistentElement<HTMLButtonElement>(`#stop-${id}`).disabled = false;
  const time = Math.round(distance / velocity);
  const car = getExistentElement(`#car-${id}`);
  const finish = getExistentElement(`#finish-${id}`);
  const docDistance = Math.floor(getDistance(car, finish) + 77);
  state.animation[id] = animation(car, docDistance, time);

  const { success } = await drive(id);
  if (success === false) {
    window.cancelAnimationFrame(state.animation[id].id);
    getExistentElement(`#message-${id}`).textContent = `The engine was broken down`;
  }
  setTimeout(() => {
    getExistentElement(`#message-${id}`).textContent = '';
  }, 1000);

  return { success, id, time };
};

const notDisable = (id: number) => {
  getExistentElement<HTMLButtonElement>(`#start-${id}`).disabled = false;
  getExistentElement<HTMLButtonElement>(`#select-${id}`).disabled = false;
  getExistentElement<HTMLButtonElement>(`#remove-${id}`).disabled = false;
  getExistentElement<HTMLButtonElement>('.prev').disabled = false;
  getExistentElement<HTMLButtonElement>('.next').disabled = false;
  getExistentElement<HTMLButtonElement>('#winners-btn').disabled = false;
  getExistentElement<HTMLButtonElement>('#create button').disabled = false;
  getExistentElement<HTMLButtonElement>('#generate-cars').disabled = false;
  buttonDisable();
};

const stopCar = async (id: number) => {
  getExistentElement(`#message-${id}`).textContent = '';
  getExistentElement<HTMLButtonElement>(`#stop-${id}`).disabled = true;
  getExistentElement<HTMLButtonElement>(`#reset`).disabled = true;
  window.cancelAnimationFrame(state.animation[id].id);
  await stop(id);
  const car = getExistentElement(`#car-${id}`);
  car.style.transform = 'translateX(0)';
  notDisable(id);
};

export { startCar, stopCar };
