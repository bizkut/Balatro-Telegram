export interface Tag {
  id: string;
  name: string;
  description: string;
}

export const TAGS: Tag[] = [
  {
    id: 'tag_uncommon',
    name: 'Uncommon Tag',
    description: 'The next spawned Joker is guaranteed to be Uncommon.',
  },
  {
    id: 'tag_rare',
    name: 'Rare Tag',
    description: 'The next spawned Joker is guaranteed to be Rare.',
  },
  {
    id: 'tag_negative',
    name: 'Negative Tag',
    description: 'The next spawned Joker is guaranteed to be a Negative edition.',
  },
  {
    id: 'tag_foil',
    name: 'Foil Tag',
    description: 'The next spawned Joker is guaranteed to be a Foil edition.',
  },
  // More tags will be added later.
];