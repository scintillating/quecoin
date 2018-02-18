import React, { Component } from 'react'

class Forums extends Component {
  constructor(props) {
    super(props)
    this.state == "NOT_LOADED";
  }

  componentDidMount() {

  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 jumbotron">
            <h1>Forums</h1>
            <p>If you're seeing this page, you've logged in with your own smart contract successfully.</p>
          </div>
        </div>
      </main>
    )
  }
}

export default Forums
