import { createCarSVG, createFinishSVG } from './carSVG';

const createCarHTML = (): string =>
  `<div class="car">
  <div class="car__controls">
    <button class="button button_car select">Select</button>
    <button class="button button_car remove">Remove</button>
    <button class="button button_car-control start">A</button>
    <button class="button button_car-control stop">B</button>
    <span class="car__name">Tesla</span>
  </div>
  ${createCarSVG()}
  ${createFinishSVG()}
</div>`;

export default createCarHTML;
