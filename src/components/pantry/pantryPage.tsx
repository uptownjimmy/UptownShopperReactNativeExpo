import React from 'react';
import { useSelector } from 'react-redux';

import { itemsSelector } from '../../data/slices/itemSlice';
import { Spinner } from '../common/spinner';
import { ErrorNotification } from '../common/errorNotification';
import { PageSafeAreaView } from '../common/pageSafeAreaView';
import { PantryList } from './pantryList';

export const PantryPage = ({ navigation }: { navigation: any }) => {
  const { items, loading, hasErrors } = useSelector(itemsSelector);

  const renderItems = () => {
    if (loading) return <Spinner />;
    if (hasErrors)
      return (
        <ErrorNotification
          errorNotification={'Unable to display pantry list.'}
        />
      );
    return <PantryList items={items} navigation={navigation} />;
  };

  return <PageSafeAreaView>{renderItems()}</PageSafeAreaView>;
};
