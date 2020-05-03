import { combineReducers } from '@reduxjs/toolkit';

import itemsReducer from './items';

const rootReducer = combineReducers({
  items: itemsReducer,
});

export default rootReducer;
