export interface Blind {
  id: string;
  name: string;
  dollars: number;
  mult: number;
  boss?: boolean;
}

export const BLINDS: Blind[] = [
  { id: 'bl_small', name: 'Small Blind', dollars: 3, mult: 1 },
  { id: 'bl_big', name: 'Big Blind', dollars: 4, mult: 1.5 },
  { id: 'bl_hook', name: 'The Hook', dollars: 5, mult: 2, boss: true },
  { id: 'bl_ox', name: 'The Ox', dollars: 5, mult: 2, boss: true },
  { id: 'bl_house', name: 'The House', dollars: 5, mult: 2, boss: true },
  { id: 'bl_wall', name: 'The Wall', dollars: 5, mult: 4, boss: true },
  // More blinds will be added later.
];