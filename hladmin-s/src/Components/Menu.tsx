import { useContext, useEffect, useState } from "react";
import { DashboardMenuItem, Menu, MenuItemLink } from "react-admin";
import BookIcon from "@material-ui/icons/Book";
import LabelIcon from "@material-ui/icons/Label";
import { UserContext } from "../Context/UserDataContext";
import { UserRoleTypes } from "../types/UserRoleTypes";
import { RouteDefinitons } from "../Utils/RouteDefinitions";

export const CustomMenu = (props: any) => {
  const { user } = useContext(UserContext);
  return (
    <Menu {...props} className='main-menu'>
      <DashboardMenuItem />
      {user &&
        user.result.roles.some(
          (el) => el.type === UserRoleTypes.SYSTEM_DATA_EDITOR
        ) && (
          <>
            <MenuItemLink
              to={RouteDefinitons.ROUTE_REGIONS}
              primaryText='Region'
              leftIcon={<BookIcon />}
            />
            <MenuItemLink
              to={RouteDefinitons.ROUTE_BMES}
              primaryText='BMEs'
              leftIcon={<LabelIcon />}
            />
            <MenuItemLink
              to={RouteDefinitons.ROUTE_TRIPS}
              primaryText='Trips'
              leftIcon={<LabelIcon />}
            />
          </>
        )}
      {user &&
        user.result.roles.some(
          (el) => el.type === UserRoleTypes.BME_EDITOR
        ) && (
          <MenuItemLink
            to={RouteDefinitons.ROUTE_USER_ASSOCIATIONS}
            primaryText='User Associations'
            leftIcon={<LabelIcon />}
          />
        )}
    </Menu>
  );
};
