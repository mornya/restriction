# restriction
![npm](https://img.shields.io/npm/v/restriction)
![node](https://img.shields.io/node/v/restriction)
![types](https://img.shields.io/npm/types/restriction)
![downloads](https://img.shields.io/npm/dw/restriction)
![license](https://img.shields.io/npm/l/restriction)

The restriction of term.

> This project has been created by [Vessel CLI](https://www.npmjs.com/package/@mornya/vessel).
  For a simple and quick reference about it, click [here](https://mornya.github.io/documents/guide/vessel.md).

## About
프로젝트 개발에 사용되는 모듈들에 대해 집합적인 형태로 제공되는 패키지.

## Installation
해당 라이브러리를 사용 할 프로젝트에서는 아래와 같이 의존성 모듈로 설치한다.
```bash
$ npm install --save restriction
or
$ yarn add restriction
```

## Modules in the package
본 패키지에는 아래와 같은 모듈들을 포함한다.<br>
제공되는 모듈과 메소드 사용법 등은 코드 스니핏을 참고한다.

### Restriction module
샘플 모듈은 다음과 같은 메소드들을 제공한다.

#### `debounce`
연속적인 빠른 이벤트 콜백들에 제약을 걸어 이벤트 호출 횟수를 감소시킨다.
```typescript
type AnyFunction = (...args: any[]) => any;
type DebounceOption = {
  ms?: number; // milliseconds
  immediate?: boolean; // debounce 실행 즉시 반영여부
};
type DebouncedFunction<F extends AnyFunction> = {
  handler(...args: Parameters<F>): void;
  stop(): void;
};

function debounce<F extends AnyFunction>(
  callback: F,
  debounceOption?: DebounceOption,
): DebouncedFunction<F> {}
```

#### `throttle`
연속적인 빠른 이벤트 콜백들에 제약을 걸어 일정 주기마다 호출하도록 한다.
```typescript
type AnyFunction = (...args: any[]) => any;
type ThrottleOption = {
  ms?: number; // milliseconds
  immediate?: boolean; // throttle 실행 즉시 반영여부
};
type ThrottledFunction<F extends AnyFunction> = {
  handler(...args: Parameters<F>): void;
  stop(): void;
};

function throttle<F extends AnyFunction>(
  callback: F,
  throttleOption?: ThrottleOption,
): ThrottledFunction<F> {}
```

## Change Log
프로젝트 변경사항은 [CHANGELOG.md](CHANGELOG.md) 파일 참조.

## License
프로젝트 라이센스는 [LICENSE](LICENSE) 파일 참조.
