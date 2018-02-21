import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import QuestionApi from "../../util/QuestionApi";
import NavBar from "../../NavBar";

class Forums extends Component<
  { web3: any },
  {
    api?: QuestionApi;
    newQuestion?: string;
    status: "LOADED" | "NOT_LOADED";
    questions?: any[];
    answers?: string[];
  }
> {
  constructor(props) {
    super(props);
    this.state = { status: "NOT_LOADED", answers: [] };
  }

  async setup() {
    console.log("Account:", this.props.web3.eth.accounts[0]);

    const api = new QuestionApi();
    await api.init(this.props.web3);
    api.printDebugInfo();
    const questions = await this.getQuestions(api);

    const reloadHandler = async (err, res) => {
      if (err) {
        throw err;
      }
      const questions = await this.getQuestions(api);
      this.setState({ status: "LOADED", questions, api });
    };
    api.watchQuestionAsked(reloadHandler);

    this.setState({
      status: "LOADED",
      questions: questions,
      api: api
    });
  }

  async getQuestions(api) {
    const questions = await api.getQuestions();
    const queAuthorization = await api.getQueAuthorization();
    if (queAuthorization.toNumber() < 100) {
      await api.authorizeQue(100);
    }
    return questions;
  }

  // Run on first render
  componentDidMount() {
    if (this.props.web3 !== null) {
      this.setup();
    }
  }

  // Run on updates to props (e.g. web3)
  componentDidUpdate() {
    if (this.state.status !== "LOADED" && this.props.web3 !== null) {
      this.setup();
    }
  }

  async answer(questionId) {
    await this.state.api.answerQuestion(
      questionId,
      this.state.answers[questionId]
    );
  }

  handleChange(questionId, content) {
    const answers = this.state.answers.slice();
    answers[questionId] = content;
    this.setState({
      answers
    });
    console.log("Adding for", questionId, content);
  }

  handleQuestionChange(content) {
    this.setState({
      newQuestion: content
    });
  }

  async askQuestion() {
    console.log("Adding question", this.state.newQuestion);
    await this.state.api.askQuestion(this.state.newQuestion, "xd");
  }

  render() {
    if (this.state.status === "LOADED") {
      return (
        <main className="container">
          <NavBar />
          <div className="pure-g">
            <div className="pure-u-1-1 jumbotron text-light bg-dark">
              <h1>Forums</h1>
              <h2>Existing Questions</h2>
              <ul>
                {this.state.questions.map((q, i) => (
                  <li key={i}>
                    <h2>{q.question}</h2>
                    <p>
                      <small>
                        <em>
                          Created {q.created.toString()} | By {q.asker} |{" "}
                          {q.voteScore.toNumber()} votes
                        </em>
                      </small>
                    </p>
                    <ul>
                      {q.answers.map((a, j) => (
                        <li key={j}>
                          {a.answer}
                          <br />
                          <em>
                            <small>posted by {a.author}</small>
                          </em>
                        </li>
                      ))}
                    </ul>
                    <p>
                      <textarea
                        onChange={e => this.handleChange(i, e.target.value)}
                      />
                    </p>
                    <p>
                      <button onClick={() => this.answer(i)}>Add answer</button>
                    </p>
                  </li>
                ))}
              </ul>
              <h2>Ask a Question</h2>
              <textarea
                onChange={e => this.handleQuestionChange(e.target.value)}
              />
              <button onClick={() => this.askQuestion()}>Ask question</button>
            </div>
          </div>
        </main>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    web3: state.web3.web3
  };
};

export default withRouter(
  connect(mapStateToProps, dispatch => {
    return {};
  })(Forums)
);
