import { FunctionComponent, useContext, useEffect } from "react";
import { Admin, Resource, Title } from "react-admin";
import { BMECreate } from "./CreateForms/BMEs";
import { RegionCreate } from "./CreateForms/Regions";
import { CustomDataProvider } from "./DataProviders";
import { BMEList } from "./Lists/BMEs";
import { RegionList } from "./Lists/Regions";
import { Login } from "./Pages/Login";
import { DataProviderTypes } from "./types/DataProviderTypes";
import { createBrowserHistory as createHistory } from "history";
import { auth } from "./AuthProviders";
import { UserContext } from "./Context/UserDataContext";
import LogoutButton from "./Components/LogoutButton";
import { Dashboard } from "./Pages/Dashboard";
import { AxiosInstance } from "./Utils/AxiosInstance";
import { UserDataI } from "./types/UserDataType";
import { CustomLayout } from "./Components/Layout";
import { customRoutes } from "./Utils/CustomRoutes";
import { Route } from "react-router";
import { ThemeProvider } from "./Utils/ThemeProvider";
import NavLogo from "./assets/NavLogo.svg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";

const history = createHistory();

const App = () => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        let temp = await user.getIdToken();
        console.log({ temp });
        localStorage.setItem("firebaseToken", temp);
        const res = await AxiosInstance.post<UserDataI>("", {
          jsonrpc: "2.0+hl",
          id: 1,
          method: "hladmin1:user:get",
          params: {},
          auth: {
            type: "gcloud_firebase",
            id_token: temp,
          },
        });
        setUser(res.data);
      } else {
        localStorage.removeItem("firebaseToken");
        history.push("/login");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  console.log({ user });
  return (
    <>
      <ToastContainer />
      <Admin
        dashboard={Dashboard}
        dataProvider={CustomDataProvider}
        title='HungerLink'
        loginPage={Login}
        history={history}
        layout={CustomLayout}
        customRoutes={customRoutes.map((routeProps) => (
          <Route {...routeProps} />
        ))}
        theme={ThemeProvider}
      >
        <Title title={<img src={NavLogo} alt='HungerLink' />} />
        <Resource
          name={DataProviderTypes.REGION}
          list={RegionList}
          create={RegionCreate}
        />
        <Resource
          name={DataProviderTypes.BME}
          list={BMEList}
          create={BMECreate}
        />
      </Admin>
    </>
  );
};

export default App;
