import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseApiUrl } from "../share-components/api";

// Fetch data untuk tiap endpoint satu per satu
export const fetchTableDashboardDailyPLN = createAsyncThunk(
  "dashboard/fetchTableDashboardDailyPLN",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseApiUrl}/tableDashboardDailyPLN`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

export const fetchTableDashboardMonthlyPLN = createAsyncThunk(
  "dashboard/fetchTableDashboardMonthlyPLN",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseApiUrl}/tableDashboardMonthlyPLN`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

export const fetchTableDashboardYearlyPLN = createAsyncThunk(
  "dashboard/fetchTableDashboardYearlyPLN",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseApiUrl}/tableDashboardYearlyPLN`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

export const fetchTableDashboardDailyCost = createAsyncThunk(
  "dashboard/fetchTableDashboardDailyCost",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseApiUrl}/tableDashboardDailyCost`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

export const fetchTableDashboardMonthlyCost = createAsyncThunk(
  "dashboard/fetchTableDashboardMonthlyCost",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseApiUrl}/tableDashboardMonthlyCost`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

export const fetchTableDashboardYearlyCost = createAsyncThunk(
  "dashboard/fetchTableDashboardYearlyCost",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseApiUrl}/tableDashboardYearlyCost`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

export const fetchTableDashboardDailyEmisi = createAsyncThunk(
  "dashboard/fetchTableDashboardDailyEmisi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseApiUrl}/tableDashboardDailyEmisi`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

export const fetchTableDashboardMonthlyEmisi = createAsyncThunk(
  "dashboard/fetchTableDashboardMonthlyEmisi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseApiUrl}/tableDashboardMonthlyEmisi`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

export const fetchTableDashboardYearlyEmisi = createAsyncThunk(
  "dashboard/fetchTableDashboardYearlyEmisi",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseApiUrl}/tableDashboardYearlyEmisi`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

export const fetchGaugesDashboardEEI = createAsyncThunk(
  "dashboard/fetchGaugesDashboardEEI",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseApiUrl}/gaugesDashboardEEI`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching data");
    }
  }
);

export const fetchChartDashboardDaily = createAsyncThunk(
    "dashboard/fetchChartDashboardDaily",
    async (date, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${baseApiUrl}/chartDashboardDaily`, { date });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error fetching data");
      }
    }
  );
  
  export const fetchChartDashboardMonthly = createAsyncThunk(
    "dashboard/fetchChartDashboardMonthly",
    async (fiscalReq, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${baseApiUrl}/chartDashboardMonthly`, { fiscalReq });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error fetching data");
      }
    }
  );
  
  export const fetchChartDashboardYearly = createAsyncThunk(
    "dashboard/fetchChartDashboardYearly",
    async (fiscalReq, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${baseApiUrl}/chartDashboardYearly`, { fiscalReq });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error fetching data");
      }
    }
  );

// Slice Redux
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dailyPLN: null,
    monthlyPLN: null,
    yearlyPLN: null,
    dailyCost: null,
    monthlyCost: null,
    yearlyCost: null,
    dailyEmisi: null,
    monthlyEmisi: null,
    yearlyEmisi: null,
    gaugesEEI: null,
    chartDaily: null,
    chartMonthly: null,
    chartYearly: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableDashboardDailyPLN.fulfilled, (state, action) => {
        state.dailyPLN = action.payload;
      })
      .addCase(fetchTableDashboardMonthlyPLN.fulfilled, (state, action) => {
        state.monthlyPLN = action.payload;
      })
      .addCase(fetchTableDashboardYearlyPLN.fulfilled, (state, action) => {
        state.yearlyPLN = action.payload;
      })
      .addCase(fetchTableDashboardDailyCost.fulfilled, (state, action) => {
        state.dailyCost = action.payload;
      })
      .addCase(fetchTableDashboardMonthlyCost.fulfilled, (state, action) => {
        state.monthlyCost = action.payload;
      })
      .addCase(fetchTableDashboardYearlyCost.fulfilled, (state, action) => {
        state.yearlyCost = action.payload;
      })
      .addCase(fetchTableDashboardDailyEmisi.fulfilled, (state, action) => {
        state.dailyEmisi = action.payload;
      })
      .addCase(fetchTableDashboardMonthlyEmisi.fulfilled, (state, action) => {
        state.monthlyEmisi = action.payload;
      })
      .addCase(fetchTableDashboardYearlyEmisi.fulfilled, (state, action) => {
        state.yearlyEmisi = action.payload;
      })
      .addCase(fetchGaugesDashboardEEI.fulfilled, (state, action) => {
        state.gaugesEEI = action.payload;
      })
      .addCase(fetchChartDashboardDaily.fulfilled, (state, action) => {
        state.chartDaily = action.payload;
      })
      .addCase(fetchChartDashboardMonthly.fulfilled, (state, action) => {
        state.chartMonthly = action.payload;
      })
      .addCase(fetchChartDashboardYearly.fulfilled, (state, action) => {
        state.chartYearly = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
