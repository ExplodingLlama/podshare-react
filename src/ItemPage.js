import React from "react";
import axios from "axios";
import ReactAudioPlayer from "react-audio-player";
import Parser from "rss-parser";

class ItemPage extends React.Component {
  state = {
    item: {},
    feed: { image: {} }
  };
  componentDidMount() {
    axios
      .get(`/getLink/${this.props.itemId}`)
      .then(response => {
        this.setState({ item: response.data });
        if (response.data.rss) {
          new Parser().parseURL(response.data.rss).then(feed => {
            this.setState({ feed });
          });
        }
      })
      .catch(err => {
        console.log("error", err);
      });
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "50px",
            paddingBottom: "32px"
          }}
        >
          {this.state.feed.title}
        </div>
        <ReactAudioPlayer
          src={this.state.item.audio_link}
          autoPlay={true}
          controls
        />
        <img src={this.state.feed.image.url} width={"10%"} height={"auto"} />
        <div>{this.state.feed.description}</div>
        <div>{this.state.feed.copyright}</div>
      </div>
    );
  }
}

export default ItemPage;
