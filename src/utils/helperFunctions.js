export function convertObjectsToArray(objects) {
  return objects && Object.keys(objects).map((key) => {
      objects[key].key = key;
    return objects[key];
  });
}
