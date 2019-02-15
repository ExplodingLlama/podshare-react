import React from "react";
import axios from "axios";
import ReactPlayer from "react-player/lib/players/FilePlayer";
import Parser from "rss-parser";

import { Direction, FormattedTime, Slider } from "react-player-controls";

class ItemPage extends React.Component {
  state = {
    item: {}
    // feed: { image: {} }
  };
  componentDidMount() {
    axios
      .get(`/getLink/${this.props.itemId}`)
      .then(response => {
        this.setState({ item: response.data });
        console.log(response.data.audio_link);
        // if (response.data.rss) {
        //   new Parser().parseURL(response.data.rss).then(feed => {
        //     this.setState({ feed });
        //   });
        // }
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
            fontFamily: "Futura-Medium",
            fontSize: "50px",
            paddingBottom: "32px"
          }}
        >
          {this.state.item.title}
        </div>

        <audio controls src={this.state.item.audio_link}>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
    );
  }
}

// Create a basic bar that represents time
const TimeBar = ({ children }) => (
  <div
    style={{
      height: 6,
      width: "100%",
      background: "gray"
    }}
  >
    {children}
  </div>
);

// Create a tooltip that will show the time
const TimeTooltip = ({ numSeconds, style = {} }) => (
  <div
    style={{
      display: "inline-block",
      position: "absolute",
      bottom: "100%",
      transform: "translateX(-50%)",
      padding: 8,
      borderRadius: 3,
      background: "darkblue",
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
      lineHeight: 16,
      textAlign: "center",
      ...style
    }}
  >
    <FormattedTime numSeconds={numSeconds} />
  </div>
);

// Create a component to keep track of user interactions
class BarWithTimeOnHover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // This will be a normalised value between 0 and 1,
      // or null when not hovered
      hoverValue: null
    };

    this.handleIntent = this.handleIntent.bind(this);
    this.handleIntentEnd = this.handleIntentEnd.bind(this);
  }

  handleIntent(value) {
    this.setState({
      hoverValue: value
    });
  }

  handleIntentEnd() {
    // Note that this might not be invoked if the user ends
    // a control change with the mouse outside of the slider
    // element, so you might want to do this inside a
    // onChangeEnd callback too.
    this.setState({
      hoverValue: null
    });
  }

  render() {
    const { duration } = this.props;
    const { hoverValue } = this.state;

    return (
      <Slider
        direction={Direction.HORIZONTAL}
        style={{
          position: "relative"
        }}
        onIntent={this.handleIntent}
        onIntentEnd={this.handleIntentEnd}
      >
        <TimeBar />

        {hoverValue !== null && (
          <TimeTooltip
            numSeconds={hoverValue * duration}
            style={{
              left: `${hoverValue * 100}%`
            }}
          />
        )}
      </Slider>
    );
  }
}

export default ItemPage;
