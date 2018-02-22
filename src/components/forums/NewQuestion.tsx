import React, { Component, ChangeEvent } from "react";
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
  constructor(props) {
    super(props);
    this.onTextChange = this.onTextChange.bind(this);
    this.askQuestionClicked = this.askQuestionClicked.bind(this);
  }

  private onTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ questionText: e.target.value });
  }
  private askQuestionClicked() {
    this.props.askQuestion(this.state.questionText);
  }
  render() {
    return (
      <div>
        <textarea onChange={this.onTextChange} />
        <button onClick={this.askQuestionClicked}>Ask Question</button>
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
