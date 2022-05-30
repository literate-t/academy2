const createDOM = (node) => {
    if ('string' === typeof node) {
        return document.createTextNode(node);
    }
    const element = document.createElement(node.tag);
    
    node.children
    .map(createDOM)
    .forEach(element.appendChild)

    return element;
}

const vdom = {
    tag: 'p',
    props: {},
    children: [
        {
            tag: 'h1',
            props: {},
            children: ["React 만들기"],
        },
    ],
};

document.querySelector("#root").appendChild(createDOM(vdom));