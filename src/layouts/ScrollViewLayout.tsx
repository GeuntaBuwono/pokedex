import React from 'react';
import {ScrollView} from 'react-native';
import {useTheme} from 'styled-components/native';

type Props = {
  children: React.ReactNode;
  isNoPadding?: boolean;
};

const ScrollViewLayout = ({children, isNoPadding}: Props) => {
  const {background} = useTheme();
  return (
    <ScrollView
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{
        paddingHorizontal: isNoPadding ? 0 : 36,
        paddingVertical: isNoPadding ? 0 : 40,
      }}
      testID="scrollViewLayout"
      style={{
        backgroundColor: background.color,
      }}>
      {children}
    </ScrollView>
  );
};

export default ScrollViewLayout;
