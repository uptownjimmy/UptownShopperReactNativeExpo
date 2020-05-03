import React, { useEffect, useState } from 'react';
import { ActionSheetIOS, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, CheckBox, Icon, Input } from 'react-native-elements';

import { createItem } from '../../slices/items';

const types = ['cancel', 'grocery', 'hardware', 'clothing', 'other'];

export function ItemModal({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState('grocery');
  const [active, setActive] = useState(true);

  const openActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: types,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        setType(types[buttonIndex]);
      }
    );
  };

  const createNewItem = async () => {
      await dispatch(createItem(name, note, type, active));
      navigation.goBack();
    // axiosInstance
    //   .post('/items', {
    //     name: name,
    //     note: note,
    //     type: type,
    //     active: active,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //     navigation.goBack();
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <ItemModalView>
      <Input
        placeholder='name'
        autoCapitalize='none'
        containerStyle={{ paddingTop: 30 }}
        onChangeText={(value) => setName(value)}
        value={name}
      />
      <Input
        placeholder='note'
        autoCapitalize='none'
        containerStyle={{ paddingTop: 30 }}
        onChangeText={(value) => setNote(value)}
        value={note}
      />
      <Input
        defaultValue={type}
        containerStyle={{ paddingTop: 30 }}
        rightIcon={
          <Icon
            name='arrow-drop-down'
            size={24}
            color='black'
            onPress={openActionSheet}
          />
        }
        value={type}
      />
      <CheckBox
        title='add to shopping list?'
        containerStyle={{
          backgroundColor: 'white',
          borderWidth: 0,
          paddingTop: 40,
        }}
        checkedColor='green'
        uncheckedColor='red'
        onPress={() => setActive(!active)}
        checked={active}
      />
      <Button
        raised
        type='outline'
        containerStyle={{
          marginTop: 60,
          marginHorizontal: 40,
        }}
        onPress={() => {
          createNewItem();
        }}
        title='Finish'
        disabled={name.length < 3}
      />
    </ItemModalView>
  );
}

const ItemModalView = styled(View)`
  flex: 1;
  background-color: #fff;
`;
