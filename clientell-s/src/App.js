import React from "react";
import "./App.less";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { persistStore, persistReducer } from "redux-persist";
import { ToastContainer, toast } from "react-toastify";
import { Provider, useSelector } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux";
import { TreeDemo } from "./tree demo";
// import "antd/dist/antd.css";

//routes
import Routes from "./Routes";

axios.defaults.baseURL = "https://devapi.revenue.clientellone.com/";

let persistor = persistStore(store);
export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes />
          <ToastContainer />
        </Router>
      </PersistGate>
    </Provider>
  );
};
