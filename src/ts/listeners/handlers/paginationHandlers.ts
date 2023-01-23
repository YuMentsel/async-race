import { getExistentElement, carsOnPage } from '../../utils/utils';
import { state, updateState } from '../../components/state';
import { StatePage } from '../../types/types';
import { renderGarage } from '../../app';

const buttonDisable = async () => {
  const prevButton = getExistentElement<HTMLButtonElement>('.prev');
  const nextButton = getExistentElement<HTMLButtonElement>('.next');
  if (state.page === StatePage.garage) {
    if (state.garagePage > 1) {
      prevButton.disabled = false;
    } else {
      prevButton.disabled = true;
    }
    if (state.garagePage * carsOnPage < state.carsCount) {
      nextButton.disabled = false;
    } else {
      nextButton.disabled = true;
    }
  }
};

const prevButtonHandler = async () => {
  if (state.page === StatePage.garage) {
    state.garagePage -= 1;
    await updateState();
    renderGarage();
  }
  buttonDisable();
};

const nextButtonHandler = async () => {
  if (state.page === StatePage.garage) {
    state.garagePage += 1;
    await updateState();
    renderGarage();
  }
  buttonDisable();
};

const checkCars = () => {
  if (!(state.carsCount % carsOnPage)) {
    prevButtonHandler();
  }
};

export { buttonDisable, prevButtonHandler, nextButtonHandler, checkCars };
