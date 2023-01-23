import { state } from '../components/state';
import { Winners, Winner } from '../types/types';

const getWinner = async (promises: Promise<Winners>[], ids: number[]): Promise<Winner | null> => {
  const { success, id, time } = await Promise.race(promises);
  if (!success) {
    const failed: number = ids.findIndex((i) => i === id);
    promises.splice(failed, 1);
    ids.splice(failed, 1);
    return promises.length ? getWinner(promises, ids) : null;
  }
  return {
    ...state.cars.find((car) => car.id === id),
    time: +(time / 1000).toFixed(2),
  };
};

export default getWinner;
