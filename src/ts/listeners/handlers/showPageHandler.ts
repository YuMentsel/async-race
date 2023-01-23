import { getExistentElement } from '../../utils/utils';
import { buttonDisable } from './paginationHandlers';
import { state } from '../../components/state';
import { StatePage } from '../../types/types';
import { removeWinners, renderWinners } from '../../winners/winnersPage';

const showGaragePage = async () => {
  getExistentElement('.garage').style.display = 'block';
  getExistentElement('.options').style.display = 'block';
  getExistentElement('.winners').style.display = 'none';

  state.page = StatePage.garage;
  buttonDisable();
};

const showWinnersPage = async () => {
  removeWinners();
  renderWinners();
  getExistentElement('.garage').style.display = 'none';
  getExistentElement('.options').style.display = 'none';
  getExistentElement('.winners').style.display = 'block';

  state.page = StatePage.winners;
  buttonDisable();
};

export { showGaragePage, showWinnersPage };
