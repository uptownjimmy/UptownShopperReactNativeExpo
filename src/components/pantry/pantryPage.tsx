import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  SafeAreaView,
  View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { PantryItem } from './pantryItem';
import { fetchItems, itemsSelector } from '../../slices/items';
import { Item } from '../../interfaces';

export function PantryPage({ navigation }: { navigation: any }) {
  const [searchParams, setSearchParams] = useState('');
  const [filteredItems, setFilteredItems] = useState();
  const dispatch = useDispatch();
  const { items, loading, hasErrors } = useSelector(itemsSelector);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const updateSearch = (searchParams: string) => {
    setSearchParams(searchParams);

    if (searchParams) {
      setFilteredItems(
        items.filter((item: Item) =>
          item.name.toLowerCase().includes(searchParams.toLowerCase())
        )
      );
    } else {
      setFilteredItems(items);
    }
  };

  const renderItems = () => {
    if (loading)
      return (
        <SpinnerView>
          <ActivityIndicator size='large' color='gray' />
        </SpinnerView>
      );
    if (hasErrors) return <Text>Unable to display items.</Text>;

    return (
      <>
        <SearchBar
          onChangeText={updateSearch}
          value={searchParams}
          platform='ios'
          clearIcon={false}
        />
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PantryItem item={item} navigation={navigation} />
          )}
        />
      </>
    );
  };

  return <PantrySafeAreaView>{renderItems()}</PantrySafeAreaView>;
}

const PantrySafeAreaView = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

const SpinnerView = styled(View)`
    flex: 1;
    justify-content: center;
    flex-direction: row;
    padding: 10px;
`;
