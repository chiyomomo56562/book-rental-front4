# TEST: BOOK_API

이 문서는 `BOOK_API`의 **검증 시나리오와 테스트 설계**를 정의합니다.

---

## 1. Test Overview
- **Target Type**: `Util` (API Layer)
- **Core Responsibility**: 도서 등록, 목록 조회, 제목 수정, 삭제, 상태 변경 등 도서 관련 REST API 호출 처리.

## 2. Mocking Strategy
- **API (MSW)**:
  - `Endpoint`: 
    - `POST /books`
    - `GET /books`
    - `PATCH /books/:id/title`
    - `DELETE /books/:id`
    - `PATCH /books/:id/status`
  - `Mock Data`: `BOOK_MOCK_DATA` (상수로 정의)
- **External Dependencies**:
  - `axios`: API 호출 라이브러리

## 3. Test Scenarios

### 3.1 Positive Cases (정상 동작)
- [ ] **도서 등록 성공**: `POST /books` 호출 시 201 응답과 생성된 도서 데이터 반환 확인.
- [ ] **도서 목록 조회 성공**: `GET /books` 호출 시 도서 배열 반환 확인.
- [ ] **도서 제목 수정 성공**: `PATCH /books/:id/title` 호출 시 성공 여부(true) 반환 확인.
- [ ] **도서 삭제 성공**: `DELETE /books/:id` 호출 시 성공 여부(true) 반환 확인.
- [ ] **도서 상태 변경 성공**: `PATCH /books/:id/status` 호출 시 성공 여부(true) 반환 확인.

### 3.2 Negative Cases (에러 및 예외 처리)
- [ ] **API 500 에러 처리**: 서버 오류 발생 시 에러 객체가 적절히 throw 되는지 확인.
- [ ] **404 Not Found**: 존재하지 않는 도서 ID로 요청 시 404 에러 처리 확인.
- [ ] **잘못된 상태 값 전달**: 정의되지 않은 status 값으로 변경 시도 시 에러 처리 확인.
- [ ] **대여 중 도서 삭제 시도**: 대여 중인 도서 삭제 시 400 에러 응답 및 에러 메시지 확인.

### 3.3 Edge Cases (경계값 및 특수 상황)
- [ ] **빈 제목 등록 시도**: 빈 문자열을 보낼 때 API 응답 또는 클라이언트 측 에러 처리 확인.
- [ ] **제목 길이 초과**: 백엔드 제한을 초과하는 매우 긴 제목 전송 시 에러 처리 확인.
- [ ] **동일 상태 변경**: 이미 `RENTED`인 도서를 다시 `RENTED`로 변경 요청 시의 응답 처리.
- [ ] **Query Params 예외**: `GET /books` 호출 시 잘못된 형식의 쿼리 파라미터 전달 시 처리.

## 4. Verification Checklist (AAA Pattern)

| Phase | Description |
| :--- | :--- |
| **Arrange** | MSW Handler 설정 (정상/에러 응답 모킹) |
| **Act** | `createBook()`, `getBooks()`, `renameTitle()` 등 함수 실행 |
| **Assert** | 반환된 데이터 구조 검증 및 axios 호출 인자 확인 |

## 5. Vitest UI & Browser Check
- [ ] **Vitest UI**: API 호출 성공/실패 로그가 의도한 대로 노출되는가?

---

## 6. Notes
- API 응답 구조가 `BOOK_API.md`에 정의된 `status`, `data`, `error` 형식을 따르는지 필수 검증.
ation Strategy`에 따라 성공 시 상세 정보와 이력 쿼리가 모두 무효화되는지 확인.
