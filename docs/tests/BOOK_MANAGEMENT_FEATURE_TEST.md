# TEST: BOOK_MANAGEMENT_FEATURE

이 문서는 `BookManagement` 피처의 **검증 시나리오와 테스트 설계**를 정의합니다.

---

## 1. Test Overview
- **Target Type**: `Container` & `Hook`
- **Core Responsibility**: 도서 제목 수정 모달 관리 및 삭제 컨펌 처리.

## 2. Mocking Strategy
- **API (MSW)**:
  - `PATCH /books/:id/title`: 수정 요청 모킹
  - `DELETE /books/:id`: 삭제 요청 모킹
- **External Dependencies**:
  - `window.confirm`: 삭제 전 사용자 확인창 모킹 (`vi.spyOn(window, 'confirm').mockReturnValue(true)`)
  - `react-router-dom`: 삭제 후 목록 이동을 위한 `useNavigate` 모킹

## 3. Test Scenarios

### 3.1 Positive Cases (정상 동작)
- [ ] **도서 제목 수정**: 수정 버튼 클릭 -> 모달 오픈 -> 제목 입력 -> 저장 클릭 시 API 호출 및 쿼리 무효화 확인.
- [ ] **도서 삭제**: 삭제 버튼 클릭 -> confirm 확인 -> API 호출 -> 목록 페이지(`/`) 이동 확인.

### 3.2 Negative Cases (에러 및 예외 처리)
- [ ] **수정 실패**: API 오류 시 에러 알림 노출 및 모달 유지 확인.
- [ ] **삭제 실패**: 제약 조건(예: 대여 중)으로 삭제 실패 시 Toast 알림 확인.
- [ ] **삭제 취소**: confirm에서 '취소' 클릭 시 API를 호출하지 않는지 확인.

### 3.3 Edge Cases (경계값 및 특수 상황)
- [ ] **빈 제목 수정 시도**: 제목 필드가 비어있을 때 수정 요청을 방지하거나 에러를 표시하는지 확인.
- [ ] **기존과 동일한 제목**: 제목을 변경하지 않고 수정을 시도할 때 API 호출 방지 확인.

## 4. Verification Checklist (AAA Pattern)

| Phase | Description |
| :--- | :--- |
| **Arrange** | 수정할 도서 ID 설정, window.confirm 스파이 설정 |
| **Act** | 수정/삭제 버튼 클릭 및 폼 조작 |
| **Assert** | API 호출 인자(ID, title) 검증, 페이지 이동 여부 확인 |

## 5. Vitest UI & Browser Check
- [ ] **Vitest UI**: 모달의 Open/Close 상태 시각적 확인.

---

## 6. Notes
- 삭제 기능은 파괴적인 작업이므로 사용자 확인(confirm) 단계가 필수적으로 테스트되어야 함.
