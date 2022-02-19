import { rem } from 'polished';

type MapFunc = (k: string | number) => string;
type Collection = Record<string, string | number>;

function mapObjectValues(object: Collection, mapFn: MapFunc) {
  const result: Collection = {};

  Object.keys(object).forEach((key) => {
    result[key] = mapFn(object[key]);
  });

  return result;
}

export function convertValuesToRem(values: string[] | Collection) {
  if (Array.isArray(values)) {
    return values.map((v) => rem(v));
  }

  return mapObjectValues(values, rem);
}
