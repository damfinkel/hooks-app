export const MAX_POWER = 10;
export const DECK_SIZE = 5;

export const getPower = card => {
  const characterSum = card.name
    .split('')
    .reduce((result, _, index) => result + card.name.charCodeAt(index), 0);
  return (characterSum % MAX_POWER) + 1;
};
