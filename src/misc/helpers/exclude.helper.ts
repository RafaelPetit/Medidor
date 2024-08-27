/* eslint-disable @typescript-eslint/no-unused-vars */
export const excludeOne = <T>(entity: T, exclude: keyof T): T => {
  const { [exclude]: _, ...rest } = entity;
  return rest as T;
};

export const excludeMany = <T>(entity: T[], exclude: keyof T): T[] => {
  return entity.map((item) => {
    const { [exclude]: _, ...rest } = item;
    return rest;
  }) as T[];
};
