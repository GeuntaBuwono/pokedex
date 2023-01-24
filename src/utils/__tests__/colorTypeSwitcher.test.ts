import colorTypeSwitcher from 'utils/colorTypeSwitcher';

describe('colorTypeSwitcher', () => {
  test('functions correctly', () => {
    const waterColor = colorTypeSwitcher({
      type: 'water',
    });

    expect(waterColor).toStrictEqual('#2196F3');
  });
  test('functions should be return default', () => {
    const waterColor = colorTypeSwitcher({
      type: 'fighting',
    });

    expect(waterColor).toStrictEqual('red');
  });
});
