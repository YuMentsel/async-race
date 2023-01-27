import { createElement, getExistentElement } from '../utils/utils';
import { createGarageHTML, createGarageOptionsHTML } from '../components/base/garage';

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

  getExistentElement('.pagination').before(garage);
};

export { renderGarageOptions, renderGarage };
