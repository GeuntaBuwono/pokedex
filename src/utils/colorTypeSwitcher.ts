import {PokemonType} from 'schema/PokemonSchema';

type ReturnType =
  | '#2196F3'
  | '#81D4FA'
  | '#FFEB3B'
  | '#4CAF50'
  | '#616161'
  | '#795548'
  | '#A1887F'
  | '#616161'
  | '#BDBDBD'
  | '#FF7043'
  | '#F44336'
  | '#E53935'
  | '#66BB6A'
  | '#4FC3F7'
  | 'red';

const colorTypeSwitcher = ({type}: {type: PokemonType}): ReturnType => {
  switch (type) {
    case 'water':
      return '#2196F3';
    case 'ice':
      return '#81D4FA';
    case 'electric':
      return '#FFEB3B';
    case 'poison':
      return '#4CAF50';
    case 'dark':
      return '#616161';
    case 'ground':
      return '#795548';
    case 'shadow':
      return '#A1887F';
    case 'ghost':
      return '#616161';
    case 'steel':
      return '#BDBDBD';
    case 'bug':
      return '#FF7043';
    case 'dragon':
      return '#F44336';
    case 'fire':
      return '#E53935';
    case 'grass':
      return '#66BB6A';
    case 'flying':
      return '#4FC3F7';
    default:
      return 'red';
  }
};

export default colorTypeSwitcher;
