import { AxiosClient } from "./baseApi";

export interface ActiveMeetingI {
  _id: string;
  meeting: {
    _id: string;
    client: string;
    createdAt: string;
    updatedAt: string;
    meetingTopic?: string;
    __v: 0;
    user: {
      username: string;
    };
  };

  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface MeetingResponseI {
  token: string;
  meeting: {
    meetingId: string;
    meetingName: string;
    uid: string;
  };
  message: string;
}
export const MeetingService = {
  createMeeting: async (meetingTopic: string) => {
    return AxiosClient.post<MeetingResponseI>(
      "/meeting/schedule",
      {
        meetingTopic,
      },
      {
        headers: {
          accesstoken: localStorage.getItem("userToken") || "",
        },
      }
    );
  },
  endMeeting: async (id: string) => {
    return AxiosClient.patch<{
      meeting: {
        meetingId: string;
        meetingTime: number;
      };
      message: string;
    }>("/meeting/end/" + id, {});
  },
  getActiveMeetings: async () => {
    return AxiosClient.get<{ meetings: ActiveMeetingI[] }>("/meeting/active");
  },
  startMeeting: async (id: string) => {
    return AxiosClient.patch<MeetingResponseI>("/meeting/start/" + id, {});
  },
  getAgoraToken: async (meetingName: string) => {
    return AxiosClient.get<{
      token: string;
    }>("/meeting/token/" + meetingName);
  },
  getRTMToken: async (id: string) => {
    return AxiosClient.get<{
      token: string;
    }>("/meeting/rtm/token?id=" + id);
  },
};
