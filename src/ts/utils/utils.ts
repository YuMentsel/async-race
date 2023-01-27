const createElement = (tag: string, className: string): HTMLElement => {
  const element: HTMLElement = document.createElement(tag);
  element.classList.add(className);
  return element;
};

const getExistentElement = <T extends HTMLElement>(selector: string, node: Document | HTMLElement = document): T => {
  const el = node.querySelector<T>(selector);
  if (el === null) throw new Error(`Element not found!`);
  return el;
};

export { createElement, getExistentElement };
