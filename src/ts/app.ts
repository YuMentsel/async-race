import createElement from './utils/utils';
import createHeaderHTML from './components/header';
import createGarageHTML from './components/garage';
import createFooterHTML from './components/footer';

const render = () => {
  const header: HTMLElement = createElement('header', 'header');
  const garage: HTMLElement = createElement('main', 'garage');
  const footer: HTMLElement = createElement('footer', 'footer');

  header.innerHTML = createHeaderHTML();
  garage.innerHTML = createGarageHTML();
  footer.innerHTML = createFooterHTML();
  document.body.append(header, garage, footer);
};

export default { render };
