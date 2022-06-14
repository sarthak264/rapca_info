import MenuItem from "@material-ui/core/MenuItem";
import ExitIcon from "@material-ui/icons/PowerSettingsNew";
import { useHistory } from "react-router-dom";
import { authProvider } from "../AuthProviders";

const LogoutButton = (props) => {
  const history = useHistory();
  return (
    <MenuItem
      {...props}
      onClick={() => {
        authProvider.logout().then(() => {
          history.push("/login");
        });
      }}
    >
      <ExitIcon /> Logout
    </MenuItem>
  );
};

export default LogoutButton;
