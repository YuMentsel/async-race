import { state, updateWinners } from '../../components/state';
import { startCar, stopCar } from './animationCarsHandlers';
import { Winners, NewWinner } from '../../types/types';
import { getExistentElement } from '../../utils/utils';
import getWinner from '../../utils/getWinner';
import { removeWinners, renderWinners } from '../../render/winnersPage';
import { saveWinners } from '../../api/winnersApi';
import { disableBtnWhenReset } from '../../utils/disableButtons';

const startRace = async (act: (id: number) => Promise<Winners>) => {
  state.cars.forEach((car) => {
    getExistentElement<HTMLButtonElement>(`#stop-${car.id}`).disabled = true;
  });
  const promises: Promise<Winners>[] = state.cars.map(({ id }) => act(id));
  return (await getWinner(
    promises,
    state.cars.map((car) => car.id)
  )) as NewWinner;
};

const raceHandler = async (e: Event) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  e.target.disabled = true;
  const winner = await startRace(startCar);
  getExistentElement<HTMLFormElement>('#reset').disabled = false;
  if (winner === null) return;
  const win = getExistentElement('.win');
  win.innerHTML = `${winner.name} went first in ${winner.time} seconds!`;
  win.style.display = 'flex';
  await saveWinners(winner);
  await updateWinners();
  removeWinners();
  renderWinners();
};

const resetHandler = async (e: Event) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  e.target.disabled = true;
  getExistentElement('.win').style.display = 'none';
  let counter = 0;
  state.cars.forEach(async ({ id }) => {
    await stopCar(id);
    counter += 1;
    if (counter === state.cars.length) disableBtnWhenReset(id);
  });
};

export { raceHandler, resetHandler };
