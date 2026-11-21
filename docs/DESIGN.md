# StudyConnect Design Theme (Week 03)

This documents the visual language already used in the codebase so every teammate builds consistent pages.

## Color palette

| Role | Value | Where |
| --- | --- | --- |
| Page background | `#f4f4e9` (`--background`) | `globals.css` |
| Body text | `#14211a` (`--foreground`) | `globals.css` |
| Primary / header | Tailwind `emerald-800` | Header, primary buttons |
| Primary hover | Tailwind `emerald-900` | Button hover |
| Surfaces | `white` with `border-gray-200` | Cards |
| Muted text | `gray-600` | Descriptions |
| Footer | `gray-50` with `border-gray-200` | Footer |

## Typography

- Geist Sans (body, headings) and Geist Mono (code) via `next/font/google`.
- Page title: `text-3xl font-bold text-gray-900`. Section title: `text-xl font-semibold`. Body: `text-gray-600`.

## Layout and spacing

- Content wrapper: `mx-auto w-full max-w-6xl px-6 py-12`.
- Cards: `rounded-xl border border-gray-200 bg-white p-8 shadow-sm`.
- Buttons: `rounded-lg bg-emerald-800 px-5 py-3 font-medium text-white hover:bg-emerald-900`.
- Mobile first; verify at 320 px and 1280 px with no horizontal scrolling.
- Accessibility: semantic landmarks, `aria-label` on nav, visible focus states, sufficient contrast.

## UI library

Tailwind CSS utility classes only. No shared UI kit yet; reusable pieces go in `studyconnect/components/`.
