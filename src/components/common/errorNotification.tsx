import React from 'react';
import styled from 'styled-components';
import { Text, View } from 'react-native';

export const ErrorNotification = ({
  errorNotification,
}: {
  errorNotification: string;
}) => {
  return (
    <ErrorNotificationView>
      <Text>{errorNotification}</Text>
    </ErrorNotificationView>
  );
};

const ErrorNotificationView = styled(View)`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
`;
