import { RemoveUndefined } from "@src/Types";

export const removeUndefinedFromObject = <T extends object>(obj: T): RemoveUndefined<T> => {
  return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined && v !== ""), //eslint-disable-line
  ) as RemoveUndefined<T>;
};
