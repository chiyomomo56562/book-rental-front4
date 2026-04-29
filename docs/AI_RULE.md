## 1. Global Strict Constraints

AI는 아래 사항을 절대 위반해서는 안 된다.

- **Any Type:** `any` 타입 사용을 절대 금지한다. (반드시 구체적인 Interface/Type 정의)
- **Direct API Call:** View 또는 Container에서 직접 `fetch`/`axios` 호출 금지. (반드시 `hooks`/`api.ts` 사용)
- **Business Logic in View:** View(VAC) 내부에서 비즈니스 의미가 포함된 연산 및 조건문 작성 금지. (Container에서 판단 후 Boolean Props로 전달)
- **State Mutation:** `state`를 직접 수정하지 않고, 반드시 `hooks`를 통해 정의된 Action으로만 변경한다.
- **Circular Dependency:** Feature 간의 직접 참조나 하위 레이어에서 상위 레이어를 참조하는 행위를 금지한다.
- **Source of Truth:** 서버 데이터는 React Query 캐시로만 관리하며, 전역 상태(Zustand 등)에 복사하지 않는다.
- **Mandatory Mapper:** 데이터 구조가 동일하더라도 API와 Hook 사이에는 반드시 Mapper를 배치하여 도메인 모델을 격리한다.


## 2. Quality & Implementation Rule

- **TDD Mandatory:** 모든 비즈니스 로직(Hooks, Utils) 생성 시에는 반드시 대응하는 `Vitest` 기반 테스트 코드를 함께 생성한다.
- **Clean Code:** `early return``패턴을 사용하여 코드의 Depth를 최소화한다.
- **Simplicity:** 불필요한 추상화를 지양하고, 명확하고 읽기 쉬운 코드를 우선한다.
- **Single Responsibility:** 하나의 함수/컴포넌트는 하나의 역할만 수행하도록 분리한다.
- **Paradigm Balance:** 구조의 문제는 **객체 지향적**(Interface, Class 등)으로, 로직의 문제는 **함수 지향적**(Pure Function, Immutability 등)으로 해결한다.
- **Style Consistency:** Airbnb Style Guide를 준수하며, 변수는 `camelCase`, 컴포넌트는 `PascalCase`를 사용한다.