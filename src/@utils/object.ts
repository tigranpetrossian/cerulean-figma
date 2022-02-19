export function keyBy<T>(array: T[], key: keyof T) {
  return array.reduce((result, item) => {
    return {
      ...result,
      [String(item[key])]: item,
    };
  }, {});
}
