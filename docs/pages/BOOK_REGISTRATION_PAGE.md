# Page Name: 도서 등록 페이지

AI가 이 문서를 읽고 `src/pages/` 하위에 페이지 컴포넌트를 생성하거나 수정하기 위한 가이드라인입니다.

## 1. Page Metadata

- **Route Path**: `/books/register`
- **Component Name**: `BookRegistrationPage`
- **Access**: Public
- **Layout**: DefaultLayout

## 2. Overview & SEO

- **Title**: 도서 등록 - 도서 대여 시스템
- **Description**: 새로운 도서를 시스템에 등록하는 페이지입니다.
- **Role**: 관리자 또는 사용자가 새로운 도서 정보를 입력하여 등록합니다.

## 3. Feature Composition

이 페이지는 다음 `features/` 모듈들을 조합하여 구성됩니다.

| Feature Name | Role in Page | Position/Layout |
| :--- | :--- | :--- |
| `BookRegistrationForm` | 도서 정보 입력 및 등록 요청 | Center Form Area |

## 4. Page Logic & State (Strict)

> [!IMPORTANT]
> `ARCHITECTURE.md` 정책에 따라 Page 계층에서는 다음 사항을 엄격히 준수합니다.

- **Direct API Call**: 금지 (`BookRegistrationForm` 내부의 Mutation 사용)
- **Business Logic**: 금지
- **State Management**: 금지

## 5. UI Layout Structure

```tsx
<PageContainer>
  <DefaultLayout>
    <main className="container mx-auto p-4 flex justify-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">새로운 도서 등록</h1>
        <BookRegistrationForm />
      </div>
    </main>
  </DefaultLayout>
</PageContainer>
```

## 6. Interaction & Routing

- [x] 등록 성공 시 `/` (목록 페이지)로 이동
- [x] '취소' 버튼 클릭 시 이전 페이지 또는 `/`로 이동

---

## AI Implementation Guide

1. **Check Dependencies**: `src/features/BookRegistrationForm` 모듈이 구현되어 있는지 확인하십시오.
2. **Component Creation**: `src/pages/BookRegistration/BookRegistrationPage.tsx` 파일을 생성하십시오.
3. **Routing Registration**: `src/app/providers/RouterProvider.tsx`에 `/books/register` 경로로 등록하십시오.
