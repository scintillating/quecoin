import React from "react";
import { Link } from "react-router-dom";

import "font-awesome/css/font-awesome.min.css";
import $ from "jquery";

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

const NavBubble = () => (
  <div className="parent2">
    <Link to="/">
      <div className="test1">
        <i className="fa fa-home fa-2x" />
      </div>
    </Link>
    <Link to="/forums">
      <div className="test2">
        <i className="fa fa-wpforms fa-2x" />
      </div>
    </Link>
    <div className="test3 linkIsWhite">
      <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
        <i className="fa fa-user fa-2x" />
      </a>
    </div>
    <div className="test4 linkIsWhite">
      <a
        href="https://docs.google.com/document/d/1SUYIcKfctowjjmqOM4c3Bq4D337DjCJDVFs9w4ppKbg/edit"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-file fa-2x" />
      </a>
    </div>
    <div className="mask2">
      <i className="fa fa-home fa-3x" />
    </div>
  </div>
);

export default NavBubble;
