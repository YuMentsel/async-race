import './index.html';
import './index.scss';
import { renderPage, renderGaragePage } from './ts/app';
import listenEvents from './ts/listeners/garageListener';
import listenerWinnersSort from './ts/listeners/winnersListener';
import { updateState } from './ts/components/state';

const render = async () => {
  await updateState();
  renderPage();
  renderGaragePage();
  listenEvents();
  listenerWinnersSort();
};

render();
