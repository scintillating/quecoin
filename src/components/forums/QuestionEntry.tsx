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
<<<<<<< HEAD
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
=======
      // <button onClick={() => this.props.onUpvote(QUE.fromAmount(1))}>
      //   Upvote
      // </button>
      // <button onClick={() => this.props.onDownvote(QUE.fromAmount(1))}>
      //   Downvote
      // </button>
      // //<p>
      //  {(this.props.question.isFinalizableByUser && (
      // {(this.props.question.isFinalizableByUser && (
      //   <>
      //     Is finalizable.{" "}
      //     <button onClick={() => this.props.onFinalize(j)} />
      //   </>
      // )) || <>Is not finalizable.</>}
      // {a.answer} by {a.author}{" "}
      <div className="row">
        <div className="col-1">
          <p>{this.props.question.votePool}</p>
        </div>
        <div className="col-5">
          <p>{this.props.question.question}</p>
        </div>
        <div className="col-3">
          <p>{this.props.question.created.toString().substring(4,24)}</p>
        </div>
        <div className="col-3 wrapWord">
          <p>{this.props.question.asker}</p>
        </div>
>>>>>>> merge conflicts
      </div>
    );
  }
}
