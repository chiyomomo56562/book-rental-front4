# TEST: BOOK_DETAIL_PAGE

이 문서는 `BookDetailPage`의 **검증 시나리오와 테스트 설계**를 정의합니다.

---

## 1. Test Overview
- **Target Type**: `Page`
- **Core Responsibility**: URL 파라미터(`id`)를 추출하여 하위 Feature들에 전달하고, 레이아웃을 구성함.

## 2. Mocking Strategy
- **Features**:
  - `BookDetail`, `BookManagement`, `RentalHistory`: 내부 로직보다는 페이지에서 올바른 Props가 전달되는지 확인 (필요 시 Mocking).
- **External Dependencies**:
  - `react-router-dom`: `useParams` 결과 모킹 (`id: 'test-book-id'`)

## 3. Test Scenarios

### 3.1 Positive Cases (정상 동작)
- [ ] **컴포넌트 조합**: 상세 정보, 관리 기능, 대여 이력 섹션이 모두 렌더링되는지 확인.
- [ ] **Props 전달**: `useParams`로 얻은 `id`가 각 Feature 컴포넌트에 정확히 전달되는지 확인.
- [ ] **레이아웃 확인**: `DefaultLayout` 내부에 적절히 배치되었는지 확인.
- [ ] **'목록으로' 이동**: '목록으로' 버튼 클릭 시 메인 페이지(`/`)로 navigate 되는지 확인.

### 3.2 Negative Cases (에러 및 예외 처리)
- [ ] **ID 누락**: URL에 ID가 없을 경우(잘못된 접근)의 처리 로직(예: 404 페이지 이동 또는 에러 메시지) 확인.

### 3.3 Edge Cases (경계값 및 특수 상황)
- [ ] **삭제 성공 후 이동**: `BookManagement`에서 삭제 성공 이벤트 발생 시 메인 페이지(`/`)로 navigate 되는지 확인.
- [ ] **유효하지 않은 ID 형식**: ID가 빈 문자열이거나 명세에 맞지 않는 형태일 때의 에러 라우팅 확인.

## 4. Verification Checklist (AAA Pattern)

| Phase | Description |
| :--- | :--- |
| **Arrange** | MemoryRouter의 initialEntries를 `/books/123`으로 설정 |
| **Act** | 페이지 컴포넌트 렌더링, '목록으로' 버튼 클릭 |
| **Assert** | 하위 Feature들의 호출 여부 및 전달된 bookId 값 검증, navigate 호출 확인 |

## 5. Vitest UI & Browser Check
- [ ] **Browser Rendering**: 전체적인 레이아웃(섹션 구분)이 깨짐 없이 노출되는가?

---

## 6. Notes
- 페이지 계층에서는 비즈니스 로직을 직접 포함하지 않으므로, **조합(Composition)과 라우팅** 위주로 테스트함.
