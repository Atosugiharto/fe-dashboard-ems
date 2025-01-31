import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    hideSidebar: true,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.hideSidebar = !state.hideSidebar;
    },
    openSidebar: (state) => {
      state.hideSidebar = false;
    },
    closeSidebar: (state) => {
      state.hideSidebar = true;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
