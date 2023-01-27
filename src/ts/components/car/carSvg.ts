import { carSvgDrawnPath, finishSvgDrawnPath } from './svgDrawnPath';

const createCarSvg = (color = '#ffffff'): string =>
  `<svg viewBox="0 0 696 244"><path d="${carSvgDrawnPath}" fill="${color}"/></svg>`;

const createFinishSvg = (id: number): string =>
  `<div id="finish-${id}" class="car__finish">
    <svg viewBox="0 0 32 44"><path d="${finishSvgDrawnPath}" fill="#ffffff"/></svg>
  </div>`;

export { createCarSvg, createFinishSvg };
