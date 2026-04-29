## 1. Styling Core Rules

AI는 스타일 코드를 작성할 때 다음 원칙을 엄격히 따른다.

- **TailwindCSS Only:** 모든 스타일은 TailwindCSS 클래스로만 작성한다.
- **No Inline Styles:** HTML `style` 속성을 통한 인라인 스타일 작성을 절대 금지한다.
- **No Duplication:** 반복되는 스타일 패턴은 `shared/ui` 컴포넌트로 추출하거나 Tailwind 설정을 활용하여 중복을 최소화한다.

## 2. Design Tokens (Consistency)

모든 색상, 간격, 타이포그래피는 사전에 정의된 토큰을 사용해야 한다.

- **Color:** 임의의 Hex 코드를 사용하지 않고 `text-primary`, `bg-secondary` 등 시맨틱 컬러 토큰을 사용한다.
- **Spacing:** `m-4`, `p-2` 등 Tailwind 기본 스페이싱 스케일을 준수하며, 임의의 픽셀 값(`m-[13px]`) 사용을 지양한다.
- **Typography:** 폰트 크기, 굵기, 행간은 디자인 시스템에 정의된 클래스 조합만 사용한다.

### ✅ Good Examples

- flex items-center justify-between gap-4
- grid grid-cols-1 md:grid-cols-3 gap-6

### ❌ Forbidden Patterns

- 매직 넘버 사용 금지 (예: `top-[74px]`, `w-[321px]`)
- 원시 컬러값 직접 사용 금지 (예: `text-[#FF0000]`)

## 3. Layout & Alignment

- **Flex & Grid Priority:** 모든 레이아웃은 `flex` 또는 `grid`를 우선적으로 사용하여 구조를 잡는다.
- **Alignment:** 요소 간의 정렬은 `items-center`, `justify-between` 등을 활용하여 일관성을 유지한다.
- **Z-index:** 레이어 관리는 전역적으로 정의된 스택 순서(z-index scale)를 따른다.

## 4. Responsive Design

- **Mobile-First:** 기본 스타일은 모바일 기준으로 작성하고, `md:`, `lg:` 접두사를 사용하여 데스크톱 반응형을 추가한다.
- **Breakpoint:** 프로젝트에서 설정된 공통 브레이크포인트(sm, md, lg, xl)를 준수한다.

## 5. Animation (UX)

- **Library:** 복잡한 애니메이션이 필요한 경우 `framer-motion` 사용을 권장한다.
- **Purpose:** 애니메이션은 사용자 경험(UX) 향상을 위한 목적(피드백, 가이드)으로만 제한적으로 사용한다.
- **❌ Forbidden:** 성능 저하를 유발하거나 가독성을 해치는 과도한 애니메이션은 금지한다.