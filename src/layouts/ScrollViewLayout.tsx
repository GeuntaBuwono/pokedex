import React from 'react';
import {ScrollView} from 'react-native';

type Props = {
  children: React.ReactNode;
};

const ScrollViewLayout = ({children}: Props) => (
  <ScrollView
    // eslint-disable-next-line react-native/no-inline-styles
    contentContainerStyle={{
      paddingHorizontal: 36,
      paddingVertical: 40,
    }}
    // eslint-disable-next-line react-native/no-inline-styles
    style={{
      backgroundColor: 'white',
    }}>
    {children}
  </ScrollView>
);

export default ScrollViewLayout;
