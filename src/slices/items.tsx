import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  loading: false,
  hasErrors: false,
  items: [],
};

// A slice for items with our three reducers
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    getItems: (state) => {
      state.loading = true;
    },
    getItemsSuccess: (state, { payload }) => {
      state.items = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getItemsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Three actions generated from the slice
export const { getItems, getItemsSuccess, getItemsFailure } = itemsSlice.actions;

// A selector
export const itemsSelector = state => state.items;

// The reducer
export default itemsSlice.reducer;

// Asynchronous thunk action
export function fetchItems() {
  return async dispatch => {
    dispatch(getItems());

    try {
      const response = await axios('http://localhost:3000/dev/items');
      const data = await response.data;
      dispatch(getItemsSuccess(data));
    } catch (error) {
      dispatch(getItemsFailure());
    }
  }
}