import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { itemsSelector } from '../../data/slices/itemSlice';
import { fetchItems } from '../../data/api/itemAsyncActions';
import { Spinner } from '../common/spinner';
import { ErrorNotification } from '../common/errorNotification';
import { PageSafeAreaView } from '../common/pageSafeAreaView';

export const ShoppingPage = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const { activeItems, loading, hasErrors } = useSelector(itemsSelector);

  // useEffect(() => {
  //   dispatch(fetchActiveItems());
  // }, [dispatch]);

  return <PageSafeAreaView></PageSafeAreaView>;
};
