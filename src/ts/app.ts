import { createElement } from './utils/utils';
import createHeaderHTML from './components/base/header';
import { createPaginationHTML } from './components/base/garage';
import createFooterHTML from './components/base/footer';
import { renderGarageOptions, renderGarage } from './render/garagePage';

const renderPage = () => {
  const header: HTMLElement = createElement('header', 'header');
  const garage: HTMLElement = createElement('main', 'garage');
  const winners: HTMLElement = createElement('section', 'winners');
  const pagination: HTMLElement = createElement('section', 'pagination');
  const footer: HTMLElement = createElement('footer', 'footer');
  const win: HTMLElement = createElement('div', 'win');

  header.innerHTML = createHeaderHTML();
  pagination.innerHTML = createPaginationHTML();
  footer.innerHTML = createFooterHTML();

  document.body.append(header, garage, winners, pagination, footer, win);
};

const renderGaragePage = () => {
  renderGarageOptions();
  renderGarage();
};

export { renderPage, renderGaragePage };
