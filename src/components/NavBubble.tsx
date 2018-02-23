import React, { Component } from "react";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";

import "./NavBubble.css";
import "font-awesome/css/font-awesome.min.css";

class NavBubble extends Component<{}, { active: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { active: false };
    this.toggleActive = this.toggleActive.bind(this);
  }
  toggleActive() {
    this.setState({ active: !this.state.active });
  }
  render() {
    return (
      <div className="NavBubble" onClick={this.toggleActive}>
        <Link to="/">
          <div
            className="NavBubble__bubble1"
            style={
              (this.state.active && {
                transform: "translate(0px, 125px)"
              }) ||
              {}
            }
          >
            <FontAwesome name="home" size="2x" />
          </div>
        </Link>
        <Link to="/forums">
          <div
            className="NavBubble__bubble2"
            style={
              (this.state.active && {
                transform: "translate(60px, 105px)"
              }) ||
              {}
            }
          >
            <FontAwesome name="wpforms" size="2x" />
          </div>
        </Link>
        <div
          className="NavBubble__bubble3 linkIsWhite"
          style={
            (this.state.active && {
              transform: "translate(105px, 60px)"
            }) ||
            {}
          }
        >
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesome name="user" size="2x" />
          </a>
        </div>
        <div
          className="NavBubble__bubble4 linkIsWhite"
          style={
            (this.state.active && {
              transform: "translate(125px, 0px)"
            }) ||
            {}
          }
        >
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
  }
}

export default NavBubble;
