/*
 * Restriction
 */
type AnyFunction = (...args: any[]) => any;

export type DebounceOption = {
  ms?: number; // milliseconds
  immediate?: boolean; // debounce 실행 즉시 반영여부
};
export type DebouncedFunction<F extends AnyFunction> = {
  handler(...args: Parameters<F>): void;
  stop(): void;
};
export type ThrottleOption = {
  ms?: number; // milliseconds
  immediate?: boolean; // throttle 실행 즉시 반영여부
};
export type ThrottledFunction<F extends AnyFunction> = {
  handler(...args: Parameters<F>): void;
  stop(): void;
};

/**
 * debounce
 * 연속적인 빠른 이벤트 콜백들에 제약을 걸어 이벤트 호출 횟수를 감소시킨다.
 *
 * @template F
 * @param callback {F}
 * @param debounceOption {DebounceOption}
 * @returns {DebouncedFunction<F>}
 */
export function debounce<F extends AnyFunction>(callback: F, debounceOption?: DebounceOption): DebouncedFunction<F> {
  const option: Required<DebounceOption> = {
    ms: debounceOption?.ms ?? 200,
    immediate: debounceOption?.immediate ?? false,
  };
  let tid: NodeJS.Timeout | null = null;
  let isImmediated: boolean = false;
  let isStopped: boolean = false;

  const stop = function (): void {
    if (tid) {
      clearTimeout(tid);
      tid = null;
      isStopped = true;
    }
  };

  const handler = function (this: F, ...args: Parameters<F>): void {
    if (!isStopped) {
      // setTimeout이 실행된 Timeout의 ID를 반환하고 clearTimeout으로 이를 해제할 수 있음
      if (tid) {
        clearTimeout(tid);
        tid = null;
      }

      // option.immediate === true면 즉시 callback 실행
      if (option.immediate && !isImmediated) {
        isImmediated = true;
        callback.apply(this, args);
      }

      // option.delay 이후 callback 실행
      tid = setTimeout(() => {
        tid = null;
        callback.apply(this, args);
      }, option.ms);
    }
  };

  return { stop, handler };
}

/**
 * throttle
 *
 * @template F
 * @param callback {F}
 * @param throttleOption {ThrottleOption}
 * @returns {ThrottledFunction<F>}
 */
export function throttle<F extends AnyFunction>(callback: F, throttleOption?: ThrottleOption): ThrottledFunction<F> {
  const option: Required<ThrottleOption> = {
    ms: throttleOption?.ms ?? 200,
    immediate: throttleOption?.immediate ?? false,
  };
  let tid: NodeJS.Timeout | null = null;
  let isImmediated: boolean = false;
  let isStopped: boolean = false;

  const stop = function (): void {
    if (tid) {
      clearTimeout(tid);
      tid = null;
      isStopped = true;
    }
  };

  const handler = function (this: F, ...args: Parameters<F>): void {
    if (!isStopped && !tid) {
      // option.immediate === true면 즉시 callback 실행
      if (option.immediate && !isImmediated) {
        isImmediated = true;
        callback.apply(this, args);
      }

      tid = setTimeout(() => {
        tid = null;
        callback.apply(this, args);
      }, option.ms);
    }
  };

  return { stop, handler };
}
