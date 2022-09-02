const Position = () => {
  const createPosition = (xCoord, yCoord) => {
    return { xCoord, yCoord };
  };

  const addPosition = (position1, position2) => {
    const newPosition = createPosition(position1.xCoord, position1.yCoord);
    newPosition.xCoord += position2.xCoord;
    newPosition.yCoord += position2.yCoord;

    return newPosition;
  };

  const multiplyPosition = (position1, position2) => {
    const newPosition = createPosition(position1.xCoord, position1.yCoord);
    newPosition.xCoord *= position2.xCoord;
    newPosition.yCoord *= position2.yCoord;

    return newPosition;
  };

  const checkOutOfBounce = (position) => {
    if (position.xCoord > 14 || position.xCoord < 0) return true;
    if (position.yCoord > 14 || position.yCoord < 0) return true;
    return false;
  };

  const checkCollisions = (position1, position2) => {
    if (position1.xCoord === position2.xCoord) {
      if (position1.yCoord === position2.yCoord) return true;
    }

    return false;
  };

  return {
    createPosition,
    addPosition,
    multiplyPosition,
    checkOutOfBounce,
    checkCollisions,
  };
};

export default Position;
