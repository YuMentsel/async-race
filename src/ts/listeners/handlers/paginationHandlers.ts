import { getExistentElement } from '../../utils/utils';
import { paginationBtnDisable } from '../../utils/disableButtons';
import { state, updateWinners, updateCars } from '../../components/state';
import { renderWinners, removeWinners } from '../../render/winnersPage';
import { StatePage } from '../../types/enams';
import { renderGarage } from '../../render/garagePage';

const prevButtonHandler = async () => {
  if (state.page === StatePage.garage) {
    state.garagePage -= 1;
    await updateCars();
    renderGarage();
  } else {
    state.winnersPage -= 1;
    await updateWinners();
    removeWinners();
    renderWinners();
    getExistentElement('.winners').style.display = 'block';
  }
  paginationBtnDisable();
};

const nextButtonHandler = async () => {
  if (state.page === StatePage.garage) {
    state.garagePage += 1;
    await updateCars();
    renderGarage();
  } else {
    state.winnersPage += 1;
    await updateWinners();
    removeWinners();
    renderWinners();
    getExistentElement('.winners').style.display = 'block';
  }
  paginationBtnDisable();
};

const checkCars = () => {
  if (state.cars.length === 0) prevButtonHandler();
};

export { prevButtonHandler, nextButtonHandler, checkCars };
