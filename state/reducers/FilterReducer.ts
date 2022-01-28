import { createSlice } from "@reduxjs/toolkit";
import {
  GET_DATA_ACTION,
  GET_FILTER_VALUE_ACTION,
  IFilter,
} from "../types/FilterTypes";

const initialState: IFilter = {
  data: [],
  filteredData: [],
  filterValue: "",
};

const FilterSlice = createSlice({
  name: "filter-slice",
  initialState,
  reducers: {
    getData: (state: IFilter, action: GET_DATA_ACTION): IFilter => {
      return {
        ...state,
        data: action.payload.data,
      };
    },
    getFilterValue: (
      state: IFilter,
      action: GET_FILTER_VALUE_ACTION
    ): IFilter => {
      return {
        ...state,
        filterValue: action.payload,
      };
    },
    filterData: (state: IFilter): IFilter => {
      return {
        ...state,
        filteredData: [...state.data].filter(
          (d) =>
            d.participant.username
              .toLowerCase()
              .includes(state.filterValue.toLowerCase()) ||
            d.participant.email
              .toLowerCase()
              .includes(state.filterValue.toLowerCase())
        ),
      };
    },
  },
});

export const { getData, getFilterValue, filterData } = FilterSlice.actions;

export default FilterSlice.reducer;
