import type { HandDefinition } from '../types';

export const POKER_HANDS: HandDefinition[] = [
  { name: 'Straight Flush', baseChips: 100, baseMult: 8 },
  { name: 'Five of a Kind', baseChips: 120, baseMult: 12 },
  { name: 'Flush House', baseChips: 140, baseMult: 14 },
  { name: 'Flush Five', baseChips: 160, baseMult: 16 },
  { name: 'Four of a Kind', baseChips: 60, baseMult: 7 },
  { name: 'Full House', baseChips: 40, baseMult: 4 },
  { name: 'Flush', baseChips: 35, baseMult: 4 },
  { name: 'Straight', baseChips: 30, baseMult: 4 },
  { name: 'Three of a Kind', baseChips: 30, baseMult: 3 },
  { name: 'Two Pair', baseChips: 20, baseMult: 2 },
  { name: 'Pair', baseChips: 10, baseMult: 2 },
  { name: 'High Card', baseChips: 5, baseMult: 1 },
];