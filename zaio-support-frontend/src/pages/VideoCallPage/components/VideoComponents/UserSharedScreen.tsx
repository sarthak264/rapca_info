import { useEffect } from "react";
import {
  createClient,
  createScreenVideoTrack,
  IAgoraRTCClient,
  ILocalVideoTrack,
} from "agora-rtc-react";
import { isNotArray } from "../../../../utils/utilities";
import { TracksI } from "../../../../utils/types";
import { clientConfig } from "../../../../utils/configs";
import { useHistory } from "react-router-dom";
import { MeetingService } from "../../../../services/meeting.service";

interface Props {
  setSSTrackF: (val: ILocalVideoTrack) => void;
  toggleMode: () => void;
  tracks: TracksI;
  setSSClientF: (val: IAgoraRTCClient) => void;
}

export const UserSharedScreen = (props: Props) => {
  const { ready, tracks } = createScreenVideoTrack({}, "disable")();
  const screenClient = createClient(clientConfig)();
  const history = useHistory();

  useEffect(() => {
    props.setSSClientF(screenClient);
    const query = new URLSearchParams(history.location.search);
    const meetingName = query.get("meetingName");
    const init = async (meet: string) => {
      let token = "";
      MeetingService.getAgoraToken(meet).then(async (res) => {
        token = res.data.token;
        await screenClient.join(
          "41fbdeff341b44f9ad5ce10f01209694",
          meet,
          token,
          null
        );
        console.log("Publishing");
        await screenClient.publish(tracks);
        if (isNotArray(tracks)) {
          tracks.on("track-ended", () => {
            props.toggleMode();
          });
        } else {
          tracks[0].on("track-ended", () => {
            props.toggleMode();
          });
        }
      });
    };
    if (ready && meetingName) {
      props.setSSTrackF(isNotArray(tracks) ? tracks : tracks[0]);
      init(meetingName);
    }
  }, [ready]);

  return null;
};
