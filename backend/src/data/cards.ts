export enum Suit {
  Hearts = 'Hearts',
  Clubs = 'Clubs',
  Diamonds = 'Diamonds',
  Spades = 'Spades',
}

export enum Rank {
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'Jack',
  Queen = 'Queen',
  King = 'King',
  Ace = 'Ace',
}

export interface Card {
  id: string;
  name: string;
  rank: Rank;
  suit: Suit;
}

export const CARDS: Card[] = [
  // Hearts
  { id: 'H_2', name: '2 of Hearts', rank: Rank.Two, suit: Suit.Hearts },
  { id: 'H_3', name: '3 of Hearts', rank: Rank.Three, suit: Suit.Hearts },
  { id: 'H_4', name: '4 of Hearts', rank: Rank.Four, suit: Suit.Hearts },
  { id: 'H_5', name: '5 of Hearts', rank: Rank.Five, suit: Suit.Hearts },
  { id: 'H_6', name: '6 of Hearts', rank: Rank.Six, suit: Suit.Hearts },
  { id: 'H_7', name: '7 of Hearts', rank: Rank.Seven, suit: Suit.Hearts },
  { id: 'H_8', name: '8 of Hearts', rank: Rank.Eight, suit: Suit.Hearts },
  { id: 'H_9', name: '9 of Hearts', rank: Rank.Nine, suit: Suit.Hearts },
  { id: 'H_T', name: '10 of Hearts', rank: Rank.Ten, suit: Suit.Hearts },
  { id: 'H_J', name: 'Jack of Hearts', rank: Rank.Jack, suit: Suit.Hearts },
  { id: 'H_Q', name: 'Queen of Hearts', rank: Rank.Queen, suit: Suit.Hearts },
  { id: 'H_K', name: 'King of Hearts', rank: Rank.King, suit: Suit.Hearts },
  { id: 'H_A', name: 'Ace of Hearts', rank: Rank.Ace, suit: Suit.Hearts },
  // Clubs
  { id: 'C_2', name: '2 of Clubs', rank: Rank.Two, suit: Suit.Clubs },
  { id: 'C_3', name: '3 of Clubs', rank: Rank.Three, suit: Suit.Clubs },
  { id: 'C_4', name: '4 of Clubs', rank: Rank.Four, suit: Suit.Clubs },
  { id: 'C_5', name: '5 of Clubs', rank: Rank.Five, suit: Suit.Clubs },
  { id: 'C_6', name: '6 of Clubs', rank: Rank.Six, suit: Suit.Clubs },
  { id: 'C_7', name: '7 of Clubs', rank: Rank.Seven, suit: Suit.Clubs },
  { id: 'C_8', name: '8 of Clubs', rank: Rank.Eight, suit: Suit.Clubs },
  { id: 'C_9', name: '9 of Clubs', rank: Rank.Nine, suit: Suit.Clubs },
  { id: 'C_T', name: '10 of Clubs', rank: Rank.Ten, suit: Suit.Clubs },
  { id: 'C_J', name: 'Jack of Clubs', rank: Rank.Jack, suit: Suit.Clubs },
  { id: 'C_Q', name: 'Queen of Clubs', rank: Rank.Queen, suit: Suit.Clubs },
  { id: 'C_K', name: 'King of Clubs', rank: Rank.King, suit: Suit.Clubs },
  { id: 'C_A', name: 'Ace of Clubs', rank: Rank.Ace, suit: Suit.Clubs },
  // Diamonds
  { id: 'D_2', name: '2 of Diamonds', rank: Rank.Two, suit: Suit.Diamonds },
  { id: 'D_3', name: '3 of Diamonds', rank: Rank.Three, suit: Suit.Diamonds },
  { id: 'D_4', name: '4 of Diamonds', rank: Rank.Four, suit: Suit.Diamonds },
  { id: 'D_5', name: '5 of Diamonds', rank: Rank.Five, suit: Suit.Diamonds },
  { id: 'D_6', name: '6 of Diamonds', rank: Rank.Six, suit: Suit.Diamonds },
  { id: 'D_7', name: '7 of Diamonds', rank: Rank.Seven, suit: Suit.Diamonds },
  { id: 'D_8', name: '8 of Diamonds', rank: Rank.Eight, suit: Suit.Diamonds },
  { id: 'D_9', name: '9 of Diamonds', rank: Rank.Nine, suit: Suit.Diamonds },
  { id: 'D_T', name: '10 of Diamonds', rank: Rank.Ten, suit: Suit.Diamonds },
  { id: 'D_J', name: 'Jack of Diamonds', rank: Rank.Jack, suit: Suit.Diamonds },
  { id: 'D_Q', name: 'Queen of Diamonds', rank: Rank.Queen, suit: Suit.Diamonds },
  { id: 'D_K', name: 'King of Diamonds', rank: Rank.King, suit: Suit.Diamonds },
  { id: 'D_A', name: 'Ace of Diamonds', rank: Rank.Ace, suit: Suit.Diamonds },
  // Spades
  { id: 'S_2', name: '2 of Spades', rank: Rank.Two, suit: Suit.Spades },
  { id: 'S_3', name: '3 of Spades', rank: Rank.Three, suit: Suit.Spades },
  { id: 'S_4', name: '4 of Spades', rank: Rank.Four, suit: Suit.Spades },
  { id: 'S_5', name: '5 of Spades', rank: Rank.Five, suit: Suit.Spades },
  { id: 'S_6', name: '6 of Spades', rank: Rank.Six, suit: Suit.Spades },
  { id: 'S_7', name: '7 of Spades', rank: Rank.Seven, suit: Suit.Spades },
  { id: 'S_8', name: '8 of Spades', rank: Rank.Eight, suit: Suit.Spades },
  { id: 'S_9', name: '9 of Spades', rank: Rank.Nine, suit: Suit.Spades },
  { id: 'S_T', name: '10 of Spades', rank: Rank.Ten, suit: Suit.Spades },
  { id: 'S_J', name: 'Jack of Spades', rank: Rank.Jack, suit: Suit.Spades },
  { id: 'S_Q', name: 'Queen of Spades', rank: Rank.Queen, suit: Suit.Spades },
  { id: 'S_K', name: 'King of Spades', rank: Rank.King, suit: Suit.Spades },
  { id: 'S_A', name: 'Ace of Spades', rank: Rank.Ace, suit: Suit.Spades },
];