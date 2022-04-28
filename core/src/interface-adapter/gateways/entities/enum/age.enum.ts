const Age = {
  TEENS: '10代',
  TWENTIES: '20代',
  THIRTIES: '30代',
  FORTIES: '40代',
  FIFTIES: '50代',
  SIXTIES: '60代',
  SEVENTIES: '70代',
} as const;

export type Age = typeof Age[keyof typeof Age];

export const AllAge = Object.values(Age);
