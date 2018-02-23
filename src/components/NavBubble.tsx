import React from "react";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";

import "./NavBubble.css";
import "font-awesome/css/font-awesome.min.css";
import $ from "jquery";

setInterval(() => {
  /* NavBar animations below: */
  var active1 = false;
  var active2 = false;
  var active3 = false;
  var active4 = false;

  $(".NavBubble").on("mousedown touchstart", function() {
    if (!active1)
      $(this)
        .find(".NavBubble__bubble1")
        .css({ "background-color": "gray", transform: "translate(0px,125px)" });
    else
      $(this)
        .find(".NavBubble__bubble1")
        .css({ "background-color": "dimGray", transform: "none" });
    if (!active2)
      $(this)
        .find(".NavBubble__bubble2")
        .css({
          "background-color": "gray",
          transform: "translate(60px,105px)"
        });
    else
      $(this)
        .find(".NavBubble__bubble2")
        .css({ "background-color": "darkGray", transform: "none" });
    if (!active3)
      $(this)
        .find(".NavBubble__bubble3")
        .css({
          "background-color": "gray",
          transform: "translate(105px,60px)"
        });
    else
      $(this)
        .find(".NavBubble__bubble3")
        .css({ "background-color": "silver", transform: "none" });
    if (!active4)
      $(this)
        .find(".NavBubble__bubble4")
        .css({ "background-color": "gray", transform: "translate(125px,0px)" });
    else
      $(this)
        .find(".NavBubble__bubble4")
        .css({ "background-color": "silver", transform: "none" });
    active1 = !active1;
    active2 = !active2;
    active3 = !active3;
    active4 = !active4;
  });
}, 100);

const NavBubble = () => (
  <div className="NavBubble">
    <Link to="/">
      <div className="NavBubble__bubble1">
        <FontAwesome name="home" size="2x" />
      </div>
    </Link>
    <Link to="/forums">
      <div className="NavBubble__bubble2">
        <FontAwesome name="wpforms" size="2x" />
      </div>
    </Link>
    <div className="NavBubble__bubble3 linkIsWhite">
      <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">
        <FontAwesome name="user" size="2x" />
      </a>
    </div>
    <div className="NavBubble__bubble4 linkIsWhite">
      <a
        href="https://docs.google.com/document/d/1SUYIcKfctowjjmqOM4c3Bq4D337DjCJDVFs9w4ppKbg/edit"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesome name="file" size="2x" />
      </a>
    </div>
    <div className="NavBubble__bubble-home">
      <FontAwesome name="home" size="3x" />
    </div>
  </div>
);

export default NavBubble;
