import { getExistentElement } from '../../utils/utils';
import { paginationBtnDisable } from '../../utils/disableButtons';
import { state } from '../../components/state';
import { StatePage } from '../../types/enams';
import { removeWinners, renderWinners } from '../../render/winnersPage';

const showGaragePage = () => {
  getExistentElement('.garage').style.display = 'block';
  getExistentElement('.options').style.display = 'block';
  getExistentElement('.winners').style.display = 'none';

  state.page = StatePage.garage;
  getExistentElement<HTMLButtonElement>('#winners-btn').disabled = false;
  getExistentElement<HTMLButtonElement>('#garage-btn').disabled = true;
  paginationBtnDisable();
};

const showWinnersPage = () => {
  removeWinners();
  renderWinners();
  getExistentElement('.garage').style.display = 'none';
  getExistentElement('.options').style.display = 'none';
  getExistentElement('.winners').style.display = 'block';

  state.page = StatePage.winners;
  getExistentElement<HTMLButtonElement>('#winners-btn').disabled = true;
  getExistentElement<HTMLButtonElement>('#garage-btn').disabled = false;
  paginationBtnDisable();
};

export { showGaragePage, showWinnersPage };
