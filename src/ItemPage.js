import React from "react";
import axios from "axios";
import ReactPlayer from "react-player";
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
  ref = player => {
    this.player = player;
  };

  jumpToStart = () => {
    this.player.seekTo(this.state.item.start_time);
  };
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

        <ReactPlayer
          url={this.state.item.audio_link}
          playing={true}
          ref={this.ref}
          controls
          onStart={this.jumpToStart}
        />
        <img src={this.state.feed.image.url} width={"10%"} height={"auto"} />
        <div>{this.state.feed.description}</div>
        <div>{this.state.feed.copyright}</div>
      </div>
    );
  }
}

export default ItemPage;
