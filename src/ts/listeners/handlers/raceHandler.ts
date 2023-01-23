import { state } from '../../components/state';
import { startCar, stopCar } from './animationCarsHandlers';
import { Winners, Winner } from '../../types/types';
import { getExistentElement } from '../../utils/utils';
import getWinner from '../../utils/getWinner';

const startRace = async (act: (id: number) => Promise<Winners>) => {
  const promises: Promise<Winners>[] = state.cars.map(({ id }) => act(id));
  return (await getWinner(
    promises,
    state.cars.map((car) => car.id)
  )) as Winner;
};

const raceHandler = async (e: Event) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  e.target.disabled = true;
  const winner = await startRace(startCar);
  getExistentElement<HTMLFormElement>('#reset').disabled = false;
  console.log(winner);
};

const resetHandler = (e: Event) => {
  if (!(e.target instanceof HTMLButtonElement)) return;
  e.target.disabled = true;
  state.cars.forEach(({ id }) => stopCar(id));

  getExistentElement<HTMLFormElement>('#race').disabled = false;
};

export { raceHandler, resetHandler };
