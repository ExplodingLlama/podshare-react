import React from "react";
import Parser from "rss-parser";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parser: new Parser(),
      feed: { items: [] }
    };
  }
  componentDidMount() {
    this.state.parser
      .parseURL("http://joeroganexp.joerogan.libsynpro.com/rss")
      .then(feed => {
        this.setState({ feed });
      });
  }
  render() {
    return (
      <React.Fragment>
        We have {this.state.feed.items.length} items for you to enjoy!
      </React.Fragment>
    );
  }
}

export default Home;
