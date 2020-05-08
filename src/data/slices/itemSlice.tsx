import { createSlice } from '@reduxjs/toolkit';

import { Item } from '../../utility/interfaces';

export const initialState = {
  loading: false,
  hasErrors: false,
  items: [] as Item[],
};

// A slice for items with our three reducers
const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    getItems: (state) => {
      state.loading = true;
    },
    getItemsSuccess: (state, { payload }: { payload: Item[] }) => {
      state.items = payload.sort((a: Item, b: Item) => {
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
    addItemSuccess: (state, { payload }: { payload: Item }) => {
      state.items = [...state.items, payload].sort((a: Item, b: Item) => {
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
    deleteItemSuccess: (state, { payload }: { payload: number }) => {
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
    updateItemSuccess: (state, { payload }: { payload: Item }) => {
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
} = itemSlice.actions;

// selector
export const itemsSelector = (state: { items: any }) => state.items;

// reducer
export default itemSlice.reducer;
