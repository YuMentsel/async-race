import { Car } from '../types/types';
import { createCarSVG, createFinishSVG } from './carSVG';

const createCarHTML = ({ id, name, color }: Car): string =>
  `<div class="car" id="${id}">
  <div class="car__controls">
    <button class="button button_car select" data-id="${id}">Select</button>
    <button class="button button_car remove" data-id="${id}">Remove</button>
    <button class="button button_car-control start">A</button>
    <button class="button button_car-control stop">B</button>
    <span class="car__name">${name}</span>
  </div>
  ${createCarSVG(color)}
  ${createFinishSVG()}
</div>`;

export default createCarHTML;
