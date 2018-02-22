import React from "react";
import QuestionList from "./QuestionList";
import NewQuestion from "./NewQuestion";

const Forums = () => (
  <div className="pure-g">
    <div className="pure-u-1-1 jumbotron text-light bg-dark">
      <h1>Forums</h1>
      <h2>Existing Questions</h2>
      <QuestionList />
      <h2>Ask a Question</h2>
      <NewQuestion />
    </div>
  </div>
);
export default Forums;
