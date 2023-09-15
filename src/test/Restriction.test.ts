import { debounce, throttle } from '../Restriction';

describe('Restriction module', () => {
  it('Restriction.debounce', () => {
    let value = '';
    const { handler } = debounce(
      (v) => {
        value = v;
        console.info(value);
      },
      { ms: 300 },
    );

    jest.useFakeTimers();

    setTimeout(() => handler('debounce: start'), 0);
    setTimeout(() => handler('debounce: 1st after start'), 100);
    setTimeout(() => handler('debounce: 2nd after start'), 200);
    setTimeout(() => handler('debounce: 3rd after start'), 300);
    setTimeout(() => handler('debounce: 4th after start'), 400);

    jest.runAllTimers();

    expect(value).toBe('debounce: 4th after start');
  });

  it('Restriction.throttle', () => {
    let value = '';
    const { handler } = throttle(
      (v) => {
        value = v;
        console.info(value);
      },
      { ms: 300 },
    );

    jest.useFakeTimers();

    setTimeout(() => handler('throttle: start'), 0);
    setTimeout(() => handler('throttle: 1st after start'), 100);
    setTimeout(() => handler('throttle: 2nd after start'), 200);
    setTimeout(() => handler('throttle: 3rd after start'), 300);
    setTimeout(() => handler('throttle: 4th after start'), 400);

    jest.runAllTimers();

    expect(value).toBe('throttle: 4th after start');
  });
});
