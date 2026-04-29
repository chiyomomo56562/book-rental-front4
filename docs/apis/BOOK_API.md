# API: Book Management

## 1. Create Book
- **Description**: 새로운 도서를 등록합니다.
- **Method**: `POST`
- **Endpoint**: `/books`
- **Authentication**: `None`
- **UseCase 매핑**: `createBook()`

### 2. Request
#### Type Name: `CreateBookRequest`
- **Location**: `Body`

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| title | string | Y | 도서 제목 |

### Example
```json
{
  "title": "Clean Code"
}
```

### 3. Response
#### Type Name: `BookResponse`
| Field | Type | Description |
| :--- | :--- | :--- |
| id | string | 도서 고유 ID (UUID) |
| title | string | 도서 제목 |
| status | string | 도서 상태 (`AVAILABLE`, `RENTED`) |

### Example (Success)
```json
{
  "status": 201,
  "data": {
    "id": "book-123",
    "title": "Clean Code",
    "status": "AVAILABLE"
  },
  "error": null
}
```

---

## 2. List All Books
- **Description**: 전체 도서 목록을 조회합니다.
- **Method**: `GET`
- **Endpoint**: `/books`
- **Authentication**: `None`

### 2. Request
#### Type Name: `GetBooksParams`
- **Location**: `Query Params` (Optional)

### 3. Response
#### Type Name: `BookResponse[]`
| Field | Type | Description |
| :--- | :--- | :--- |
| id | string | 도서 고유 ID |
| title | string | 도서 제목 |
| status | string | 도서 상태 |

### Example (Success)
```json
{
  "status": 200,
  "data": [
    {
      "id": "book-123",
      "title": "Clean Code",
      "status": "AVAILABLE"
    }
  ],
  "error": null
}
```

---

## 3. Rename Book Title
- **Description**: 도서 제목을 수정합니다.
- **Method**: `PATCH`
- **Endpoint**: `/books/{id}/title`
- **Authentication**: `None`
- **UseCase 매핑**: `renameTitle()`

### 2. Request
#### Type Name: `RenameBookTitleRequest`
- **Location**: `Path Params`, `Body`

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| id | string | Y | (Path) 도서 ID |
| title | string | Y | (Body) 변경할 도서 제목 |

### Example
```json
{
  "title": "Clean Architecture"
}
```

### 3. Response
| Field | Type | Description |
| :--- | :--- | :--- |
| data | boolean | 성공 여부 (`true`) |

---

## 4. Remove Book
- **Description**: 도서를 삭제합니다.
- **Method**: `DELETE`
- **Endpoint**: `/books/{id}`
- **Authentication**: `None`
- **UseCase 매핑**: `removeBook()`

### 2. Request
- **Location**: `Path Params`

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| id | string | Y | 도서 ID |

### 3. Response
| Field | Type | Description |
| :--- | :--- | :--- |
| data | boolean | 성공 여부 (`true`) |

---

## 5. Change Book Status
- **Description**: 도서 상태를 강제로 변경합니다.
- **Method**: `PATCH`
- **Endpoint**: `/books/{id}/status`
- **Authentication**: `None`
- **UseCase 매핑**: `changeStatus()`

### 2. Request
#### Type Name: `ChangeBookStatusRequest`
- **Location**: `Path Params`, `Body`

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| id | string | Y | (Path) 도서 ID |
| status | string | Y | (Body) 변경할 상태 (`AVAILABLE`, `RENTED`, `LOST` 등) |

### 3. Response
| Field | Type | Description |
| :--- | :--- | :--- |
| data | boolean | 성공 여부 (`true`) |
