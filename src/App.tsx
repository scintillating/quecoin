import React from "react";
import { Route, Switch } from "react-router";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// UI Components
import Home from "./components/home";
import Forums from "./components/forums";
import ErrorBox from "./components/ErrorBox";

// Styles
import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";
import "./css/aesthetic.css";
import "./hahacss.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface StateProps {
  fatalError: string | null;
}

const App = (props: StateProps) => {
  let content;
  if (props.fatalError) {
    content = <ErrorBox message={props.fatalError} fatal={true} />;
  } else {
    content = (
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/forums" component={Forums} />
      </Switch>
    );
  }

  return content;
};

export default withRouter(connect(
  (state: any, props) =>
    ({
      fatalError: state.error.fatalError
    } as StateProps)
)(App) as any);
