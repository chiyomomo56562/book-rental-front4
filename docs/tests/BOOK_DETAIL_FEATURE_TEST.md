# TEST: BOOK_DETAIL_FEATURE

이 문서는 `BookDetail` 피처의 **검증 시나리오와 테스트 설계**를 정의합니다.

---

## 1. Test Overview
- **Target Type**: `Container` & `View` & `Mapper`
- **Core Responsibility**: 도서 상세 정보 로딩, ViewModel 변환, 대여/반납 액션 처리 및 UI 업데이트.

## 2. Mocking Strategy
- **API (MSW)**:
  - `GET /books/:id`: 도서 상세 정보 모킹
  - `POST /books/:id/rentals`: 대여 요청 모킹
  - `PATCH /books/:id/rentals/return`: 반납 요청 모킹
- **External Dependencies**:
  - `tanstack/react-query`: QueryClient 및 쿼리 무효화(Invalidation) 모킹
- **Spies**:
  - `console.log` 또는 Toast 함수: 성공/실패 알림 호출 확인

## 3. Test Scenarios

### 3.1 Positive Cases (정상 동작)
- [ ] **데이터 로딩 및 표시**: API 응답 데이터가 Mapper를 통해 `BookDetailViewModel`로 올바르게 변환되어 화면에 표시되는지 확인.
- [ ] **ViewModel 매핑 검증**:
    - `AVAILABLE` 상태: `canRent: true`, `canReturn: false`, `actionButtonText: '대여하기'` 확인.
    - `RENTED` 상태: `canRent: false`, `canReturn: true`, `actionButtonText: '반납하기'` 확인.
- [ ] **대여하기 클릭**: `AVAILABLE` 상태일 때 대여 버튼 클릭 시 `handleRental` 호출 및 쿼리 무효화 확인.
- [ ] **반납하기 클릭**: `RENTED` 상태일 때 반납 버튼 클릭 시 `handleReturn` 호출 및 쿼리 무효화 확인.

### 3.2 Negative Cases (에러 및 예외 처리)
- [ ] **상세 정보 로드 실패**: API 500 에러 시 에러 UI 노출 여부 확인.
- [ ] **액션 실패**: 대여/반납 API 호출 실패 시 에러 알림(Toast) 노출 확인.

### 3.3 Edge Cases (경계값 및 특수 상황)
- [ ] **로딩 중 버튼 비활성화**: API 응답 대기 중 버튼 내 Spinner 노출 및 중복 클릭 방지 확인.
- [ ] **알 수 없는 상태 값**: 서버에서 정의되지 않은 status가 내려올 때의 Fallback UI(예: '상태 알 수 없음') 확인.
- [ ] **액션 중복 방지**: 대여/반납 버튼을 빠르게 여러 번 클릭해도 API 요청이 한 번만 발생하는지 확인.

## 4. Verification Checklist (AAA Pattern)

| Phase | Description |
| :--- | :--- |
| **Arrange** | QueryClientProvider 설정, MSW 도서 데이터 설정 |
| **Act** | 컴포넌트 렌더링, 대여/반납 버튼 클릭 |
| **Assert** | 버튼 텍스트 및 활성화 상태 확인, API 호출 횟수 확인 |

## 5. Vitest UI & Browser Check
- [ ] **Vitest UI**: 렌더링 결과 확인.
- [ ] **Browser Rendering**: 버튼 스타일 및 상태 텍스트(label) 노출 확인.

---

## 6. Notes
- `Invalidation Strategy`에 따라 성공 시 상세 정보와 이력 쿼리가 모두 무효화되는지 확인.
