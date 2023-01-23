import { UpdateCar } from '../types/types';

const names: string[] = [
  'Audi',
  'Alfa Romeo',
  'Bentley',
  'BMW',
  'Chevrolet',
  'Daewoo',
  'Ford',
  'Ferrari',
  'Fiat',
  'Honda',
  'Hyundai',
  'Infiniti',
  'Jaguar',
  'Jeep',
  'Lada',
  'Mazda',
  'Mitsubishi',
  'Nissan',
  'Opel',
  'Porsche',
  'Renault',
  'Seat',
  'Skoda',
  'Subaru',
  'Suzuki',
  'Tesla',
  'Toyota',
  'Volkswagen',
  'Volvo',
];

const models: string[] = [
  'A5',
  'A8',
  'Aventador',
  'Arkana',
  'Camry',
  'Captiva',
  'Cayenne',
  'Corolla',
  'Cybertruck',
  'Dawn',
  'Duster',
  'Enzo',
  'Focus',
  'Gallardo',
  'Impreza',
  'Kalina',
  'Logan',
  'Matiz',
  'Nexia',
  'Phantom',
  'Polo',
  'Priora',
  'RAV4',
  'Rio',
  'Sandero',
  'Sedan',
  'Spark',
  'Vesta',
  'X5',
  'X7',
  'TT',
];

const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const getRandomCarName = () => `${getRandom(names)} ${getRandom(models)}`;

const getRandomCarColor = () => {
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += getRandom(hex);
  }
  return color;
};

const generateRandomCars = (countCars = 100): UpdateCar[] =>
  Array(countCars)
    .fill(0)
    .map(() => ({
      name: getRandomCarName(),
      color: getRandomCarColor(),
    }));

export default generateRandomCars;
