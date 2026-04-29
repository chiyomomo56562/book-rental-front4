# TEST: BOOK_LIST_PAGE

이 문서는 `BookListPage`의 **검증 시나리오와 테스트 설계**를 정의합니다.

---

## 1. Test Overview
- **Target Type**: `Page`
- **Core Responsibility**: 메인 도서 목록 화면 구성 및 '도서 등록' 버튼을 통한 페이지 이동 처리.

## 2. Mocking Strategy
- **Features**:
  - `BookList`: 목록 렌더링 여부 확인.
- **External Dependencies**:
  - `react-router-dom`: `Link` 또는 `useNavigate` 동작 확인.

## 3. Test Scenarios

### 3.1 Positive Cases (정상 동작)
- [ ] **목록 렌더링**: `BookList` 피처가 페이지 중앙에 정상적으로 포함되었는지 확인.
- [ ] **등록 페이지 이동**: '도서 등록' 버튼 클릭 시 `/books/register`로 이동하는지 확인.
- [ ] **타이틀 표시**: "도서 목록" 타이틀이 올바르게 표시되는지 확인.

### 3.2 Negative Cases (에러 및 예외 처리)
- [ ] **레이아웃 에러**: Layout 컴포넌트가 누락되지 않았는지 확인.

### 3.3 Edge Cases (경계값 및 특수 상황)
- [ ] **뒤로 가기 스크롤 유지**: 상세 페이지에서 돌아왔을 때 이전 스크롤 위치가 유지되는지 확인.
- [ ] **데이터 새로고침**: 도서 등록 후 목록으로 돌아왔을 때 캐시 무효화 및 리프레시 정상 작동 확인.

## 4. Verification Checklist (AAA Pattern)

| Phase | Description |
| :--- | :--- |
| **Arrange** | Router 설정 및 페이지 렌더링 |
| **Act** | '도서 등록' 버튼 클릭 시도 |
| **Assert** | `BookList` 컴포넌트 존재 확인, 이동할 URL 검증 |

## 5. Vitest UI & Browser Check
- [ ] **Browser Rendering**: 메인 컨테이너 폭과 패딩이 가이드라인(`container mx-auto p-4`)에 맞는지 확인.

---

## 6. Notes
- 페이지는 엔트리 포인트이므로 SEO 요소(타이틀 등)가 문서에 정의된 대로 반영되었는지 체크.
