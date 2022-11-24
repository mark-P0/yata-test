function generateId(prefix, separator = '_') {
  const id = crypto.randomUUID();
  return `${prefix}${separator}${id}`;
}

export { generateId };
