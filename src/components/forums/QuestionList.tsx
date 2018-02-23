import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Question from "../../data/Question";
import QuestionEntry from "./QuestionEntry";
import * as actions from "../../web3/actions";
import QUE from "../../data/QUE";

class QuestionList extends PureComponent<{
  questions: Question[];
  onAddAnswer: (questionId: number, text: string) => void;
  onUpvote: (questionId, amount: QUE) => void;
  onDownvote: (questionId, amount: QUE) => void;
  onFinalize: (questionId, answerId) => void;
}> {
  render() {
    if (this.props.questions === null) {
      return <div />;
    } else {
      return (
<<<<<<< HEAD
        <ul>
          {this.props.questions.map(question => (
            <li key={question.id}>
              <QuestionEntry
                question={question}
                onAddAnswer={text => this.props.onAddAnswer(question.id, text)}
                onUpvote={amount => this.props.onUpvote(question.id, amount)}
                onDownvote={amount =>
                  this.props.onDownvote(question.id, amount)
                }
                onFinalize={answerId =>
                  this.props.onFinalize(question.id, answerId)
                }
              />
            </li>
=======
        <div className="container">
          {this.props.questions.map((question, index) => (
            <QuestionEntry
              question={question}
              onAddAnswer={text => this.props.onAddAnswer(question.id, text)}
              onUpvote={amount => this.props.onUpvote(question.id, amount)}
              onDownvote={amount =>
                this.props.onDownvote(question.id, amount)
              }
            />
>>>>>>> merge conflicts
          ))}
        </div>
      );
    }
  }
}
export default connect(
  (state: any, ownProps) => ({
    questions: state.web3.questions
  }),
  dispatch => ({
    onAddAnswer: (questionId: number, text: string) => {
      dispatch(actions.answerQuestion(questionId, text));
    },
    onUpvote: (questionId, amount) => {
      dispatch(actions.upvote(questionId, amount));
    },
    onDownvote: (questionId, amount) => {
      dispatch(actions.downvote(questionId, amount));
    },
    onFinalize: (questionId, answerId) => {
      dispatch(actions.finalizeQuestion(questionId, answerId));
    }
  })
)(QuestionList);
