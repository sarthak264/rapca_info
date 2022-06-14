import { useEffect } from "react";
import {
  createMicrophoneAndCameraTracks,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  createCameraVideoTrack,
} from "agora-rtc-react";
import { TracksI } from "../../../../utils/types";

interface Props {
  setTracksF: (val: TracksI) => void;
  toggleMode: () => void;
  tracks: TracksI;
}

export const CameraVideo = (props: Props) => {
  const { ready, track, error } = createCameraVideoTrack()();
  if (error) {
    if (error.code === "DEVICE_NOT_FOUND") {
      // alert("Cannot find Camera/ microphone module");
    }
  }
  useEffect(() => {
    if (ready && track && props.tracks) {
      props.setTracksF([track, props.tracks[1]]);
      // init(meetingName);
    }
  }, [ready]);

  return null;
};
