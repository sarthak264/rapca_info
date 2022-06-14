import { ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-react";
import {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import { useState } from "react";
import { useHistory } from "react-router";
import { ShareScreen } from "../../../assets/ShareScreen";
import { MeetingService } from "../../../services/meeting.service";
import { RouteDefinitions } from "../../../utils/RouteDefinitions";
import { TracksI } from "../../../utils/types";
import { isNotArray } from "../../../utils/utilities";
import styles from "./styles/Controls.module.css";

export const Controls = ({
  client,
  ...props
}: {
  tracks: TracksI | null;
  client: IAgoraRTCClient;
  toggleMode: () => void;
}) => {
  const history = useHistory();
  const { tracks } = props;
  const [trackState, setTrackState] = useState({
    video: true,
    audio: true,
  });

  const mute = async (type: "audio" | "video") => {
    if (tracks) {
      if (type === "audio") {
        await tracks[1].setEnabled(!trackState.audio);
        setTrackState((ps) => {
          return { ...ps, audio: !ps.audio };
        });
      } else if (type === "video" && tracks[0]) {
        await tracks[0].setEnabled(!trackState.video);
        setTrackState((ps) => {
          return { ...ps, video: !ps.video };
        });
      }
    }
  };

  const leaveChannel = async () => {
    await client.unpublish();
    client.removeAllListeners();
    if (tracks && tracks[0]) {
      tracks[0].close();
    }
    if (tracks && tracks[1]) {
      tracks[1].close();
    }
    await client.leave();
    const query = new URLSearchParams(history.location.search);
    const meetingId = query.get("meetingId");
    if (meetingId) {
      const data = await MeetingService.endMeeting(meetingId);
      history.push(
        RouteDefinitions.ROUTE_END_CALL.concat(
          `?time=${data.data.meeting.meetingTime}`
        )
      );
    }
  };

  return (
    <div className={`${styles.controls}`}>
      <p onClick={() => mute("audio")}>
        {trackState.audio ? (
          <i className="bi bi-mic-mute"></i>
        ) : (
          <i className="bi bi-mic"></i>
        )}
      </p>
      <p onClick={() => mute("video")}>
        {trackState.video ? (
          <i className="bi bi-camera-video-off"></i>
        ) : (
          <i className="bi bi-camera-video"></i>
        )}
      </p>
      <p
        onClick={async () => {
          props.toggleMode();
        }}
      >
        <ShareScreen />
      </p>
      <p
        onClick={() => leaveChannel()}
        className={`ms-auto ${styles.cancelBtn}`}
      >
        <div className={`${styles.cancelBtnText}`}>End</div>
        {/* <i className={`bi bi-telephone-x ${styles.cancelBtnText}`}></i> */}
      </p>
    </div>
  );
};
