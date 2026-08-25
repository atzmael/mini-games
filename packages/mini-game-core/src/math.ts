export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);
