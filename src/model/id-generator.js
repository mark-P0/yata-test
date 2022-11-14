const IDGenerator = (initialCount = '0x0') => {
  let count = Number.parseInt(initialCount) || 0;

  return {
    get next() {
      return '0x' + (count++).toString(16).toUpperCase();
    },
  };
};

export default IDGenerator;
