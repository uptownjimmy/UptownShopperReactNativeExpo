import React from 'react';
import { useSelector } from 'react-redux';

import { itemsSelector } from '../../data/slices/itemSlice';
import { Spinner } from '../common/spinner';
import { ErrorNotification } from '../common/errorNotification';
import { PageSafeAreaView } from '../common/pageSafeAreaView';
import { PantryList } from '../pantry/pantryList';

export const ShoppingPage = ({ navigation }: { navigation: any }) => {
  const { activeItems, loading, hasErrors } = useSelector(itemsSelector);

  const renderItems = () => {
    if (loading) return <Spinner />;
    if (hasErrors)
      return (
        <ErrorNotification
          errorNotification={'Unable to display shopping list.'}
        />
      );
    return <PantryList items={activeItems} navigation={navigation} />;
  };

  return <PageSafeAreaView>{renderItems()}</PageSafeAreaView>;
};
