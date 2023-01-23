import { state, updateWinners } from '../../components/state';
import { startCar, stopCar } from './animationCarsHandlers';
import { Winners, NewWinner } from '../../types/types';
import { getExistentElement } from '../../utils/utils';
import getWinner from '../../utils/getWinner';
import { removeWinners, renderWinners } from '../../winners/winnersPage';
import { saveWinners } from '../../api/winnersApi';

const startRace = async (act: (id: number) => Promise<Winners>) => {
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
  console.log(winner);
  const win = getExistentElement('.win');
  win.innerHTML = `${winner.name} went first in ${winner.time} seconds!`;
  win.style.display = 'flex';
  await saveWinners(winner);
  await updateWinners();
  removeWinners();
  renderWinners();
};

const resetHandler = (e: Event) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  e.target.disabled = true;
  getExistentElement('.win').style.display = 'none';
  state.cars.forEach(({ id }) => stopCar(id));

  getExistentElement<HTMLFormElement>('#race').disabled = false;
};

export { raceHandler, resetHandler };
