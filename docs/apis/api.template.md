# API: {API_NAME}

## 1. Overview
- **Description**: {API의 목적 및 상세 설명}
- **Method**: `GET` | `POST` | `PUT` | `DELETE`
- **Endpoint**: `/api/{path}`
- **Authentication**: `Required` | `Optional` | `None`

## 2. Request
### Type Name: `{Action}{Entity}Request` | `Get{Entity}Params`
- **Location**: `Body` | `Query Params` | `Path Params`

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| {field_name} | {type} | Y/N | {description} |

### Example
```json
{
  "field": "value"
}
```

## 3. Response
### Type Name: `{Entity}Response`
> [!IMPORTANT]
> 아래는 `ApiResponse<T>`의 `data` 필드(`T`)에 정의될 구조입니다. 모든 명명 규칙은 `camelCase`를 따릅니다.

| Field | Type | Description |
| :--- | :--- | :--- |
| {field_name} | {type} | {description} |

### Example (Success)
```json
{
  "status": 200,
  "data": {
    "field": "value"
  },
  "error": null
}
```

### Example (Error)
```json
{
  "status": 400,
  "data": null,
  "error": {
    "message": "에러 메시지",
    "code": "ERROR_CODE",
    "status": 400
  }
}
```

## 4. Error Cases
| Code | Status | Message | Description |
| :--- | :--- | :--- | :--- |
| {ERR_CODE} | {HTTP_STATUS} | {Message} | {상황 설명} |


## 5. Notes
- {특이 사항 또는 구현 시 주의사항}
