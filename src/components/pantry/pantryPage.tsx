import React, { useEffect } from 'react';
import { FlatList, Text, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { PantryItem } from './pantryItem';
import { fetchItems, itemsSelector } from '../../slices/items';

export function PantryPage({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const { items, loading, hasErrors } = useSelector(itemsSelector);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const renderItems = () => {
    if (loading) return <Text>Loading items...</Text>;
    if (hasErrors) return <Text>Unable to display items.</Text>;

    return (
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PantryItem item={item} navigation={navigation} />
        )}
      />
    );
  };

  return <PantrySafeAreaView>{renderItems()}</PantrySafeAreaView>;
}

const PantrySafeAreaView = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;
