import createCarHTML from './car';

const createGarageOptionsHTML = (): string =>
  `<div class="garage__options">
        <form class="garage__form">
          <input class="garage__input-text" type="text">
          <input class="garage__input-color" value="#ffffff" type="color">
          <button class="button">Create</button>
        </form>
        <form class="garage__form">
          <input class="garage__input-text" type="text">
          <input class="garage__input-color" value="#ffffff" type="color" disabled>
          <button class="button">Update</button>
        </form>
        <div class="garage__race">
          <button class="button_race button race">Race</button>
          <button class="button_race button reset">Reset</button>
          <button class="button generate-cars">Generate cars</button>
        </div>
      </div>`;

const createGarageHTML = (page = 1): string =>
  `<div class="container">
    ${createGarageOptionsHTML()}
      <h2 class="garage__title">Garage (<span class="garage__total">1</span>)</h2>
      <div class="garage__content">
      ${createCarHTML()}
      </div>
      <div class="garage__pagination pagination">
        <button class="button prev">Prev</button>
        <span class="pagination__page">${page}</span>
        <button class="button next">Next</button>
      </div>
    </div>`;

export default createGarageHTML;
