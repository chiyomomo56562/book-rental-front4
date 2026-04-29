# Page Name: [페이지 한글 명칭]

AI가 이 문서를 읽고 `src/pages/` 하위에 페이지 컴포넌트를 생성하거나 수정하기 위한 가이드라인입니다.

## 1. Page Metadata

- **Route Path**: `/example-path`
- **Component Name**: `ExamplePage` (PascalCase)
- **Access**: [Public | Private (Auth Required)]
- **Layout**: [DefaultLayout | AdminLayout | None]

## 2. Overview & SEO

- **Title**: [브라우저 탭에 표시될 제목]
- **Description**: [검색 엔진 및 메타 데이터용 설명]
- **Role**: 이 페이지의 주요 목적과 사용자 시나리오를 간략히 기술합니다.

## 3. Feature Composition

이 페이지는 다음 `features/` 모듈들을 조합하여 구성됩니다.

| Feature Name | Role in Page | Position/Layout |
| :--- | :--- | :--- |
| `BookList` | 도서 목록 조회 및 검색 | Main Content Upper |
| `CategoryNav` | 카테고리 필터링 | Left Sidebar |
| `PromotionBanner` | 광고 배너 노출 | Top Header Area |

## 4. Page Logic & State (Strict)

> [!IMPORTANT]
> `ARCHITECTURE.md` 정책에 따라 Page 계층에서는 다음 사항을 엄격히 준수합니다.

- **Direct API Call**: 금지 (Feature 내부의 Hook/Action 사용)
- **Business Logic**: 금지 (Feature 내부로 위임)
- **State Management**: 금지 (Feature 또는 Shared Store 사용)
- **Responsibility**: 오직 Feature 컴포넌트의 배치(Layout)와 이들 간의 단순한 상호작용(Routing 이동 등)만 담당합니다.

## 5. UI Layout Structure

```tsx
<PageContainer>
  <Layout>
    <aside>
      <CategoryNav />
    </aside>
    <main>
      <PromotionBanner />
      <BookList />
    </main>
  </Layout>
</PageContainer>
```

## 6. Interaction & Routing

- [ ] 특정 항목 클릭 시 `/detail/:id`로 이동
- [ ] 쿼리 파라미터 `?tab=...` 에 따른 초기 필터링 상태 전달 (Feature Props로 전달)

---

## AI Implementation Guide

1. **Check Dependencies**: `src/features/`에 필요한 모듈들이 구현되어 있는지 확인하십시오.
2. **Component Creation**: `src/pages/[PageName]/[PageName]Page.tsx` 파일을 생성하십시오.
3. **Routing Registration**: `src/app/providers/RouterProvider.tsx`(또는 해당되는 라우터 설정 파일)에 경로를 등록하십시오.
4. **Layout Wrap**: 정의된 전역 Layout 컴포넌트로 페이지를 감싸십시오.
5. **No Logic Rule**: 페이지 내부에 `useEffect`나 `useState`를 사용해 직접 비즈니스 로직을 구현하지 마십시오. 필요한 경우 Feature 컴포넌트에 Props로 데이터를 전달하거나 훅을 사용하십시오.