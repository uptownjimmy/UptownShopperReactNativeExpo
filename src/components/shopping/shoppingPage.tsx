import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

export function ShoppingPage() {
  return (
      <ShoppingView>
        <Text>Put yo shopping items here, yo.</Text>
      </ShoppingView>
  );
}

const ShoppingView = styled(View)`
  flex:1;
  align-items: center;
  justify-content: center;
`;