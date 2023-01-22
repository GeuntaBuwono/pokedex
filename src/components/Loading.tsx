import ScreenViewLayout from 'layouts/ScreenViewLayout';
import React from 'react';
import {ActivityIndicator} from 'react-native';

const LoadingSpinner = () => (
  <ScreenViewLayout>
    <ActivityIndicator />
  </ScreenViewLayout>
);

export default LoadingSpinner;
