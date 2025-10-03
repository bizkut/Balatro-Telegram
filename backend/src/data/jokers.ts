export interface Joker {
  id: string;
  name: string;
  rarity: number; // 1: common, 2: uncommon, 3: rare, 4: legendary
  cost: number;
  description: string; // Simplified description of the joker's effect
}

export const JOKERS: Joker[] = [
  {
    id: 'j_joker',
    name: 'Joker',
    rarity: 1,
    cost: 2,
    description: '+4 Mult',
  },
  {
    id: 'j_greedy_joker',
    name: 'Greedy Joker',
    rarity: 1,
    cost: 5,
    description: 'Played cards with Diamond suit give +4 Mult when scored.',
  },
  {
    id: 'j_lusty_joker',
    name: 'Lusty Joker',
    rarity: 1,
    cost: 5,
    description: 'Played cards with Heart suit give +4 Mult when scored.',
  },
  {
    id: 'j_wrathful_joker',
    name: 'Wrathful Joker',
    rarity: 1,
    cost: 5,
    description: 'Played cards with Spade suit give +4 Mult when scored.',
  },
  {
    id: 'j_gluttenous_joker',
    name: 'Gluttonous Joker',
    rarity: 1,
    cost: 5,
    description: 'Played cards with Club suit give +4 Mult when scored.',
  },
  {
    id: 'j_jolly',
    name: 'Jolly Joker',
    rarity: 1,
    cost: 3,
    description: '+8 Mult if played hand contains a Pair.',
  },
  {
    id: 'j_zany',
    name: 'Zany Joker',
    rarity: 1,
    cost: 4,
    description: '+12 Mult if played hand contains a Three of a Kind.',
  },
];