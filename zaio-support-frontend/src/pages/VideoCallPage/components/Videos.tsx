import {
  AgoraVideoPlayer,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AgoraClientContext } from "../../../context/ClientAgoraContext";
import { UserSharedScreen } from "./VideoComponents/UserSharedScreen";
import styles from "./styles/Videos.module.css";
import { isNotArray } from "../../../utils/utilities";
import { MicrophoneAudio } from "./VideoComponents/MicrophoneAudio";
import { TracksI } from "../../../utils/types";
import { CameraVideo } from "./VideoComponents/CameraVideo";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export const Videos = ({
  client,
  tracks,
  mode,
  ...props
}: {
  tracks: TracksI | null;
  setTracksF: (val: TracksI) => void;
  client: IAgoraRTCClient;
  toggleMode: () => void;
  mode: "camera" | "screen";
}) => {
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const history = useHistory();
  const { agoraClientToken } = useContext(AgoraClientContext);
  const [start, setStart] = useState(false);
  const [SSClient, setSSClient] = useState<IAgoraRTCClient | null>(null);
  const [SSTrack, setSSTrack] = useState<ILocalVideoTrack | null>(null);

  const setSSClientF = (val: IAgoraRTCClient) => setSSClient(val);
  const setSSTrackF = (val: ILocalVideoTrack) => setSSTrack(val);

  console.log({ users });

  const query = new URLSearchParams(history.location.search);
  const meetingName = query.get("meetingName");
  const uid = query.get("uid");
  const userType = query.get("type");

  useEffect(() => {
    if (mode === "camera" && SSClient && SSTrack) {
      SSTrack.close();
      SSClient.unpublish().then(() => {
        SSClient.leave();
      });
      setSSClient(null);
      setSSTrack(null);
    }
  }, [mode]);

  useEffect(() => {
    // function to initialise the SDK
    let init = async (name: string) => {
      client.on("user-published", async (user, mediaType) => {
        console.log({ user });
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });
      console.log({ name, agoraClientToken, uid });
      await client.join(
        "41fbdeff341b44f9ad5ce10f01209694",
        name,
        agoraClientToken,
        null
      );
      console.log("JOINED");
      await client.publish([tracks![0]!, tracks![1]]);

      setStart(true);
    };

    if (meetingName && tracks && tracks[0] && !start) {
      console.log("init ready");
      init(meetingName);
    }
  }, [tracks, start]);

  console.log({ users, userType });

  if (userType === "user") {
    return (
      <div className={styles.main}>
        <MicrophoneAudio setTracksF={props.setTracksF} />
        {tracks && mode === "screen" && (
          <UserSharedScreen
            setSSClientF={setSSClientF}
            toggleMode={props.toggleMode}
            setSSTrackF={setSSTrackF}
            tracks={tracks}
          />
        )}

        {tracks && mode === "camera" && (
          <CameraVideo
            toggleMode={props.toggleMode}
            setTracksF={props.setTracksF}
            tracks={tracks}
          />
        )}

        {tracks && tracks[0] && (
          <AgoraVideoPlayer
            className={`${styles.tutorVid} ${styles.vid}`}
            videoTrack={tracks[0]}
          />
        )}

        <div>
          {users.length > 0 &&
            users.map((user, index) => {
              if (index === users.length - 1 && user.videoTrack) {
                return (
                  <AgoraVideoPlayer
                    className={`${styles.vid} ${styles.screenShared}`}
                    videoTrack={user.videoTrack}
                    key={user.uid}
                  />
                );
              } else return null;
            })}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.main}>
      <MicrophoneAudio setTracksF={props.setTracksF} />
      {tracks && mode === "screen" && (
        <UserSharedScreen
          setSSClientF={setSSClientF}
          toggleMode={props.toggleMode}
          setSSTrackF={setSSTrackF}
          tracks={tracks}
        />
      )}
      {tracks && mode === "camera" && (
        <CameraVideo
          toggleMode={props.toggleMode}
          setTracksF={props.setTracksF}
          tracks={tracks}
        />
      )}

      <div>
        {users.length > 0 &&
          users.map((user, index) => {
            if (index === users.length - 1 && user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  className={`${styles.screenShared} ${styles.vid}`}
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return null;
          })}
      </div>
      <div>
        {tracks && tracks[0] && (
          <AgoraVideoPlayer
            className={`${styles.vid} ${styles.tutorVid}`}
            videoTrack={tracks[0]}
          />
        )}
      </div>
    </div>
  );
};
