import React from "react";
import Parser from "rss-parser";
import axios from "axios";
import { withRouter } from "react-router-dom";
import moment from "moment";
import AudioPlayer from "react-h5-audio-player-bonobo";
import "react-h5-audio-player-bonobo/lib/styles.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parser: new Parser(),
      podLinks: [],
      currentClip: 1
    };
  }
  componentDidMount() {
    axios.get("/getAllLinks").then(response => {
      this.setState({ podLinks: response.data });
    });
  }
  gotoLink = i => {
    // this.props.history.push(`/${id}`);
    this.setState({ currentClip: i });
  };
  render() {
    const clip =
      (this.state.podLinks && this.state.podLinks[this.state.currentClip]) ||
      {};
    const src = clip.start_time
      ? `${
          clip.audio_link
        }#t=${clip.start_time.toString()},${clip.end_time.toString()}`
      : clip.audio_link;
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
          {this.state.podLinks.map((link, i) => {
            const duration = moment
              .utc((link.end_time - link.start_time) * 1000)
              .format("mm:ss");
            return (
              <div
                key={link.id}
                onClick={() => this.gotoLink(i)}
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
          <div
            style={{
              position: "fixed",
              left: "0",
              bottom: "0",
              width: "100%"
            }}
          >
            <AudioPlayer
              src={src}
              startTime={clip.start_time}
              endTime={clip.end_time}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
