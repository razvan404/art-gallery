const acceptedQueryExtensions = ["StartsWith", "Contains", "EndsWith"];

const uncapitalize = (str: string) =>
  str.charAt(0).toLowerCase() + str.slice(1);

export const queryParamsToDict = (queryParams: { [key: string]: string }) => {
  const mappedObject: { [key: string]: any } = {};
  Object.entries(queryParams).map(([key, value]) => {
    for (const extension of acceptedQueryExtensions) {
      if (key.endsWith(extension)) {
        mappedObject[key.substring(0, key.length - extension.length)] = {
          [uncapitalize(extension)]: value,
        };
        return;
      }
    }
    mappedObject[key] = value;
  });
  return mappedObject;
};
