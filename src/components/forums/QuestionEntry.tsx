import React, { Component } from "react";
import Question from "../../data/Question";

export default class QuestionEntry extends Component<
  {
    question: Question;
    onAddAnswer: (text: string) => void;
  },
  { answerText: string }
> {
  handleChange(text) {
    this.setState({ answerText: text });
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
          <textarea onChange={e => this.handleChange(e.target.value)} />
        </p>
        <p>
          <button onClick={() => this.props.onAddAnswer(this.state.answerText)}>
            Add answer
          </button>
        </p>
      </div>
    );
  }
}
