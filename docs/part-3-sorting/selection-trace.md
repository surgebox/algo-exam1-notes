---
title: "3.4  The selection sort trace"
description: "The drill for question 5: five checked rows in the worksheet's own columns — min starts at, min found, swap, array after pass — with the two passes that swap nothing."
---

# 3.4  The selection sort trace

<ChapterMeta
  reading-time="18 min"
  :difficulty="3"
  :prerequisites="['3.3  Selection sort, from the pseudocode']"
  you-will-answer="Question 5 in full: all 5 passes, the index and value of each minimum, and the 3 swaps."
/>

<ScoreBoard group="selection-trace" label="Selection sort trace — all five passes" />

This page is question 5, and it is a shorter table than question 4 — one row per
pass instead of one row per comparison, because selection sort makes exactly one
swap per pass and the row records that swap. What makes it hard is not the
length. It is that two of the five rows have no swap in them at all, and a
selection sort trace that swaps five times is wrong in a way that still looks
tidy.

Do this on paper first. Draw six columns, write the array down, and work one
pass at a time. The blanks below are for checking.

## What is given, and what is not

| | |
|---|---|
| the array | `[8, 4, 6, 2, 7, 1]` |
| `n` | 6 |
| passes to make | `n - 1` = 5 |
| comparisons in total | 15 — that is 5 + 4 + 3 + 2 + 1, and 3.5 explains why |
| swaps in total | not 5. Work it out pass by pass and see |
| the array at the start of each pass | given, because a wrong pass 1 makes four more rows wrong for the wrong reason |

The comparison count per pass is worth writing in the margin before you start,
because it tells you how long each scan is: 5 comparisons in pass 1, then 4,
then 3, then 2, then 1.

## The columns

| column | what goes in it |
|---|---|
| Pass | the pass number, 1 to 5 |
| Array at start | the array as the pass finds it |
| Min starts at | the index and value `min = i` points at when the pass begins |
| Min found | the index and value of the smallest value in the unsorted part |
| Swap | which two cells the closing swap exchanges, or that none was needed |
| Array after pass | the array once the swap has happened |

<MentalModel heading="The row is written in two moments, not one">

A bubble sort row is written at the instant of a comparison: pair, answer,
array. A selection sort row is written twice, and the two moments are separated
by the entire scan.

The first moment is the **end of the scan**. That is when you know what the
smallest value in the unsorted part is, and where it lives. Nothing can be
written in the "Min found" column before this point, because up to this point
`min` has been a *running* best — it has moved several times, and every one of
those positions was temporary.

The second moment is **after the swap**. That is when the array changes. Between
those two moments there is no change to the array at all: a scan that compares
four values and finds nothing better does not touch a single cell.

So the shape of a row is: one index and value in, one index and value out, one
swap, one new array. If the row you wrote has the array changing before the
"Min found" cell is filled in, the moments have been mixed up.

</MentalModel>

## What the scan does inside a pass

The `min` column is the part of this trace that cannot be produced by copying.
Here is what happens inside each scan, so that you can check your own working
against it rather than against the answer.

| pass | scan runs `j` = | the running minimum moves like this |
|---|---|---|
| 1 | 1 to 5 | index 0 (value 8) → index 1 (value 4) → index 3 (value 2) → index 5 (value 1) |
| 2 | 2 to 5 | index 1 (value 4) → index 3 (value 2), and then it never moves again |
| 3 | 3 to 5 | index 2 (value 6) → index 3 (value 4), and then it never moves again |
| 4 | 4 to 5 | index 3 (value 6), and it never moves at all |
| 5 | 5 to 5 | index 4 (value 7), and it never moves at all |

Three things to read off that table.

**The starting candidate is always `A[i]`,** so the first entry in every row is
`index i (value A[i])`. That part is free — `min = i` guarantees it.

**Only the last position in each chain is the answer.** In pass 1 the chain has
four entries, and the first three describe where the minimum *was* at some point
during the scan; only index 5 is where it is when the scan ends. This is why the
worksheet's reminder is worth underlining: record the minimum only after the
whole unsorted portion has been scanned.

**In passes 4 and 5 the chain has one entry.** The candidate that started the
pass is still the best value when the scan ends, so the swap would exchange
index `i` with itself, and the array does not change. Those two rows are the
trap on this question, and they get their own section below.

## Pass 1

The scan runs from `j = 1` to `j = 5`. Five comparisons, three updates to `min`,
and one swap at the end of it.

<TraceTable
  title="Pass 1 — i = 0, scan j = 1 to 5"
  group="selection-trace"
  caption="Min starts at is where min = i puts it. Min found is where it ends up after all five comparisons."
  :columns="['Pass', 'Array at start', 'Min starts at', 'Min found', 'Swap', 'Array after pass']"
  :rows="[
    [1, '[8, 4, 6, 2, 7, 1]', { answer: ['index 0 (value 8)', 'index 0', '0', 'A[0]'], ph: 'index ? (value ?)' }, { answer: ['index 5 (value 1)', 'index 5', '5', 'index 5, value 1'], ph: 'index ? (value ?)' }, { answer: ['A[0] ↔ A[5]', 'A[0] <-> A[5]', 'swap A[0] and A[5]', 'A[0] and A[5]', 'A[0] with A[5]'], ph: 'A[?] ↔ A[?]' }, { answer: ['[1, 4, 6, 2, 7, 8]', '1,4,6,2,7,8'], ph: '?', wide: true }]
  ]"
/>

## Pass 2

The scan runs from `j = 2` to `j = 5` — four comparisons. The candidate starts at
index 1, and the first value it meets beats it.

<TraceTable
  title="Pass 2 — i = 1, scan j = 2 to 5"
  group="selection-trace"
  caption="Index 0 is already final, so this pass owns index 1 and scans from index 2."
  :columns="['Pass', 'Array at start', 'Min starts at', 'Min found', 'Swap', 'Array after pass']"
  :rows="[
    [2, '[1, 4, 6, 2, 7, 8]', { answer: ['index 1 (value 4)', 'index 1', '1', 'A[1]'], ph: 'index ? (value ?)' }, { answer: ['index 3 (value 2)', 'index 3', '3', 'index 3, value 2'], ph: 'index ? (value ?)' }, { answer: ['A[1] ↔ A[3]', 'A[1] <-> A[3]', 'swap A[1] and A[3]', 'A[1] and A[3]', 'A[1] with A[3]'], ph: 'A[?] ↔ A[?]' }, { answer: ['[1, 2, 6, 4, 7, 8]', '1,2,6,4,7,8'], ph: '?', wide: true }]
  ]"
/>

## Pass 3

The scan runs from `j = 3` to `j = 5` — three comparisons. This pass produces the
last swap of the whole run.

<TraceTable
  title="Pass 3 — i = 2, scan j = 3 to 5"
  group="selection-trace"
  caption="The minimum is one cell to the right of the candidate, so the swap moves it one place left."
  :columns="['Pass', 'Array at start', 'Min starts at', 'Min found', 'Swap', 'Array after pass']"
  :rows="[
    [3, '[1, 2, 6, 4, 7, 8]', { answer: ['index 2 (value 6)', 'index 2', '2', 'A[2]'], ph: 'index ? (value ?)' }, { answer: ['index 3 (value 4)', 'index 3', '3', 'index 3, value 4'], ph: 'index ? (value ?)' }, { answer: ['A[2] ↔ A[3]', 'A[2] <-> A[3]', 'swap A[2] and A[3]', 'A[2] and A[3]', 'A[2] with A[3]'], ph: 'A[?] ↔ A[?]' }, { answer: ['[1, 2, 4, 6, 7, 8]', '1,2,4,6,7,8'], ph: '?', wide: true }]
  ]"
/>

After this swap the array reads `[1, 2, 4, 6, 7, 8]`, which is sorted. Two
passes remain, and neither of them will change it.

## Pass 4

The scan runs from `j = 4` to `j = 5` — two comparisons, against the values 7 and
8, and neither of them is smaller than the candidate. Here is the array as the
pass finds it:

<ArrayTrack :values="[1, 2, 4, 6, 7, 8]" :sorted-before="3" :cursor="3" :min="3" caption="Start of pass 4: indices 0 to 2 are final (plum), and min = i = 3 points at the value 6. The scan compares it with 7, then with 8. Neither is smaller." />

Two comparisons, no update to `min`, and therefore no swap. The array is
unchanged, and index 3 is confirmed as final rather than made final.

<TraceTable
  title="Pass 4 — i = 3, scan j = 4 to 5"
  group="selection-trace"
  caption="The swap column is not optional here: its correct entry is that no swap happened."
  :columns="['Pass', 'Array at start', 'Min starts at', 'Min found', 'Swap', 'Array after pass']"
  :rows="[
    [4, '[1, 2, 4, 6, 7, 8]', { answer: ['index 3 (value 6)', 'index 3', '3', 'A[3]'], ph: 'index ? (value ?)' }, { answer: ['index 3 (value 6)', 'index 3', '3', 'index 3, value 6'], ph: 'index ? (value ?)' }, { answer: ['none', 'no swap', 'none needed', 'none needed (min === i)', 'min === i', 'no swap needed'], ph: 'none / A[?] ↔ A[?]' }, { answer: ['[1, 2, 4, 6, 7, 8]', '1,2,4,6,7,8'], ph: '?', wide: true }]
  ]"
/>

## Pass 5

The scan runs from `j = 5` to `j = 5` — exactly one comparison, and it is the
last comparison selection sort makes. With `i = 4` the inner loop is
`j = i + 1 to n - 1`, which is the single value `j = 5`. That value, the 8, is
compared against the running minimum at index 4, which holds the 7. The 8 is not
smaller, so `min` stays at index 4, and there is no swap.

<TraceTable
  title="Pass 5 — i = 4, scan j = 5 to 5"
  group="selection-trace"
  caption="One comparison, no update, no swap. Index 4 is final, and index 5 comes along with it."
  :columns="['Pass', 'Array at start', 'Min starts at', 'Min found', 'Swap', 'Array after pass']"
  :rows="[
    [5, '[1, 2, 4, 6, 7, 8]', { answer: ['index 4 (value 7)', 'index 4', '4', 'A[4]'], ph: 'index ? (value ?)' }, { answer: ['index 4 (value 7)', 'index 4', '4', 'index 4, value 7'], ph: 'index ? (value ?)' }, { answer: ['none', 'no swap', 'none needed', 'none needed (min === i)', 'min === i', 'no swap needed'], ph: 'none / A[?] ↔ A[?]' }, { answer: ['[1, 2, 4, 6, 7, 8]', '1,2,4,6,7,8'], ph: '?', wide: true }]
  ]"
/>

Note that the two entries in the middle of this row are identical, and that is
not a copying error: `min` started the pass at index 4 and never left it. When
"Min found" equals "Min starts at", there is nothing to swap — and 3 swaps out of
a possible 5 is what the whole trace comes to.

## Check it against the machine

<SortPlayer algorithm="selection" :initial="[8, 4, 6, 2, 7, 1]" />

Fill in your five rows first, then open the **Finished table** tab and read
across. Its "Swap" column is the place mismatches show up: it either names two
indices, or it says no swap was needed because `min === i`, and it says which of
the two for each of the five passes.

<YouShouldSee heading="What a complete answer looks like">

| pass | min starts at | min found | swap | after pass |
|---|---|---|---|---|
| 1 | index 0 (8) | index 5 (1) | `A[0]` ↔ `A[5]` | `[1, 4, 6, 2, 7, 8]` |
| 2 | index 1 (4) | index 3 (2) | `A[1]` ↔ `A[3]` | `[1, 2, 6, 4, 7, 8]` |
| 3 | index 2 (6) | index 3 (4) | `A[2]` ↔ `A[3]` | `[1, 2, 4, 6, 7, 8]` |
| 4 | index 3 (6) | index 3 (6) | none — `min === i` | `[1, 2, 4, 6, 7, 8]` |
| 5 | index 4 (7) | index 4 (7) | none — `min === i` | `[1, 2, 4, 6, 7, 8]` |

Final sorted array: `[1, 2, 4, 6, 7, 8]`. Five passes, 15 comparisons, 3 swaps.

</YouShouldSee>

<CommonMistake heading="Writing a swap in passes 4 and 5">

This is the mistake this question is designed to catch, and it comes from habit
rather than from misunderstanding. Every row above has a Swap column, and in the
first three passes a swap is genuinely there, so the fourth and fifth get one
written in too.

Look at what the algorithm does with `min === i`. The last line of the pseudocode
is `swap A[i] and A[min]`. If `min` is `i`, that line exchanges index 3 with
index 3 — the value leaves the cell and arrives at the same cell. The array is
identical afterwards, and the component's finished table reports it as *none
needed*, because that is what a swap with itself amounts to: nothing.

Writing `A[3] ↔ A[3]` is not wrong so much as pointless, and on a marked paper it
reads as "I did not check whether the minimum moved". Write **none**, and add
`min === i` if you want to show why.

The second-order version of the mistake is worse. If you write a swap in pass 4,
you will also write a changed array in the "Array after pass" column, and pass 5
will then start from an array that never existed. One invented swap corrupts two
rows.

The check, in one line: **if "Min found" and "Min starts at" are the same index,
there is nothing to swap.**

</CommonMistake>

<IfItsWrong error="pass 4: min found is index 2" means="the scan has been run over the whole array instead of over the unsorted part, so a value that was already final has been allowed back into the search.">

Index 2 holds the 4, and the 4 is not the smallest value in the unsorted part of
pass 4 — it is not in the unsorted part at all. It became final during pass 3 and
selection sort will never look at it again.

What the answer reveals is where the scan was pointed. Pass 4 has `i = 3`, so the
scan is `j = 4 to 5` and the candidate starts at index 3 (the 6). Getting index 2
as the minimum means the scan started at index 2, or earlier — that is, it began
one cell to the left of the candidate, in the region the previous pass had
already finished with.

Nothing catastrophic happens to the trace when you do this, which is why it is
worth checking: in this pass the answer is not even smaller than the candidate,
so a careless reader might not notice the scan was looking in the wrong place.

Two checks that catch it:

- **The scan starts one past the candidate.** `min = i` and `j = i + 1`, so
  `j` is never less than `i + 1`, and "Min found" is never less than "Min starts
  at".
- **The sorted prefix is out of bounds.** Everything below index `i` is final,
  and the word final means no comparisons, no updates and no swaps may involve
  it.

</IfItsWrong>

## The totals

<FillIn
  label="Total comparisons:"
  answer="15"
  :numeric="15"
  placeholder="a number"
  solution="Each pass scans one fewer value than the pass before: 5 + 4 + 3 + 2 + 1 = 15."
  hint="Count the scan lengths, not the swaps."
  group="selection-trace"
/>

<FillIn
  label="Total swaps:"
  answer="3"
  :numeric="3"
  placeholder="a number"
  solution="Three passes swapped, and passes 4 and 5 had min === i, so nothing moved."
  hint="Selection sort swaps at most once per pass — how many passes actually needed one?"
  group="selection-trace"
/>

<FillIn
  label="Final sorted array:"
  :answer="['[1, 2, 4, 6, 7, 8]', '1,2,4,6,7,8', '[1,2,4,6,7,8]']"
  placeholder="[?, ?, ?, ?, ?, ?]"
  solution="The array is sorted from the end of pass 3, and the last two passes confirm it."
  wide
  group="selection-trace"
/>

<Recap>

- Question 5 is five rows, one per pass, and each row is written at two moments:
  the end of the scan, then after the swap.
- "Min starts at" is always `index i (value A[i])`, because `min = i` opens every
  pass with the first unsorted value as the candidate.
- "Min found" is the *last* value of the running minimum, never a temporary one,
  and the swap happens only once the scan has finished.
- Passes 4 and 5 end with `min === i`, so no swap happens and the array is
  unchanged: 3 swaps in total, not 5.
- The counts to check against: 5 passes, 15 comparisons, 3 swaps, final array
  `[1, 2, 4, 6, 7, 8]`.

</Recap>

→ Next: **[3.5  How many operations?](/part-3-sorting/counting-comparisons)**
