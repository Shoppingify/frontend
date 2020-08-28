import { hot } from "react-hot-loader/root";
import React from "react";

interface Props {
   name: string
}

function App(props: Props) {

  const { name } = props;

  return (
    <>
      <h1 className="text-4xl text-white bg-black">
        Hello {name}
      </h1>
    </>
  );
}

export default hot(App);
