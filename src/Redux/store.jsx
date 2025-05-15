import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import AuthSlice from "./AuthSlice"
import SettingUserSlice from "./SettingUserSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import UserSlice from "./UserSlice";
import EventSlice from "./EventSlice";
import CommonSlice from "./CommonSlice";
import DiscountSlice from "./DiscountSlice";
import PlanSlice from "./PlanSlice";
import InvoiceSlice from "./InvoiceSlice";
import SidebarSlice from "./SidebarSlice";
import EmailSlice from "./EmailSlice";
import ChatSlice from "./ChatSlice";
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthSlice),
  settingUser: SettingUserSlice,
  UserList: UserSlice,
  eventSlice: EventSlice,
  common: CommonSlice,
  Discount: DiscountSlice,
  Plan: PlanSlice,
  Invoice: InvoiceSlice,
  Sidebar: SidebarSlice,
  Email: EmailSlice,
  Chat: ChatSlice
});

const persisteRoot = rootReducer;

export const store = configureStore({
  reducer: { root: persisteRoot },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);