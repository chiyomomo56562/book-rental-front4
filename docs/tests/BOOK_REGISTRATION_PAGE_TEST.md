# TEST: BOOK_REGISTRATION_PAGE

이 문서는 `BookRegistrationPage`의 **검증 시나리오와 테스트 설계**를 정의합니다.

---

## 1. Test Overview
- **Target Type**: `Page`
- **Core Responsibility**: 도서 등록 폼을 화면 중앙에 배치하고, 레이아웃을 제공함.

## 2. Mocking Strategy
- **Features**:
  - `BookRegistrationForm`: 폼 컴포넌트 렌더링 확인.
- **External Dependencies**:
  - `DefaultLayout` 모킹 여부 결정.

## 3. Test Scenarios

### 3.1 Positive Cases (정상 동작)
- [ ] **컴포넌트 배치**: 등록 폼(`BookRegistrationForm`)이 지정된 위치(`w-full max-w-lg`)에 렌더링되는지 확인.
- [ ] **타이틀 확인**: "새로운 도서 등록" 텍스트가 노출되는지 확인.

### 3.2 Negative Cases (에러 및 예외 처리)
- [ ] **취소 액션**: 취소 버튼 클릭(또는 이벤트) 시 목록 페이지로 돌아가는지 확인 (Feature 내부 또는 Page에서 처리).

## 4. Verification Checklist (AAA Pattern)

| Phase | Description |
| :--- | :--- |
| **Arrange** | 페이지 컴포넌트 렌더링 |
| **Act** | 특별한 액션 없음 (조합 검증 위주) |
| **Assert** | 하위 폼 컴포넌트 존재 확인 및 레이아웃 클래스 적용 여부 확인 |

## 5. Vitest UI & Browser Check
- [ ] **Browser Rendering**: 폼이 모바일/데스크톱에서 중앙 정렬되어 표시되는가?

---

## 6. Notes
- 페이지 계층은 단순 조합이므로 테스트 코드가 비대해지지 않도록 주의.
