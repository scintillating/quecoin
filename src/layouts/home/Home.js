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
            <h1 className="fadeInDown animatedDelay">QueCoin</h1>
            <p className="fadeInLeft animatedDelay text-warning">

            </p>
            <p>
            </p>
            <p>
            </p>
            <p>
              <em>Go forth young padawan and ask/answer questions!</em>
            </p>
        </header>
      </main>
      </main>
      </header>
    )
  }
}

export default Home
