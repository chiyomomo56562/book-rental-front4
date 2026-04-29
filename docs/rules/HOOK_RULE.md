# Hook Rules (Implementation Patterns)

이 문서는 React Query를 사용한 서버 상태 관리의 **구체적인 코드 패턴**을 정의합니다. 계층 간 호출 금지 규정 등 상위 정책은 [ARCHITECTURE.md](../ARCHITECTURE.md)를 참조하십시오.

## 1. Query Patterns (Server Data Fetching)

### Query Key Management
- 모든 Query Key는 일관성을 위해 배열 형태를 사용하며, 기능명과 파라미터를 포함합니다.
- 예: `['books', params]`, `['books', 'detail', id]`

### Implementation Example
```ts
export const useBooksQuery = (params: GetBooksParams) => {
  return useQuery({
    queryKey: ['books', params],
    queryFn: async () => {
      const data = await getBooks(params);
      // 필수: ARCHITECTURE.md의 단방향 흐름에 따라 Mapper 사용
      return data.map(mapBook);
    },
  });
};
```

## 2. Mutation Patterns (Data Changes)

### Side Effect Handling
- Mutation 성공 시에는 반드시 관련 Query를 무효화(Invalidation)하여 데이터를 최신화합니다.

### Implementation Example
```ts
export const useCreateBookMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBook,
    onSuccess: () => {
      // 관련 쿼리 키 무효화
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
};
```

## 3. Naming Conventions (Airbnb Standard)

- **Hook & File Name**: `camelCase`를 사용하며 `use` 접두사를 붙입니다.
    - **Single Hook File**: 파일 내에 훅이 하나인 경우, 해당 훅의 이름을 파일명으로 사용합니다. (예: `useBooksQuery.ts`, `useCreateBookMutation.ts`)
    - **Grouped Hook File**: 여러 훅을 통합할 경우, 역할과 엔티티를 포함하여 명확한 이름을 사용합니다. (예: `useBookActions.ts`, `useRentalHistory.ts`)
    - **Hook Name**: Query는 `use{Action}Query`, Mutation은 `use{Action}Mutation` 형식을 유지합니다.

## 4. Hook Internal Structure

- Hook 내부에서 복잡한 데이터 가공을 하지 않습니다. 가공이 필요한 경우 `mapper.ts`나 `utils/`를 활용하십시오.
- 여러 API 호출이 필요한 경우 `useQueries` 또는 별도의 `Logic` 훅으로 추상화합니다.

## 5. Hook Consolidation Policy (Grouping)

- **원칙**: 불필요한 파일 파편화를 방지하고 응집도를 높이기 위해, 아래 조건 충족 시 하나의 파일로 통합합니다.
- **통합 기준**:
  1. **동일 엔티티(Entity)**: 동일한 도메인 객체를 다루는 경우.
  2. **동일 생명주기(Lifecycle)**: 동일한 컴포넌트나 페이지 내에서 함께 사용되는 경우.
- **파일 예시 (`useBookActions.ts`)**:
  ```ts
  // 역할과 엔티티가 명확한 파일명으로 관련 훅들을 통합
  export const useBooksQuery = () => { ... };
  export const useCreateBookMutation = () => { ... };
  export const useDeleteBookMutation = () => { ... };
  ```

## 6. Directory Structure

- **Location**: 모든 커스텀 훅은 각 기능(Feature) 또는 도메인 디렉토리 하위의 `hooks/` 폴더 내에 위치시켜 관리합니다.
