
export type RemoveUndefined<T> = {
  [K in keyof T]-?: T[K] extends undefined | '' ? never : T[K];
};

export const removeUndefinedFromObject = <T extends object>(obj: T): RemoveUndefined<T> => {
  return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined && v !== ""), //eslint-disable-line
  ) as RemoveUndefined<T>;
};
