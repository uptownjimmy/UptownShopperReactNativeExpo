import React from 'react';
import styled from 'styled-components';
import { ActivityIndicator, View } from 'react-native';

export const Spinner = () => {
  return (
    <SpinnerView>
      <ActivityIndicator size='large' color='gray' />
    </SpinnerView>
  );
};

const SpinnerView = styled(View)`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
`;
