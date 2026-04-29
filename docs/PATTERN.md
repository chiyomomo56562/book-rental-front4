# Integrated Implementation Pattern (Example: Book)

이 문서는 [ARCHITECTURE.md](./ARCHITECTURE.md)의 정책과 `docs/rules/`의 세부 지침이 실제로 어떻게 결합되는지 보여주는 **통합 구현 예시**입니다.

## 1. Flow Overview
데이터는 항상 다음 방향으로 흐르며, 각 단계에서 역할이 전이됩니다.
`api (Raw Data)` → `mapper (UI Model)` → `hooks (Server State)` → `Container (Logic)` → `View (UI)`

---

## 2. Integrated Code Example

### 2.1 API & Mapper Layer
백엔드 데이터를 UI 최적화 모델로 변환합니다. ([MAPPER_RULE.md](./rules/MAPPER_RULE.md) 참조)

```ts
// api.ts
export const getBooks = () => axiosInstance.get<BookResponse[]>('/books');

// mapper.ts
export const mapBook = (data: BookResponse): Book => ({
  id: data.id,
  title: data.title,
  statusLabel: data.status === 'AVAILABLE' ? '대여 가능' : '대여 중',
  createdAt: new Date(data.createdAt),
});
```

### 2.2 Hooks Layer (Server State)
React Query를 통해 상태를 관리하고 Mapper를 적용합니다. ([HOOK_RULE.md](./rules/HOOK_RULE.md) 참조)

```ts
// hooks/useBooksQuery.ts
export const useBooksQuery = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const { data } = await getBooks();
      return data.map(mapBook); // 필수: Mapper 적용
    },
  });
};

// hooks/useCreateBookMutation.ts
export const useCreateBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBook,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
};
```

### 2.3 Component Layer (Composition)
Container는 로직을 담당하고, View는 순수하게 UI만 렌더링합니다. ([FEATURE_RULE.md](./rules/FEATURE_RULE.md) 참조)

#### [Container] BookContainer.tsx
```tsx
export const BookContainer = () => {
  // 1. Hooks 호출
  const { data: books, isLoading } = useBooksQuery();
  const { mutate: createBook } = useCreateBookMutation();

  // 2. Handler 정의 (Business Logic)
  const handleAddBook = (title: string) => {
    createBook({ title });
  };

  // 3. View에 데이터 및 핸들러 전달
  return (
    <BookView 
      books={books ?? []} 
      isLoading={isLoading} 
      onAddBook={handleAddBook} 
    />
  );
};
```

#### [View] BookView.tsx
```tsx
type Props = {
  books: Book[];
  isLoading: boolean;
  onAddBook: (title: string) => void;
};

export const BookView = ({ books, isLoading, onAddBook }: Props) => {
  if (isLoading) return <Spinner />;

  return (
    <div>
      <button onClick={() => onAddBook('New Book')}>도서 추가</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} ({book.statusLabel})
          </li>
        ))}
      </ul>
    </div>
  );
};
```

---

## 3. Key Implementation Checkpoints

1.  **Direct Access Forbidden**: View에서 API를 직접 호출하거나, Container에서 JSX 마크업 로직을 복잡하게 작성하지 않습니다.
2.  **Naming Convention**: 핸들러는 `handle{Action}` (Container), Props는 `on{Action}` (View) 규칙을 따릅니다.
3.  **Mapper Location**: 데이터 변환은 반드시 `hooks` 레이어(또는 `api` 직후)에서 완료되어 컴포넌트로 전달되어야 합니다.
