import { getExistentElement } from '../../utils/utils';
import { buttonDisable } from './paginationHandlers';
import { state } from '../../components/state';
import { StatePage } from '../../types/types';

const showGaragePage = async () => {
  getExistentElement('.garage').style.display = 'block';
  getExistentElement('.options').style.display = 'block';

  state.page = StatePage.garage;
  buttonDisable();
};

const showWinnersPage = async () => {
  getExistentElement('.garage').style.display = 'none';
  getExistentElement('.options').style.display = 'none';

  state.page = StatePage.winners;
  buttonDisable();
};

export { showGaragePage, showWinnersPage };
