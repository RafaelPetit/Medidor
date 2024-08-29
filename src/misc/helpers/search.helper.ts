export const parseSearchToPrisma = (searchDto: { [key: string]: any }) => {
  return Object.entries(searchDto).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: { equals: value },
    }),
    {},
  );
};
