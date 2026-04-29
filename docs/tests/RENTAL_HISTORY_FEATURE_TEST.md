# TEST: RENTAL_HISTORY_FEATURE

이 문서는 `RentalHistory` 피처의 **검증 시나리오와 테스트 설계**를 정의합니다.

---

## 1. Test Overview
- **Target Type**: `Container` & `Mapper`
- **Core Responsibility**: 특정 도서의 대여 이력 페칭 및 날짜 포맷팅된 리스트 렌더링.

## 2. Mocking Strategy
- **API (MSW)**:
  - `GET /books/:id/rentals`: 대여 이력 데이터 모킹
- **External Dependencies**:
  - `date-fns`: 날짜 변환 로직 검증

## 3. Test Scenarios

### 3.1 Positive Cases (정상 동작)
- [ ] **이력 목록 렌더링**: 서버에서 받아온 이력 데이터가 리스트 형태로 정상 노출되는지 확인.
- [ ] **날짜 포맷팅**: ISO 8601 문자열이 `yyyy.MM.dd HH:mm` 형식으로 올바르게 변환되는지 확인.
- [ ] **반납 상태 표시**: `returnedAt`이 `null`인 경우 '대여 중'으로 표시되는지 확인.

### 3.2 Negative Cases (에러 및 예외 처리)
- [ ] **조회 실패**: API 에러 시 리스트 영역에 에러 안내 노출 확인.
- [ ] **이력 없음**: 이력이 없을 때 "대여 이력이 없습니다." 메시지 노출 확인.

### 3.3 Edge Cases (경계값 및 특수 상황)
- [ ] **정렬 확인**: 대여 일시 기준 최신순으로 화면에 정렬되어 표시되는지 확인.
- [ ] **유효하지 않은 날짜**: 서버에서 잘못된 형식의 날짜가 내려올 때 Fallback UI 확인.
- [ ] **동일 시간 이벤트**: 대여와 반납이 거의 동시에 일어난 데이터의 표시 순서 및 정렬 검증.

## 4. Verification Checklist (AAA Pattern)

| Phase | Description |
| :--- | :--- |
| **Arrange** | Mock 이력 데이터(최근 항목, 대여 중 항목 포함) 준비 |
| **Act** | 컴포넌트 렌더링 (도서 ID 전달) |
| **Assert** | 렌더링된 리스트 아이템 수, 텍스트 내용(날짜) 확인 |

## 5. Vitest UI & Browser Check
- [ ] **Vitest UI**: 리스트 구조 및 데이터 바인딩 확인.

---

## 6. Notes
- 날짜 포맷팅 시 한국어 로케일 또는 24시간 형식 준수 여부 확인.
