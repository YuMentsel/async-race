import { createElement, getExistentElement } from './utils/utils';
import createHeaderHTML from './components/base/header';
import { createGarageHTML, createGarageOptionsHTML } from './components/base/garage';
import createFooterHTML from './components/base/footer';

const renderPage = () => {
  const header: HTMLElement = createElement('header', 'header');
  const garage: HTMLElement = createElement('main', 'garage');
  const footer: HTMLElement = createElement('footer', 'footer');

  header.innerHTML = createHeaderHTML();
  footer.innerHTML = createFooterHTML();

  document.body.append(header, garage, footer);
};

const renderGarageOptions = () => {
  const garage: HTMLElement = createElement('section', 'options');
  garage.innerHTML = createGarageOptionsHTML();

  getExistentElement('.header').after(garage);
};

const removeGarage = () => {
  const garage = getExistentElement('.garage');
  garage.parentNode?.removeChild(garage);
};

const renderGarage = () => {
  removeGarage();
  const garage: HTMLElement = createElement('main', 'garage');
  garage.innerHTML = createGarageHTML();

  getExistentElement('.footer').before(garage);
};

const renderGaragePage = () => {
  renderGarageOptions();
  renderGarage();
};

export { renderPage, renderGarage, renderGaragePage };
