import React, { Component } from 'react'
import NavBar from "./../../App.js"
import "bootstrap/dist/css/bootstrap.min.css"
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
              <em>Go forth young padawan and ask/answer questions!</em>
            </p>
        </header>
        <header className="jumbotron">
          <div className="row">
            <div className="col-6">

            </div>
          </div>
        </header>
      </main>
      </main>
      </header>
    )
  }
}

export default Home
