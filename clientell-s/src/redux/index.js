import { configureStore } from "@reduxjs/toolkit"
import settings from "./settings"
import logger from "redux-logger"
import { persistStore, persistReducer } from "redux-persist"
import { combineReducers } from "redux"
import storage from "redux-persist/lib/storage"

//defined states
import auth from './authLogin'
import userdropdownmanager from "./userDropDownManagement"
import rollupfiltermanage from "./rollUpFilterManage"
import dashboarddropdownmanage from "./dashboardDropDownManage"
import optionstatemange from "./optionMange"
import forcastmanage from "./forcastCheckManage"

const reducers = combineReducers({
    settings,
    auth,
    userdropdownmanager,
    rollupfiltermanage,
    dashboarddropdownmanage,
    optionstatemange,
    forcastmanage
})

const persistConfig = {
    key: "root",
    storage,
    whitelist: [
        "settings",
        'auth',
        "userdropdownmanager",
        // "rollupfiltermanage"
        "dashboarddropdownmanage",
        "optionstatemange"
    ],
    timeout: null
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production",
});