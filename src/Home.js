import React from "react";
import Parser from "rss-parser";
import axios from "axios";
import { withRouter } from "react-router-dom";
import moment from "moment";
import {
  Button,
  FormattedTime,
  PlayerIcon,
  Slider,
  Direction
} from "react-player-controls";

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
  gotoLink = id => {
    this.props.history.push(`/${id}`);
  };
  render() {
    return (
      <div style={{ backgroundColor: "#eee", paddingBottom: "500px" }}>
        <img
          src={require("./resources/banner.png")}
          style={{ width: "100%" }}
        />
        <div style={{ margin: "20px" }}>
          <div
            style={{
              fontFamily: "Futura-Medium",
              fontSize: "30px",
              padding: "10px"
            }}
          >
            Pod Linker lets you share your favourite podcast clips with your
            friends
          </div>
          {this.state.podlinks.map((link, i) => {
            const duration = moment
              .utc((link.end_time - link.start_time) * 1000)
              .format("mm:ss");
            return (
              <div
                key={link.id}
                onClick={() => this.gotoLink(link.id)}
                style={{
                  padding: "20px",
                  cursor: "pointer",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderRadius: "3px",
                  borderColor: "#ccc",
                  margin: "10px"
                }}
              >
                <div style={{ fontFamily: "Futura-Medium", fontSize: "20px" }}>
                  {`${i + 1}. ${link.title}  -  ${duration}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
