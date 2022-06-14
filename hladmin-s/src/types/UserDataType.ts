import { UserRoleTypes } from "./UserRoleTypes";

export interface UserDataI {
  jsonrpc: "2.0+hl";
  id: 1;
  result: {
    type: "jdr1:user";
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: [
      {
        type: UserRoleTypes;
      }
    ];
    region: {
      type: "jdr1:region";
      _id: string;
      title: string;
      tz: string;
    };
    locale: {
      tag: "en-US";
      iso_name: "English US";
      endonym: "English US";
    };
  };
}
