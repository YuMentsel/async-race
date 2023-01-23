import { WinnerId } from '../../types/types';
import { state } from '../state';
import { createCarSVG } from '../carSVG';

const createWinnersTable = (winners: WinnerId[]) => {
  const winnersTable = winners.map(
    (winner, index) =>
      `<tr>
      <td>${index + 1}</td>
      <td>${createCarSVG(winner.car.color)}</td>
      <td>${winner.car.name}</td>
      <td>${winner.wins}</td>
      <td>${winner.time}</td>
    </tr>`
  );
  return winnersTable.join('\n');
};

const createWinnersHTML = () =>
  `<div class="container">
    <h2>Winners: ${state.winnersCount}</h2>
    <table class="winners__table" cellspacing ="0" cellpadding="0">
      <thead>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th class="winners__button wins" id = "sort-by-wins">Wins</th>
        <th class="winners__button time" id = "sort-by-time">Best time (s)</th>
      </thead>
      <tbody>
      ${createWinnersTable(state.winners)}
      </tbody>
    </table>
  </div>`;

export default createWinnersHTML;
