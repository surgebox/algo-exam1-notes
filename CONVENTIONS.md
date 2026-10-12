# Conventions

Everything a chapter must follow. Read this before writing, and if something
here is wrong, fix this file first rather than working around it.

The voice and the callout blocks are inherited from the LCARS shell book this
one is modelled on. They work. Do not invent new blocks without adding them
here.

---

## 1. What this book is for

The reader has one artefact: **the Exam 1 practice question sheet**. It asks
exactly six things:

1. Count the operations in `for i<n { for j<5 { count++ } }`, give C(n), the
   dominant term, and the growth rate. (Answer: `5n`, `5n`, `O(n)`.)
2. Show `2n + 8 = O(n)` using `c = 4`. (Answer: `g(n) = n`; `2n+8 ≤ 4n`;
   `n ≥ 4`; `n₀ = 4`.)
3. Show `4n − 12 = Ω(n)` using `c = 2`. (Answer: `g(n) = n`; `4n−12 ≥ 2n`;
   `n ≥ 6`; `n₀ = 6`.)
4. Full bubble sort trace on `[7, 3, 5, 1, 4]` → `[1, 3, 4, 5, 7]`.
5. Full selection sort trace on `[8, 4, 6, 2, 7, 1]` → `[1, 2, 4, 6, 7, 8]`.
6. Recursion traces: `countdown(4)` prints `4 3 2 1`; `sum_to_n(4) = 10`.

Everything the book contains exists to make one of those six answerable. If a
chapter cannot say which of the six it serves, cut the chapter.

**The book never invents extra exam content.** No merge sort, no quicksort, no
master theorem, no linked lists. If a concept is genuinely needed to understand
one of the six (e.g. "what an asymptotic bound even means"), it gets a short
section inside the relevant chapter, not a new part.

## 2. Voice

Read `docs/introduction/what-this-book-is.md` first. In short:

- Second person, direct, plain English. No marketing tone, no emoji.
- **Explain why before how.** A section that only shows steps has failed.
- Short paragraphs. Admit tradeoffs instead of overselling.
- Prefer a concrete consequence over an abstract rule. "This is why pass 2 is
  one comparison shorter" beats "the inner bound shrinks with i".
- Say what you are *not* teaching yet, when its absence would confuse.
- Never say "simply", "just", or "obviously". The reader is here because it is
  not obvious yet.

## 3. Chapter shape

```markdown
---
title: "3.1  Bubble sort, from the pseudocode"
description: "One sentence."
---

# 3.1  Bubble sort, from the pseudocode

<ChapterMeta
  reading-time="12 min"
  :difficulty="2"
  :prerequisites="['1.2  Growth rates, and what to throw away']"
  you-will-answer="The bubble sort trace question on the sheet."
/>

... body ...

<Recap>

- ...

</Recap>

→ Next: **[3.2  The bubble sort trace](/part-3-sorting/bubble-trace)**
```

Attribute names are exact: `reading-time` and `you-will-answer` are hyphenated;
`:difficulty` and `:prerequisites` take a colon because they need real types.

Note `you-will-answer`, not `you-will-build`. This book has no build step.

Every chapter opens with a `<MentalModel>` and closes with a `<Recap>`.

## 4. The callout blocks

| Component | Use it when |
|---|---|
| `MentalModel` | the one idea the chapter turns on — before any detail |
| `YouShouldSee` | what the reader should have written down / what the animation shows |
| `IfItsWrong` | a specific wrong answer and what it reveals |
| `CommonMistake` | an answer that *looks* right and will lose marks |
| `UnderTheHood` | optional deeper mechanics, collapsed |
| `ExerciseBlock` | a variation to try with no new concepts |
| `Recap` | a few bullets |
| `ChapterMeta` | always, at the top |

`IfItsWrong` is for an answer that is plainly wrong. `CommonMistake` is for an
answer that runs fine, looks plausible, and is still wrong — usually an
off-by-one or a thrown-away constant that mattered.

`IfItsWrong` requires an `error` prop: this is the wrong thing the reader
wrote, e.g. `error="n0 = 8"`. Use `means` for what that answer reveals.

## 5. The interactive blocks

These are this book's whole reason for existing. Use them, and do not duplicate
what they already do in prose tables.

### `<OpGrid>`

One square per run of the basic operation. Use in 1.1.

```markdown
<OpGrid :initial-n="6" :inner-count="5" op="count++" />
```

Props: `initialN` (default 6), `innerCount` (default 5), `op`, `outerVar`,
`innerVar`, `maxN` (default 12).

### `<ArrayTrack>`

The array, drawn. Use it wherever you show an array from now on — never a bare
`[7, 3, 5]` when the indices matter.

```markdown
<ArrayTrack :values="[7, 3, 5, 1, 4]" :compare="[0, 1]" :sorted-from="4" />
<ArrayTrack :values="[8, 4, 6, 2, 7, 1]" :min="3" :cursor="0" :sorted-before="1" />
```

Props: `values` (required), `compare` (indices), `min` (index), `cursor`
(index), `sortedFrom` (indices ≥ this are final — bubble's tail),
`sortedBefore` (indices < this are final — selection's prefix), `changed`,
`showIndices` (default true), `caption`, `dense`.

The colours are fixed and mean the same thing everywhere: sky = comparing,
gold = running minimum, lilac = position `i`, plum = sorted, amber = just
changed.

### `<SortPlayer>`

Runs the whole algorithm one step at a time, with the live pseudocode line, the
comparison and swap counters, a scrubber and a play button. It also has a
"Finished table" tab showing the completed trace in the exam's exact columns.

```markdown
<SortPlayer algorithm="bubble" :initial="[7, 3, 5, 1, 4]" />
<SortPlayer algorithm="selection" :initial="[8, 4, 6, 2, 7, 1]" />
```

Props: `algorithm` (`'bubble'` | `'selection'`), `initial`.

Do not hand-write a trace table as the answer when this component already
produces it; instead point at its "Finished table" tab.

### `<CodeStepper>`

A generic code walkthrough: highlight the live line, show the whole state, the
output so far, and the call stack. Use for anything that is not a sort.

```markdown
<CodeStepper
  title="Counting the operations"
  :code="[
    'count = 0',
    'for i = 0 to n - 1',
    '    for j = 0 to 4',
    '        count = count + 1',
  ]"
  :steps="[
    { line: 0, note: 'count starts at 0.', vars: { n: 4, count: 0 }, output: [] },
  ]"
/>
```

Props: `title`, `code` (array of lines), `steps` (array), `outputLabel`,
`stackLabel`, `varsLabel`.

Each step: `{ line, note, vars?, output?, stack? }`.
Each stack frame: `{ name, note? }`.

`output` and `vars` are **the full state at that moment**, not a delta. That is
deliberate: it keeps each step independently correct and easy to check.

### `<RecursionStack>`

The recursion staircase. Generates its own steps — do not write them by hand.

```markdown
<RecursionStack mode="countdown" :n="4" />
<RecursionStack mode="sum" :n="4" />
```

Props: `mode` (`'countdown'` | `'sum'`), `n`.

### `<BigOChart>`

The crossing point, drawn. Use it in both proof chapters.

```markdown
<BigOChart :f-a="2" :f-b="8" :g-a="1" :c="4" :n-max="12" direction="upper" />
<BigOChart :f-a="4" :f-b="-12" :g-a="1" :c="2" :n-max="14" direction="lower" />
```

It plots `f(n) = fA·n + fB` and `c·g(n) = c·(gA·n + gB)`, marks the crossing,
and lets the reader slide `n` to watch the inequality flip.

Props: `fA`, `fB` (default 0), `gA` (default 1), `gB` (default 0), `c`
(required), `nMax` (default 12), `direction` (`'upper'` | `'lower'`), `fLabel`,
`gLabel`.

### `<FillIn>`

A blank with checking. Use for every blank the exam worksheet has.

```markdown
<FillIn
  label="g(n) ="
  answer="n"
  solution="We are proving 2n + 8 grows no faster than a multiple of n, so g(n) = n."
  group="bao"
/>
```

Props: `label`, `answer` (string or array of accepted strings), `numeric` (if
set, any answer whose only number equals this is accepted), `placeholder`,
`solution`, `hint`, `group`, `wide`.

Answer checking is deliberately forgiving: case, spaces and `≥`/`>=` are all
normalised. Do not rely on exact string matching being strict.

Use `numeric` for numeric blanks — `:numeric="4"` accepts `4`, `n0 = 4` and
`n ≥ 4`.

### `<Quiz>`

Multiple choice with a per-option explanation. Every option needs a `why`
entry, including the correct one.

```markdown
<Quiz
  question="..."
  :options="['...', '...']"
  :answer="1"
  :why="['why A is wrong', 'why B is right']"
  group="bubble"
/>
```

Props: `question`, `options`, `answer` (index or array of indices), `why`
(one per option, same order), `group`, `tag`.

### `<TraceTable>`

The exam's own format as a drill. This is the most important assessment block.

```markdown
<TraceTable
  title="Bubble sort on [7, 3, 5, 1, 4]"
  group="bubble-trace"
  caption="One row per comparison."
  :columns="['Pass', 'Comparison', 'Swap?', 'Array after']"
  :rows="[
    [1, 'A[0] vs A[1]: 7 vs 3', { answer: 'yes', ph: '?', }, { answer: '[3, 7, 5, 1, 4]', ph: '?', wide: true }],
  ]"
/>
```

A cell is either a plain string (**given** to the reader — context, not a
question) or an object `{ answer, numeric?, ph?, wide? }` (**a blank**).

`answer` may be an array of accepted strings. Be generous with accepted forms —
`'[3, 7, 5, 1, 4]'` and `'3, 7, 5, 1, 4'` should both be accepted.

### `<ExamQuestion>`

The frame for a question quoted from the actual sheet. Use only in Part 5.

```markdown
<ExamQuestion number="2" title="Big-O proof" prompt="Show that 2n + 8 = O(n), using c = 4." marks="6 blanks">
...the reader's working space, usually FillIn blocks...
<template #answer>

...the model answer...

</template>
</ExamQuestion>
```

Props: `number`, `title`, `prompt`, `marks`.

### `<ScoreBoard>`

Counts the checks on the page. Put one near the top of any assessment-heavy
page.

```markdown
<ScoreBoard group="bubble-trace" label="Bubble sort trace" />
```

The `group` must match the `group` on the FillIn / Quiz / TraceTable blocks it
is meant to count.

**Groups match exactly — there is no nesting.** A board in group `bubble-trace`
does **not** count items in `bubble-trace-p1`. If a drill is split across
several tables and one board should cover the lot, give every table the *same*
group. That is what 3.2, 3.4 and 4.3 do, and it is the reason those boards have
forty-odd items rather than three.

## 6. Numbers: never write a trace by hand if a component can produce it

The one unforgivable error in this book is a wrong trace. The verified answers
are:

**Bubble sort, `[7, 3, 5, 1, 4]`** — 4 passes, 10 comparisons, 7 swaps.

| pass | start | comparisons | after pass | sorted suffix |
|---|---|---|---|---|
| 1 | `[7,3,5,1,4]` | 7/3 swap, 7/5 swap, 7/1 swap, 7/4 swap | `[3,5,1,4,7]` | `[7]` |
| 2 | `[3,5,1,4,7]` | 3/5 no, 5/1 swap, 5/4 swap | `[3,1,4,5,7]` | `[5,7]` |
| 3 | `[3,1,4,5,7]` | 3/1 swap, 3/4 no | `[1,3,4,5,7]` | `[4,5,7]` |
| 4 | `[1,3,4,5,7]` | 1/3 no | `[1,3,4,5,7]` | `[3,4,5,7]` |

Final: `[1, 3, 4, 5, 7]`.

**Selection sort, `[8, 4, 6, 2, 7, 1]`** — 5 passes, 15 comparisons, 3 swaps.

| pass | start | min starts at | min found | swap | after pass |
|---|---|---|---|---|---|
| 1 | `[8,4,6,2,7,1]` | index 0 (8) | index 5 (1) | `A[0]↔A[5]` | `[1,4,6,2,7,8]` |
| 2 | `[1,4,6,2,7,8]` | index 1 (4) | index 3 (2) | `A[1]↔A[3]` | `[1,2,6,4,7,8]` |
| 3 | `[1,2,6,4,7,8]` | index 2 (6) | index 3 (4) | `A[2]↔A[3]` | `[1,2,4,6,7,8]` |
| 4 | `[1,2,4,6,7,8]` | index 3 (6) | index 3 (6) | none (min === i) | `[1,2,4,6,7,8]` |
| 5 | `[1,2,4,6,7,8]` | index 4 (7) | index 4 (7) | none (min === i) | `[1,2,4,6,7,8]` |

Final: `[1, 2, 4, 6, 7, 8]`.

**`countdown(4)`** prints `4, 3, 2, 1` — five calls, `countdown(0)` is the base
case and prints nothing.

**`sum_to_n(4) = 10.** Down: `sum_to_n(4)` → `3` → `2` → `1` → `0`. Up:
`0`, then `1`, `3`, `6`, `10`.

**Big-O proof.** `g(n) = n`, `2n + 8 ≤ 4n`, `8 ≤ 2n`, `n ≥ 4`, `n₀ = 4`.

**Big-Omega proof.** `g(n) = n`, `4n − 12 ≥ 2n`, `2n ≥ 12`, `n ≥ 6`, `n₀ = 6`.

If a chapter needs a trace of something else, compute it with a script first and
paste the verified output. Do not reason it out in prose.

## 7. Marking language

When you explain how an answer is marked, describe it the way a marker does:
state the claim, show the algebra, name the constants. The reader is being
assessed on showing work, so the book must model showing work.

For the two proofs, the expected shape of an answer is exactly the worksheet's
blanks:

1. `g(n) = ...`
2. the inequality, in general form
3. the inequality after substituting `c`
4. the algebra solving for `n`
5. a valid `n₀`
6. the conclusion, in the form `f(n) = O(g(n))`.

Every proof chapter must end by making the reader produce all six.

## 8. What the reader knows at each point

Assume nothing beyond the previous chapters.

- After Part 1 they know: what a basic operation is, how to count nested loops,
  what a dominant term is, and that growth rate means "how the count scales".
  They do **not** yet have a definition of O.
- After Part 2 they have the formal definition of O and Ω, and can produce both
  proofs.
- After Part 3 they can trace both sorts completely and say how many
  comparisons each does.
- After Part 4 they can trace any simple recursion in both directions.

Do not use a concept before its chapter teaches it.
