import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

export function StorePage() {
  return (
    <StoreView>
      <Text>Put yo store items here, yo.</Text>
    </StoreView>
  );
}
  
const StoreView = styled(View)`
  flex:1;
  align-items: center;
  justify-content: center;
`;
