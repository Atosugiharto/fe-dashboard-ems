import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ohcData: [],
  spData: [],
  summary: {},
  warningLogs: [
    { date: "25/08/24", time: "14:12", message: "OHC 3 High Temp" },
    { date: "25/08/24", time: "07:10", message: "OHC 5 High Temp" },
    { date: "24/08/24", time: "15:12", message: "OHC 4 High Temp" },
    { date: "24/08/24", time: "15:12", message: "E-CAT Fault" },
  ],
};

const ohcSlice = createSlice({
  name: "ohc",
  initialState,
  reducers: {
    setOhcData(state, action) {
      state.ohcData = action.payload;
    },
    setSpData(state, action) {
      state.spData = action.payload;
    },
    setSummary(state, action) {
      state.summary = action.payload;
    },
  },
});

export const { setOhcData, setSpData, setSummary } = ohcSlice.actions;
export default ohcSlice.reducer;
