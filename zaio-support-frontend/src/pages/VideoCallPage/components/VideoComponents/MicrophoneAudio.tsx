import { useEffect } from "react";
import {
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  createMicrophoneAudioTrack,
  ILocalVideoTrack,
} from "agora-rtc-react";
import { TracksI } from "../../../../utils/types";

interface Props {
  setTracksF: (val: TracksI) => void;
}

export const MicrophoneAudio = (props: Props) => {
  const { ready, track, error } = createMicrophoneAudioTrack()();
  if (error) {
    if (error.code === "DEVICE_NOT_FOUND") {
      // alert("Cannot find Camera/ microphone module");
    }
  }
  useEffect(() => {
    if (ready && track) {
      props.setTracksF([null, track]);
    }
  }, [ready]);

  return null;
};
