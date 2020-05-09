import { createSlice } from '@reduxjs/toolkit';

import { Item } from '../../utility/interfaces';

export const initialState = {
  loading: false,
  hasErrors: false,
  items: [] as Item[],
  activeItems: [] as Item[],
};

const sortItems = (itemsToSort: Item[]) => {
  return itemsToSort.sort((a: Item, b: Item) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
};

const filterActive = (itemsToFilter: Item[]) => {
  return itemsToFilter.filter((item) => item.active === true);
};

const findIndex = (itemsToUpdate: Item[], updatedItem: Item) => {
  return itemsToUpdate.findIndex((item) => item.id === updatedItem.id)
};

// A slice for items with reducers
const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    getItems: (state) => {
      state.loading = true;
    },
    getItemsSuccess: (state, { payload }: { payload: Item[] }) => {
      const sortedArray = sortItems(payload);
      state.items = sortedArray;
      state.activeItems = filterActive(sortedArray);
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
      const sortedArray = sortItems([...state.items, payload]);
      state.items = sortedArray;
      state.activeItems = filterActive(sortedArray);
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
      const newArray = state.items.filter((item) => item.id !== payload);
      const sortedArray = sortItems(newArray);
      state.items = sortedArray;
      state.activeItems = filterActive(sortedArray);
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
      const itemsIndex = findIndex(state.items, payload);
      const activeItemsIndex = findIndex(state.activeItems, payload);
      state.items[itemsIndex] = payload;
      state.activeItems[activeItemsIndex] = payload;
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
