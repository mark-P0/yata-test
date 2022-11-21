function generateId(prefix) {
  let id = crypto.randomUUID();
  if (prefix) id = `${prefix};${id}`;

  return id;
}

export { generateId };
