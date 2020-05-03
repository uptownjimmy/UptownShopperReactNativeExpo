import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/dev',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' },
});

export function PantryItem({ item, navigation }) {
  const deleteItem = () => {
    console.log('James item.id: ', item.id);
    axiosInstance
      .delete(`/items/${item.id}`, {
        data: null,
      })
      .then(function (response) {
        console.log(response);
        navigation.goBack();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const confirmDelete = () =>
    Alert.alert(
      'Delete Item',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Do It', onPress: () => deleteItem() },
      ],
      { cancelable: false }
    );

  const swipeButtons = [
    {
      text: 'Delete',
      backgroundColor: 'red',
      color: '#ffffff',
      onPress: () => {
        confirmDelete();
      },
    },
  ];

  return (
    <Swipeout
      right={swipeButtons}
      autoClose={true}
      backgroundColor='transparent'
    >
      <ListItem
        key={item.id}
        title={item.name}
        bottomDivider
        chevron
        onPress={() => {}}
      />
    </Swipeout>
  );
}
