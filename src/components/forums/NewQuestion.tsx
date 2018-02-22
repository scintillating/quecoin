import React, { Component } from "react";
import { connect, Dispatch } from "react-redux";
import { Action } from "redux";
import { withRouter, RouteComponentProps } from "react-router";
import * as actions from "../../web3/actions";

interface NewQuestionDispatchProps {
  askQuestion: (text: string) => void;
}

class NewQuestion extends Component<
  NewQuestionDispatchProps,
  { questionText: string }
> {
  onTextChange(text) {
    this.setState({ questionText: text });
  }
  render() {
    return (
      <div>
        <textarea onChange={e => this.onTextChange(e.target.value)} />
        <button onClick={() => this.props.askQuestion(this.state.questionText)}>
          Ask Question
        </button>
      </div>
    );
  }
}
export default connect(
  state => ({}),
  dispatch =>
    ({
      askQuestion(text: string) {
        dispatch(actions.askQuestion(text));
      }
    } as NewQuestionDispatchProps)
)(NewQuestion);
