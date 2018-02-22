import React from "react";

const ErrorBox = (props: { message: string; fatal: boolean }) => {
  return (
    <div className="jumbotron bg-dark fadeInDown animated text-light">
      <h1>
        A {(props.fatal && "Fatal") || "Not So Fatal"} Error Has Occurred, Sorry
      </h1>
      {props.message}
    </div>
  );
};

export default ErrorBox;
