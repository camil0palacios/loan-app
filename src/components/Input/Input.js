import React from "react";

const Input = (props) => {
  return (
    <input type={props.type} value={props.value} onChange={props.setValue} />
  );
};

export { Input };
