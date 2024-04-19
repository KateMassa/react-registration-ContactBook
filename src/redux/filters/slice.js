import { createSlice } from "@reduxjs/toolkit";

const filtersInitialState = {
  name: "",
  number: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: filtersInitialState,
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
      state.number = action.payload;
    },
  },
});

export const { changeFilter } = filtersSlice.actions;
export const selectNameFilter = (state) => state.filters.name;
export const selectNumberFilter = (state) => state.filters.number;
export default filtersSlice.reducer;
