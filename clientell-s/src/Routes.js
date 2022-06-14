import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Login } from "./pages/loginPage";
import { useSelector } from "react-redux";
import axios from "axios";

import { MainPage } from "./pages/dashboard";
import SideBar from "./components/sidePanel";
import { ManagerRoleUp } from "./pages/managerRoleUp";
import { RepDashboard } from "./pages/repDashboard";
import { DealCommit } from "./pages/dealCommit";
import { IndividualDealView } from "./pages/individualDealView";
import { OnboardingScreens } from "./pages/onboardingScreens";
import { AwsTest } from "./pages/awsTest";
import { AwsDashboard } from "./pages/awsDashboard";
import { TargetPage } from "./pages/targetPage";
import { TrendsPage } from "./pages/trends";
import { SettingsRoute } from "./pages/settingPages/routes";
import { SettingsPage } from "./pages/onboardingScreens/pages/settings";

const Routes = () => {
  const isUserLoggedIn = useSelector((state) => state.auth);
  // const loginAuth = useSelector((state) => state.auth.token);
  axios.defaults.headers.common["Authorization"] =
    isUserLoggedIn !== null ? `Token ${isUserLoggedIn.token}` : null;
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route
        path="/"
        render={({ match: { path } }) =>
          isUserLoggedIn !== null ? (
            <>
              <SideBar />
              <div
                style={{
                  marginLeft: "2.9rem",
                }}
              >
                <Route path={`${path}/`} exact>
                  <Redirect to="/dashboardview/main" />
                </Route>
                <Route path={`${path}dashboard`} component={MainPage} exact />
                <Route
                  path={`${path}rollupview`}
                  component={ManagerRoleUp}
                  exact
                />
                <Route
                  path={`${path}repdashboard/:userId`}
                  component={RepDashboard}
                  exact
                />
                <Route
                  path={`${path}onboarding`}
                  component={SettingsPage}
                  exact
                />
                <Route
                  exact
                  path={`${path}dealcommit`}
                  component={DealCommit}
                />
                <Route
                  exact
                  path={`${path}dealviewindi/:id`}
                  component={IndividualDealView}
                />
                <Route
                  exact
                  path={`${path}onboarding/:page`}
                  component={OnboardingScreens}
                />
                <Route exact path={`${path}quicksite`} component={AwsTest} />
                <Route
                  exact
                  path={`${path}dashboardview/:page`}
                  component={AwsDashboard}
                />
                <Route
                  exact
                  path={`${path}target/:page`}
                  component={TargetPage}
                />
                <Route exact path={`${path}trends`} component={TrendsPage} />
                <Route
                  exact
                  path={`${path}settings/:pages`}
                  component={SettingsRoute}
                />
              </div>
            </>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </Switch>
  );
};

export default Routes;
