import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

import { Item } from '../../utility/interfaces';
import { PantryItem } from './pantryItem';

export const PantryList = ({
  items,
  navigation,
}: {
  items: Item[];
  navigation: any;
}) => {
  const [searchParams, setSearchParams] = useState('');
  const [filteredItems, setFilteredItems] = useState([] as Item[]);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const filterItems = (items: Item[]) => {
    return items.filter((item: Item) =>
      item.name.toLowerCase().includes(searchParams.toLowerCase())
    );
  };

  const updateSearch = (searchParams: string) => {
    setSearchParams(searchParams);

    if (searchParams) {
      setFilteredItems(filterItems(items));
    } else {
      setFilteredItems(items);
    }
  };

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
