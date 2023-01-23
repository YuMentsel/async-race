import { createElement, getExistentElement } from './utils/utils';
import createHeaderHTML from './components/base/header';
import { createGarageHTML, createGarageOptionsHTML, createPaginationHTML } from './components/base/garage';
import createFooterHTML from './components/base/footer';

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

const renderGarageOptions = () => {
  const garage: HTMLElement = createElement('section', 'options');
  garage.innerHTML = createGarageOptionsHTML();

  getExistentElement('.header').after(garage);
};

// const renderPagination = () => {
//   const pagination: HTMLElement = createElement('section', 'options');
//   pagination.innerHTML = createPaginationHTML();

//   getExistentElement('.footer').before(pagination);
// };

const removeGarage = () => {
  const garage = getExistentElement('.garage');
  garage.parentNode?.removeChild(garage);
};

const renderGarage = () => {
  removeGarage();
  const garage: HTMLElement = createElement('main', 'garage');
  garage.innerHTML = createGarageHTML();

  getExistentElement('.pagination').before(garage);
};

const renderGaragePage = () => {
  renderGarageOptions();
  renderGarage();
};

export { renderPage, renderGarage, renderGaragePage };
