/**
 * DOM element representation
 * @type {(name: string, ...properties: any) => HTMLElement}
 */
function E(name, ...properties) {
  let attributes = {};
  let text = '';
  let children = [];
  for (const property of properties) {
    if (typeof property === 'string') text = property;
    else if (Array.isArray(property)) children = property;
    else if (typeof property === 'object') attributes = property;
  }

  if (name === '#text') {
    /*  Text nodes have the name `'#text'`.
     *  It is only used superficially in this function.
     *  https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName
     *
     *  The bare content is returned as the equivalent "element"
     *  because `Element.append()`, which is also used below,
     *  automatically appends bare strings as text nodes.
     *  https://developer.mozilla.org/en-US/docs/Web/API/Element/append
     */

    return text;
  }

  /* Create actual element; at this point, `name` must be a tag name */
  const element = document.createElement(name);

  /* Add attributes to new element */
  for (const [attr, val] of Object.entries(attributes)) {
    element.setAttribute(attr, val);
  }

  /*  Add children to element. Regular text is considered the first child,
   *  as would have been set via `Element.textContent` (it deletes every other children)
   */
  element.append(text, ...children);

  return element;
}

export { E };
