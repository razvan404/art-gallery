export const queryParamsToDict = (queryParams: { [key: string]: string }) => {
  const mappedObject: { [key: string]: any } = {};
  Object.entries(queryParams).map(([key, value]) => {
    if (key.endsWith("StartsWith")) {
      mappedObject[key.substring(0, key.length - 10)] = {
        startsWith: value,
        mode: "insensitive",
      };
    } else {
      mappedObject[key] = value;
    }
  });
  return mappedObject;
};
