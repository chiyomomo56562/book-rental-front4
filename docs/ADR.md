## [ADR 001: 상태 관리 전략 (Server / Global / Local 분리)]

**Status:** Accepted

### Context

- 서버 데이터와 클라이언트 상태가 혼합되면서 상태 관리 복잡도 증가
- 전역 상태 남용으로 데이터 흐름 추적 어려움 발생

---

### Decision

- 상태를 다음 세 가지로 명확히 분리한다:
    - **Server State**: 서버에서 온 데이터 (React Query로 관리)
    - **Global State**: 앱 전역에서 공유되는 클라이언트 상태
    - **Local State**: 컴포넌트/Feature 내부 UI 상태

---

### Constraints

- Server State는 Global State로 승격할 수 없다
- Server State는 반드시 React Query를 통해 관리한다
- Global State는 서버 데이터 저장 용도로 사용하지 않는다

---

### Consequences

- Pros: 상태 책임 명확, 데이터 흐름 예측 가능
- Cons: 상태 위치 판단 필요

---

## [ADR 002: Server State는 Hooks에서만 관리]

**Status:** Accepted

### Context

- API 호출 위치가 분산되면 데이터 흐름이 깨지고 추적이 어려워짐

---

### Decision

- 모든 API 호출은 hooks layer에서만 수행한다
- Server State는 React Query 기반으로 관리한다

---

### Constraints

- components에서 API 호출 금지
- api.ts는 hooks 외부에서 직접 호출할 수 없다

---

### Consequences

- Pros: 데이터 흐름 일관성 확보
- Cons: hooks 의존 구조 강화

---

## [ADR 003: VAC 패턴 (Container / View 분리)]

**Status:** Accepted

### Context

- UI와 비즈니스 로직이 혼합되어 유지보수 비용 증가

---

### Decision

- Container와 View를 분리한다:
    - **Container**: hooks 호출, 데이터 가공, handler 정의
    - **View**: props 기반 UI 렌더링

---

### Constraints

- View는 hooks를 호출할 수 없다
- View는 side effect를 실행할 수 없다
- Container는 UI 렌더링 로직을 가지지 않는다

---

### Consequences

- Pros: 관심사 분리, 테스트 용이성 증가
- Cons: 컴포넌트 분리 비용 증가

---

## [ADR 004: Feature 간 직접 의존성 금지]

**Status:** Accepted

### Context

- Feature 간 직접 참조 시 결합도가 증가하고 구조가 쉽게 붕괴됨

---

### Decision

- Feature는 서로 직접 import하지 않는다

---

### Constraints

- `features/A → features/B` import 금지
- 공유 로직은 `shared`로 이동
- 외부 접근은 Public Interface를 통해서만 가능

---

### Consequences

- Pros: Feature 독립성 유지
- Cons: shared 레이어 증가 가능성

---

## [ADR 005: Global State 사용 범위 제한]

**Status:** Accepted

### Context

- 전역 상태 관리 도구(Zustand 등)의 남용으로 구조 복잡도 증가

---

### Decision

- Global State는 다음 용도로만 사용한다:
    - 인증 정보
    - UI 설정
    - 앱 전역 상태

---

### Constraints

- 서버 데이터 저장 금지
- Feature 내부 상태 저장 금지

---

### Consequences

- Pros: 상태 관리 단순화
- Cons: 상태 분류 필요

---

## [ADR 006: Data Flow 표준화 (api → mapper → hooks → components)]

**Status:** Accepted

### Context

- API 응답 구조에 UI가 직접 의존할 경우 변경에 취약해짐

---

### Decision

- 모든 서버 데이터는 mapper를 통해 UI 모델로 변환 후 사용한다

---

### Constraints

- components에서 API 응답 직접 사용 금지
- hooks에서 mapper 생략 금지
- mapper 외부에서 데이터 구조 변환 금지

---

### Consequences

- Pros: UI 안정성 증가, API 변경 대응 용이
- Cons: mapper 작성 비용 증가

---

## [ADR 007: Side Effect 위치 제한]

**Status:** Accepted

### Context

- side effect가 분산되면 예측 불가능한 동작 발생

---

### Decision

- side effect는 hooks 또는 Container에서만 실행한다

---

### Constraints

- View에서 side effect 금지
- shared 레이어에서 side effect 금지

---

### Consequences

- Pros: 실행 흐름 명확
- Cons: 구조 제약 증가