import React, { Component } from 'react'
import NavBar from "./../../NavBar.js"
import "./hahacss.css"
import "./animate.css"

class Home extends Component {
  render() {
    return(
      <header>
      <main className="container">
        <NavBar/>
        <main className="container">
          <header className="jumbotron fadeInDown animated page-header" id="banner">
            <img src="https://i.imgur.com/vJwufW6.png" id="QueCoinLogo" className="fadeInDown animatedDelay"/>
            <p className="fadeInLeft animatedDelay text-warning">
              <em>Ask and answer intelligent questions with ease, while making bank.</em>
            </p> <br></br>
            <p>QueCoin incentivizes both the answerer, asker and the supporters when asking intelligent questions, using uncensorable and decentralized data storage, so no entity can interfere.</p> <br></br>
            <p>For just a few QUE, you can submit questions to be answered, but keep in mind, these questions cost money and you get a return on your investment if the community believes that the question is worthwhile.</p>
            <br></br><p>Furthermore, answerers beware, spam will not be tolerated by the community as you must stake QUE in order to earn QUE, creating a self-secure system handled by intelligent smart-contracts. </p>
        </header>
      </main>
      </main>
      </header>
    )
  }
}

export default Home
