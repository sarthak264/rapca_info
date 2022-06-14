import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./utils/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { AgoraClientProvider } from "./context/ClientAgoraContext";
import { UserProvider } from "./context/UserContext";
import { ClientDataProvider } from "./context/ClientDataContext";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <UserProvider>
        <AgoraClientProvider>
          <ClientDataProvider>
            <BrowserRouter>
              <Switch>
                {publicRoutes.map((route) => (
                  <Route {...route} />
                ))}
                {privateRoutes.map((route) => (
                  <PrivateRoute {...route} />
                ))}
              </Switch>
            </BrowserRouter>
          </ClientDataProvider>
        </AgoraClientProvider>
      </UserProvider>
    </div>
  );
}

export default App;
