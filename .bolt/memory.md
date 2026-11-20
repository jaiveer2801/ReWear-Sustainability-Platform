# Project memory

## Product intent & audience

- ReWear: sustainability app helping users discover upcycling/reuse ideas for unwanted materials.
- Users select materials (clothes, plastic, cardboard, glass, wood, electronics, metal, other) and get practical transformation suggestions.
- India-focused audience: budgets shown in INR.

## Brand personality & voice

- Premium sustainability startup tone: creative, practical, encouraging, eco-conscious.
- Emphasizes "second life" framing for discarded materials.

## Visual design & UX direction

- Palette: forest green, sage green, lime accents, warm off-white backgrounds.
- UI patterns: selectable material cards with hover + selected states, idea result cards with consistent styling, detail modals.
- Smooth animations, modern typography, responsive layouts.
- Empty state when no materials selected; success/error feedback for interactions.
- Icons from lucide-react.

## Decisions, constraints & rationale

- Stack: Vite + React + TypeScript + Tailwind CSS; `@/` path alias for imports.
- Local recommendation engine using structured data — no external AI/paid APIs.
- Saved ideas persist via LocalStorage (user explicitly requested, though Supabase may be available in template).
- Clean component architecture with reusable components; recommendation data is structured, not hardcoded per-idea in UI.
- Electronics ideas prioritize safe reuse; no instructions for opening/modifying hazardous components.
- Existing app features, design system, and navigation must not be broken when extending.

## Open questions & assumptions

- "Start this project" button in idea detail modal is non-functional — needs behavior defined.
- Saved-ideas storage: LocalStorage chosen per user request; Supabase migration undecided.
- Interaction testing done via typecheck/build only, not browser-verified.