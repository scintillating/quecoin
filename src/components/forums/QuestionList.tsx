import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Question from "../../data/Question";
import QuestionEntry from "./QuestionEntry";
import * as actions from "../../web3/actions";

class QuestionList extends PureComponent<{
  questions: Question[];
  onAddAnswer: (text: string) => void;
}> {
  render() {
    if (this.props.questions === null) {
      return <div />;
    } else {
      return (
        <ul>
          {this.props.questions.map(question => (
            <li key={question.id}>
              <QuestionEntry
                question={question}
                onAddAnswer={this.props.onAddAnswer}
              />
            </li>
          ))}
        </ul>
      );
    }
  }
}
export default connect(
  (state: any, ownProps) => ({
    questions: state.web3.questions
  }),
  dispatch => ({
    onAddAnswer: (text: string) => {
      dispatch(actions.answerQuestion(text, ""));
    }
  })
)(QuestionList);
