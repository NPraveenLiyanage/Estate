import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import {persistReducer, persistStore} from 'redux-persist';
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({ user: userReducer })

const persisteConfig = {
  key : 'root',
  storage,
  version : 1,
}

const persistedReducer = persistReducer(persisteConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,//serial variable
    }),
});

export const persistor = persistStore(store);


