import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/dev',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' },
});

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
    addItem: (state) => {
      state.loading = true;
    },
    addItemSuccess: (state, { payload }) => {
      state.items = [...state.items , payload];
      state.loading = false;
      state.hasErrors = false;
    },
    addItemFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Three actions generated from the slice
export const {
  getItems,
  getItemsSuccess,
  getItemsFailure,
  addItem,
  addItemSuccess,
  addItemFailure,
} = itemsSlice.actions;

// A selector
export const itemsSelector = (state: { items: any }) => state.items;

// The reducer
export default itemsSlice.reducer;

// Asynchronous thunk action
export function fetchItems() {
  return async (dispatch) => {
    dispatch(getItems());

    try {
      const response = await axios('http://localhost:3000/dev/items');
      const data = await response.data;
      console.log('%c%s', 'color: #00a3cc', data);
      dispatch(getItemsSuccess(data));
    } catch (error) {
      dispatch(getItemsFailure());
    }
  };
}

export function createItem(name, note, type, active) {
  return async (dispatch) => {
    dispatch(addItem);
    try {
      await axiosInstance
        .post('/items', {
          name: name,
          note: note,
          type: type,
          active: active,
        })
        .then(function (response) {
          console.log(response);
          const id = response.data;
          dispatch(addItemSuccess({ id, name, note, type, active }));
        })
        .catch(function (error) {
          console.log('axios error: ', error);
        });
    } catch (error) {
      console.log('%c%s', 'color: #00e600', error);
      dispatch(addItemFailure);
    }
  };
}
