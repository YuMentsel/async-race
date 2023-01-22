import { Car, Cars, CreateCar, UpdateCar, RaceParams, Engine } from '../types/types';

const server = 'http://localhost:3000';
const garage = `${server}/garage`;
const engine = `${server}/engine`;

const getAllCars = async (page: number, limit = 7): Promise<Cars> => {
  const res = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
  return {
    items: await res.json(),
    count: Number(res.headers.get('X-Total-Count')),
  };
};

const getCar = async (id: number): Promise<Car> => (await fetch(`${garage}/${id}`)).json();

const createCar = async (body: CreateCar) =>
  (
    await fetch(`${garage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  ).json();

const updateCar = async (id: number, body: UpdateCar) =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  ).json();

const deleteCar = async (id: number) =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'DELETE',
    })
  ).json();

const start = async (id: number): Promise<RaceParams> =>
  (
    await fetch(`${engine}?id=${id}&status=started`, {
      method: 'PATCH',
    })
  ).json();

const stop = async (id: number): Promise<RaceParams> =>
  (
    await fetch(`${engine}?id=${id}&status=stopped`, {
      method: 'PATCH',
    })
  ).json();

const drive = async (id: number): Promise<Engine> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch();
  return res.status === 200 ? { ...(await res.json()) } : { success: false };
};

export { getAllCars, getCar, createCar, updateCar, deleteCar, start, stop, drive };
