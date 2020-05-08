import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { itemsSelector } from '../../data/slices/itemSlice';
import { fetchItems } from '../../data/api/itemApi';
import { Spinner } from '../common/spinner';
import { ErrorNotification } from '../common/errorNotification';
import { PageSafeAreaView } from '../common/pageSafeAreaView';
import { PantryList } from './pantryList';

export const PantryPage = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const { items, loading, hasErrors } = useSelector(itemsSelector);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const renderItems = () => {
    if (loading) return <Spinner />;
    if (hasErrors)
      return (
        <ErrorNotification errorNotification={'Unable to display items.'} />
      );
    return <PantryList items={items} navigation={navigation} />;
  };

  return <PageSafeAreaView>{renderItems()}</PageSafeAreaView>;
};
