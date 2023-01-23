import { getExistentElement, carsOnPage, winnerssOnPage } from '../../utils/utils';
import { state, updateWinners, updateCars } from '../../components/state';
import { renderWinners, removeWinners } from '../../winners/winnersPage';
import { StatePage } from '../../types/types';
import { renderGarage } from '../../app';

const buttonDisable = () => {
  const prevButton = getExistentElement<HTMLButtonElement>('.prev');
  const nextButton = getExistentElement<HTMLButtonElement>('.next');
  const page = getExistentElement('#page');
  if (state.page === StatePage.garage) {
    page.textContent = state.garagePage.toString();
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
  } else {
    page.textContent = state.winnersPage.toString();
    if (state.winnersPage > 1) {
      prevButton.disabled = false;
    } else {
      prevButton.disabled = true;
    }
    if (state.winnersPage * winnerssOnPage < state.winnersCount) {
      nextButton.disabled = false;
    } else {
      nextButton.disabled = true;
    }
  }
};

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
  buttonDisable();
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
  buttonDisable();
};

const checkCars = () => {
  if (!(state.carsCount % carsOnPage)) {
    prevButtonHandler();
  }
};

export { buttonDisable, prevButtonHandler, nextButtonHandler, checkCars };
