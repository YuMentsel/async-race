import { getExistentElement } from '../../utils/utils';
import { ObjNum } from '../../types/types';
import { state } from '../../components/state';
import { start, drive, stop } from '../../api/api';
import { disableBtnWhenStart, disableBtnWhenStopReset } from '../../utils/disableButtons';

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
    if (passedDistance < distance) animationState.id = window.requestAnimationFrame(getInterval);
  }
  animationState.id = window.requestAnimationFrame(getInterval);
  return animationState;
};

const startCar = async (id: number) => {
  disableBtnWhenStart(id);
  const { velocity, distance } = await start(id);
  const time = Math.round(distance / velocity);
  const car = getExistentElement(`#car-${id}`);
  const finish = getExistentElement(`#finish-${id}`);
  const docDistance = Math.floor(getDistance(car, finish) + 75);
  state.animation[id] = animation(car, docDistance, time);

  const { success } = await drive(id);
  if (success === false) {
    window.cancelAnimationFrame(state.animation[id].id);
    const message = document.querySelector(`#message-${id}`);
    if (message) {
      message.textContent = `The engine was broken down`;

      setTimeout(() => {
        message.textContent = '';
      }, 1500);
    }
  }
  return { success, id, time };
};

const stopCar = async (id: number) => {
  getExistentElement<HTMLButtonElement>(`#stop-${id}`).disabled = true;
  window.cancelAnimationFrame(state.animation[id].id);
  await stop(id);
  const car = getExistentElement(`#car-${id}`);
  car.style.transform = 'translateX(0)';
  disableBtnWhenStopReset(id);
};

export { startCar, stopCar };
