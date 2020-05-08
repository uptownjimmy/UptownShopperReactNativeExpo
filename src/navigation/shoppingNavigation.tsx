import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';

import { ShoppingPage } from '../components/shopping/shoppingPage';

const ShoppingNavigator = createStackNavigator();

export const ShoppingNavigation = () => {
  return (
    <ShoppingNavigator.Navigator
      initialRouteName='Shopping'
      headerMode='screen'
      screenOptions={{
        headerTintColor: 'black',
        headerStyle: { backgroundColor: 'white' }
      }}
    >
      <ShoppingNavigator.Screen
        name='Shopping'
        component={ShoppingPage}
        options={({ navigation }) => ({
          headerLeft: () => (
            <MenuButton onPress={() => navigation.toggleDrawer()} >
              <Image source={require('../../assets/menu.png')} />            
            </MenuButton>
          ),
          headerTitle: 'Shopping',
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() => alert('This is a button!')}
          //   >
          //     <Image
          //       source={require('/Users/uptownjimmy/uJ_local/ReactNative/UptownShopperReactNativeExpo/assets/menu.png')}
          //     />            
          //   </TouchableOpacity>
          // ),
        })}
      />
    </ShoppingNavigator.Navigator>
  );
}

const MenuButton = styled(TouchableOpacity)`
  margin-left: 20px;
`;