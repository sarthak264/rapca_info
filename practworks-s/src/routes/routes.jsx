import landingPage from "../views/LandingPage/LandingPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store, history, persistor } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import BasicLogin from "../components/BasicLogin/BasicLogin";
import BasicForgotPassword from "../components/BasicForgotPassword/BasicForgotPassword";
import Terms from "../views/Terms/Terms";
import Help from "../views/Help/Help";
import Faq from "../views/Faq/Faq";
import Privacy from "../views/Privacy/Privacy";
import Refund from "views/Refund Policy/Refund";
import Pricing from "views/Pricing/Pricing";
import ProtectedRoutes from "./ProtectedRoutes";
import ContactUsPage from "views/ContactUsPage/ContactUsPage";
import ResetPassword from "components/ResetPassword/ResetPassword";
import Blog from "views/Blog/Blog";
import { RouteDefinitons } from "./RouteDefinitions";

const routesArr = [
  {
    component: BasicLogin,
    path: RouteDefinitons.ROUTE_TEACHER_LOGIN,
    exact: true,
  },
  {
    component: BasicLogin,
    path: RouteDefinitons.ROUTE_TEACHER_SIGNUP,
    exact: true,
  },
  {
    component: BasicLogin,
    path: RouteDefinitons.ROUTE_STUDENT_LOGIN,
    exact: true,
  },
  {
    component: BasicLogin,
    path: RouteDefinitons.ROUTE_STUDENT_SIGNUP,
    exact: true,
  },
];

const routes = (props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Switch>
            {routesArr.map((route, i) => (
              <Route {...route} key={i} />
            ))}
            {/* <Route exact path="/" render={() => <Redirect to="" />} /> */}
            <Route exact path="/" component={landingPage} />;
            <Route exact path="/login" component={BasicLogin} />;
            {/* <Route exact path='/student-login' component={BasicLogin} />; */}
            <Route exact path="/signup" component={BasicLogin} />;
            <Route
              exact
              path="/forgot-password"
              component={BasicForgotPassword}
            />
            <Route exact path="/otp" component={BasicForgotPassword} />;
            <Route exact path="/profile" component={BasicForgotPassword} />;
            <Route exact path="/landing-page/terms" component={Terms} />;
            <Route exact path="/landing-page/help" component={Help} />;
            <Route exact path="/landing-page/faq" component={Faq} />;
            <Route
              exact
              path="/landing-page/privacy-policy"
              component={Privacy}
            />
            ;
            <Route exact path="/landing-page/pricing" component={Pricing} />
            <Route
              exact
              path="/landing-page/refund-policy"
              component={Refund}
            />
            <Route
              exact
              path="/landing-page/contact-us"
              component={ContactUsPage}
            />
            <Route exact path="/landing-page/blogs" component={Blog} />;
            <Route exact path="/reset-password" component={ResetPassword} />
            <ProtectedRoutes />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
};
export default routes;
