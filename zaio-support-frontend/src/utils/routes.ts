import { RouteProps } from "react-router";
import { DashboardPage } from "../pages/DashboardPage/DashboardPage";
import { HistoryPage } from "../pages/HistoryPage/HistoryPage";
import { SettingsPage } from "../pages/SettingsPage/SettingsPage";
import { LandingPage } from "../pages/LandingPage/LandingPage";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { LogoutPage } from "../pages/LogoutPage/LogoutPage";
import { ThankYouPage } from "../pages/ThankYouPage/ThankYouPage";
import { TutorSupport } from "../pages/TutorSupport/TutorSupport";
import { VideoCallPage } from "../pages/VideoCallPage/VideoCallPage";
import { RouteDefinitions } from "./RouteDefinitions";
import { ClientDashboard } from "../pages/ClientDashboard/ClientDashboard";
import { ClientLogin } from "../pages/ClientLogin/ClientLogin";
import { MeetingsPage } from "../pages/ClientMeeting/ClientMeeting";
import { ClientPayment } from "../pages/ClientPayment/ClientPayment";
import { ClientPaymentList } from "../pages/ClientPaymentList/ClientPaymentList";
import { ClientSignUpPage } from "../pages/ClientSignUpPage/ClientSignUpPage";

export const publicRoutes: RouteProps[] = [
  {
    component: VideoCallPage,
    path: RouteDefinitions.ROUTE_VIDEO_CALL,
    exact: true,
  },
  {
    component: ThankYouPage,
    path: RouteDefinitions.ROUTE_END_CALL,
    exact: true,
  },

  {
    component: TutorSupport,
    path: RouteDefinitions.ROUTE_TUTOR_SUPPORT,
    exact: true,
  },

  {
    component: LoginPage,
    path: RouteDefinitions.ROUTE_LOGIN,
    exact: true,
  },
  {
    component: LandingPage,
    path: RouteDefinitions.ROUTE_LANDING,
    exact: true,
  },
  {
    component: LogoutPage,
    exact: true,
    path: RouteDefinitions.ROUTE_LOGOUT,
  },
  {
    component: ClientLogin,
    exact: true,
    path: RouteDefinitions.ROUTE_CLIENT_LOGIN,
  },
  {
    component: ClientSignUpPage,
    exact: true,
    path: RouteDefinitions.ROUTE_CLIENT_SIGN_UP,
  },
];

export const privateRoutes: RouteProps[] = [
  {
    component: DashboardPage,
    path: RouteDefinitions.ROUTE_DASHBOARD,
    exact: true,
  },
  {
    component: HistoryPage,
    path: RouteDefinitions.ROUTE_HISTORY,
    exact: true,
  },
  {
    component: SettingsPage,
    path: RouteDefinitions.ROUTE_SETTINGS,
    exact: true,
  },
  {
    component: ClientDashboard,
    path: RouteDefinitions.ROUTE_CLIENT_DASHBOARD,
    exact: true,
  },
  {
    component: MeetingsPage,
    path: RouteDefinitions.ROUTE_CLIENT_MEETINGS,
    exact: true,
  },
  {
    component: ClientPayment,
    path: RouteDefinitions.ROUTE_CLIENT_PAYMENT,
    exact: true,
  },
  {
    component: ClientPaymentList,
    path: RouteDefinitions.ROUTE_CLIENT_PAYMENT_LIST,
    exact: true,
  },
];
