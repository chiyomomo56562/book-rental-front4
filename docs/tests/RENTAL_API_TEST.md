# TEST: RENTAL_API

이 문서는 `RENTAL_API`의 **검증 시나리오와 테스트 설계**를 정의합니다.

---

## 1. Test Overview
- **Target Type**: `Util` (API Layer)
- **Core Responsibility**: 도서 대여, 반납, 대여 이력 조회 등 대여 관련 REST API 호출 처리.

## 2. Mocking Strategy
- **API (MSW)**:
  - `Endpoint`: 
    - `POST /books/:id/rentals`
    - `PATCH /books/:id/rentals/return`
    - `GET /books/:id/rentals`
  - `Mock Data`: `RENTAL_MOCK_DATA` (상수로 정의)

## 3. Test Scenarios

### 3.1 Positive Cases (정상 동작)
- [ ] **도서 대여 성공**: `POST /books/:id/rentals` 호출 시 성공 여부(true) 반환 확인.
- [ ] **도서 반납 성공**: `PATCH /books/:id/rentals/return` 호출 시 성공 여부(true) 반환 확인.
- [ ] **대여 이력 조회 성공**: `GET /books/:id/rentals` 호출 시 `RentalResponse[]` 배열 반환 확인.

### 3.2 Negative Cases (에러 및 예외 처리)
- [ ] **이미 대여 중인 도서 대여 시도**: 400 에러 발생 시 처리 로직 확인.
- [ ] **이미 반납된 도서 반납 시도**: 서버 에러 응답 시 처리 확인.
- [ ] **존재하지 않는 도서 ID**: 없는 ID로 대여/반납/이력 조회 시 404 에러 처리 확인.

### 3.3 Edge Cases (경계값 및 특수 상황)
- [ ] **이력이 없는 도서 조회**: 빈 배열(`[]`)이 정상적으로 반환되는지 확인.

## 4. Verification Checklist (AAA Pattern)

| Phase | Description |
| :--- | :--- |
| **Arrange** | MSW Handler 설정 (대여/반납/이력 조회 모킹) |
| **Act** | `rentalBook()`, `returnBook()`, `getRentalHistory()` 등 함수 실행 |
| **Assert** | 반환된 데이터의 타입 및 날짜 포맷 확인 |

## 5. Vitest UI & Browser Check
- [ ] **Vitest UI**: 테스트 케이스별 API 응답 상태 확인.

---

## 6. Notes
- 대여 일시와 반납 일시가 ISO 8601 형식을 준수하는지 확인.
