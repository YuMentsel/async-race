import { getExistentElement } from './utils';
import { state } from '../components/state';
import { ElemetnsOnPage, StatePage } from '../types/enams';

const areDisabled = () => {
  const btns = document.querySelectorAll('.stop');
  const disabledBtns = [...btns].filter((btn) => (btn instanceof HTMLButtonElement ? btn.disabled : null));
  return disabledBtns.length === btns.length;
};

const disableRacCreGen = (value: boolean) => {
  getExistentElement<HTMLButtonElement>(`#race`).disabled = value;
  getExistentElement<HTMLButtonElement>(`#create button`).disabled = value;
  getExistentElement<HTMLButtonElement>(`#generate-cars`).disabled = value;
};

const disableStSelRem = (value: boolean, id: number) => {
  getExistentElement<HTMLButtonElement>(`#start-${id}`).disabled = value;
  getExistentElement<HTMLButtonElement>(`#select-${id}`).disabled = value;
  getExistentElement<HTMLButtonElement>(`#remove-${id}`).disabled = value;
};

const disableBtnWhenSelect = (id: number) => {
  disableRacCreGen(true);
  getExistentElement<HTMLButtonElement>(`#start-${id}`).disabled = true;
  getExistentElement<HTMLButtonElement>(`#remove-${id}`).disabled = true;
};

const disableBtnWhenStart = (id: number) => {
  disableRacCreGen(true);
  disableStSelRem(true, id);
  getExistentElement<HTMLButtonElement>('#winners-btn').disabled = true;
  getExistentElement<HTMLButtonElement>('.prev').disabled = true;
  getExistentElement<HTMLButtonElement>('.next').disabled = true;
};

const paginationBtnDisable = () => {
  const prevButton = getExistentElement<HTMLButtonElement>('.prev');
  const nextButton = getExistentElement<HTMLButtonElement>('.next');
  const page = getExistentElement('#page');

  if (state.page === StatePage.garage) {
    page.textContent = state.garagePage.toString();

    if (state.garagePage > 1) prevButton.disabled = false;
    else prevButton.disabled = true;

    if (state.garagePage * ElemetnsOnPage.cars < state.carsCount) nextButton.disabled = false;
    else nextButton.disabled = true;
  } else {
    page.textContent = state.winnersPage.toString();

    if (state.winnersPage > 1) prevButton.disabled = false;
    else prevButton.disabled = true;

    if (state.winnersPage * ElemetnsOnPage.winners < state.winnersCount) nextButton.disabled = false;
    else nextButton.disabled = true;
  }
};

const disableBtnWhenStop = () => {
  if (areDisabled()) {
    disableRacCreGen(false);
    getExistentElement<HTMLButtonElement>('#reset').disabled = true;
    getExistentElement<HTMLButtonElement>('#winners-btn').disabled = false;
    paginationBtnDisable();
  }
};

const disableBtnWhenStopReset = (id: number) => {
  const resetBtn = getExistentElement<HTMLButtonElement>('#reset');
  if (resetBtn.disabled) getExistentElement<HTMLButtonElement>(`#start-${id}`).disabled = false;
  getExistentElement<HTMLButtonElement>(`#select-${id}`).disabled = false;
  getExistentElement<HTMLButtonElement>(`#remove-${id}`).disabled = false;
};

const disableBtnWhenReset = (id: number) => {
  disableRacCreGen(false);
  disableStSelRem(false, id);
  getExistentElement<HTMLButtonElement>('#winners-btn').disabled = false;
  paginationBtnDisable();
};

export {
  areDisabled,
  disableBtnWhenSelect,
  disableRacCreGen,
  disableBtnWhenStop,
  disableBtnWhenStart,
  disableBtnWhenReset,
  disableBtnWhenStopReset,
  paginationBtnDisable,
};
