import React from "react";
import Video from "../../../components/Video";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  BigPlayButton,
  VolumeMenuButton
} from "video-react";
import "./style.scss";
export default props => {
  return (
    <div style={{ width: "30rem", marginTop: "1rem" }}>
      <Video
        poster="https://video-react.js.org/assets/poster.png"
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        style={{ width: "30rem", marginTop: "1rem" }}
      />
    </div>
  );
};
