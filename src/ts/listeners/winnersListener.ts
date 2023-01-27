import { updateWinners, state } from '../components/state';
import { removeWinners, renderWinners } from '../render/winnersPage';
import { getExistentElement } from '../utils/utils';
import { SortBy, SortOrder } from '../types/enams';

const sortWinners = async (sortType: SortBy) => {
  state.sortBy = sortType;
  state.sortOrder = state.sortOrder === SortOrder.asc ? SortOrder.desc : SortOrder.asc;
  await updateWinners();
  removeWinners();
  renderWinners();
  getExistentElement('.winners').style.display = 'block';
};

const listenerWinnersSort = () => {
  document.addEventListener('click', async (e) => {
    const { target } = e;
    if (!(target instanceof HTMLTableCellElement)) return;
    if (target.classList.contains('wins')) sortWinners(SortBy.wins);
    if (target.classList.contains('time')) sortWinners(SortBy.time);
  });
};

export default listenerWinnersSort;
