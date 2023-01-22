import { getExistentElement } from '../utils/utils';
import { startCar, stopCar } from './animationCars';
import { createCarHandler, updateCarHandler, selectCarHandler, deleteCarHandler } from './viewCarHandlers';

const raceHandler = async (e: Event) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  e.target.disabled = true;
  getExistentElement<HTMLFormElement>('#reset').disabled = false;
};

const resetHandler = async (e: Event) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  e.target.disabled = true;
  getExistentElement<HTMLFormElement>('#race').disabled = false;
};

const listenEvents = async () => {
  getExistentElement<HTMLFormElement>('#create').addEventListener('submit', (e) => createCarHandler(e));
  getExistentElement<HTMLFormElement>('#update').addEventListener('submit', (e) => updateCarHandler(e));
  getExistentElement<HTMLButtonElement>('#race').addEventListener('click', (e) => raceHandler(e));
  getExistentElement<HTMLButtonElement>('#reset').addEventListener('click', (e) => resetHandler(e));

  document.addEventListener('click', async (e) => {
    const { target } = e;
    if (!(target instanceof HTMLButtonElement)) return;
    console.log(target);
    if (target.classList.contains('select')) selectCarHandler(target);
    if (target.classList.contains('remove')) deleteCarHandler(target);
    if (target.classList.contains('start')) deleteCarHandler(target);
    if (target.classList.contains('stop')) deleteCarHandler(target);
    if (target.classList.contains('start') && target.dataset.start) startCar(+target.dataset.start);
    if (target.classList.contains('stop') && target.dataset.stop) stopCar(+target.dataset.stop);
  });
};

export default listenEvents;
