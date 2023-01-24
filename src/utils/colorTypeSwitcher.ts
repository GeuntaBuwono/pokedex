import {PokemonType} from 'schema/PokemonSchema';

const colorTypeSwitcher = ({type}: {type: PokemonType}) => {
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
