# Page Name: 도서 상세 페이지

AI가 이 문서를 읽고 `src/pages/` 하위에 페이지 컴포넌트를 생성하거나 수정하기 위한 가이드라인입니다.

## 1. Page Metadata

- **Route Path**: `/books/:id`
- **Component Name**: `BookDetailPage`
- **Access**: Public
- **Layout**: DefaultLayout

## 2. Overview & SEO

- **Title**: 도서 상세 정보 - 도서 대여 시스템
- **Description**: 특정 도서의 상세 정보, 대여 상태, 그리고 대여 이력을 조회하는 페이지입니다.
- **Role**: 도서의 상세 내용을 확인하고 대여/반납 액션을 수행하며, 제목 수정 및 삭제 등의 관리 기능을 제공합니다.

## 3. Feature Composition

이 페이지는 다음 `features/` 모듈들을 조합하여 구성됩니다.

| Feature Name | Role in Page | Position/Layout |
| :--- | :--- | :--- |
| `BookDetail` | 도서 기본 정보 표시 및 액션(대여/반납) | Upper Section |
| `BookManagement` | 도서 수정(제목) 및 삭제 기능 | Sidebar or Detail Bottom |
| `RentalHistory` | 해당 도서의 과거 대여 기록 목록 | Lower Section |

## 4. Page Logic & State (Strict)

> [!IMPORTANT]
> `ARCHITECTURE.md` 정책에 따라 Page 계층에서는 다음 사항을 엄격히 준수합니다.

- **Direct API Call**: 금지 (각 Feature의 Hook 사용)
- **Business Logic**: 금지
- **Responsibility**: URL의 `id` 파라미터를 Feature 컴포넌트에 전달하고, 삭제 성공 등의 이벤트 발생 시 페이지 이동을 트리거합니다.

## 5. UI Layout Structure

```tsx
<PageContainer>
  <DefaultLayout>
    <main className="container mx-auto p-4 space-y-8">
      <section>
        <BookDetail bookId={id} />
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">관리 기능</h2>
          <BookManagement bookId={id} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">대여 이력</h2>
          <RentalHistory bookId={id} />
        </div>
      </section>
    </main>
  </DefaultLayout>
</PageContainer>
```

## 6. Interaction & Routing

- [x] 도서 삭제 성공 시 `/`로 이동
- [x] '목록으로' 버튼 클릭 시 `/`로 이동

---

## AI Implementation Guide

1. **Check Dependencies**: `BookDetail`, `BookManagement`, `RentalHistory` 모듈이 구현되어 있는지 확인하십시오.
2. **Component Creation**: `src/pages/BookDetail/BookDetailPage.tsx` 파일을 생성하십시오.
3. **Route Params**: `useParams`를 사용하여 `id`를 추출하고 Feature 컴포넌트에 Props로 전달하십시오.
4. **No Logic Rule**: 페이지 자체에서 직접 상태를 변경하거나 API를 호출하지 마십시오.
