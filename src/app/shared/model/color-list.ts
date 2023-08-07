export class ColorList {
  static typeColors: { [key: string]: { backgroundColor: string; color: string } } = {
    bug: { backgroundColor: '#a8b820', color: '#fff' },
    dark: { backgroundColor: '#705848', color: '#fff' },
    dragon: { backgroundColor: '#7038f8', color: '#fff' },
    electric: { backgroundColor: '#f8d030', color: '#fff' },
    fairy: { backgroundColor: '#ee99ac', color: '#fff' },
    fighting: { backgroundColor: '#c03028', color: '#fff' },
    fire: { backgroundColor: '#f08030', color: '#fff' },
    flying: { backgroundColor: '#a890f0', color: '#fff' },
    ghost: { backgroundColor: '#705898', color: '#fff' },
    grass: { backgroundColor: '#78c850', color: '#fff' },
    ground: { backgroundColor: '#e0c068', color: '#fff' },
    ice: { backgroundColor: '#98d8d8', color: '#fff' },
    normal: { backgroundColor: '#a8a878', color: '#fff' },
    poison: { backgroundColor: '#a040a0', color: '#fff' },
    psychic: { backgroundColor: '#f85888', color: '#fff' },
    rock: { backgroundColor: '#b8a038', color: '#fff' },
    steel: { backgroundColor: '#b8b8d0', color: '#fff' },
    water: { backgroundColor: '#6890f0', color: '#fff' }
  };

  static getDefaultStyle(): any {
    return { backgroundColor: '#000', color: '#fff' };
  }
}
