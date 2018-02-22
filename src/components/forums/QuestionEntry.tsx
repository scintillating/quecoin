import React, { Component } from "react";
import Question from "../../data/Question";

export default class QuestionEntry extends Component<
  {
    question: Question;
    onAddAnswer: (text: string) => void;
  },
  { answerText: string }
> {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onAddAnswerClicked = this.onAddAnswerClicked.bind(this);
  }

  private handleTextChange(e) {
    this.setState({ answerText: e.target.value });
  }
  private onAddAnswerClicked() {
    this.props.onAddAnswer(this.state.answerText);
  }
  render() {
    return (
      <div>
        <h2>{this.props.question.question}</h2>
        <p>
          <small>
            <em>
              Created {this.props.question.created.toString()} | By{" "}
              {this.props.question.asker} |{" "}
              {this.props.question.voteScore.toNumber()} votes
            </em>
          </small>
        </p>
        <ul>{this.props.question.answers.map((a, j) => <li key={j} />)}</ul>
        <p>
          <textarea onChange={this.handleTextChange} />
        </p>
        <p>
          <button onClick={this.onAddAnswerClicked}>Add answer</button>
        </p>
      </div>
    );
  }
}
