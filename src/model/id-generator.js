const IDGenerator = () => {
  let count = 0;

  const set = (storedCount) => {
    count = Number.parseInt(storedCount) + 1;
  };

  return {
    set,

    get next() {
      return '0x' + (count++).toString(16).toUpperCase();
    },
  };
};

export default IDGenerator;
