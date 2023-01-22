import {renderHook} from '@testing-library/react-hooks/native';
import {useAtom} from 'jotai';
import {atomWithMMKV} from 'utils/atomWithMMKV';

const atomForTest = atomWithMMKV('testingAtom', false);

describe('atomWithMMKV', () => {
  test('functions correctly', () => {
    const {result} = renderHook(() => useAtom(atomForTest));
    expect(result.current[0]).toBeFalsy();
  });
});
