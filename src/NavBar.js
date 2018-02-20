import React from "react";
import { Link } from "react-router-dom";

export default () => (
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
