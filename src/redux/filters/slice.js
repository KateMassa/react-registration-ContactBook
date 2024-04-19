import { createSlice } from "@reduxjs/toolkit";

const filtersInitialState = {
  name: "",
  phoneNumber: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: filtersInitialState,
  reducers: {
    changeFilter: (state, action) => {
      const { filterType, value } = action.payload;
      if (filterType === "name") {
        state.name = value;
      } else if (filterType === "phoneNumber") {
        state.phoneNumber = value;
      }
    },
  },
});

export const { changeFilter } = filtersSlice.actions;
export const selectNameFilter = (state) => state.filters.name;
export const selectPhoneNumberFilter = (state) => state.filters.phoneNumber;
export default filtersSlice.reducer;
