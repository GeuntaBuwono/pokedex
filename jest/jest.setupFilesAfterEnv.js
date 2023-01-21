/* eslint-disable no-undef */
import '@testing-library/react-hooks';

import {queryClientForTesting} from 'utils/QueryClientWrapperForTest';

import {server} from '../mocks/msw/server';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  queryClientForTesting.clear();
});

afterAll(() => {
  server.close();
});
