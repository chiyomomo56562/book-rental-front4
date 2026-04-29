# Mapper Rules (Implementation Guide)

이 문서는 API 응답 데이터를 UI 도메인 모델로 변환하는 **구체적인 구현 방법**을 정의합니다. 데이터 흐름에 대한 상위 정책은 [ARCHITECTURE.md](../ARCHITECTURE.md)를 참조하십시오.

## 1. Role (Mechanics)
백엔드와 프론트엔드가 모두 `camelCase`를 사용하더라도, Mapper는 아래의 핵심 역할을 수행합니다.

- **Type Conversion**: `ISO 8601 String` 날짜를 `Date` 객체로 변환하거나, 특정 코드값을 Enum/Union 타입으로 변환합니다.
- **Status & Code Mapping**: 백엔드의 상태 코드(예: `RENTED`, `AVAILABLE`)를 사용자가 읽기 편한 텍스트(예: `대여 중`, `대여 가능`)나 UI 전용 상태값으로 변환합니다.
- **Null Safety & Sanitization**: API의 `null` 또는 `undefined` 필드에 대해 기본값을 보장하여 UI 컴포넌트의 렌더링 안정성을 확보합니다.
- **Structural Decoupling**: 백엔드 API 구조 변화가 프론트엔드 전체로 파급되지 않도록 완충 지대 역할을 합니다.
- **Data Optimization**: 여러 필드를 합치거나 UI에 필요한 형태로 미리 가공(Derived Data)합니다.

## 2. Naming Rules (Airbnb Standard)

- **Function & File Name**: `camelCase`를 사용합니다.
    - 예: `mapBook.ts`, `userMapper.ts`
- **Params**: 항상 `data` 또는 `response`라는 명칭을 사용합니다.

## 3. Implementation Example

```ts
// 1. API Response Spec (camelCase)
export type BookResponse = {
  id: number;
  title: string;
  createdAt: string;
  authorName: string | null;
  status: 'AVAILABLE' | 'RENTED'; // API 상태 코드
};

// 2. UI Domain Spec (camelCase)
export type Book = {
  id: number;
  title: string;
  createdAt: Date;
  author: string;
  statusLabel: string; // 사용자가 읽기 편한 레이블
};

// 3. Mapper Function
export const mapBook = (data: BookResponse): Book => ({
  id: data.id,
  title: data.title,
  createdAt: new Date(data.createdAt),
  author: data.authorName ?? 'Unknown',
  statusLabel: data.status === 'AVAILABLE' ? '대여 가능' : '대여 중', // 상태 코드 매핑
});
```

## 4. Coding Standards

- **Pure Function**: Mapper는 외부 상태에 의존하지 않는 순수 함수여야 합니다.
- **Minimal Logic**: 복잡한 비즈니스 로직은 Mapper가 아닌 Hook이나 Service 레이어에서 처리합니다. Mapper는 오직 **데이터의 형태(Shape)**를 맞추는 데 집중합니다.
- **Completeness**: 하나의 엔티티에 대한 변환 로직은 하나의 Mapper 파일에서 관리합니다.
