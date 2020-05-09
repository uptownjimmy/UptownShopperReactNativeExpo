import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

import {
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
  getActiveItems,
} from '../slices/itemSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/dev',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' },
});

// Asynchronous thunk actions
export const fetchItems = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getItems());

    await axiosInstance
      .get('/items')
      .then((response) => {
        const data = response.data;
        dispatch(getItemsSuccess(data));
      })
      .catch((error) => {
        dispatch(getItemsFailure());
      });
  };
}

export const createItem = (
  name: string,
  note: string,
  type: string,
  active: boolean
) => {
  return async (dispatch: Dispatch) => {
    dispatch(addItem);

    await axiosInstance
      .post('/items', {
        name,
        note,
        type,
        active,
      })
      .then((response) => {
        const id = response.data;
        dispatch(addItemSuccess({ id, name, note, type, active }));
      })
      .catch((error) => {
        dispatch(addItemFailure);
      });
  };
}

export const removeItem = (itemId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteItem);

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
  };
}

export const changeItem = (
  id: number,
  name: string,
  note: string,
  type: string,
  active: boolean
) => {
  return async (dispatch: Dispatch) => {
    dispatch(updateItem);

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
  };
}

// export const fetchActiveItems = () => {
//   return (dispatch: Dispatch) => {
//     dispatch(getActiveItems);
//   };
// }
