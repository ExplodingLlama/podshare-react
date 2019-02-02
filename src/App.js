import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, StaticRouter, Route, Link } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import ItemPage from "./ItemPage";

axios.defaults.baseURL =
  "https://us-central1-podshare-a436d.cloudfunctions.net";

const ItemPageWrapper = ({ match }) => {
  return <ItemPage itemId={match.params.itemId} />;
};

const Router = props => {
  if (typeof window !== "undefined") {
    return <BrowserRouter>{props.children}</BrowserRouter>;
  } else {
    return (
      <StaticRouter location={props.path} context={{}}>
        {props.children}
      </StaticRouter>
    );
  }
};

class App extends React.Component {
  render() {
    return (
      <Router path={this.props.path}>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/:itemId" component={ItemPageWrapper} />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  greeting: PropTypes.string
};
export default App;
