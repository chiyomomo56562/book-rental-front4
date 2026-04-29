# TEST: BOOK_LIST_FEATURE

이 문서는 `BookList` 피처의 **검증 시나리오와 테스트 설계**를 정의합니다.

---

## 1. Test Overview
- **Target Type**: `Container` & `View` & `Mapper`
- **Core Responsibility**: 도서 목록 페칭, 상태별 UI 모델링(ViewModel), 상세 페이지 이동 처리.

## 2. Mocking Strategy
- **API (MSW)**:
  - `GET /books`: 도서 목록 데이터 모킹
- **External Dependencies**:
  - `react-router-dom`: `useNavigate` 모킹
- **Spies**:
  - `navigate`: 도서 클릭 시 올바른 URL로 이동하는지 확인

## 3. Test Scenarios

### 3.1 Positive Cases (정상 동작)
- [ ] **목록 렌더링**: 서버의 도서 목록이 정상적으로 카드 형태로 노출되는지 확인.
- [ ] **상태 텍스트 변환**: `AVAILABLE` -> '대여 가능', `RENTED` -> '대여 중' 매퍼 동작 확인.
- [ ] **대여 가능 여부 매핑**: `AVAILABLE` 상태일 때 `isRentable: true` 확인.
- [ ] **상태별 색상 매핑**: `AVAILABLE` -> `green`, `RENTED` -> `red` 색상이 올바르게 할당되는지 확인.
- [ ] **상세 페이지 이동**: 도서 카드 클릭 시 `/books/:id`로 이동하는지 확인.

### 3.2 Negative Cases (에러 및 예외 처리)
- [ ] **API 에러**: 목록 조회 실패 시 '다시 시도' 버튼과 에러 메시지 노출 확인.
- [ ] **빈 데이터**: 도서가 없을 때 "등록된 도서가 없습니다." 메시지 노출 확인.

### 3.3 Edge Cases (경계값 및 특수 상황)
- [ ] **대여 중 도서 스타일링**: `status === 'RENTED'`인 경우 UI에서 비활성화 또는 흐리게 표시되는지 확인.
- [ ] **비정상 응답 구조**: API 응답이 배열이 아닌 객체나 null인 경우 에러 처리 확인.
- [ ] **특수문자/공백 제목**: 제목이 매우 길거나 특수문자/공백만 있는 경우 레이아웃 깨짐 확인.
- [ ] **대량 데이터 렌더링**: 도서 목록이 매우 많을 때의 초기 렌더링 지연 및 UI 대응 확인.

## 4. Verification Checklist (AAA Pattern)

| Phase | Description |
| :--- | :--- |
| **Arrange** | MemoryRouter 설정, 도서 목록 Mock 데이터 준비 |
| **Act** | 컴포넌트 렌더링, 특정 도서 카드 클릭 |
| **Assert** | 카드 개수, 상태 텍스트 내용, navigate 호출 인자 검증 |

## 5. Vitest UI & Browser Check
- [ ] **Vitest UI**: 목록 렌더링 구조 확인.
- [ ] **Browser Rendering**: Badge 색상(`green`/`red`)이 상태와 일치하는지 확인.

---

## 6. Notes
- Skeleton UI가 로딩 중에 적절히 노출되는지 테스트 환경에서 확인 필요.
