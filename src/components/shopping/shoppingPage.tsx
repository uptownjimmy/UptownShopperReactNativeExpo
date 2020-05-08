import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { PageSafeAreaView } from '../common/pageSafeAreaView';

export const ShoppingPage = ({ navigation }: { navigation: any }) => {
  return (
    <PageSafeAreaView>
      <Text>Put yo shopping items here, yo.</Text>
    </PageSafeAreaView>
  );
};
