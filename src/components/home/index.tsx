import React, { Component } from "react";
import QuecoinLogo from "../../images/quecoin-logo.png";
import "../../animate.css";
import "../../css/navbar.css";
class Home extends Component {
  render() {
    return (
      <div className="navigation" id="nav">
        <div className="item user">
          <img
            src="images/bg_user.png"
            alt=""
            width="199"
            height="199"
            className="circle"
          />
          <a href="#" className="icon" />
          <h2>User</h2>
          <ul>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href="#">Properties</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
          </ul>
        </div>
        <div className="item home">
          <img
            src="images/bg_home.png"
            alt=""
            width="199"
            height="199"
            className="circle"
          />
          <a href="#" className="icon" />
          <h2>Home</h2>
          <ul>
            <li>
              <a href="#">Portfolio</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="item shop">
          <img
            src="images/bg_shop.png"
            alt=""
            width="199"
            height="199"
            className="circle"
          />
          <a href="#" className="icon" />
          <h2>Shop</h2>
          <ul>
            <li>
              <a href="#">Catalogue</a>
            </li>
            <li>
              <a href="#">Orders</a>
            </li>
            <li>
              <a href="#">Offers</a>
            </li>
          </ul>
        </div>
        <div className="item camera">
          <img
            src="images/bg_camera.png"
            alt=""
            width="199"
            height="199"
            className="circle"
          />
          <a href="#" className="icon" />
          <h2>Photos</h2>
          <ul>
            <li>
              <a href="#">Gallery</a>
            </li>
            <li>
              <a href="#">Prints</a>
            </li>
            <li>
              <a href="#">Submit</a>
            </li>
          </ul>
        </div>
        <div className="item fav">
          <img
            src="images/bg_fav.png"
            alt=""
            width="199"
            height="199"
            className="circle"
          />
          <a href="#" className="icon" />
          <h2>Love</h2>
          <ul>
            <li>
              <a href="#">Social</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="#">Comments</a>
            </li>
          </ul>
        </div>
      </div>

      /*<div className="jumbotron bg-dark fadeInDown animated page-header">
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
      </div>*/
    );
  }
}

export default Home;
