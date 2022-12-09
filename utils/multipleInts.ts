const multipleRandomInts = (
  min: number,
  max: number,
  times: number
): number[] => {
  const randoms: number[] = [];

  for (let i = 0; i < times; i++) {
    let randomN = Math.floor(Math.random() * (max - min) + min);
    while (
      randoms.filter((item) => item === randomN)[0] &&
      randoms.filter((item) => item === randomN)[0] !== 0
    ) {
      randomN = Math.floor(Math.random() * (max - min) + min);
    }
    randoms.push(randomN);
  }

  return randoms;
};

export default multipleRandomInts;
