# Page Name: 도서 목록 페이지

AI가 이 문서를 읽고 `src/pages/` 하위에 페이지 컴포넌트를 생성하거나 수정하기 위한 가이드라인입니다.

## 1. Page Metadata

- **Route Path**: `/`
- **Component Name**: `BookListPage`
- **Access**: Public
- **Layout**: DefaultLayout

## 2. Overview & SEO

- **Title**: 도서 목록 - 도서 대여 시스템
- **Description**: 전체 도서 목록을 확인하고 대여 가능 여부를 조회할 수 있는 페이지입니다.
- **Role**: 사용자가 대여 가능한 도서를 검색하고 목록을 확인하는 메인 진입점입니다.

## 3. Feature Composition

이 페이지는 다음 `features/` 모듈들을 조합하여 구성됩니다.

| Feature Name | Role in Page | Position/Layout |
| :--- | :--- | :--- |
| `BookList` | 도서 목록 렌더링 및 상태 표시 | Main Content |

## 4. Page Logic & State (Strict)

> [!IMPORTANT]
> `ARCHITECTURE.md` 정책에 따라 Page 계층에서는 다음 사항을 엄격히 준수합니다.

- **Direct API Call**: 금지 (`BookList` 내부의 Hook 사용)
- **Business Logic**: 금지
- **State Management**: 금지
- **Responsibility**: 오직 Feature 컴포넌트의 배치와 상세 페이지 이동 처리만 담당합니다.

## 5. UI Layout Structure

```tsx
<PageContainer>
  <DefaultLayout>
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">도서 목록</h1>
      <BookList />
    </main>
  </DefaultLayout>
</PageContainer>
```

## 6. Interaction & Routing

- [x] 특정 도서 항목 클릭 시 `/books/:id`로 이동
- [x] '도서 등록' 버튼 클릭 시 `/books/register`로 이동

---

## AI Implementation Guide

1. **Check Dependencies**: `src/features/BookList` 모듈이 구현되어 있는지 확인하십시오.
2. **Component Creation**: `src/pages/BookList/BookListPage.tsx` 파일을 생성하십시오.
3. **Routing Registration**: `src/app/providers/RouterProvider.tsx`에 `/` 경로로 등록하십시오.
4. **Layout Wrap**: `DefaultLayout` 컴포넌트로 페이지를 감싸십시오.
