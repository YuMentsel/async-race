import { WinnersParams, GetWinners, GetWinnersId, SaveWinner } from '../types/types';
import { getCar } from './api';

const winnersUrl = `http://localhost:3000/winners`;

const getSortOrder = (sort: string | null, order: string | null) =>
  sort && order ? `&_sort=${sort}&_order=${order}` : '';

const getWinners = async ({ page, limit = 10, sort, order }: WinnersParams): Promise<GetWinnersId> => {
  const res = await fetch(`${winnersUrl}?_page=${page}&_limit=${limit}&${getSortOrder(sort, order)}`);
  const items = await res.json();
  return {
    items: await Promise.all(items.map(async (winner: GetWinners) => ({ ...winner, car: await getCar(winner.id) }))),
    count: Number(res.headers.get('X-Total-Count')),
  };
};

const getWinner = async (id: number): Promise<GetWinners> => (await fetch(`${winnersUrl}/${id}`)).json();

const deleteWinner = async (id: number) => (await fetch(`${winnersUrl}/${id}`, { method: 'DELETE' })).json();

const createWinner = async (body: GetWinners) =>
  (
    await fetch(`${winnersUrl}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();

const updateWinner = async (id: number, body: GetWinners) =>
  (
    await fetch(`${winnersUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  ).json();

const getWinnerStatus = async (id: number) => (await fetch(`${winnersUrl}/${id}`)).status;

const saveWinners = async ({ id, time }: SaveWinner) => {
  const winnerStatus = await getWinnerStatus(id);
  if (winnerStatus === 404) {
    await createWinner({ id, wins: 1, time });
  } else {
    const winner: GetWinners = await getWinner(id);
    await updateWinner(id, { id, wins: winner.wins + 1, time: time < winner.time ? time : winner.time });
  }
};

export { getWinner, getWinners, saveWinners, deleteWinner };
