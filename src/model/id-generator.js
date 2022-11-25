const separator = '_';

/** @type {(prefix: string) => string} */
function generateId(prefix) {
  const uuid = crypto.randomUUID();
  return `${prefix}${separator}${uuid}`;
}

/** @type {(id: string) => string} */
function extractPrefix(id) {
  const [prefix, ..._] = id.split(separator);
  return prefix;
}

export { generateId, extractPrefix };
