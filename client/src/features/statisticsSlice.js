import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterVarForCharts: { income: 'income', expense: 'expense' },
  groupingVarForCharts: 'week',
  statisticsOverviewLevel: 'Daily',
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setFilterVarForCharts: (state, action) => {
      state.filterVarForCharts = action.payload;
    },
    setGroupingVarForCharts: (state, action) => {
      state.groupingVarForCharts = action.payload;
    },
    setStatisticsOverviewLevel: (state, action) => {
      state.statisticsOverviewLevel = action.payload;
    },
    setFilterVarForCharts: (state, action) => {
      state.filterVarForCharts = action.payload;
    },
    setGroupingVarForCharts: (state, action) => {
      state.groupingVarForCharts = action.payload;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    setGroupingVar: (state, action) => {
      state.groupingVar = action.payload;
    },
  },
});

export const getFilterVarForCharts = (state) => state.statistics.filterVarForCharts;
export const getGroupingVarForCharts = (state) => state.statistics.groupingVarForCharts;
export const getStatisticsOverviewLevel = (state) => state.statistics.statisticsOverviewLevel;
export const getChartType = (state) => state.statistics.chartType;
export const getGroupingVar = (state) => state.statistics.groupingVar;

export const {
  setFilterVarForCharts,
  setGroupingVarForCharts,
  setStatisticsOverviewLevel,
  setChartType,
  setGroupingVar,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
