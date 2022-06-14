import { IMicrophoneAudioTrack, ICameraVideoTrack } from "agora-rtc-sdk-ng";

export type TracksI = [ICameraVideoTrack | null, IMicrophoneAudioTrack];
export type ZSObjectI = {
  user: "client" | "tutor" | "user";
  token: string;
};
