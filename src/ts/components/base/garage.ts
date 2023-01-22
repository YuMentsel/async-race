import createCarHTML from '../car';
import { state } from '../state';

const createGarageOptionsHTML = (): string =>
  `<div class="container">
    <form id="create" class="options__form">
      <input class="options__input-text" type="text">
      <input class="options__input-color" value="#ffffff" type="color">
      <button class="button" type="submit">Create</button>
    </form>
    <form id="update" class="options__form">
      <input class="options__input-text" type="text">
      <input class="options__input-color" value="#ffffff" type="color" disabled>
      <button class="button" type="submit" disabled>Update</button>
    </form>
    <div class="options__race">
      <button class="button_race button race">Race</button>
      <button class="button_race button reset">Reset</button>
      <button class="button generate-cars">Generate cars</button>
    </div>
  </div>`;

const createGarageHTML = (page = 1): string =>
  `<div class="container">
    <h2 class="garage__title">Garage (${state.carsCount})</h2>
    <div class="garage__content">
    ${state.cars.map((car) => `${createCarHTML(car)}`).join('')}
    </div>
    <div class="garage__pagination pagination">
      <button class="button prev">Prev</button>
      <span class="pagination__page">${page}</span>
      <button class="button next">Next</button>
    </div>
  </div>`;

export { createGarageHTML, createGarageOptionsHTML };
