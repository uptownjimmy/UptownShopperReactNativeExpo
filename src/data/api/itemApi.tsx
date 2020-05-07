import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  getItems,
  getItemsSuccess,
  getItemsFailure,
  addItem,
  addItemSuccess,
  addItemFailure,
  deleteItemSuccess,
  deleteItemFailure,
  updateItemSuccess,
  updateItemFailure,
} from '../slices/itemSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/dev',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' },
});

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
