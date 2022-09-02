import getElements from './dom.js';
import Position from './position.js';
import Practical from './practical.js';

//size of box is 40/40

const game = () => {
  const position = Position();
  const practical = Practical();

  let snakes;

  let direction;
  let appleBlock;
  let currentSpeedTime = 100;

  let currentIndex = 0;
  let previousSnakes;

  let snakeLength;

  let snakePosition;

  let apples = 0;
  let bestScore = 0;

  const blockSize = 40;
  let gameIsActive = false;

  let canMove = false;

  const createBlock = (blockType, position) => {
    return {
      blockType,
      position,
    };
  };

  const randomize = (num) => {
    return Math.floor(Math.random() * num);
  };

  const checkAppleCollisions = (snakeArray, currentAppleBlock) => {
    let isColliding = false;

    snakeArray.forEach((block) => {
      const isCollided = position.checkCollisions(
        block.position,
        currentAppleBlock.position
      );
      if (isCollided) isColliding = true;
    });

    return isColliding;
  };

  const createRandomApple = (snakeArray) => {
    let isColliding = false;
    const applePositionX = randomize(15);
    const applePositionY = randomize(15);

    const applePosition = position.createPosition(
      applePositionX,
      applePositionY
    );

    const latestAppleBlock = createBlock('apple', applePosition);

    isColliding = checkAppleCollisions(snakeArray, latestAppleBlock);

    if (isColliding) return createRandomApple(snakeArray);

    return latestAppleBlock;
  };

  // const setupDefaultSnake = () => {
  //   const currentSnakeArray = [];
  //   let index = 0;

  //   while (index < 1) {
  //     const currentPosition = position.createPosition(8, 2 + index);
  //     let currentBlock = createBlock('block', currentPosition);
  //     if (index === defaultSnakeSize - 1)
  //       currentBlock = createBlock('mainBlock', currentPosition);

  //     currentSnakeArray.push(currentBlock);
  //     index += 1;
  //   }

  //   return currentSnakeArray;
  // };

  const addBindings = (element, func, event) => {
    element.addEventListener(event, func);
  };

  const renderApple = (currentAppleBlock) => {
    const appleBlockRealPositionX =
      currentAppleBlock.position.xCoord * blockSize;

    const appleBlockRealPositionY =
      currentAppleBlock.position.yCoord * blockSize;

    const appleElement = document.createElement('div');

    appleElement.style.left = `${appleBlockRealPositionX}px`;
    appleElement.style.top = `${appleBlockRealPositionY}px`;

    appleElement.classList.add(currentAppleBlock.blockType);

    return appleElement;
  };

  const renderGame = (snakesArray, currentAppleBlock) => {
    const dom = getElements();
    dom.grid.innerHTML = '';
    dom.appleStat.textContent = 'Apple 0';

    const appleElement = renderApple(currentAppleBlock);
    dom.grid.appendChild(appleElement);

    snakesArray.forEach((snakeBlock) => {
      const snakeRealPositionX = snakeBlock.position.xCoord * blockSize;
      const snakeRealPositionY = snakeBlock.position.yCoord * blockSize;

      const snakeElement = document.createElement('div');

      snakeElement.style.left = `${snakeRealPositionX}px`;
      snakeElement.style.top = `${snakeRealPositionY}px`;

      snakeElement.classList.add(snakeBlock.blockType);

      dom.grid.appendChild(snakeElement);
    });
    dom.appleStat.textContent = `Apple ${apples}`;
  };

  const changeBlockDirection = (event) => {
    if (event.key === 'ArrowRight' && direction !== 'ArrowLeft')
      direction = 'ArrowRight';
    if (event.key === 'ArrowLeft' && direction !== 'ArrowRight')
      direction = 'ArrowLeft';
    if (event.key === 'ArrowUp' && direction !== 'ArrowDown')
      direction = 'ArrowUp';
    if (event.key === 'ArrowDown' && direction !== 'ArrowUp')
      direction = 'ArrowDown';

    event.preventDefault();
  };

  const reverseArray = (array) => {
    let index = array.length - 1;

    const reversedArray = [];

    while (index >= 0) {
      reversedArray.push(array[index]);
      index -= 1;
    }

    return reversedArray;
  };

  const copySnakeArray = (snakeArray) => {
    const copyOfSnakeArray = [];

    snakeArray.forEach((block) => {
      let blockCopyPosition = position.createPosition(
        block.position.xCoord,
        block.position.yCoord
      );

      const newBlock = createBlock(block.blockType, blockCopyPosition);
      copyOfSnakeArray.push(newBlock);
    });

    return copyOfSnakeArray;
  };

  const moveBlock = (
    direction,
    snakesArray,
    currentSnakePosition,
    currentSnakeLength
  ) => {
    let latestSnakesArray = copySnakeArray(snakesArray);
    let latestPosition = position.createPosition(
      currentSnakePosition.xCoord,
      currentSnakePosition.yCoord
    );

    if (latestSnakesArray.length === currentSnakeLength)
      latestSnakesArray = latestSnakesArray.slice(1);

    let addedPos;

    if (direction === 'ArrowRight') addedPos = position.createPosition(1, 0);
    if (direction === 'ArrowLeft') addedPos = position.createPosition(-1, 0);
    if (direction === 'ArrowUp') addedPos = position.createPosition(0, -1);
    if (direction === 'ArrowDown') addedPos = position.createPosition(0, 1);

    const latestSnakePosition = position.addPosition(latestPosition, addedPos);

    const latestSnakeBlock = createBlock('block', latestSnakePosition);

    latestSnakesArray.push(latestSnakeBlock);

    return {
      latestSnakesArray,
      latestSnakePosition,
    };
  };

  const setupGame = () => {
    snakes = [];
    snakeLength = 2;
    apples = 0;
    direction = 'ArrowDown';
    snakePosition = position.createPosition(8, 1);
    const defaultSnakeBlock = createBlock('block', snakePosition);
    snakes.push(defaultSnakeBlock);

    appleBlock = createRandomApple(snakes);
  };

  const startGameLoop = () => {
    gameIsActive = !gameIsActive;
    updateGame();

    console.log('starting game loop');
  };

  const checkWallCollisions = (snakesArray) => {
    let isCollides = false;

    console.log(snakesArray, 'current snakes array');

    snakesArray.forEach((block) => {
      let isOutOfBounce = position.checkOutOfBounce(block.position);

      if (isOutOfBounce) isCollides = true;
    });

    return isCollides;
  };

  const checkSnakeCollisions = (snakesArray) => {
    let isCollided = false;

    snakesArray.forEach((snakeBlock) => {
      const snakeCollisions = snakesArray.filter((block) =>
        position.checkCollisions(block.position, snakeBlock.position)
      );

      if (snakeCollisions.length > 1) isCollided = true;
    });

    return isCollided;
  };

  const checkCollisions = (snakesArray) => {
    const isWallCollided = checkWallCollisions(snakesArray);
    const isSnakeCollided = checkSnakeCollisions(snakesArray);

    if (isWallCollided || isSnakeCollided) return true;
    return false;
  };

  const startGame = () => {
    const dom = getElements();

    addBindings(document, changeBlockDirection, 'keydown');

    addBindings(dom.playButton, startGameLoop, 'click');

    setupGame();
  };

  const changeSnakeLength = () => {
    snakeLength += 1;
    apples += 1;
    createRandomApple(snakes);
  };

  const changeAppleLocation = (snakesArray) => {
    changeSnakeLength();
    appleBlock = createRandomApple(snakesArray);
  };

  const updateGame = () => {
    if (gameIsActive) {
      setTimeout(() => {
        const movementInformation = moveBlock(
          direction,
          snakes,
          snakePosition,
          snakeLength
        );

        snakes = movementInformation.latestSnakesArray;
        snakePosition = movementInformation.latestSnakePosition;

        let collided = checkCollisions(snakes, currentIndex);
        let appleCollision = checkAppleCollisions(snakes, appleBlock);

        if (collided) {
          setupGame();
          gameIsActive = false;
        }

        if (appleCollision) changeAppleLocation(snakes);
        renderGame(snakes, appleBlock);

        console.log('running game');
        return updateGame();
      }, currentSpeedTime);
    }
  };

  return {
    startGame,
  };
};

const currentGame = game();
currentGame.startGame();
