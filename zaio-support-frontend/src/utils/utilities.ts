import { ILocalVideoTrack } from "agora-rtc-react";

export const isNotArray = (val: any): val is ILocalVideoTrack =>
  val.length === undefined;
