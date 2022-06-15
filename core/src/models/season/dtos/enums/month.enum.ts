const Month = {
  1: 1,
  4: 4,
  7: 7,
  10: 10,
} as const;

export type Month = typeof Month[keyof typeof Month];

export const allMonth = Object.values(Month);
