# Ship Small Collection

A collection of small frontend projects built to sharpen my web development skills — one experiment at a time.

## Projects

| # | Project | Description |
|---|---------|-------------|
| 01 | **Cards** | Basic card component layouts and styling |
| 02 | **Cards Level Wise** | Cards organized by difficulty/category levels |
| 03 | **Live Search** | Real-time search filtering as you type |
| 04 | **Virtualization** | Efficiently rendering large lists with virtualized scrolling |
| 05 | **Infinite Scroll** | Load-more-on-scroll pagination pattern |
| 06 | **Multi Select Input** | Searchable multi-select with full keyboard navigation |

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the notebook-style project index.

## Adding a New Project

Add an entry to the `PROJECTS` array in `app/page.tsx`:

```ts
{ name: "Your Project", route: "/your-route" }
```

Then create the corresponding route under `app/your-route/page.tsx`. That's it.