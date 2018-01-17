export const swapKeyValues = object => Object.keys(object)
  .reduce((obj, key) => Object.assign({}, obj, {
    [object[key]]: key
  }), {});
