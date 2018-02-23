import React, { Component } from "react";
import { Link } from "react-router-dom";

import QuecoinLogo from "../../images/quecoin-logo.png";
import BgUser from "../../images/bg_user.png";
import BgHome from "../../images/bg_home.png";
import BgShop from "../../images/bg_shop.png";
import BgCamera from "../../images/bg_camera.png";
import BgFav from "../../images/bg_fav.png";

import "../../animate.css";
import "./index.css";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home__left-col navigation" id="nav">
          <div className="item user">
            <img
              src={BgUser}
              alt=""
              width="199"
              height="199"
              className="circle"
            />
            <a href="#" className="icon" />
            <h2>Login</h2>
          </div>
          <div className="item home">
            <img
              src={BgHome}
              alt=""
              width="199"
              height="199"
              className="circle"
            />
            <Link to="/forums" className="icon" />
            <h2>Forums</h2>
          </div>
          <div className="item shop">
            <img
              src={BgShop}
              alt=""
              width="199"
              height="199"
              className="circle"
            />
            <a href="#" className="icon" />
            <h2>Exchange</h2>
          </div>
          <div className="item camera">
            <img
              src={BgCamera}
              alt=""
              width="199"
              height="199"
              className="circle"
            />
            <a href="#" className="icon" />
            <h2>Social</h2>
          </div>
          <div className="item fav">
            <img
              src={BgFav}
              alt=""
              width="199"
              height="199"
              className="circle"
            />
            <a href="#" className="icon" />
            <h2>Donate</h2>
          </div>
        </div>

        <div className="Home__right-col jumbotron bg-dark fadeInDown animated page-header">
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
            Quecoin incentivizes both the answerer, asker and the supporters
            when asking intelligent questions, using uncensorable and
            decentralized data storage, so no entity can interfere.
          </p>
          <p>
            For just a few QUE, you can submit questions to be answered, but
            keep in mind, these questions cost money and you get a return on
            your investment if the community believes that the question is
            worthwhile.
          </p>
          <p>
            Furthermore, answerers beware, spam will not be tolerated by the
            community as you must stake QUE in order to earn QUE, creating a
            self-secure system handled by intelligent smart-contracts.
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
