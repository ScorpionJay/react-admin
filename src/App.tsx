import * as React from "react";

export interface Props {
  name?: string;
  age?: number;
}

// class Hello extends React.Component<Props,{}> {
//   render() {
//     const {name} = this.props;
//     console.log(this.props)
//     return <div>{name}123</div>;
//   }
// }

function Hello({ name = "jay", age = 1 }: Props) {
  return (
    <div className="hello">
      <div className="greeting">Hello {name + "-----" + age}</div>
    </div>
  );
}

export default Hello;
