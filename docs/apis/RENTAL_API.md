# API: Rental Management

## 1. Rental Book
- **Description**: 해당 도서를 대여합니다 (Rental 생성).
- **Method**: `POST`
- **Endpoint**: `/books/{id}/rentals`
- **Authentication**: `None`
- **UseCase 매핑**: `rentalBook()`

### 2. Request
#### Type Name: `RentalBookRequest`
- **Location**: `Path Params`

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| id | string | Y | 도서 ID |

### 3. Response
| Field | Type | Description |
| :--- | :--- | :--- |
| data | boolean | 성공 여부 (`true`) |

---

## 2. Return Book
- **Description**: 해당 도서를 반납합니다 (Rental 수정).
- **Method**: `PATCH`
- **Endpoint**: `/books/{id}/rentals/return`
- **Authentication**: `None`
- **UseCase 매핑**: `returnBook()`

### 2. Request
#### Type Name: `ReturnBookRequest`
- **Location**: `Path Params`

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| id | string | Y | 도서 ID |

### 3. Response
| Field | Type | Description |
| :--- | :--- | :--- |
| data | boolean | 성공 여부 (`true`) |

---

## 3. Get Book Rental History
- **Description**: 특정 도서의 대여 이력을 조회합니다.
- **Method**: `GET`
- **Endpoint**: `/books/{id}/rentals`
- **Authentication**: `None`

### 2. Request
- **Location**: `Path Params`

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| id | string | Y | 도서 ID |

### 3. Response
#### Type Name: `RentalResponse[]`
| Field | Type | Description |
| :--- | :--- | :--- |
| id | string | 대여 이력 ID |
| bookId | string | 도서 ID |
| rentedAt | string (ISO) | 대여 일시 |
| returnedAt | string (ISO) \| null | 반납 일시 |

### Example (Success)
```json
{
  "status": 200,
  "data": [
    {
      "id": "rental-1",
      "bookId": "book-123",
      "rentedAt": "2024-04-27T10:00:00Z",
      "returnedAt": "2024-04-27T15:00:00Z"
    },
    {
      "id": "rental-2",
      "bookId": "book-123",
      "rentedAt": "2024-04-28T09:00:00Z",
      "returnedAt": null
    }
  ],
  "error": null
}
```
