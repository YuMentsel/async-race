import { getExistentElement } from '../utils/utils';
import { startCar, stopCar } from './handlers/animationCarsHandlers';
import { raceHandler, resetHandler } from './handlers/raceHandler';
import { showGaragePage, showWinnersPage } from './handlers/showPageHandler';
import { buttonDisable, prevButtonHandler, nextButtonHandler } from './handlers/paginationHandlers';

import {
  createCarHandler,
  updateCarHandler,
  selectCarHandler,
  deleteCarHandler,
  generateHandler,
} from './handlers/viewCarHandlers';

const listenEvents = () => {
  buttonDisable();
  getExistentElement<HTMLFormElement>('#create').addEventListener('submit', (e) => createCarHandler(e));
  getExistentElement<HTMLFormElement>('#update').addEventListener('submit', (e) => updateCarHandler(e));
  getExistentElement<HTMLButtonElement>('#race').addEventListener('click', (e) => raceHandler(e));
  getExistentElement<HTMLButtonElement>('#reset').addEventListener('click', (e) => resetHandler(e));
  getExistentElement<HTMLButtonElement>('#generate-cars').addEventListener('click', (e) => generateHandler(e));
  getExistentElement<HTMLButtonElement>('#garage-btn').addEventListener('click', showGaragePage);
  getExistentElement<HTMLButtonElement>('#winners-btn').addEventListener('click', showWinnersPage);

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
    if (target.classList.contains('prev')) prevButtonHandler();
    if (target.classList.contains('next')) nextButtonHandler();
  });
};

export default listenEvents;
