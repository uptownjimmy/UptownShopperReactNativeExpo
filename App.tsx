import React, { useEffect } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { MainNavigation } from './src/navigation/mainNavigation';
import rootReducer from './src/data/slices';
const store = configureStore({ reducer: rootReducer });

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
