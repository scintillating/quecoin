import React from "react";
import { Route, Switch } from "react-router";

// UI Components
import Home from "./components/home";
import Forums from "./components/forums";
import SiteHeader from "./components/SiteHeader";

// Styles
import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";
import "./css/aesthetic.css";
import "./hahacss.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <>
    <SiteHeader />
    <main className="container">
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/forums" component={Forums} />
      </Switch>
    </main>
  </>
);

export default App;
