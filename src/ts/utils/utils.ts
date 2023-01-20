const createElement = (tag: string, className: string): HTMLElement => {
  const element: HTMLElement = document.createElement(tag);
  element.classList.add(className);
  return element;
};

export default createElement;
