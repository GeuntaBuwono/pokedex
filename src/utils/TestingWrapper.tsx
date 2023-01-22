import {I18nextProvider} from 'react-i18next';
import {ThemeProvider} from 'styled-components/native';
import {lightTheme} from 'styles/lightTheme';
import {wrapper as QueryWrapper} from 'utils/QueryClientWrapperForTest';

import i18n from '../i18n/i18n';

const TestingWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <I18nextProvider i18n={i18n}>
        <QueryWrapper>{children}</QueryWrapper>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default TestingWrapper;
