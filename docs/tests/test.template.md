# TEST: {TARGET_NAME}

이 문서는 테스트 대상의 **검증 시나리오와 테스트 설계**를 정의하는 템플릿입니다. 실제 테스트 코드를 작성하기 전, 이 설계를 통해 검증 범위를 명확히 합니다.

---

## 1. Test Overview
- **Target Type**: `Mapper` | `Hook` | `Container` | `View` | `Util`
- **Core Responsibility**: {테스트 대상이 수행하는 핵심 역할 요약}

## 2. Mocking Strategy
- **API (MSW)**:
  - `Endpoint`: `{METHOD} {PATH}`
  - `Mock Data`: {JSON 파일명 또는 상수로 정의된 데이터}
- **External Dependencies**:
  - {라이브러리명}: `vi.mock()` 사용 여부 및 Mocking 범위
- **Spies**:
  - {함수명}: 호출 횟수 또는 인자 검증 필요 여부

## 3. Test Scenarios

### 3.1 Positive Cases (정상 동작)
- [ ] **{시나리오 제목}**: {상세 설명 및 기대 결과}
- [ ] **{시나리오 제목}**: {상세 설명 및 기대 결과}

### 3.2 Negative Cases (에러 및 예외 처리)
- [ ] **API 에러 처리**: {400/500 에러 발생 시 UI/상태 전이 검증}
- [ ] **빈 데이터 처리**: {데이터가 없을 때의 기본값 또는 UI 노출 확인}
- [ ] **권한 부족**: {접근 권한이 없을 때의 처리}

### 3.3 Edge Cases (경계값 및 특수 상황)
- [ ] **글자 수 초과**: {입력값의 최대 범위를 넘어설 때의 반응}
- [ ] **타임아웃**: {응답이 지연될 때의 로딩 상태 유지 여부}

## 4. Verification Checklist (AAA Pattern)

| Phase | Description |
| :--- | :--- |
| **Arrange** | {Mock 데이터 설정, Wrapper 구성 등 준비 사항} |
| **Act** | {함수 실행, 버튼 클릭, 값 입력 등 발생시킬 이벤트} |
| **Assert** | {기대하는 상태 변경, 함수 호출, UI 노출 값} |

## 5. Vitest UI & Browser Check
- [ ] **Vitest UI**: 시각적으로 테스트 흐름을 확인했는가?
- [ ] **Browser Rendering**: 브라우저 환경에서 실제 UI가 깨짐 없이 노출되는가? (View/Container 테스트 시)

---

## 6. Notes
- {테스트 작성 시 유의해야 할 아키텍처적 제약 사항이나 팁}