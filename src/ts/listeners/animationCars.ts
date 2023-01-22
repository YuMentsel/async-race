import { getExistentElement } from '../utils/utils';
import { ObjNum } from '../types/types';
import { state } from '../components/state';
import { start, drive, stop } from '../api/api';

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

const startDisable = (id: number) => {
  getExistentElement<HTMLButtonElement>(`#start-${id}`).disabled = true;
  getExistentElement<HTMLButtonElement>(`#stop-${id}`).disabled = false;
  getExistentElement<HTMLButtonElement>(`#select-${id}`).disabled = true;
  getExistentElement<HTMLButtonElement>(`#remove-${id}`).disabled = true;
};

const startCar = async (id: number) => {
  startDisable(id);
  const { velocity, distance } = await start(id);
  const time = Math.round(distance / velocity);
  const car = getExistentElement(`#car-${id}`);
  const finish = getExistentElement(`#finish-${id}`);
  const docDistance = Math.floor(getDistance(car, finish) + 77);
  state.animation[id] = animation(car, docDistance, time);

  const { success } = await drive(id);
  if (!success) {
    window.cancelAnimationFrame(state.animation[id].id);
    getExistentElement(`#message-${id}`).textContent = `The engine was broken down`;
  }

  return { success, id, time };
};

const stopDisable = (id: number) => {
  getExistentElement<HTMLButtonElement>(`#start-${id}`).disabled = false;
  getExistentElement<HTMLButtonElement>(`#stop-${id}`).disabled = true;
  getExistentElement<HTMLButtonElement>(`#select-${id}`).disabled = false;
  getExistentElement<HTMLButtonElement>(`#remove-${id}`).disabled = false;
};

const stopCar = async (id: number) => {
  window.cancelAnimationFrame(state.animation[id].id);
  await stop(id);
  getExistentElement(`#message-${id}`).textContent = '';
  const car = getExistentElement(`#car-${id}`);
  car.style.transform = 'translateX(0)';
  stopDisable(id);
};

export { startCar, stopCar };
