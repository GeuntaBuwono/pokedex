import React from 'react';
import {ScrollView} from 'react-native';
import {useTheme} from 'styled-components/native';

type Props = {
  children: React.ReactNode;
  isNoPadding?: boolean;
};

const ScrollViewLayout = ({children, isNoPadding}: Props) => {
  const {screen} = useTheme();
  return (
    <ScrollView
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{
        paddingHorizontal:
          /* istanbul ignore next */
          isNoPadding ? 0 : 36,
        paddingVertical:
          /* istanbul ignore next */
          isNoPadding ? 0 : 40,
      }}
      testID="scrollViewLayout"
      style={{
        backgroundColor: screen.background.color,
      }}>
      {children}
    </ScrollView>
  );
};

export default ScrollViewLayout;
