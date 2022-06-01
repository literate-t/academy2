// pseudo 코드
const hooks = [];
let currentComponent = 0;

export class Component {
  constructor(props) {
    this.props = props;
  }
}

export function createDOM(node) {
  if ("string" === typeof node) {
    return document.createTextNode(node);
  }
  const element = document.createElement(node.tag);

  node.props &
    Object.entries(node.props).forEach(([key, value]) =>
      element.setAttribute(key, value)
    );

  node.children.map(createDOM).forEach(element.appendChild.bind(element));
  //node.children.map(createDOM).forEach((elem) => element.appendChild(elem));

  return element;
}

function makeProps(props, children) {
  return {
    ...props,
    children: children.length === 1 ? children[0] : children,
  };
}
// pseudo 코드
function useState(initValue) {
  let position = currentComponent - 1;
  if (!hooks[position]) {
    hooks[position] = initValue;
  }

  const modifier = (nextValue) => {
    hooks[position] = nextValue;
  };

  return [hooks[position], modifier];
}

export function createElement(tag, props, ...children) {
  //props = props ? props : {};
  props = props || {};

  if ("function" == typeof tag) {
    if (tag.prototype instanceof Component) {
      const instance = new tag(makeProps(props, children));
      // 실제로는 매번 인스턴스를 생성하면 안 된다
      // 인스턴스는 컴포넌트가 삭제될 때까지 유지
      return instance.render();
    }

    hooks[currentComponent++] = null;
    // 현재 구조에서는 함수 컴포넌트가
    // 상태를 가질 수 없다
    // Hook으로 기능을 추가해야 함
    if (children.length > 0) {
      return tag(makeProps(props, children));
    } else {
      return tag(props);
    }
  }
  return { tag, props, children };
}

export function render(vdom, container) {
  container.appendChild(createDOM(vdom));
}

// export const render = (function () {
//   // 기존 정보를 저장하기 위해 클로저를 사용한다
//   let prevDom = null;

//   return function (vdom, container) {
//     if (null === prevDom) {
//       prevDom = vdom;
//     }

//     // diff
//     // vdom과 prevDom을 비교하는 로직을 넣는 것
//     container.appendChild(createDOM(vdom));
//   };
// })();
