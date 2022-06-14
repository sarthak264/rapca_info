import { createClient } from "agora-rtc-react";
import { useState } from "react";
import { Controls } from "./Controls";
import { Videos } from "./Videos";
import { clientConfig } from "../../../utils/configs";
import { Chat } from "./Chat";
import { VideoNavbar } from "../../../components/VideoNavbar/VideoNavbar";
import styles from "./styles/VideoCall.module.css";
import { TracksI } from "../../../utils/types";

export const VideoCall = () => {
  const client = createClient(clientConfig)();

  const [tracks, setTracks] = useState<TracksI | null>(null);
  const [mode, setMode] = useState<"screen" | "camera">("camera");

  const toggleMode = () => {
    if (mode === "camera") {
      setMode("screen");
    } else setMode("camera");
  };

  const setTracksF = (val: TracksI) => {
    setTracks(val);
  };

  return (
    <div className={`${styles.app}`}>
      <VideoNavbar />
      <Videos
        setTracksF={setTracksF}
        tracks={tracks}
        client={client}
        mode={mode}
        toggleMode={toggleMode}
      />
      <Controls tracks={tracks} client={client} toggleMode={toggleMode} />

      <Chat />
    </div>
  );
};
