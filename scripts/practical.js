const Practical = () => {
  const copyArray = (array) => {
    const newArray = [];

    array.forEach((item) => {
      newArray.push(item);
    });

    return newArray;
  };

  const isObject = (currentObject) => {
    if (typeof currentObject === 'object' && currentObject !== null) {
      return true;
    }
    return false;
  };

  const checkObject = (object1, object2) => {
    let index = 0;
    let secondIndex = 0;

    let objectIsEqual = true;

    const currentObject = object1;
    const currentObject2 = object2;

    const currentObjectValues = Object.values(currentObject);
    const currentObject2Values = Object.values(currentObject2);

    const objectKeys = Object.keys(currentObject);
    const objectKeys2 = Object.keys(currentObject2);

    objectKeys.forEach((key) => {
      if (key !== objectKeys2[index]) objectIsEqual = false;
      index += 1;
    });

    if (!objectIsEqual) return false;
    if (objectKeys.length !== objectKeys2.length) return false;

    // console.log(currentObject, 'the current object');
    // console.log(currentObject2, 'the current object2');

    currentObjectValues.forEach((item) => {
      const item2 = currentObject2Values[secondIndex];

      if (isObject(item) && isObject(item2)) {
        const checkObjectBool = checkObject(item, item2);

        if (!checkObjectBool) objectIsEqual = false;
      } else if (item !== item2) {
        objectIsEqual = false;
      }

      secondIndex += 1;
    });

    return objectIsEqual;
  };

  return { copyArray, checkObject };
};

export default Practical;
