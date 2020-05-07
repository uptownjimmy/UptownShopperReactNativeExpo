import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { ShoppingNavigation } from './src/navigation/shoppingNavigation';
import { PantryNavigation } from './src/navigation/pantryNavigation';
import { StoreNavigation } from './src/navigation/storeNavigation';
const Drawer = createDrawerNavigator();

import rootReducer from './src/data/slices';
const store = configureStore({ reducer: rootReducer });

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name='Shopping' component={ShoppingNavigation} />
          <Drawer.Screen name='Pantry' component={PantryNavigation} />
          <Drawer.Screen name='Store' component={StoreNavigation} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
