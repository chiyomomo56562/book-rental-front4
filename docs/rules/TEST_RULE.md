# Test Rules (Testing Strategy)

이 문서는 프로젝트의 **테스트 철학, 환경, 그리고 레이어별 테스트 수행 지침**을 정의합니다. 모든 테스트 코드는 이 규칙을 준수하여 작성되어야 하며, 특히 AI는 코드 생성 시 이 지침에 따라 테스트 코드를 함께 제공해야 합니다.

---

## 1. Core Philosophy

- **TDD (Test Driven Development) Mandatory**: 비즈니스 로직(Hooks, Mapper, Utils)을 작성할 때는 반드시 테스트 코드를 먼저 작성합니다.
- **Fast Feedback Loop**: 단위 테스트(Unit Test) 위주로 구성하여 빠른 실행 속도를 유지합니다.
- **Reliability over Implementation**: 내부 구현 상세보다는 **입력에 따른 기대 출력(Outcome)** 또는 **사용자 관점의 상호작용**을 검증합니다.

## 2. Testing Stack

- **Runner & Mocks**: [Vitest](https://vitest.dev/)
- **Dashboard & UI Mode**: [Vitest UI](https://vitest.dev/guide/ui.html) (`vitest --ui` 적극 활용)
- **UI Testing**: [Vitest Browser Library](https://vitest.dev/guide/browser/) (브라우저 기반 테스트)
- **API Mocking**: [MSW (Mock Service Worker)](https://mswjs.io/)
- **Assertions**: `vitest`에서 제공하는 `expect` 및 `vi` 객체 사용 (Jest 대신 Vitest 고유 API 권장)

## 3. Naming & Location Rules

- **File Name**: `{TargetFileName}.test.ts(x)`
  - 예: `bookMapper.ts` -> `bookMapper.test.ts`, `useBookQuery.ts` -> `useBookQuery.test.ts`
- **Location (Colocation)**: 테스트 파일은 반드시 테스트 대상 파일과 **동일한 디렉토리**에 위치시킵니다. 별도의 `tests/` 폴더를 생성하지 않습니다.
  - 예: `src/features/book/mapper.ts` -> `src/features/book/mapper.test.ts`
  - 예: `src/shared/utils/date.ts` -> `src/shared/utils/date.test.ts`
- **Description Language**: `describe`와 `it`의 설명 문구는 **한국어**를 사용합니다.
  - 예: `it('도서 목록 API 응답을 UI 모델로 올바르게 변환해야 한다', () => { ... })`

---

## 4. Vitest UI Mode

테스트 결과의 시각화 및 인터랙티브한 디버깅을 위해 **Vitest UI**를 적극적으로 사용합니다.

- **명령어**: `npm run test:ui` 또는 `vitest --ui`
- **활용**:
  - 테스트 케이스별 실행 결과 및 소요 시간 시각적 확인.
  - 코드 변경 시 실시간 리포팅 및 실패한 테스트의 소스 코드 즉시 확인.
  - 브라우저 모드와 연동하여 실제 UI 렌더링 결과 확인.

---

## 5. Layered Testing Strategy

### 5.1 Mapper Layer (Unit Test)
- **목표**: 백엔드 데이터와 프론트엔드 모델 간의 변환 로직 100% 검증.
- **지침**: 순수 함수이므로 Mocking 없이 다양한 케이스(Edge Case 포함)를 테스트합니다.

### 5.2 Hooks Layer (Integration Test)
- **목표**: 서버 상태(React Query)와 비즈니스 사이드 이펙트 검증.
- **지침**:
  - `renderHook`을 사용합니다.
  - API 호출은 MSW를 통해 실제 네트워크 요청과 유사한 흐름으로 Mocking합니다.
  - 로딩, 성공, 에러 상태가 각각 올바르게 전이되는지 확인합니다.

### 5.3 Container Component (Integration Test)
- **목표**: 여러 Hook과 View 컴포넌트 사이의 통합 흐름 및 핸들러 로직 검증.
- **지침**:
  - 복잡한 비즈니스 흐름이 있는 경우에만 수행합니다.
  - View의 세부 UI보다는 "버튼 클릭 시 특정 Hook의 함수가 호출되는가" 등의 흐름을 중점적으로 봅니다.

### 5.4 View Component (Unit Test)
- **목표**: 순수 UI 렌더링 및 Props 기반 상호작용 검증.
- **지침**:
  - 로직이 없는 순수 컴포넌트이므로 필요 시에만 작성합니다. (Snapshot 또는 핵심 요소 노출 여부 확인)

---

## 6. Coding Standards

### AAA Pattern
테스트 코드는 항상 아래의 구조를 유지합니다.
1. **Arrange (준비)**: 테스트에 필요한 데이터, Mocking, 렌더링 준비.
2. **Act (실행)**: 함수 호출, 사용자 이벤트 발생.
3. **Assert (검증)**: 결과값이 기대치와 일치하는지 확인.

### Mocking Policy
- **External Modules**: 외부 라이브러리는 가급적 실제 동작을 사용하되, 무거운 모듈은 `vi.mock()`으로 대체합니다.
- **API**: 반드시 MSW를 사용하며, 컴포넌트 내부에서 `vi.spyOn`으로 axios를 직접 가공하는 행위는 지양합니다.

---

## 7. Implementation Examples

### 7.1 Mapper Test
```typescript
import { describe, it, expect } from 'vitest';
import { bookMapper } from './bookMapper';

describe('bookMapper', () => {
  it('API 응답 데이터를 도서 상세 모델로 변환해야 한다', () => {
    // Arrange
    const mockResponse = { id: 1, title: 'Clean Code', author_name: 'Uncle Bob' };

    // Act
    const result = bookMapper.toDetail(mockResponse);

    // Assert
    expect(result).toEqual({
      id: '1',
      title: 'Clean Code',
      author: 'Uncle Bob'
    });
  });
});
```

### 7.2 Hook Test
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useBookQuery } from './useBookQuery';
import { createWrapper } from '@/shared/utils/testUtils'; // React Query Wrapper

describe('useBookQuery', () => {
  it('도서 목록을 성공적으로 가져와야 한다', async () => {
    // Act
    const { result } = renderHook(() => useBookQuery(), {
      wrapper: createWrapper()
    });

    // Assert
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(2);
  });
});
```