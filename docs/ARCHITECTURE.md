# Project Architecture & Policy

이 문서는 프로젝트의 **설계 철학, 계층 간 경계(Policy), 그리고 준수해야 할 법률**을 정의합니다. 모든 세부 구현 지침(Rules)은 이 정책을 기반으로 작성되어야 합니다.

## 1. Core Principles (Policy)

- **Feature-based modularity**: 도메인 중심의 독립적 모듈 구성을 원칙으로 합니다.
- **Layered Responsibility**: 각 계층은 고유의 책임을 가지며, 이를 위반할 수 없습니다.
- **Unidirectional Data Flow**: 데이터는 정해진 방향(`api → mapper → hooks → components`)으로만 흐릅니다.
- **Airbnb Naming Standard**: 모든 명명 규칙은 [Airbnb Style Guide](https://github.com/airbnb/javascript)를 따릅니다. (전역: camelCase, 컴포넌트: PascalCase)

## 2. Global Folder Structure

```
src/
├── app/                # Application 설정 (Router, Provider, Entry point)
├── pages/              # Routing 단위의 페이지 (Feature들의 조합만 담당)
├── features/           # 도메인 중심의 독립적 모듈 (핵심 비즈니스 로직)
├── shared/             # 전역 공용 자원 (UI 컴포넌트, 범용 훅, 유틸리티)
```

## 3. Layer Responsibilities (Strict)

### 3.1 pages/
- **Allowed**: 여러 Feature 컴포넌트의 조합 및 레이아웃 구성.
- **Forbidden**: API 호출, 비즈니스 로직 작성, 직접적인 상태 관리.

### 3.2 features/
- **Allowed**: 모든 비즈니스 로직, 상태 소유권, API 호출 정의.
- **Forbidden**: 다른 Feature의 내부 구현 직접 참조 (Public Interface만 허용).

### 3.3 shared/
- **Allowed**: 특정 도메인에 종속되지 않는 범용 도구 및 UI 요소.
- **Forbidden**: Feature 모듈 참조, 비즈니스/도메인 로직 포함.

## 4. Data Flow & Transformation (Strict)

### Unidirectional Flow
```
api → mapper → hooks → components
```

### Responsibility for Transformation
- **API & Mapper Layer**: 백엔드와 프론트엔드 모두 **`camelCase`**를 사용하여 Case 변환 부담을 최소화합니다.
- **Mapper Layer**: 명칭이 같더라도 **타입 변환(Date 등), 상태 코드의 한글화(Status Mapping), Null 방어, 그리고 API 구조 변화로부터의 격리**를 위해 반드시 사용합니다.
- **Forbidden**: 컴포넌트 내부에서의 API 데이터 직접 가공, Mapper 생략.

## 5. Dependency Rules (Strict)

- **Allowed**: `components → hooks → [api, mapper]`
- **Forbidden**: 
  - `components → [api, mapper]` (중간 계층 생략 금지)
  - `shared → features` (상위 계층 참조 금지)
  - `features/A → features/B` (직접 참조 금지)
  - `Non-API files → axiosInstance` (통로 단일화)

## 6. Server State & Side Effects

- **Server State**: 오직 **React Query**를 통해서만 관리하며, 전역 상태(Zustand 등)에 복사하지 않습니다.
- **Side Effects**: 오직 `hooks` 또는 `Container` 컴포넌트에서만 허용됩니다. (`View` 컴포넌트 내 `useEffect` 금지)

## 7. Component Boundary (Policy)

### Container Component
- **Mission**: 로직 및 데이터 관리. Hook 호출, 핸들러 정의, 데이터 변환 담당.
- **Forbidden**: UI 마크업(JSX) 렌더링 로직 포함.

### View Component
- **Mission**: UI 렌더링 전담. Props를 통해서만 데이터를 수신.
- **Forbidden**: 상태 변경, API 호출, 비즈니스 로직, 사이드 이펙트.

## 8. Error Handling Flow

```
api (throw) → hooks (React Query Catch) → UI (Boundary/Toast)
```

## 9. Architecture Invariants (Summary)

1. 모든 데이터는 반드시 `api → mapper → hooks → components`를 따른다.
2. View 컴포넌트는 오직 데이터의 시각화만 담당한다. (Logic-free)
3. 레이어 간 경계를 우회하는 모든 지름길(Direct Call 등)은 금지한다.
4. 서버 데이터의 신뢰 원천(Source of Truth)은 React Query 캐시로 단일화한다.

---

## 10. Detailed Implementation Rules & Templates

구체적인 네이밍 컨벤션, 코드 패턴 및 템플릿은 아래의 세부 규칙 문서를 참조하십시오.

### 📖 통합 구현 패턴
- [Integrated Implementation Pattern (예시)](./PATTERN.md)
- [Style Guide](./STYLE_GUIDE.md)

### 📜 상세 계층별 규칙
- [API Specs & Naming](./rules/API_RULE.md)
- [Feature internal structure & Naming](./rules/FEATURE_RULE.md)
- [Mapper patterns](./rules/MAPPER_RULE.md)
- [React Query patterns](./rules/HOOK_RULE.md)
- [Page standards](./rules/PAGE_RULE.md)
- [Testing strategy](./rules/TEST_RULE.md)