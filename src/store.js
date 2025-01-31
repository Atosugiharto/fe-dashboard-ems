import { configureStore } from "@reduxjs/toolkit";
import ohcReducer from "./slices/ohcSlice";
import sidebarReducer from "./slices/sidebarSlice";
import dataReducer from "./slices/dataSlice";

const store = configureStore({
  reducer: {
    ohc: ohcReducer,
    sidebar: sidebarReducer,
    data: dataReducer,
  },
});

export default store;
