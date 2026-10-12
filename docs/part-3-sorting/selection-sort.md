---
title: "3.3  Selection sort, from the pseudocode"
description: "What one pass of selection sort does: scan for the smallest value in the unsorted part, then put it at the front — so the sorted region grows from the left instead of the right."
---

# 3.3  Selection sort, from the pseudocode

<ChapterMeta
  reading-time="12 min"
  :difficulty="3"
  :prerequisites="['3.2  The bubble sort trace']"
  you-will-answer="Question 5 — you will be able to run one pass of selection sort by hand, and say why the scan starts at i + 1 and why min holds an index."
/>

Question 5 gives you a longer array, `[8, 4, 6, 2, 7, 1]`, six values this time,
and a second pseudocode block. The trace has one row per pass rather than one
row per comparison, so it is a shorter table — five rows. The work inside each
row is different, though, and that is what this chapter is for.

Bubble sort moved data. It compared neighbours and swapped them, over and over,
and the array was shuffled into order in the process. Selection sort barely
moves anything. It spends its comparisons *looking*, decides which value belongs
next, and then moves that one value once.

<MentalModel heading="The sorted part grows from the left">

Selection sort builds the sorted array at the front, one cell per pass, and it
never has to revisit a cell it has filled.

Pass `i` owns index `i`. It scans the values from `i + 1` to the end, finds the
smallest one, and swaps it into index `i`. After that swap, index `i` is final:
everything to its left is smaller or equal, everything to its right is larger or
equal, and no future pass will look at it again.

So the sorted region is a **prefix** — indices 0 up to `i`, pinned to the left —
where bubble sort's sorted region was a suffix pinned to the right.

The consequence you should carry into the trace: after five passes on a
six-element array, five cells are final. The sixth one does not need a pass,
because if five values are in their right places, so is the last.

</MentalModel>

## The pseudocode, exactly as the sheet gives it

```
SelectionSort(A[0..n - 1])
    for i = 0 to n - 2
        min = i
        for j = i + 1 to n - 1
            if A[j] < A[min]
                min = j
        swap A[i] and A[min]
```

Six lines, and the shape is the same as bubble sort's: an outer loop over the
passes, an inner loop over the work of one pass. What differs is what the inner
loop does.

| line | what it decides |
|---|---|
| `for i = 0 to n - 2` | which index this pass is going to fill: `n - 1` passes, index `i` each time |
| `min = i` | the starting candidate: assume the first unsorted value is the smallest |
| `for j = i + 1 to n - 1` | look at every other unsorted value, once each |
| `if A[j] < A[min]` | is this value smaller than the best one so far? |
| `min = j` | remember *where* the better candidate is |
| `swap A[i] and A[min]` | put the winner at index `i` — note the indentation: this line is outside the inner loop |

That last point is the whole difference between the two sorts. In bubble sort
the swap is inside the inner loop, so it can happen many times per pass. In
selection sort it is outside, so it happens **at most once per pass**.

## `min` is an index, not a value

This is the small detail that generates most of the errors on question 5.

When the scan finds something better, it stores `j` — a position — in `min`, not
`A[j]`. The variable is badly named for a book about careful reading: the best
name would be `minIndex`, and the pseudocode would read `minIndex = j`. What it
holds at all times is *the position of the smallest value seen so far in this
pass*.

Why a position rather than the value itself? Because the pass ends with
`swap A[i] and A[min]`, and a swap needs to know which two cells to exchange. If
`min` held the value 1, the last line would have to say "swap A[i] with whichever
cell holds 1" — and on an array with repeated values, that sentence has no single
answer. Positions are unambiguous; values are not.

Two things follow for your trace:

- `min` starts at `i`, so at the beginning of a pass it points at `A[i]`
  itself — the first value in the unsorted part, standing in as the best
  candidate until something better turns up.
- `min` can only move to the *right*. `j` counts upwards, so once the scan has
  passed a value, that value can never become the minimum later in the pass.

## Why the scan starts at `i + 1`

`min = i` has already claimed `A[i]` as the candidate, so the scan has no reason
to look at it again. Starting `j` at `i` would compare `A[i]` with `A[min]` when
both are the same cell — a comparison whose answer is always false, because
`A[i] < A[i]` is never true.

That wasted comparison is not merely untidy. It would also change the count. With
`j = i + 1 to n - 1` the first pass on six values does 5 comparisons; with
`j = i to n - 1` it would do 6, and the second pass 5, and so on, giving 20
comparisons instead of 15. Question 5 does not ask for the count, but 3.5 does,
and the answer there depends on this line being `i + 1`.

The other half of the reason is that `j = i + 1` is where the *other* values
start. Index `i` is the cell being filled, so the values that could replace the
candidate are exactly the ones from `i + 1` onwards.

## One pass, step by step

Pass 1 on `[8, 4, 6, 2, 7, 1]`. `i = 0`, so `min` starts at index 0, holding the
8, and the scan runs from `j = 1` to `j = 5`.

| `j` | `A[j]` | `A[min]` | `A[j] < A[min]`? | `min` after |
|---|---|---|---|---|
| 1 | 4 | 8 | true | 1 |
| 2 | 6 | 4 | false | 1 |
| 3 | 2 | 4 | true | 3 |
| 4 | 7 | 2 | false | 3 |
| 5 | 1 | 2 | true | 5 |

Five comparisons, and `min` moved three times: to index 1, then to index 3, then
to index 5. The scan is now over, and only now does anything move:

<ArrayTrack :values="[8, 4, 6, 2, 7, 1]" :min="5" :cursor="0" caption="The scan has finished. The running minimum sits at index 5, holding the 1, and index 0 (the purple underline) is about to receive it." />

The swap exchanges index 0 and index 5, so the array becomes `[1, 4, 6, 2, 7, 8]`
and index 0 is final. The 8 travels five cells to the right in a single
operation, which is the opposite of how the 7 behaved in bubble sort: it was
carried one cell at a time, by four separate swaps.

<CommonMistake heading="Swapping as soon as you find something smaller">

The tempting version of this pass is to swap the moment a smaller value turns
up, which is what bubble sort does and what selection sort explicitly does not.

It produces a different answer, not a slower route to the same one. Take pass 1
on `[8, 4, 6, 2, 7, 1]` and swap the candidate out the moment something smaller
turns up, keeping the candidate at index 0. The 8 meets the 4 and they swap; the
value now at index 0 is the 4, which meets the 2 and swaps; the 2 meets the 1 and
swaps. Three swaps, three changed arrays, and the pass leaves `[1, 8, 6, 4, 7, 2]`
where selection sort leaves `[1, 4, 6, 2, 7, 8]`. The 1 is in the right place
either way; nothing else is.

The pseudocode's indentation is the whole defence against this: `swap A[i] and
A[min]` sits at the same level as `for j = ...`, not inside it. If you find
yourself recording more than one swap in a selection sort pass, you have moved
that line inwards.

There is a second, subtler version of the same mistake: swapping once, but using
the *last* value that beat the candidate rather than the smallest. `min` is not
"the most recent improvement" — it is the running best, and it survives a
comparison that fails.

</CommonMistake>

## The array at the start of a pass

Here is pass 2 as it begins. Index 0 holds the 1, which pass 1 put there and
nothing will move again; `min` starts at index 1, which is the position this pass
is going to fill.

<ArrayTrack :values="[1, 4, 6, 2, 7, 8]" :sorted-before="1" :cursor="1" :min="1" caption="Start of pass 2: index 0 is final (plum), min = i = 1 points at the value 4, and the scan will run from j = 2 to j = 5." />

Read three things off it. The plum cell on the left is the finished prefix, and
it is one cell longer than it was at the start of pass 1. The gold cell and the
purple underline are on the same index, because `min = i` puts them there at the
beginning of every pass. And the remaining values — 6, 2, 7, 8 — are all still
candidates; none of them has been examined yet in this pass.

## Watch it run

<SortPlayer algorithm="selection" :initial="[8, 4, 6, 2, 7, 1]" />

Press play, and watch for two things that never happen in bubble sort:

1. **The `Swaps` counter barely moves.** It goes up at most once per pass, at
   the very end of the pass, after the note says the scan is over.
2. **The comparison count climbs without the array changing.** Between swaps,
   the array is untouched while the gold cell hops around from index to index.
   That is where selection sort spends its work.

The component's **Finished table** tab shows all five passes in the worksheet's
columns. 3.4 is where you fill that table in yourself, so do not read it yet.

## What the sheet tells you to record

The worksheet's instructions for question 5, reproduced because they are the
marking scheme in disguise:

**How to Trace Selection Sort**

1. Set i to the first unsorted position.
2. Set min = i.
3. Scan the remaining unsorted values from left to right.
4. If `A[j] < A[min]`, update min to j.
5. After the scan ends, record the index and value where the minimum was found.
6. Swap A[i] with A[min]. The value placed at index i is now in its final
   position.

The sheet adds one line worth underlining, and it is the line most lost marks
come from:

> Record the minimum only after the entire unsorted portion has been scanned.
> Then perform the swap.

Step 5 says *after the scan ends*, and that is not a stylistic choice. If you
write a minimum down as soon as `min` moves, you will record the temporary best
rather than the final answer: in pass 1 above, that would give you index 1
(holding 4) instead of index 5 (holding 1).

<Quiz
  question="The scan in SelectionSort runs from j = i + 1, not from j = i. Why?"
  :options="[
    'A[i] is already the starting candidate, so comparing it with itself would be a comparison with a known answer',
    'Because index i was already sorted by the previous pass',
    'Because the swap at the end writes into index i, so index i has to be left alone',
    'Because starting at i would skip the value at index i + 1'
  ]"
  :answer="0"
  :why="[
    'Correct. min = i has claimed A[i] as the candidate, and the test A[j] smaller than A[min] would be false on every one of those self-comparisons — work with no possible outcome.',
    'Index i is the cell this pass is filling in; only indices 0 to i - 1 are final at this point. On the first pass, no index is final at all.',
    'The swap is exactly where index i is used, so index i is very much in play. The reason for i + 1 is the wasted self-comparison, not protecting the cell.',
    'Nothing is skipped: j = i + 1 is the very first value read inside the loop, and it is compared on the first iteration.'
  ]"
  group="selection-idea"
/>

<ScoreBoard group="selection-idea" label="Selection sort, from the pseudocode" />

<ExerciseBlock heading="Run a pass with a running-min column" level="5 minutes">

Take the array `[8, 4, 6, 2, 7, 1]` and trace pass 2 by hand with four columns:
`j`, `A[j]`, `A[min]`, and the comparison's answer. Do not write a swap anywhere
until `j` has reached 5.

The thing to notice when you have finished is how often the answer is "false".
Of the four comparisons in pass 2, three of them change nothing at all — and
those three are still rows the algorithm executed, which is why the comparison
count in 3.5 has nothing to do with how unsorted the array is.

</ExerciseBlock>

<Recap>

- Selection sort's sorted region is a **prefix**: pass `i` fills index `i`, and
  index `i` is final from that moment on.
- `min = i` starts the pass with the first unsorted value as the candidate;
  `A[j] < A[min]` tests each remaining value against it, and `min = j` records
  the position of a new best.
- `min` holds an index because the pass ends in a swap, and a swap needs to know
  which two cells to exchange.
- The scan starts at `i + 1` because `A[i]` is already the candidate — comparing
  it with itself can never be true.
- The swap is outside the inner loop, so there is at most one swap per pass, and
  it happens only after the whole unsorted part has been scanned.

</Recap>

→ Next: **[3.4  The selection sort trace](/part-3-sorting/selection-trace)**
