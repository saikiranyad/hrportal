import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

import { createTransform } from "redux-persist";

// Transform to persist only the user and token (not other auth data)
const authTransform = createTransform(
    (inboundState) => ({
        user: inboundState.user,
        token: inboundState.token, // Ensure token is stored
    }),
    (outboundState) => outboundState,
    { whitelist: ["auth"] }
);

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    transforms: [authTransform], // Ensures token is saved
};

const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application: applicationSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;
