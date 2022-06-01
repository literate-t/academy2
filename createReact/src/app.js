/* @jsx createElement */

import { createElement, render, Component } from "./react";

class Title extends Component {
  render() {
    return <h1>{this.props.children}</h1>;
  }
}

// function Title(props) {
//   return <h1>{props.children}</h1>;
// }

function Item(props) {
  return <li style={`color:${props.color}`}>{props.children}</li>;
}

// const vdom = (
//   <p>
//     <Title>리액트 잘 만들기</Title>
//     {/* createElement(Title, null, "리액트 잘 만들기") */}
//     <ul>
//       <Item color='red'>첫 번째 아이템</Item>
//       <Item color='green'>두 번째 아이템</Item>
//       <Item color='blue'>세 번째 아이템</Item>
//     </ul>
//   </p>
// );
const App = () => (
  <p>
    <Title>리액트 컴포넌트 잘 만들기</Title>
    {/* createElement(Title, null, "리액트 잘 만들기") */}
    <ul>
      <Item color='red'>첫 번째 아이템</Item>
      <Item color='green'>두 번째 아이템</Item>
      <Item color='blue'>세 번째 아이템</Item>
    </ul>
  </p>
);

render(<App />, document.querySelector("#root"));
console.log(<App />);
