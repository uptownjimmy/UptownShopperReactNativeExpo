import React from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';

import { removeItem } from '../../slices/items';
import { Item } from '../../interfaces';

export function PantryItem({
  item,
  navigation,
}: {
  item: Item;
  navigation: any;
}) {
  const dispatch = useDispatch();

  const deleteItem = async () => {
    await dispatch(removeItem(item.id));
  };

  const editItem = () => {
    navigation.navigate('CreateItemModal', {item});
  }

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
      text: 'Edit',
      backgroundColor: 'blue',
      color: '#ffffff',
      onPress: () => {
        editItem();
      }
    },
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
