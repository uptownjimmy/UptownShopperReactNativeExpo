import { combineReducers } from '@reduxjs/toolkit';

import itemsReducer from './itemSlice';

const rootReducer = combineReducers({
  items: itemsReducer,
});

export default rootReducer;
