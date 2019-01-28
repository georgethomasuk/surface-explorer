module.exports = {
  N: ([x, y]) => [x, y + 1],
  E: ([x, y]) => [x + 1, y],
  S: ([x, y]) => [x, y - 1],
  W: ([x, y]) => [x - 1, y],
};
