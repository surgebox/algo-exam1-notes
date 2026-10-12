# Algorithm Analysis — Exam 1

An interactive review book for the Algorithm Analysis Exam 1 practice question
sheet, built with VitePress and sharing the LCARS theme of `lcars-book`.

## What it is

The practice sheet asks six things:

1. Count the operations in a nested loop; give `C(n)`, the dominant term and the
   growth rate.
2. Show `2n + 8 = O(n)` using `c = 4`.
3. Show `4n − 12 = Ω(n)` using `c = 2`.
4. Complete a bubble sort trace on `[7, 3, 5, 1, 4]`.
5. Complete a selection sort trace on `[8, 4, 6, 2, 7, 1]`.
6. Trace `countdown(4)` and `sum_to_n(4)`.

The book teaches exactly that, and nothing else. See `CONVENTIONS.md` for the
rules every chapter follows — read it before adding a chapter.

## Running it

```bash
npm install       # first time only
npm run dev       # dev server (serves at /algo-exam1-notes/ by default)
npm run build     # static build into docs/.vitepress/dist
npm run preview   # serve the built site
```

The default `base` is `/algo-exam1-notes/`, because that is the subpath GitHub
Pages serves a project site from. For a root-served local dev server instead:

```bash
DOCS_BASE=/ npm run dev
```

Locally, `node_modules` may be a symlink to `../lcars-book/node_modules` so both
books share one VitePress install. CI installs its own from `package-lock.json`.

## Published at

**https://surgebox.github.io/algo-exam1-notes/**

A push to `main` runs `.github/workflows/pages.yml`, which builds the book and
deploys it to GitHub Pages. The workflow sets `DOCS_BASE` to the repository
name, so renaming the repo keeps the asset URLs correct.

## Layout

```
docs/
  index.md                     home page
  introduction/                what the book is, how to use it
  part-1-counting/             1.1 counting operations, 1.2 growth rates
  part-2-asymptotics/          2.1 what the claims mean, 2.2 O proof, 2.3 Ω proof
  part-3-sorting/              3.1-3.4 the two sorts and their traces, 3.5 counting
  part-4-recursion/            4.1 calls and returns, 4.2 countdown, 4.3 sum_to_n
  part-5-exam/                 5.1 every question worked, 5.2 rehearsal, 5.3 cheat sheet
  .vitepress/theme/components/ the LCARS callouts + this book's interactive blocks
  .vitepress/theme/progress.ts in-memory progress store + answer normalisation
```

## The components

Inherited from `lcars-book` and kept verbatim: `ChapterMeta`, `MentalModel`,
`BuildIt`, `YouShouldSee`, `IfItsWrong`, `CommonMistake`, `UnderTheHood`,
`ExerciseBlock`, `Recap`.

Written for this book:

| component | what it does |
|---|---|
| `ArrayTrack` | the array, drawn, with a fixed colour language for compare / min / cursor / sorted / changed |
| `SortPlayer` | runs bubble or selection sort one step at a time, with the live pseudocode line, counters, a scrubber, and a finished table in the exam's columns |
| `CodeStepper` | generic code walkthrough: live line, full state, output so far, call stack |
| `RecursionStack` | the recursion staircase for `countdown` and `sum_to_n` |
| `OpGrid` | one square per run of the basic operation, laid out as the loops lay it out |
| `BigOChart` | plots `f(n)` and `c·g(n)`, marks the crossing, and lets you slide `n` |
| `FillIn` | a blank with checking and a "show me" escape hatch |
| `Quiz` | multiple choice with a note on *every* option |
| `TraceTable` | the exam's own trace-table format as a checked drill |
| `ExamQuestion` | frames a question quoted from the sheet, with the model answer folded away |
| `ScoreBoard` | counts the correct checks in a `group` |

`progress.ts` holds the shared state and the answer normalisation — it accepts
`n ≥ 4` and `n >= 4` and `n>=4` as the same answer, and `n²` as `n^2`.

## Provenance

The content is derived from `Downloads/Exam 1 Practice Questions.docx`. Every
trace in the book was verified against a reference implementation rather than
worked by hand, and `CONVENTIONS.md` §6 records the verified numbers so a future
editor can check against them.
