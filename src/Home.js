import React from "react";
import Parser from "rss-parser";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parser: new Parser(),
      podlinks: []
    };
  }
  componentDidMount() {
    // this.state.parser
    //   .parseURL("https://verybadwizards.fireside.fm/rss")
    //   .then(feed => {
    //     this.setState({ feed });
    //   });
    axios.get("/getAllLinks").then(response => {
      this.setState({ podlinks: response.data });
    });
  }
  render() {
    return (
      <div style={{ margin: "20px" }}>
        <div style={{ fontSize: "30px", padding: "10px" }}>
          Pod Linker lets you share your favourite podcast clips with your
          friends
        </div>
        {this.state.podlinks.map(link => {
          return (
            <div style={{ padding: "10px" }}>
              <a href={"/" + link.id}>{link.title}</a>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Home;
