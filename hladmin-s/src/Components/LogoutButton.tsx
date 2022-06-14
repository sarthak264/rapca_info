import * as React from "react";
import { forwardRef } from "react";
import { useLogout } from "react-admin";
import MenuItem from "@material-ui/core/MenuItem";
import ExitIcon from "@material-ui/icons/PowerSettingsNew";

const LogoutButton = () => {
  return (
    <MenuItem>
      <ExitIcon /> Logout1
    </MenuItem>
  );
};

export default LogoutButton;
