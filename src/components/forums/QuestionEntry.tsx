import React, { ChangeEvent, Component } from "react";
import Question from "../../data/Question";
import QUE from "../../data/QUE";

interface Props {
  question: Question;
  onUpvote: (amount) => void;
  onDownvote: (amount) => void;
  onAddAnswer: (text: string) => void;
  onFinalize: (answerId: number) => void;
}

export default class QuestionEntry extends Component<
  Props,
  { answerText: string }
> {
  constructor(props: Props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.onAddAnswerClicked = this.onAddAnswerClicked.bind(this);
  }

  private handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
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
          <button onClick={() => this.props.onUpvote(QUE.fromAmount(1))}>
            Upvote
          </button>
          <button onClick={() => this.props.onDownvote(QUE.fromAmount(1))}>
            Downvote
          </button>
        </p>
        <p>
          <small>
            <em>
              Created {this.props.question.created.toString()} | By{" "}
              {this.props.question.asker} |{" "}
              {this.props.question.voteScore.toNumber()} votes
            </em>
          </small>
        </p>
        <ul>
          {this.props.question.answers.map((a, j) => (
            <li key={j}>
              {a.answer} by {a.author}{" "}
              {(this.props.question.isFinalizableByUser && (
                <>
                  Is finalizable.{" "}
                  <button onClick={() => this.props.onFinalize(j)} />
                </>
              )) || <>Is not finalizable.</>}
            </li>
          ))}
        </ul>
        <p>
          <textarea onChange={this.handleTextChange} />
        </p>
        <p>
          <button onClick={this.onAddAnswerClicked}>Add answer</button>
        </p>
        <p />
      </div>
    );
  }
}
