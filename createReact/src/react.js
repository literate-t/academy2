export function createDOM(node) {
  if ("string" === typeof node) {
    return document.createTextNode(node);
  }
  const element = document.createElement(node.tag);

  Object.entries(node.props).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );

  node.children.map(createDOM).forEach(element.appendChild.bind(element));
  //node.children.map(createDOM).forEach((elem) => element.appendChild(elem));

  return element;
}

export function render(vdom, container) {
  container.appendChild(createDOM(vdom));
}
