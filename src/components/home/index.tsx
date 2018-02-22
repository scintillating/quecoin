import React, { Component } from "react";
import QuecoinLogo from "../../images/quecoin-logo.png";
import "../../animate.css";

class Home extends Component {
  render() {
    return (
      <div className="jumbotron bg-dark fadeInDown animated page-header">
        <h1>
          <img
            src={QuecoinLogo}
            alt="Quecoin logo"
            className="fadeInDown animatedDelay"
          />
        </h1>
        <p className="fadeInLeft animatedDelay text-warning">
          <em>Sourcing and answering high-quality questions</em>
        </p>
        <p>
          Quecoin incentivizes both the answerer, asker and the supporters when
          asking intelligent questions, using uncensorable and decentralized
          data storage, so no entity can interfere.
        </p>
        <p>
          For just a few QUE, you can submit questions to be answered, but keep
          in mind, these questions cost money and you get a return on your
          investment if the community believes that the question is worthwhile.
        </p>
        <p>
          Furthermore, answerers beware, spam will not be tolerated by the
          community as you must stake QUE in order to earn QUE, creating a
          self-secure system handled by intelligent smart-contracts.
        </p>
      </div>
    );
  }
}

export default Home;
