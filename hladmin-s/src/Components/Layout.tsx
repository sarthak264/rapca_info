import { Layout } from "react-admin";
import LogoutButton from "./LogoutButton";
import { CustomMenu } from "./Menu";

export const CustomLayout = (props: any) => (
  <Layout {...props} menu={CustomMenu} logout={<LogoutButton />} />
);
