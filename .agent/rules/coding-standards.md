# JavaScript 및 코딩 표준 (Coding Standards)

## 1. 타입 안정성 및 유효성 (Type Safety & Validation)
- **JSDoc 활용**: TypeScript 대신 JSDoc(`/** ... */`)을 사용하여 함수 파라미터와 반환 타입을 명시하여 IDE 지원을 받도록 합니다.
- **PropTypes 권장**: React 컴포넌트의 Props 유효성 검사를 위해 `prop-types`를 사용을 고려합니다.
- **Strict Checks**: 변수가 `null` 또는 `undefined`일 수 있음을 항상 가정하고, 옵셔널 체이닝(`?.`)이나 Null 병합 연산자(`??`)를 적극 활용합니다.

## 2. 코드 가독성 및 스타일
- **조기 리턴 (Early Return)**: 깊은 중첩(Deep Nesting)을 피하기 위해, 조건이 맞지 않으면 함수 초입에서 즉시 반환합니다.
- **명명 규칙 (Naming)**:
  - 변수/함수: `camelCase` (동사로 시작, 예: `fetchUserData`)
  - 컴포넌트: `PascalCase`
  - 상수: `UPPER_SNAKE_CASE`
- **불변성 (Immutability)**: 데이터 변형을 피하고, `const`를 기본으로 사용합니다. 배열이나 객체 업데이트 시 전개 연산자(`...`)를 활용합니다.

## 3. 에러 처리 (Error Handling)
- **Silent Fail 금지**: `try-catch` 블록에서 에러를 단순히 `console.log`로 찍고 넘어가면 안 됩니다. 사용자에게 알리거나 상위로 전파(throw)해야 합니다.
- **유효성 검증**: 외부 데이터(API 응답, 폼 입력)는 사용 전 반드시 유효성을 확인합니다.
