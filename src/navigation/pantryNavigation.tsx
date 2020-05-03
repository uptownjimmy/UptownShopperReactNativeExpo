import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';

import { PantryPage } from '../components/pantry/pantryPage';
import { ItemModal } from '../components/pantry/itemModal';

const PantryNavigator = createStackNavigator();

export function PantryNavigation() {
  return (
    <PantryNavigator.Navigator
      initialRouteName="Pantry"
      headerMode="screen"
      screenOptions={{
        headerTintColor: 'black',
        headerStyle: { backgroundColor: 'white' },
      }}
    >
      <PantryNavigator.Screen
        name="PantryPage"
        component={PantryPage}
        options={({ navigation }) => ({
          headerLeft: () => (
            <MenuButton onPress={() => navigation.toggleDrawer()}>
              <Image source={require('../../assets/menu.png')} />
            </MenuButton>
          ),
          headerTitle: 'Pantry',
          headerRight: () => (
            <AddItemButton
              onPress={() => navigation.navigate('CreateItemModal')}
            >
              <Image source={require('../../assets/green-plus-24-24.png')} />
            </AddItemButton>
          ),
        })}
      />
      <PantryNavigator.Screen
        name="CreateItemModal"
        component={ItemModal}
        options={() => ({
          headerTitle: 'Create Item',
        })}
      />
    </PantryNavigator.Navigator>
  );
}

const MenuButton = styled(TouchableOpacity)`
  margin-left: 20px;
`;

const AddItemButton = styled(TouchableOpacity)`
  margin-right: 20px;
`;
