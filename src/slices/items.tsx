import { createSlice, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import { Item } from '../interfaces';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/dev',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' },
});

export const initialState = {
  loading: false,
  hasErrors: false,
  items: [] as Item[],
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
      state.items = payload.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
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
      state.items = [...state.items, payload].sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
      state.loading = false;
      state.hasErrors = false;
    },
    addItemFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    deleteItem: (state) => {
      state.loading = true;
    },
    deleteItemSuccess: (state, { payload }) => {
      state.items = state.items
        .filter((item) => item.id !== payload)
        .sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
      state.loading = false;
      state.hasErrors = false;
    },
    deleteItemFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    updateItem: (state) => {
      state.loading = true;
    },
    updateItemSuccess: (state, { payload }) => {
      const index = state.items.findIndex((item) => item.id === payload.id);
      state.items[index] = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    updateItemFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

// Actions generated from the slice
export const {
  getItems,
  getItemsSuccess,
  getItemsFailure,
  addItem,
  addItemSuccess,
  addItemFailure,
  deleteItem,
  deleteItemSuccess,
  deleteItemFailure,
  updateItem,
  updateItemSuccess,
  updateItemFailure,
} = itemsSlice.actions;

// A selector
export const itemsSelector = (state: { items: any }) => state.items;

// The reducer
export default itemsSlice.reducer;

// Asynchronous thunk actions
export function fetchItems() {
  return async (dispatch: Dispatch) => {
    dispatch(getItems());

    try {
      const response = await axiosInstance.get('/items');
      const data = await response.data;
      dispatch(getItemsSuccess(data));
    } catch (error) {
      dispatch(getItemsFailure());
    }
  };
}

export function createItem(
  name: string,
  note: string,
  type: string,
  active: boolean
) {
  return async (dispatch: Dispatch) => {
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
          const id = response.data;
          dispatch(addItemSuccess({ id, name, note, type, active }));
        })
        .catch(function (error) {
          dispatch(addItemFailure);
        });
    } catch (error) {
      dispatch(addItemFailure);
    }
  };
}

export function removeItem(itemId: number) {
  return async (dispatch: Dispatch) => {
    try {
      await axiosInstance
        .delete(`/items/${itemId}`, {
          data: null,
        })
        .then((response) => {
          dispatch(deleteItemSuccess(itemId));
        })
        .catch((error) => {
          dispatch(deleteItemFailure);
        });
    } catch {
      dispatch(deleteItemFailure);
    }
  };
}

export function changeItem(
  id: number,
  name: string,
  note: string,
  type: string,
  active: boolean
) {
  return async (dispatch: Dispatch) => {
    try {
      await axiosInstance
        .put(`/items/${id}`, {
          id: id,
          name: name,
          note: note,
          type: type,
          active: active,
        })
        .then((response) => {
          dispatch(updateItemSuccess({ id, name, note, type, active }));
        })
        .catch((error) => {
          dispatch(updateItemFailure);
        });
    } catch {
      dispatch(updateItemFailure);
    }
  };
}
