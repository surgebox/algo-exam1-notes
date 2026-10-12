---
title: "3.1  Bubble sort, from the pseudocode"
description: "What one pass of bubble sort actually does, why the inner loop gets shorter every pass, and why the sorted part grows from the right-hand end."
---

# 3.1  Bubble sort, from the pseudocode

<ChapterMeta
  reading-time="12 min"
  :difficulty="2"
  :prerequisites="['1.2  Growth rates, and what to throw away']"
  you-will-answer="Question 4 — you will be able to say what each pass does, why the inner loop shortens, and which index is final at the end of every pass."
/>

Question 4 on the sheet gives you an array, `[7, 3, 5, 1, 4]`, a five-line
pseudocode block, and an empty table. The table wants a row per comparison:
which two values you compared, whether that comparison caused a swap, and what
the array looked like afterwards.

Ten rows later you should have a sorted array. This chapter is not that table —
3.2 is the table. This chapter is the part you cannot skip: *why* the algorithm
does those ten comparisons, in that order, and why pass 2 is shorter than pass
1 in a way that is decided in advance.

<MentalModel heading="The sorted part grows from the right">

Bubble sort never sorts the whole array at once. After pass 1 the largest value
is in its final place. After pass 2 the largest two values are in their final
places, and the largest of all never moves again.

That is the whole design. Each pass walks the unsorted part, finds the biggest
value still in it, and carries that value to the right-hand end of the unsorted
part — where it stops, because the loop now ends there. The sorted region is a
**suffix**, a block of finished values pinned to the right, and it grows by one
cell per pass.

Two consequences follow from that picture, and they are worth more than any
memorised trace:

1. Pass `i` has one fewer comparison than pass `i - 1`, because one more cell on
   the right is already finished and the pass must not touch it.
2. The number of passes is fixed before you start: `n - 1` of them, for an array
   of `n` values. You do not stop early when the array happens to be sorted,
   because this pseudocode has no way to notice.

</MentalModel>

## The pseudocode, exactly as the sheet gives it

```
BubbleSort(A[0..n - 1])
    for i = 0 to n - 2
        for j = 0 to n - 2 - i
            if A[j + 1] < A[j]
                swap A[j] and A[j + 1]
```

Read it as four decisions, and nothing else:

| line | what it decides |
|---|---|
| `for i = 0 to n - 2` | how many passes you make: `n - 1` of them |
| `for j = 0 to n - 2 - i` | how far right this pass is allowed to walk |
| `if A[j + 1] < A[j]` | whether this particular pair is out of order |
| `swap A[j] and A[j + 1]` | what to do about it |

Note what the comparison is *not* saying. `A[j + 1] < A[j]` asks whether the
right-hand value is smaller than the left-hand one. If the two values are equal,
the answer is false, and nothing moves. Equal values are left exactly where they
are, which is why the condition is written with `<` and not with `<=`.

## "Bubble", and why the name is the algorithm

Take the first pass on `[7, 3, 5, 1, 4]` and watch the 7 and nothing else.

<ArrayTrack :values="[7, 3, 5, 1, 4]" :compare="[0, 1]" :cursor="0" caption="j = 0. Compare A[0] = 7 with A[1] = 3. Is A[1] smaller than A[0]? Yes, so swap." />

The 7 is now at index 1, and index 0 holds the 3.

<ArrayTrack :values="[3, 7, 5, 1, 4]" :compare="[1, 2]" :cursor="1" caption="j = 1. Compare A[1] = 7 with A[2] = 5. 7 is bigger, so swap again. The 7 moves one cell right." />

The 7 moves right again. It will keep doing this for the rest of the pass,
because every value to its right is smaller than it: the 5, then the 1, then the
4. Four comparisons, four swaps, and the 7 lands at index 4 — the last index of
the array.

That is the bubble. A large value does not jump to the end; it is swapped one
position rightwards, over and over, because each comparison pushes it along.
And the single most useful thing to notice is that this is not a coincidence
about the number 7. **Whatever the largest value in the unsorted part is, the
pass carries it to the right-hand end.** Every comparison it participates in
swaps it rightwards, and nothing can swap it back left, because the only pair
looked at is the one the pass is standing on.

So a pass is two things at once: it tidies up every adjacent pair it visits, and
as a side effect it deposits the largest remaining value at the end of the
unsorted region. That deposit is what makes the array sorted, one cell at a
time.

## Why the inner loop is `n - 2 - i`

This is the line students misread, so it is worth doing with numbers rather than
symbols. The array has `n = 5` values, at indices 0 to 4.

**The outer loop.** `i = 0 to n - 2` means `i = 0, 1, 2, 3` — four passes. Why
four and not five? Because after `n - 1` passes you have placed `n - 1` values,
and placing `n - 1` of them necessarily places the last one too. There is no
fifth pass to make, so the loop stops at `n - 2`.

**The inner loop.** `j = 0 to n - 2 - i`. The pass compares `A[j]` with
`A[j + 1]`, so the largest index it ever *reads* is `j + 1`, and that is
`n - 1 - i`. In other words, pass `i` walks pairs up to, and stops at, the value
sitting in index `n - 1 - i` — which is exactly the cell that is about to become
final.

With `n = 5`, pass by pass:

| pass | `i` | `j` runs | comparisons | why it stops there |
|---|---|---|---|---|
| 1 | 0 | 0, 1, 2, 3 | 4 | nothing is final yet, so the pass covers every pair in the array |
| 2 | 1 | 0, 1, 2 | 3 | index 4 holds the final 7 — do not touch it |
| 3 | 2 | 0, 1 | 2 | indices 3 and 4 are final |
| 4 | 3 | 0 | 1 | indices 2, 3 and 4 are final |
| — | — | — | **10** | |

Ten comparisons, and every one of them is a genuine comparison the algorithm
makes. If you trace with the inner bound stuck at `n - 2`, you will write four
comparisons per pass — sixteen rows instead of ten — and the extra six are rows
the algorithm never executes.

The shrinking bound is also the reason the array ends up sorted rather than
merely tidier. If pass 2 were allowed to compare `A[3]` with `A[4]`, it could
swap the final 7 out of index 4, and the work of pass 1 would be undone. The
loop bound is what protects the finished cells.

## Watch it run

<SortPlayer algorithm="bubble" :initial="[7, 3, 5, 1, 4]" />

Press play, and do this in a specific order:

1. **Watch the pseudocode panel, not the array.** The highlighted line tells you
   which of the four decisions is being made right now. The array is the
   consequence.
2. **Watch the `Pass` counter.** It goes 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, … Each
   time it changes, one more cell on the right has turned plum — finished.
3. **Watch `Comparisons` and `Swaps`.** They only go up. Bubble sort has no
   mechanism for giving work back.

Two of the most useful behaviours are hidden behind the controls. Use the
scrubber to rewind *into* a pass instead of restarting from the beginning, and
use the speed selector once you can predict the next step — if you can predict
it, you do not need to watch it slowly.

<YouShouldSee heading="One more plum cell per pass">

By the end of pass 1 the array reads `[3, 5, 1, 4, 7]` and index 4 is final.
By the end of pass 2 it reads `[3, 1, 4, 5, 7]` and indices 3 and 4 are final —
and note that it is still not sorted, because the 1 and the 3 are the wrong way
round. So if your pass 2 result comes out fully sorted, pass 3's swap has gone
missing.

The component's **Finished table** tab shows the same trace in the exam's own
columns, one row per comparison. That is the table 3.2 asks you to fill in, so
leave it alone until you have done the pass by yourself.

</YouShouldSee>

## The array at the start of a pass

Here is the array at the moment pass 2 begins, with the pairs it is about to
compare and the cell that is already finished:

<ArrayTrack :values="[3, 5, 1, 4, 7]" :compare="[0, 1]" :cursor="0" :sorted-from="4" caption="Start of pass 2: the 7 at index 4 is final (plum), and j starts back at 0, not where pass 1 left off." />

Two things to read off that picture.

**`j` restarts at 0.** Each pass is a fresh walk of the unsorted region. There
is no memory of where the previous pass stopped, because the previous pass
stopped at the right-hand end by definition.

**The 7 is out of play.** `sortedFrom = 4` says indices 4 and up are finished.
Pass 2 will compare `A[0]` with `A[1]`, then `A[1]` with `A[2]`, then `A[2]`
with `A[3]` — and then it stops, one pair short of the 7.

## What the sheet tells you to record

The worksheet's tracing instructions for question 4, reproduced because they are
the marking scheme in disguise:

**How to Trace Bubble Sort**

1. Start at the left side of the unsorted portion of the array.
2. Compare the adjacent values A[j] and A[j+1].
3. If the left value is larger than the right value, swap them.
4. Record the comparison, whether a swap occurred, and the updated array.
5. Move one position to the right and repeat until the end of the unsorted
   portion.
6. After the pass, the largest remaining value is in its final position on the
   right.

Step 4 is the one that fills the table, and step 6 is the one that tells you the
next pass will be shorter. Steps 1, 2, 3 and 5 are the four lines of the
pseudocode in English.

<CommonMistake heading="Comparing into the part that is already finished">

The inner loop is `j = 0 to n - 2 - i`, and it is very tempting to read that as
"compare everything, every pass" — `j = 0 to n - 2`.

It runs, it still sorts the array correctly, and it costs you marks, because the
trace has to show what the algorithm does, not what a corrected version would
do. The extra rows are comparisons that never happen: comparing `A[3]` with
`A[4]` in pass 2 means comparing the 5 with the 7, and the 7 is already final.

The check is the total. Bubble sort on five values makes exactly 10 comparisons
— 4, then 3, then 2, then 1. If your table has 16 rows, this is why, and the
same off-by-one will show up again when you count comparisons in 3.5.

</CommonMistake>

<Quiz
  question="Pass 2 of bubble sort on [7, 3, 5, 1, 4] begins at [3, 5, 1, 4, 7]. Which cells can pass 2 change?"
  :options="[
    'Any of the five — the pass starts again at index 0',
    'Only indices 0 to 3; index 4 holds the final 7',
    'Only indices 0 and 1, the first pair',
    'None — the array is already in the order the pass needs'
  ]"
  :answer="1"
  :why="[
    'Starting at index 0 is right, but the pass cannot reach index 4: its last comparison is A[2] against A[3].',
    'Correct. The inner loop is j = 0 to n - 2 - i, so with i = 1 the last pair is (2, 3), and the sorted suffix from index 4 is untouchable.',
    'A pass works through the whole unsorted portion, pair by pair — not only the first pair.',
    'The unsorted region [3, 5, 1, 4] is not in order: the 5 sits before the 1 and the 4, so pass 2 has swap work to do.'
  ]"
  group="bubble-idea"
/>

<ScoreBoard group="bubble-idea" label="Bubble sort, from the pseudocode" />

<Recap>

- Bubble sort makes `n - 1` passes, and the outer loop `for i = 0 to n - 2` is
  that sentence written as a loop.
- A pass walks left to right comparing `A[j]` with `A[j + 1]` and swapping when
  the right-hand value is smaller, which drags the largest remaining value to
  the end of the unsorted region.
- The sorted part is a **suffix**: it grows from the right, one cell per pass,
  and `j = 0 to n - 2 - i` is the bound that keeps the pass out of it.
- For five values that is 10 comparisons — 4, 3, 2, 1 — and pass 4 exists to
  confirm the work of pass 3, not to do any.
- The pseudocode has no early exit, so it always makes all `n - 1` passes.

</Recap>

→ Next: **[3.2  The bubble sort trace](/part-3-sorting/bubble-trace)**
