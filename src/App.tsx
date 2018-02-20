import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { withRouter } from "react-router-dom";

// UI Components
import Home from "./layouts/home";
import Forums from "./layouts/forums";

// Styles
import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";
import "./css/aesthetic.css";
import "./hahacss.css";
import "font-awesome/css/font-awesome.min.css";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";

setInterval(() => {
  /* NavBar animations below: */
  var active1 = false;
  var active2 = false;
  var active3 = false;
  var active4 = false;

  $(".parent2").on("mousedown touchstart", function() {
    if (!active1)
      $(this)
        .find(".test1")
        .css({ "background-color": "gray", transform: "translate(0px,125px)" });
    else
      $(this)
        .find(".test1")
        .css({ "background-color": "dimGray", transform: "none" });
    if (!active2)
      $(this)
        .find(".test2")
        .css({
          "background-color": "gray",
          transform: "translate(60px,105px)"
        });
    else
      $(this)
        .find(".test2")
        .css({ "background-color": "darkGray", transform: "none" });
    if (!active3)
      $(this)
        .find(".test3")
        .css({
          "background-color": "gray",
          transform: "translate(105px,60px)"
        });
    else
      $(this)
        .find(".test3")
        .css({ "background-color": "silver", transform: "none" });
    if (!active4)
      $(this)
        .find(".test4")
        .css({ "background-color": "gray", transform: "translate(125px,0px)" });
    else
      $(this)
        .find(".test4")
        .css({ "background-color": "silver", transform: "none" });
    active1 = !active1;
    active2 = !active2;
    active3 = !active3;
    active4 = !active4;
  });
}, 100);

const App = () => (
  <Switch>
    <Route path="/" exact={true} component={Home} />
    <Route path="/forums" component={Forums} />
  </Switch>
);

export default App;
