import createWinnersHTML from '../components/base/winners';
import { getExistentElement, createElement } from '../utils/utils';

const renderWinners = () => {
  const winners: HTMLElement = createElement('section', 'winners');
  winners.innerHTML = createWinnersHTML();

  getExistentElement('.pagination').before(winners);
};

const removeWinners = () => {
  const winners = getExistentElement('.winners');
  winners.parentNode?.removeChild(winners);
};

export { renderWinners, removeWinners };
