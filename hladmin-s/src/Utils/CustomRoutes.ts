import { RouteProps } from "react-router";
import { TripCreate } from "../Pages/TripCreate";
import { InviteVolunteer } from "../Pages/InviteVolunteer";
import { TripPage } from "../Pages/Trips";

import { VolunteerList } from "../Pages/Volunteers";
import { RouteDefinitons } from "./RouteDefinitions";
import { TripEdit } from "../Pages/TripEdit";
import { TripView } from "../Pages/TripView";

export const customRoutes: RouteProps[] = [
  {
    component: VolunteerList,
    path: RouteDefinitons.ROUTE_USER_ASSOCIATIONS + "/:bmeId?",
    exact: true,
  },
  {
    component: InviteVolunteer,
    exact: true,
    path: RouteDefinitons.ROUTE_USER_ASSOCIATIONS + "/:bmeId/invite",
  },
  {
    component: TripPage,
    exact: true,
    path: RouteDefinitons.ROUTE_TRIPS + "/:bmeId?",
  },
  {
    component: TripCreate,
    exact: true,
    path: RouteDefinitons.ROUTE_TRIPS + "/:bmeId/create",
  },
  {
    component: TripEdit,
    exact: true,
    path: RouteDefinitons.ROUTE_TRIPS + "/:bmeId/:tripId",
  },
  {
    component: TripView,
    exact: true,
    path: RouteDefinitons.ROUTE_TRIPS + "/:bmeId/:tripId/show",
  },
];
