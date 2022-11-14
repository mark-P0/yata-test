const Utilities = {
  /** @type {(string: string) => string} */
  normalize(string) {
    string = string.slice(1, -1);
    string = string.replace(/^\s+/gm, '');

    return string;
  },

  range(min, max) {
    const diff = max - min;
    return { min, max, diff };
  },
  translate(value, fromRange, toRange) {
    /* https://stackoverflow.com/a/929107 */

    const from = this.range(...fromRange);
    const to = this.range(...toRange);
    return ((value - from.min) * to.diff) / from.diff + to.min;
  },
  reverse(value, range) {
    const [min, max] = range;
    return max - value + min;
  },

  *counter(count = 0) {
    while (true) {
      yield count++;
    }
  },
};

export default Utilities;
