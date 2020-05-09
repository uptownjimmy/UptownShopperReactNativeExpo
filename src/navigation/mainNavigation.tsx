import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { fetchItems } from '../data/api/itemAsyncActions';
import { ShoppingNavigation } from './shoppingNavigation';
import { PantryNavigation } from './pantryNavigation';
import { StoreNavigation } from './storeNavigation';

const Drawer = createDrawerNavigator();

export const MainNavigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name='Shopping' component={ShoppingNavigation} />
        <Drawer.Screen name='Pantry' component={PantryNavigation} />
        <Drawer.Screen name='Store' component={StoreNavigation} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
