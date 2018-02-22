import React from "react";
import Answer from "../../data/Answer";

export default (props: { answer: Answer }) => (
  <>
    {props.answer.answer}
    <br />
    <em>
      <small>posted by {props.answer.author}</small>
    </em>
  </>
);
