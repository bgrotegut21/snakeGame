const getElements = () => {
  const body = document.body;

  return {
    appleStat: body.querySelector('.appleStat'),
    grid: body.querySelector('.grid'),
    playButton: document.querySelector('.playButton'),
  };
};

export default getElements;
