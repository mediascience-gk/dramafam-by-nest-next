const Gender = {
  MALE: '男性',
  FEMALE: '女性',
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export const allGender = Object.values(Gender);
