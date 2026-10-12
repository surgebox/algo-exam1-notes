---
title: "3.2  The bubble sort trace"
description: "The drill for question 4: four checked trace tables, one per pass, in the worksheet's own columns — comparison, swap, array after the comparison, array after the pass, sorted suffix."
---

# 3.2  The bubble sort trace

<ChapterMeta
  reading-time="18 min"
  :difficulty="2"
  :prerequisites="['3.1  Bubble sort, from the pseudocode']"
  you-will-answer="Question 4 in full: all 10 comparisons, all 7 swaps, and the array after every comparison and every pass."
/>

<ScoreBoard group="bubble-trace" label="Bubble sort trace — all four passes" />

This page is question 4. Everything you need is in 3.1; what follows is the
table, split into four pieces so that you can get one pass right before you
start the next.

Before you type anything, do this: take a sheet of paper, draw the columns
below, and fill them in by hand. The blanks on this page are for checking what
you wrote, not for thinking with. A trace you assemble by clicking is a trace
you cannot reproduce under exam conditions.

## What is given, and what is not

| | |
|---|---|
| the array | `[7, 3, 5, 1, 4]` |
| `n` | 5 |
| passes to make | `n - 1` = 4 |
| comparisons in total | 10 — that is 4 + 3 + 2 + 1, and 3.5 explains why |
| the pass starts | given to you in each table below |
| everything else | yours |

The starting array of each pass is a given, because a wrong array after pass 1
would make passes 2, 3 and 4 wrong for a reason that has nothing to do with
passes 2, 3 and 4. Get the mechanics right against steady ground first.

Before you trace anything, run the algorithm once and watch the pseudocode
panel rather than the array. The highlighted line tells you which of the four
decisions is being made at each moment, and the two counters tell you which
row of the table you would be writing if you were doing this by hand:

<SortPlayer algorithm="bubble" :initial="[7, 3, 5, 1, 4]" />

Then leave it alone. Do pass 1 on paper with the player closed, and come back to
it only when you have an answer to check — there is a second copy of it at the
end of the page for exactly that.

## The columns, and why there are two array columns

The worksheet asks for seven columns, and two of them hold arrays:

| column | what goes in it |
|---|---|
| Pass | the pass number |
| Array at start | the array as the pass finds it |
| Comparison | the pair being compared, and the two values |
| Swap? | yes or no |
| Array after comparison | the array immediately after *this one* comparison |
| Array after pass | the array once the pass has finished |
| Sorted suffix | the values that are final, from `n - 1 - i` to `n - 1` |

The last two columns are filled once per pass, on that pass's final row. The
middle columns are filled once per comparison.

<MentalModel heading="One row is one decision, not one pass">

A trace table is a record of decisions, and bubble sort makes exactly one
decision per comparison: is `A[j + 1]` smaller than `A[j]`? Everything in the
row follows from that single question and the two values it is asked about.

So the row is written *at the moment of the comparison*, and the array in
"Array after comparison" is the array as it stands with that decision already
applied — not the array at the end of the pass. Those two agree on only one row
per pass: the last one.

If you find yourself writing the same array down four times in a row, you have
put the end-of-pass array in the wrong column.

</MentalModel>

## Pass 1

`i = 0`, so `j` runs `0` to `n - 2 - i` = 3. Four comparisons. The pass starts
at `[7, 3, 5, 1, 4]`.

Each comparison cell wants the pair and the values, in the form
`A[j] vs A[j + 1]: left vs right`. For example, if a pass were standing on the
values 9 and 4 at indices 3 and 4, you would write
`A[3] vs A[4]: 9 vs 4`.

<TraceTable
  title="Pass 1 — i = 0, j = 0 to 3"
  group="bubble-trace"
  caption="Four comparisons. The last two columns belong to the final row of the pass."
  :columns="['Pass', 'Array at start', 'Comparison', 'Swap?', 'Array after comparison', 'Array after pass', 'Sorted suffix']"
  :rows="[
    [1, '[7, 3, 5, 1, 4]', { answer: ['A[0] vs A[1]: 7 vs 3', 'A[0] vs A[1] (7 vs 3)', '7 vs 3', 'A[0] vs A[1]'], ph: 'A[0] vs A[1]: ? vs ?' }, { answer: ['yes', 'swap', 'y'], ph: 'yes / no' }, { answer: ['[3, 7, 5, 1, 4]', '3,7,5,1,4'], ph: '?', wide: true }, '—', '—'],
    [1, '[7, 3, 5, 1, 4]', { answer: ['A[1] vs A[2]: 7 vs 5', 'A[1] vs A[2] (7 vs 5)', '7 vs 5', 'A[1] vs A[2]'], ph: 'A[1] vs A[2]: ? vs ?' }, { answer: ['yes', 'swap', 'y'], ph: 'yes / no' }, { answer: ['[3, 5, 7, 1, 4]', '3,5,7,1,4'], ph: '?', wide: true }, '—', '—'],
    [1, '[7, 3, 5, 1, 4]', { answer: ['A[2] vs A[3]: 7 vs 1', 'A[2] vs A[3] (7 vs 1)', '7 vs 1', 'A[2] vs A[3]'], ph: 'A[2] vs A[3]: ? vs ?' }, { answer: ['yes', 'swap', 'y'], ph: 'yes / no' }, { answer: ['[3, 5, 1, 7, 4]', '3,5,1,7,4'], ph: '?', wide: true }, '—', '—'],
    [1, '[7, 3, 5, 1, 4]', { answer: ['A[3] vs A[4]: 7 vs 4', 'A[3] vs A[4] (7 vs 4)', '7 vs 4', 'A[3] vs A[4]'], ph: 'A[3] vs A[4]: ? vs ?' }, { answer: ['yes', 'swap', 'y'], ph: 'yes / no' }, { answer: ['[3, 5, 1, 4, 7]', '3,5,1,4,7'], ph: '?', wide: true }, { answer: ['[3, 5, 1, 4, 7]', '3,5,1,4,7'], ph: '?', wide: true }, { answer: ['[7]', '7'], ph: '?' }]
  ]"
/>

The last row is the one where the two array columns agree, and you can see why:
the comparison that ends a pass is also the last thing that happens in it. The
suffix is the run of values from index `n - 1 - i` upwards — with `i = 0` that is
index 4 alone.

## Pass 2

`i = 1`, so `j` runs `0` to 2. Three comparisons, one fewer than pass 1,
because index 4 is now finished and the inner loop refuses to go near it. The
pass starts at `[3, 5, 1, 4, 7]`.

<TraceTable
  title="Pass 2 — i = 1, j = 0 to 2"
  group="bubble-trace"
  caption="Three comparisons. Notice the first one: a comparison can decide that nothing should happen."
  :columns="['Pass', 'Array at start', 'Comparison', 'Swap?', 'Array after comparison', 'Array after pass', 'Sorted suffix']"
  :rows="[
    [2, '[3, 5, 1, 4, 7]', { answer: ['A[0] vs A[1]: 3 vs 5', 'A[0] vs A[1] (3 vs 5)', '3 vs 5', 'A[0] vs A[1]'], ph: 'A[0] vs A[1]: ? vs ?' }, { answer: ['no', 'no swap', 'n'], ph: 'yes / no' }, { answer: ['[3, 5, 1, 4, 7]', '3,5,1,4,7'], ph: '?', wide: true }, '—', '—'],
    [2, '[3, 5, 1, 4, 7]', { answer: ['A[1] vs A[2]: 5 vs 1', 'A[1] vs A[2] (5 vs 1)', '5 vs 1', 'A[1] vs A[2]'], ph: 'A[1] vs A[2]: ? vs ?' }, { answer: ['yes', 'swap', 'y'], ph: 'yes / no' }, { answer: ['[3, 1, 5, 4, 7]', '3,1,5,4,7'], ph: '?', wide: true }, '—', '—'],
    [2, '[3, 5, 1, 4, 7]', { answer: ['A[2] vs A[3]: 5 vs 4', 'A[2] vs A[3] (5 vs 4)', '5 vs 4', 'A[2] vs A[3]'], ph: 'A[2] vs A[3]: ? vs ?' }, { answer: ['yes', 'swap', 'y'], ph: 'yes / no' }, { answer: ['[3, 1, 4, 5, 7]', '3,1,4,5,7'], ph: '?', wide: true }, { answer: ['[3, 1, 4, 5, 7]', '3,1,4,5,7'], ph: '?', wide: true }, { answer: ['[5, 7]', '5,7'], ph: '?' }]
  ]"
/>

Compare the first row of this pass with the first row of pass 1. Same pair of
indices, `A[0]` and `A[1]`; opposite outcome. A "no" in the Swap? column is a
real row of the trace — the pseudocode still made the comparison, so the
algorithm still spent the work.

## Pass 3

`i = 2`, so `j` runs `0` to 1. Two comparisons. The pass starts at
`[3, 1, 4, 5, 7]`.

<TraceTable
  title="Pass 3 — i = 2, j = 0 to 1"
  group="bubble-trace"
  caption="Two comparisons, and by the end of them the array is sorted — but the algorithm does not know that yet."
  :columns="['Pass', 'Array at start', 'Comparison', 'Swap?', 'Array after comparison', 'Array after pass', 'Sorted suffix']"
  :rows="[
    [3, '[3, 1, 4, 5, 7]', { answer: ['A[0] vs A[1]: 3 vs 1', 'A[0] vs A[1] (3 vs 1)', '3 vs 1', 'A[0] vs A[1]'], ph: 'A[0] vs A[1]: ? vs ?' }, { answer: ['yes', 'swap', 'y'], ph: 'yes / no' }, { answer: ['[1, 3, 4, 5, 7]', '1,3,4,5,7'], ph: '?', wide: true }, '—', '—'],
    [3, '[3, 1, 4, 5, 7]', { answer: ['A[1] vs A[2]: 3 vs 4', 'A[1] vs A[2] (3 vs 4)', '3 vs 4', 'A[1] vs A[2]'], ph: 'A[1] vs A[2]: ? vs ?' }, { answer: ['no', 'no swap', 'n'], ph: 'yes / no' }, { answer: ['[1, 3, 4, 5, 7]', '1,3,4,5,7'], ph: '?', wide: true }, { answer: ['[1, 3, 4, 5, 7]', '1,3,4,5,7'], ph: '?', wide: true }, { answer: ['[4, 5, 7]', '4,5,7'], ph: '?' }]
  ]"
/>

This is the pass where the last swap of the whole run happens: the 3 and the 1.
After it, the array reads `[1, 3, 4, 5, 7]` and every comparison from here on
returns "no".

## Pass 4

`i = 3`, so `j` runs `0` to 0. One comparison. The pass starts at
`[1, 3, 4, 5, 7]`.

<TraceTable
  title="Pass 4 — i = 3, j = 0 to 0"
  group="bubble-trace"
  caption="A single comparison, and a whole pass's worth of bookkeeping for it."
  :columns="['Pass', 'Array at start', 'Comparison', 'Swap?', 'Array after comparison', 'Array after pass', 'Sorted suffix']"
  :rows="[
    [4, '[1, 3, 4, 5, 7]', { answer: ['A[0] vs A[1]: 1 vs 3', 'A[0] vs A[1] (1 vs 3)', '1 vs 3', 'A[0] vs A[1]'], ph: 'A[0] vs A[1]: ? vs ?' }, { answer: ['no', 'no swap', 'n'], ph: 'yes / no' }, { answer: ['[1, 3, 4, 5, 7]', '1,3,4,5,7'], ph: '?', wide: true }, { answer: ['[1, 3, 4, 5, 7]', '1,3,4,5,7'], ph: '?', wide: true }, { answer: ['[3, 4, 5, 7]', '3,4,5,7'], ph: '?' }]
  ]"
/>

Pass 4 is the reason the chapter said the pass count is fixed in advance. The
array has been sorted since the middle of pass 3, and the algorithm still runs a
final pass and makes one comparison, because `for i = 0 to n - 2` does not ask
whether there is anything left to do. Add up the blanks you have filled above
and you have the whole of question 4.

## Check it against the machine

You have now written 10 comparisons, 7 swaps and 14 arrays — the array after
each comparison, plus the array after each of the four passes. Before you trust
them, do one of two things: press play below and step through, or open the
component's **Finished table** tab and read across. Each row of that table is the
trace the algorithm actually executes, in exactly the columns you have filled in
above.

<SortPlayer algorithm="bubble" :initial="[7, 3, 5, 1, 4]" />

<YouShouldSee heading="What a complete answer looks like">

Four passes. 10 comparisons. 7 swaps — four in pass 1, two in pass 2, one in
pass 3, none in pass 4. The array after each pass: `[3, 5, 1, 4, 7]`, then
`[3, 1, 4, 5, 7]`, then `[1, 3, 4, 5, 7]`, then `[1, 3, 4, 5, 7]`. The sorted
suffixes grow one cell at a time: `[7]`, `[5, 7]`, `[4, 5, 7]`, `[3, 4, 5, 7]`.

Final sorted array: `[1, 3, 4, 5, 7]`.

If your table agrees with that, in those numbers and those arrays, you can
answer question 4. If one row disagrees, the mismatch will be in a single
comparison, and the animation will show you which one.

</YouShouldSee>

<CommonMistake heading="The two array columns are not the same column twice">

The worksheet asks for the array after each *comparison* and the array after
each *pass*, and putting the same value in both looks entirely reasonable. It is
right on the last row of each pass and wrong everywhere else.

Pass 1 is where it shows. After the comparison at `j = 0` the array is
`[3, 7, 5, 1, 4]`. After the whole of pass 1 it is `[3, 5, 1, 4, 7]`. Three more
comparisons happened in between, and each of them moved the 7 one cell right.

The failure is not arithmetic — it is copying. You work out the array once, at
the end of the pass, and then write it backwards up the column. The fix is to
write each row the moment you finish the comparison it describes, before you
look at the next pair.

The opposite mistake is to fill the "Array after pass" cell from the comparison
rows instead — with the array as it stood after the *first* comparison of the
pass. That is wrong in the other direction, and it has the same cause: two
columns that hold arrays, treated as though they were one column. The first two
columns of the table hold the pass start and nothing else, and the last two hold
the pass result and nothing else.

</CommonMistake>

<IfItsWrong error="[7, 3, 5, 1, 4] after pass 1" means="you have written the array the pass started with, not the array it produced — which usually means the pass was never carried out on paper.">

This is the commonest answer on this question, and it is worth knowing why
people give it. `[7, 3, 5, 1, 4]` is on the page already: it is the array you were
handed. Filling in the "Array after pass" column with it feels like recording a
fact rather than doing work.

It is also a strong signal about where the trace went wrong. If the array after
pass 1 is unchanged, then either no swaps happened at all, or the swaps happened
and the array was copied from the wrong line. Pass 1 on this array makes four
swaps, and the largest value — the 7 — ends the pass at index 4, the last cell.
So the only array that can be in that cell is one that ends in 7 and has lost its
leading 7.

Two checks that catch this immediately:

- **Did the largest value move?** After pass 1 it must sit at index `n - 1`.
- **Can the array be unchanged after a pass that made a swap?** No. Every swap
  changes two cells. If your pass has a "yes" in the Swap? column and an
  unchanged array beside it, one of the two is wrong.

</IfItsWrong>

## The totals

Three numbers close the question. They are the ones a marker looks for first,
because they are cheap to check and they catch everything else.

<FillIn
  label="Total comparisons:"
  answer="10"
  :numeric="10"
  placeholder="a number"
  solution="Each pass does one fewer comparison than the one before: 4 + 3 + 2 + 1 = 10."
  hint="Add up the rows you filled in, pass by pass."
  group="bubble-trace"
/>

<FillIn
  label="Total swaps:"
  answer="7"
  :numeric="7"
  placeholder="a number"
  solution="Four in pass 1, two in pass 2, one in pass 3, none in pass 4."
  hint="Count the yeses in the Swap? column."
  group="bubble-trace"
/>

<FillIn
  label="Final sorted array:"
  :answer="['[1, 3, 4, 5, 7]', '1,3,4,5,7', '[1,3,4,5,7]']"
  placeholder="[?, ?, ?, ?, ?]"
  solution="After four passes the array is fully sorted, and the last two passes have left it alone."
  wide
  group="bubble-trace"
/>

<Recap>

- Question 4 is 10 comparison rows, in four groups of 4, 3, 2 and 1.
- Every row records three things: the pair and values compared, whether a swap
  happened, and the array immediately afterwards.
- The "Array after pass" and "Sorted suffix" cells are filled once per pass, on
  that pass's final row, and the sorted suffix grows `[7]` → `[5, 7]` →
  `[4, 5, 7]` → `[3, 4, 5, 7]`.
- The counts to check against: 4 passes, 10 comparisons, 7 swaps, final array
  `[1, 3, 4, 5, 7]`.
- The pseudocode has no early exit, so pass 4 happens even though the array has
  been sorted since the middle of pass 3.

</Recap>

→ Next: **[3.3  Selection sort, from the pseudocode](/part-3-sorting/selection-sort)**
