import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import QuestionApi from "../../util/QuestionApi";
import NavBar from "../../NavBar";
import EthAddress from "../EthAddress";
import QuestionList from "./QuestionList";
import Question from "data/Question";
import NewQuestion from "./NewQuestion";

export default class Forums extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="container">
        <NavBar />
        <div className="pure-g">
          <div className="pure-u-1-1 jumbotron text-light bg-dark">
            <h1>Forums</h1>
            <h2>Existing Questions</h2>
            <QuestionList />
            <h2>Ask a Question</h2>
            <NewQuestion />
          </div>
        </div>
      </main>
    );
  }
}
