import { getExistentElement } from '../utils/utils';
import { paginationBtnDisable, disableBtnWhenStop } from '../utils/disableButtons';
import { startCar, stopCar } from './handlers/animationCarsHandlers';
import { raceHandler, resetHandler } from './handlers/raceHandler';
import { showGaragePage, showWinnersPage } from './handlers/showPageHandler';
import { prevButtonHandler, nextButtonHandler } from './handlers/paginationHandlers';

import {
  createCarHandler,
  updateCarHandler,
  selectCarHandler,
  deleteCarHandler,
  generateHandler,
} from './handlers/viewCarHandlers';

const listenEvents = () => {
  paginationBtnDisable();
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
    if (target.classList.contains('select')) selectCarHandler(target);
    if (target.classList.contains('remove')) deleteCarHandler(target);
    if (target.classList.contains('start') && target.dataset.start) {
      const id: number = +target.dataset.start;
      startCar(id);
      getExistentElement<HTMLButtonElement>(`#stop-${id}`).disabled = false;
    }
    if (target.classList.contains('stop') && target.dataset.stop) {
      const id: number = +target.dataset.stop;
      await stopCar(id);
      disableBtnWhenStop();
    }
    if (target.classList.contains('prev')) prevButtonHandler();
    if (target.classList.contains('next')) nextButtonHandler();
  });
};

export default listenEvents;
