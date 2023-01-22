import { Car } from '../types/types';
import { createCarSVG, createFinishSVG } from './carSVG';

const createCarHTML = ({ id, name, color }: Car): string =>
  `<div class="car">
  <div class="car__controls">
    <button id="select-${id}" class="button button_car select" data-id="${id}">Select</button>
    <button id="remove-${id}" class="button button_car remove" data-id="${id}">Remove</button>
    <button id="start-${id}" class="button button_car-control start" data-start="${id}">A</button>
    <button id="stop-${id}" class="button button_car-control stop" data-stop="${id}" disabled>B</button>
    <span class="car__name">${name}</span>
    <span id="message-${id}" class="car__message"></span>
  </div>
  ${createCarSVG(id, color)}
  ${createFinishSVG(id)}
</div>`;

export default createCarHTML;
