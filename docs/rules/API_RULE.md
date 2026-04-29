# API Rules (Contract & Standards)

이 문서는 Frontend와 Backend 간의 인터페이스 규칙, 데이터 규격, 그리고 API 호출 계층의 표준을 정의합니다. 모든 명명 규칙은 Airbnb Style Guide를 따릅니다.

## 1. Response Standard (I/O Format)

모든 API 응답은 아래의 표준 래퍼 형식을 따릅니다.

```ts
export type ApiError = {
  message: string;
  code: string;
  status: number;
};

export type ApiResponse<T> = {
  status: number;
  data: T;
  error: ApiError | null;
};
```

### 규칙
- **status**: HTTP Status Code를 사용합니다.
- **성공 (200~299)**: `error`는 반드시 `null`이어야 합니다.
- **실패 (400~599)**: API 계층에서 반드시 `throw` 처리하며, UI 계층에서는 `ApiResponse` 형식을 직접 다루지 않고 순수 데이터(`T`) 또는 에러 객체만 다룹니다.

## 2. Naming Rules (Airbnb Standard)

### API 함수
- **Format**: `camelCase`를 사용합니다.
- **Prefix**: 기능을 명확히 알 수 있도록 아래의 Prefix를 권장합니다.
    - `get`: 데이터 조회 (예: `getBooks`, `getBookDetail`)
    - `create`: 데이터 생성 (예: `createBook`)
    - `update`: 데이터 수정 (예: `updateBook`)
    - `delete`: 데이터 삭제 (예: `deleteBook`)

### 타입 네이밍
- **Format**: `PascalCase`를 사용합니다.

| 대상 | 규칙 | 예시 |
| :--- | :--- | :--- |
| API 응답 데이터 | `{Entity}Response` | `BookResponse` |
| 생성/수정 요청 Body | `{Action}{Entity}Request` | `CreateBookRequest` |
| 조회 쿼리 파라미터 | `Get{Entity}Params` | `GetBooksParams` |

## 3. Data Interface Rules

- **Case Strategy**:
    - **Backend (API Specs)**: **`camelCase`**를 사용합니다 (요청 파라미터, 응답 필드 공통).
    - **Frontend (Standard)**: **`camelCase`**를 사용합니다.
- **Date Format**: 날짜는 ISO 8601 String 포맷을 사용함을 원칙으로 합니다.

## 4. Error Handling Standard

- API 호출 실패 시, 백엔드 에러 메시지를 `ApiError` 규격으로 정규화하여 `throw` 합니다.
- **Forbidden**: API 응답 객체(`ApiResponse`)를 그대로 컴포넌트나 훅에 반환하지 마십시오. 오직 순수 데이터(`res.data.data`)만 반환합니다.