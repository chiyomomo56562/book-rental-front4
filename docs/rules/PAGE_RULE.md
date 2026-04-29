## UI Requirements
- 로딩 상태 표시
- 에러 메시지 표시
- 데이터 렌더링

## Behavior
- mount 시 데이터 fetch
- 사용자 액션 처리 (optional)

## Architectural Constraints
- **Responsibility**: Composing Features and Orchestrating data flow.
- **Allowed**:
  - **Data Orchestration**: 여러 Feature가 동일한 데이터를 공유해야 할 경우, 페이지에서 **Read-only Hook**을 호출하여 하위 Container에 데이터를 전달할 수 있습니다.
  - **Layout & Routing**: URL 파라미터(`id` 등)를 추출하여 필요한 Feature에 주입합니다.
- **Forbidden**: 
  - **Direct API Calls**: Axios 등을 이용한 직접적인 네트워크 요청 금지 (반드시 Hook 사용).
  - **Business Logic**: 도메인 관련 계산이나 로직 포함 금지 (Feature에 위임).
  - **Write State Management**: 서버 데이터를 수정하거나 생성하는 상태 관리 금지.
- **UI Focus**: UI layout, feature composition, and cross-feature data orchestration.

## Output Format
- React component (.tsx)