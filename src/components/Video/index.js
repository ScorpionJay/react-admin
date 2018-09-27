/**
 * video
 */
import React from "react";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  BigPlayButton,
  PlayToggle,
  VolumeMenuButton
} from "video-react";
import "./style.scss";
export default props => {
  return (
    <div style={props.style}>
      <Player playsInline poster={props.poster} src={props.src} fluid={true}>
        <BigPlayButton position="center" />
        <ControlBar>
          <PlayToggle />
          <ReplayControl seconds={10} order={1.1} />
          <ForwardControl seconds={30} order={1.2} />
          <CurrentTimeDisplay order={4.1} />
          <TimeDivider order={4.2} />
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
          <VolumeMenuButton vertical />
        </ControlBar>
      </Player>
    </div>
  );
};
