# TEST: BOOK_REGISTRATION_FEATURE

이 문서는 `BookRegistration` 피처의 **검증 시나리오와 테스트 설계**를 정의합니다.

---

## 1. Test Overview
- **Target Type**: `Container` & `View`
- **Core Responsibility**: 도서 등록 폼 데이터 수집, 유효성 검증, 등록 요청 처리.

## 2. Mocking Strategy
- **API (MSW)**:
  - `POST /books`: 도서 등록 요청 모킹
- **External Dependencies**:
  - `react-router-dom`: 등록 성공 후 이동을 위한 `useNavigate` 모킹
  - `react-hook-form`: (필요 시) 폼 상태 모킹

## 3. Test Scenarios

### 3.1 Positive Cases (정상 동작)
- [ ] **도서 등록 성공**: 유효한 제목 입력 후 등록 버튼 클릭 시 API 호출 및 목록 페이지(`/`)로 이동 확인.
- [ ] **공백 제거**: 제목의 앞뒤 공백이 서버 전송 전 제거되는지 확인.

### 3.2 Negative Cases (에러 및 예외 처리)
- [ ] **필수값 누락**: 제목 미입력 시 에러 메시지("제목은 필수 입력 사항입니다") 노출 및 제출 방지 확인.
- [ ] **글자 수 제한**: 2자 미만 또는 100자 초과 입력 시 유효성 에러 노출 확인.
- [ ] **중복 도서 등록**: 이미 존재하는 제목 등록 시 서버 에러(409)에 대한 UI 대응 확인.

### 3.3 Edge Cases (경계값 및 특수 상황)
- [ ] **중복 클릭 방지**: 제출 중 버튼이 `disabled` 상태가 되고 Spinner가 도는지 확인.
- [ ] **연속 공백 처리**: 제목 중간에 비정상적으로 긴 공백이 포함된 경우의 처리 정책 검증.

## 4. Verification Checklist (AAA Pattern)

| Phase | Description |
| :--- | :--- |
| **Arrange** | 등록 폼 렌더링, MSW 핸들러 설정 |
| **Act** | 제목 입력 필드 값 변경, 등록 버튼 클릭 |
| **Assert** | 에러 메시지 존재 여부, navigate('/') 호출 확인 |

## 5. Vitest UI & Browser Check
- [ ] **Vitest UI**: 폼 입력 및 에러 메시지 렌더링 확인.

---

## 6. Notes
- `react-hook-form`의 `isSubmitting` 상태가 UI(버튼 비활성화)에 즉각 반영되는지 확인.
