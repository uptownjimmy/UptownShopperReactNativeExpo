import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';

import { StorePage } from '../components/store/storePage';

const StoreNavigator = createStackNavigator();

export const StoreNavigation = () => {
  return (
    <StoreNavigator.Navigator
      initialRouteName='Store'
      headerMode='screen'
      screenOptions={{
        headerTintColor: 'black',
        headerStyle: { backgroundColor: 'white' }
      }}
    >
      <StoreNavigator.Screen 
        name='StorePage' 
        component={StorePage} 
        options={({ navigation }) => ({ 
          headerLeft: () => (
            <MenuButton onPress={() => navigation.toggleDrawer()} >
              <Image source={require('../../assets/menu.png')} />            
            </MenuButton>
          ),
          headerTitle: 'Stores',
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
    </StoreNavigator.Navigator>
  );
}

const MenuButton = styled(TouchableOpacity)`
  margin-left: 20px;
`;