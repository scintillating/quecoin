import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionApi from '../../util/QuestionApi';
import NavBar from '../../NavBar';

import "../home/hahacss.css";

class Forums extends Component {
  constructor(props) {
    super(props)
    this.state = { status: "NOT_LOADED", answers: [] };
  }

  componentDidMount() {
    setTimeout(async () => {
        if (this.props.web3 != null) {
            const api = new QuestionApi(this.props.web3);
            await api.init(this.props.web3)
            const questions = await api.getQuestions()
            if (await api.getQueAuthorization() == 0) {
                await api.authorizeQue(100);
            }
            this.setState({
                status: "LOADED",
                questions: questions,
                api: api
            });
        }
    }, 2000);
  }

  async answer(questionId) {
    await this.state.api.answerQuestion(questionId, this.state.answers[questionId]);
    window.location.reload(true);
  }

  handleChange(questionId, content) {
    this.state.answers[questionId] = content;
    console.log("Adding for", questionId, content);
  }

  handleQuestionChange(content) {
      this.state.newQuestion = content;
  }

 async askQuestion() {
      console.log("Adding question", this.state.newQuestion);
      await this.state.api.askQuestion(this.state.newQuestion, "xd");
      window.location.reload(true);
  }

  render() {
    if (this.state.status === "LOADED") {
        return (
        <main className="container">
            <NavBar />
            <div className="pure-g">
            <div className="pure-u-1-1 jumbotron">
                <h1>Forums</h1>
                <h2>Existing Questions</h2>
                <ul>
                    {this.state.questions.map((q, i) => (
                        <li key={i}>
                            <h2>{q.question}</h2>
                            <p><small><em>Created {q.created.toString()} | By {q.asker} | {q.voteScore.toNumber()} votes</em></small></p>
                            <p><ul>
                                {q.answers.map((a, j) => (
                                    <li key={j}>
                                        {a.answer}<br />
                                        <em><small>posted by {a.author}</small></em>
                                    </li>
                                ))}
                            </ul></p>
                            <p><textarea onChange={(e) => this.handleChange(i, e.target.value)}></textarea></p>
                            <p><button onClick={() => this.answer(i)}>Add answer</button></p>
                        </li>
                    ))}
                </ul>
                <h2>Ask a Question</h2>
                <textarea onChange={(e) => this.handleQuestionChange(e.target.value)} />
                <button onClick={() => this.askQuestion()}>Ask question</button>
            </div>
            </div>
        </main>
        )
    } else {
        return <div />
    }
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      web3: state.web3.web3Instance
    }
  }
  
  export default connect(mapStateToProps, (dispatch) => { return {}; })(Forums);
  