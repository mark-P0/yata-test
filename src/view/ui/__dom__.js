/* DOM element representation */
const E = (element, ...properties) => {
  let attributes, content, children;
  attributes = content = children = null;

  for (const prop of properties) {
    if (typeof prop === 'string') content = prop;
    else if (Array.isArray(prop)) children = prop;
    else attributes = prop;
  }

  return { element, attributes, content, children };
};

function buildTree(E) {
  /* `element` will be an actual HTML element, if it isn't already */
  let { element, attributes, content, children } = E;

  /*  Text nodes have the name `'#text'`.
   *  It is only used superficially in this function.
   *  https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName
   *
   *  The bare content is returned as the equivalent "element"
   *  because `Element.append()`, which is also used below,
   *  automatically appends bare strings as text nodes.
   *  https://developer.mozilla.org/en-US/docs/Web/API/Element/append
   */
  if (element === '#text') {
    return content;
  }

  if (typeof element === 'string') {
    /* Create actual element; at this point, `element` must be a tag name string */
    element = document.createElement(element);

    /* Add attributes to new element */
    if (attributes) {
      for (const [attr, val] of Object.entries(attributes)) {
        element.setAttribute(attr, val);
      }
    }

    /* Add text content to new element */
    if (content) element.textContent = content;
  }

  /* Add children to element, recursively */
  if (children) {
    for (const child of children) {
      element.append(buildTree(child));
    }
  }

  return element;
}

export { E, buildTree };
