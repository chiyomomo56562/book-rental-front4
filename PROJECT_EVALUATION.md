# 📊 book-rental-front4 프로젝트 종합 평가

> 평가 기준: 실무 수준의 프론트엔드 아키텍처 관점

---

## 총점: **79 / 100점**

| 항목 | 만점 | 획득 | 등급 |
|------|------|------|------|
| 1. 아키텍처 설계 | 25 | 23 | ★★★★☆ |
| 2. 코드 품질 | 20 | 17 | ★★★★☆ |
| 3. 테스트 | 20 | 12 | ★★★☆☆ |
| 4. 문서화 | 20 | 19 | ★★★★★ |
| 5. 네이밍 & 타입 안전성 | 10 | 5 | ★★☆☆☆ |
| 6. 도구 & 프로젝트 구성 | 5 | 3 | ★★★☆☆ |

---

## 1. 아키텍처 설계 — 23/25점

### ✅ 잘된 점

- **레이어 분리가 일관적이다**: `api → mapper → hooks → components` 단방향 흐름이 코드 전반에서 실제로 지켜지고 있음.
  - `BookListContainer`는 `useBooksQuery`만 호출하고, `BookListView`는 순수 props 기반으로만 렌더링.
  - `BookDetail`, `RentalHistory`, `BookManagement` 모두 같은 패턴 준수.
- **Container/View 분리(VAC 패턴)**: 비즈니스 로직과 UI가 명확히 분리되어 있음. View 컴포넌트에 side effect가 없음.
- **Feature 독립성**: Feature 간 직접 import가 없음. 공유 로직은 `shared/`로 올바르게 분리.
- **Mapper 레이어**: 모든 Feature에 `mapper.ts`가 존재하며 API 응답을 UI 모델로 변환 책임을 명확히 분리.
- **QUERY_KEYS 중앙화**: `shared/lib/constants.ts`에서 계층적으로 관리. 타입 안전한 `as const` 사용.
- **axiosInstance 단일화**: `shared/api/`에서만 axios를 다루고, 응답 interceptor로 ApiResponse 언래핑 처리.
- **ADR 문서화**: 7개의 ADR이 실제 코드와 일치하며, 각 결정의 맥락·제약·결과가 명시됨.

### ⚠️ 감점 요인 (-2점)

- **useRemoveBook 훅의 네이밍 불일치**: `HOOK_RULE.md`에 따르면 Mutation 훅은 `use{Action}Mutation` 형식이어야 하나, `useRemoveBook`, `useRenameBook`은 이 규칙을 따르지 않음. (→ `useRemoveBookMutation`, `useRenameBookMutation`이 맞음)
- **BookManagement에 mapper.ts 없음**: BookList/BookDetail/RentalHistory와 달리 BookManagement Feature에는 `mapper.ts`가 없음. Mutation 전용이라도 일관성 유지가 아쉬움.

---

## 2. 코드 품질 — 17/20점

### ✅ 잘된 점

- **mapper 함수가 순수 함수**: 외부 의존성 없이 입력에 따른 출력만 반환. 상태 코드 매핑을 상수(`BOOK_STATUS_LABEL`, `BOOK_STATUS_COLOR`)로 분리하여 하드코딩 제거.
- **useRemoveBook의 onSuccess 처리**: 성공 시 `invalidateQueries` + `navigate('/')`를 올바르게 조합.
- **axiosInstance interceptor**: 응답 정규화(data 언래핑)와 에러 정규화(`ApiError`)를 한 곳에서 처리.
- **Null 방어**: `BookListContainer`에서 `data ?? []`로 null 안전 처리.
- **공유 UI 컴포넌트 구성**: `LoadingView`, `ErrorView`, `EmptyView`, `Card`, `Badge`, `Modal`, `Spinner`, `Table`, `TextField`가 `shared/ui/`에 잘 정리됨.

### ⚠️ 감점 요인 (-3점)

- **`package.json`의 `name` 불일치**: 프로젝트 폴더는 `book-rental-front4`인데 `package.json`의 `name`은 `book-rental-front2`로 되어 있음. 복사 흔적이 남아 있음.
- **`useBookDetailQuery.test.tsx`의 잘못된 mock 경로**: `vi.mock('./api')`로 작성되어 있어 상대 경로가 틀림 (실제 api는 `../api`). 이로 인해 테스트 실패 발생.
- **`useRentalHistoryQuery.test.tsx`의 mock API 응답 형태**: `getRentalHistory`의 mock return 값을 `{ status, data, error }` 형태로 주고 있는데, axiosInstance interceptor가 `data`를 언래핑하므로 실제 hook의 기대 형태와 불일치. 테스트가 실패하는 원인.
- **Container에 JSX 마크업 금지 규칙**: `BookListContainer`는 올바르게 JSX를 View에 위임하지만, View에서 `if (isLoading)` 분기 처리가 이루어짐. ARCHITECTURE.md는 이를 View가 아닌 Container 책임으로 볼 수도 있어 해석 여지 존재.

---

## 3. 테스트 — 12/20점

### 테스트 현황

```
Test Files: 7 failed | 16 passed (23 total)
Tests:      24 failed | 47 passed (71 total)
Pass Rate: ~66%
```

### ✅ 잘된 점

- **테스트 커버리지 의지**: 모든 Feature에 hook 테스트 + container 테스트 + mapper 테스트가 존재. 구조 자체는 완성도 높음.
- **AAA 패턴 준수**: Arrange-Act-Assert 구조가 테스트 코드 전반에서 일관되게 사용됨.
- **Mapper 테스트**: `BookList`, `BookDetail`, `RentalHistory` mapper 테스트가 순수 함수 단위로 잘 작성되어 통과.
- **QueryClient 격리**: 각 테스트마다 새로운 `QueryClient`를 생성하여 테스트 간 상태 오염 방지.
- **한국어 테스트 설명**: `TEST_RULE.md` 규칙(한국어 `describe`/`it` 설명)을 일부 테스트에서 잘 따르고 있음.
- **`useRemoveBook` 테스트**: `vi.spyOn(queryClient, 'invalidateQueries')`로 세밀한 검증. 통과.

### ⚠️ 감점 요인 (-8점)

- **24개 테스트 실패 (66% 통과율)**: 실무에서는 CI가 실패 상태인 수준.
  - 핵심 원인: **잘못된 mock 경로** (`vi.mock('./api')` vs `vi.mock('../api')`), **mock API 응답 형태 불일치**.
  - 이는 테스트 코드가 실제 구현과 충분히 동기화되지 않았음을 의미.
- **`useBooksQuery`/`useBookDetailQuery`의 테스트 언어 불일치**: 일부 테스트는 영어(`should fetch and map...`), 일부는 한국어로 혼재. `TEST_RULE.md` 위반.
- **MSW 미활용**: `TEST_RULE.md`에서 API 테스트에 MSW를 권장하나, hook 테스트에서 `vi.mock('../api')`로 직접 모킹. MSW 핸들러는 정의되어 있지만 실제 테스트에서 활용되지 않음.
- **error 케이스 테스트 부재**: hook 레벨에서 API 실패 시 `isError` 상태가 올바르게 노출되는지 테스트가 없음.

---

## 4. 문서화 — 19/20점

### ✅ 잘된 점

- **ARCHITECTURE.md**: 설계 철학, 레이어 책임, 의존성 규칙, 에러 흐름이 명확히 정의. 실제 코드와 일치.
- **ADR.md**: 7개의 Architecture Decision Record가 실제 코드와 일치하며 의사결정 배경이 추적 가능.
- **세부 Rule 문서 (6개)**: API_RULE, FEATURE_RULE, HOOK_RULE, MAPPER_RULE, PAGE_RULE, TEST_RULE이 각 계층별로 분리되어 있고 예시 코드 포함.
- **PATTERN.md**: 전체 흐름의 통합 예시가 있어 신규 참여자 온보딩에 유리.
- **docs/tests/ 디렉토리**: Feature/Page/API별 테스트 계획 문서 10개 + 템플릿이 있어 TDD 의도가 명확.
- **AI_RULE.md**: AI 어시스턴트가 이 프로젝트에서 어떻게 동작해야 하는지 명시. 독창적인 접근.
- **AGENT.md**: 루트 레벨에 AI 에이전트 지침이 명시되어 있어 자동화 워크플로우 고려.

### ⚠️ 감점 요인 (-1점)

- **HOOK_RULE.md 예시 코드**: `useBooksQuery(params: GetBooksParams)`로 파라미터를 받는 예시지만, 실제 구현은 파라미터 없이 작성. 문서와 구현 간 작은 불일치.

---

## 5. 네이밍 & 타입 안전성 — 5/10점

### ✅ 잘된 점

- **ViewModel 타입 분리**: `RawBook`(API 응답)과 `BookViewModel`(UI 모델)이 `types.ts`에서 명확히 분리.
- **`as const` 활용**: 상수 객체 타입이 올바르게 좁혀짐.
- **컴포넌트 Props 인터페이스**: 각 컴포넌트의 Props 타입이 명시적으로 정의됨.

### ⚠️ 감점 요인 (-5점)

- **Mutation 훅 네이밍 규칙 위반**: `useRemoveBook`, `useRenameBook`은 `HOOK_RULE.md`의 `use{Action}Mutation` 형식을 따르지 않음.
- **`useBookDetailQuery.test.tsx` mock 타겟 오류**: `vi.mock('./api')` — 잘못된 경로로 인해 실제 모킹이 동작하지 않고 테스트 24개 실패의 원인 중 하나.
- **`package.json` name 필드 오류**: `book-rental-front2`로 남아있는 것은 타입 안전성과는 별개지만 프로젝트 정체성 혼란.
- **일부 테스트 파일의 `as unknown as AxiosResponse` 강제 캐스팅**: 타입 우회가 남용되고 있어, mock 데이터 형태를 정확히 맞추지 않음을 시사.

---

## 6. 도구 & 프로젝트 구성 — 3/5점

### ✅ 잘된 점

- **기술 스택이 현대적이다**: Vite + React 18 + TypeScript + TanStack Query v5 + MSW v2 + Vitest v4.
- **ESLint + Prettier 설정**: 코드 포맷 일관성 도구가 구성되어 있음.
- **Vitest UI 스크립트**: `npm run test:ui` 스크립트로 시각적 테스트 확인 가능.
- **Path alias `@/`**: `tsconfig.json`에서 경로 별칭이 설정되어 깊은 상대 경로 회피.

### ⚠️ 감점 요인 (-2점)

- **Zustand 설치되어 있지만 미사용**: `package.json`에 `zustand: 4.5.2`가 있으나, `ARCHITECTURE.md`에서 Global State는 인증/UI 설정 용도로만 제한한다고 명시. 실제 사용 코드가 없어 의존성 과잉.
- **`react-hook-form` 설치**: 폼 처리 라이브러리가 있으나, BookRegistration Feature에서 활용 여부가 명확하지 않음. 필요 확인 필요.
- **`date-fns` 활용**: RentalHistory에서 날짜 포맷에 사용 중이나, 일부 테스트에서 타임존(KST) 처리가 하드코딩되어 있어 안정성 우려.

---

## 🔑 종합 요약

### 이 프로젝트의 진짜 강점
이 프로젝트는 **"아키텍처를 문서로 먼저 설계하고 코드로 구현한다"**는 철학이 실제로 작동하고 있다는 점에서 차별화됩니다. 대부분의 학습용/포트폴리오 프로젝트가 코드만 있는 것과 달리, ADR·Rule·Pattern·Test Plan까지 갖춘 문서 체계는 실무 팀 수준입니다.

### 가장 시급한 개선 사항
1. **테스트 mock 경로 수정** (`vi.mock('./api')` → `vi.mock('../api')`) — 이것만 고치면 통과율이 85%+ 수준으로 올라갈 가능성이 높음.
2. **Mutation 훅 네이밍 일관화** (`useRemoveBook` → `useRemoveBookMutation`)
3. **`package.json` name 필드 수정** (`book-rental-front2` → `book-rental-front4`)

### 현실적인 포지셔닝
```
입문자     중급자     시니어
  ○──────────────●──────○
                 ↑
         현재 이 프로젝트
         (상위 중급 ~ 하위 시니어)
```

실무 신입 ~ 주니어 프론트엔드로 취업 시 이 정도 아키텍처 이해도를 포트폴리오로 보여주면 **상위 5~10% 수준**의 준비도입니다.
