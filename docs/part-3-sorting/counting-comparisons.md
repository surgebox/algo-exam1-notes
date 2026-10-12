---
title: "3.5  How many operations?"
description: "Where n(n − 1)/2 comes from for both sorts, why the two comparison counts are identical while the swap counts are not, and what Θ(n²) means for the exam's pseudocode."
---

# 3.5  How many operations?

<ChapterMeta
  reading-time="14 min"
  :difficulty="4"
  :prerequisites="['3.4  The selection sort trace']"
  you-will-answer="The counts behind questions 4 and 5: 10 and 15 comparisons, 7 and 3 swaps, and why both sorts grow as Θ(n²)."
/>

<ScoreBoard group="sort-counts" label="Counting the sorts" />

Neither question 4 nor question 5 asks you for a count. Both ask for a trace, and
the trace is what you will be marked on.

The counting matters anyway, for two reasons. The first is that questions 1 to 3
on the sheet are entirely about counting and growth rates, and Part 1's habit —
count the work, name the dominant term, give the growth rate — is the habit the
whole exam is testing. The second is that the counts are how you check a trace.
Ten rows and seven swaps are facts about `[7, 3, 5, 1, 4]` that you can predict
before you write a single line of it, and a trace that disagrees with the
prediction has an error in it somewhere.

This chapter is that prediction.

<MentalModel heading="A shrinking loop is added, not multiplied">

In 1.1 you counted a nested loop by multiplying: the outer loop ran `n` times,
the inner loop ran 5 times every time, so the count was `5n`.

Bubble sort and selection sort are not like that. Their inner loops get shorter
as the outer loop advances, because each pass leaves another cell finished and
the pass is not allowed to touch it. There is no single inner length to multiply
by, so you add instead:

- pass 1 does `n - 1` comparisons,
- pass 2 does `n - 2`,
- and the last pass does 1.

The total is the sum `(n - 1) + (n - 2) + … + 1`. Everything interesting about
these two algorithms follows from that sum, and the sum has a closed form:
`n(n - 1)/2`.

</MentalModel>

## Bubble sort: one fewer comparison every pass

Take the count straight off the loop bound. Pass `i` compares pairs with `j`
running from 0 to `n - 2 - i`, which is `n - 1 - i` values of `j`, so:

> pass `i` makes `n - 1 - i` comparisons, for `i = 0` to `n - 2`.

Summing over the passes and reversing the order gives the claim:

```
C(n) = (n - 1) + (n - 2) + ... + 2 + 1
```

For the array in question 4, `n = 5` and the sum is `4 + 3 + 2 + 1 = 10` — the
ten rows you filled in on 3.2. Which is the useful part: the count is not a
coincidence that matches your table, it is the reason your table has ten rows.

## Selection sort: the same sum, from the other loop

Selection sort's inner loop is `for j = i + 1 to n - 1`. Count the values of `j`
in that range: from `i + 1` up to `n - 1` inclusive is `n - 1 - i` of them —
exactly the same number as bubble sort's pass `i`.

> pass `i` makes `n - 1 - i` comparisons, for `i = 0` to `n - 2`.

So selection sort's total is the same sum, and for `n = 6` (question 5) it is
`5 + 4 + 3 + 2 + 1 = 15` — the fifteen comparisons you made across the five rows
of 3.4.

Two different algorithms, two different pseudocode shapes, the same count. That
is not a coincidence either: both of them decide that after pass `i` there are
`i + 1` finished cells, and both of them spend a pass comparing everything that
is left. Bubble sort compares adjacent pairs across the unsorted region;
selection sort compares each remaining value against a running minimum. Both
visit each remaining value once per pass.

## The closed form

The sum has a name and a formula. Here is where the formula comes from, in three
lines, because the exam rewards showing the algebra rather than quoting the
answer.

Write the sum twice, once forwards and once backwards:

```
S = (n - 1) + (n - 2) + ... + 2 + 1
S = 1 + 2 + ... + (n - 2) + (n - 1)
```

Add the two lines together, term by term:

```
2S = n + n + ... + n        (n - 1 copies of n)
2S = n(n - 1)
S  = n(n - 1) / 2
```

So for both sorts:

> **C(n) = n(n − 1) / 2 comparisons.**

Check it against the two arrays in this part. `n = 5` gives `5 × 4 / 2 = 10`.
`n = 6` gives `6 × 5 / 2 = 15`. Both match the traces.

<FillIn
  label="In closed form, the comparisons total to"
  :answer="['n(n-1)/2', 'n(n - 1)/2', '(n^2 - n)/2', '(n² - n)/2']"
  placeholder="a formula in n"
  solution="The sum (n - 1) + (n - 2) + ... + 1 is n(n - 1)/2, for both bubble sort and selection sort."
  hint="Add the sum to itself, backwards, and count the copies of n."
  wide
  group="sort-counts"
/>

<FillIn
  label="So for n = 10, the comparisons total to"
  answer="45"
  :numeric="45"
  placeholder="a number"
  solution="10 × 9 / 2 = 45. Ten passes' worth of work, in 45 comparisons."
  hint="Put n = 10 into the closed form."
  group="sort-counts"
/>

## Growth rate: why this is Θ(n²)

`n(n - 1)/2` is not in the form the exam wants yet. Multiply it out and take the
dominant term, exactly as 1.2 taught:

```
n(n - 1)/2 = (n² - n)/2 = ½n² - ½n
```

The two terms are `½n²` and `½n`. As `n` grows, `n²` outruns `n` by a factor of
`n`, so `½n²` is the dominant term and `½n` is the part you throw away. Throw
away the constant `½` as well, and what is left is `n²`.

That gives the growth rate the sheet would want:

> **C(n) = Θ(n²)** — quadratic. Equivalently, `C(n) = O(n²)`, and also
> `C(n) = Ω(n²)`, which is what the Θ is claiming.

The two halves of that claim are the two proofs from Part 2, and they are both
satisfiable here with small constants: `n(n - 1)/2` is below `n²` for every
`n ≥ 1`, so it is `O(n²)` with `c = 1`; and it is above `¼n²` for every `n ≥ 2`,
so it is `Ω(n²)` with `c = ¼`. You are not asked to write those proofs for the
sorts, but knowing that the constants exist is the difference between quoting
`Θ(n²)` and meaning it.

**What quadratic means in practice.** Not "slower than linear" — a specific,
checkable amount slower. Double the size of the array and you quadruple the
comparisons, because `C(2n) = 2n(2n - 1)/2`, which is about `4 × C(n)`.

| `n` | comparisons, `n(n - 1)/2` | bubble swaps, worst case | selection swaps, at most |
|---|---|---|---|
| 5 | 10 | 10 | 4 |
| 6 | 15 | 15 | 5 |
| 10 | 45 | 45 | 9 |
| 100 | 4 950 | 4 950 | 99 |
| 1 000 | 499 500 | 499 500 | 999 |

Read the last two rows and the two sorts stop looking similar. At `n = 1 000`
both make about half a million comparisons, and one of them performs 499 500
swaps while the other performs at most 999.

<FillIn
  label="The growth rate of the comparison count is"
  :answer="['Θ(n²)', 'Θ(n^2)', 'theta(n²)', 'theta(n^2)', 'O(n²)', 'O(n^2)', 'quadratic']"
  placeholder="O(?) or Θ(?)"
  solution="n²/2 − n/2 has dominant term n²/2; throw the constant away and the growth rate is Θ(n²)."
  hint="Name the dominant term first, then throw away its constant."
  group="sort-counts"
/>

## The same count, completely different swap counts

Identical comparison counts, and swap counts that are not in the same league.
This is the most exam-relevant asymmetry in Part 3, so it is worth understanding
mechanically rather than remembering as a fact.

**Bubble sort swaps inside the inner loop.** Every comparison that finds a pair
out of order performs a swap, so the number of swaps is decided by how badly
ordered the *input* is. `[7, 3, 5, 1, 4]` needed 7 swaps out of a possible 10.
Feed bubble sort an array that is sorted backwards, `[5, 4, 3, 2, 1]`, and every
single comparison swaps: 10 comparisons, 10 swaps. The bound is
`n(n - 1)/2` swaps, which is the same quadratic shape as the comparison count.

**Selection sort swaps outside the inner loop.** One swap per pass, at the end,
and none at all when the minimum never moves. That makes the number of swaps at
most `n - 1` for any input of size `n` — a linear bound. `[8, 4, 6, 2, 7, 1]`
used 3 of its possible 5.

So the two sorts have the same *comparison* cost and wildly different *movement*
cost. Which one is cheaper depends on which operation your machine makes
expensive: comparing two numbers is nearly free, whereas swapping two elements
of a large array means writing to memory twice, and in a database or on disk a
swap can be thousands of times more expensive than a comparison.

<Quiz
  question="Both sorts make n(n − 1)/2 comparisons on an array of size n. Which one makes fewer swaps, and why?"
  :options="[
    'Bubble sort — it moves each value as little as possible, one cell at a time',
    'Selection sort — it makes at most one swap per pass, at the end of the pass',
    'They make the same number of swaps, since they make the same number of comparisons',
    'Neither — the swap count depends only on the array, never on the algorithm'
  ]"
  :answer="1"
  :why="[
    'Moving values one cell at a time is exactly why bubble sort swaps so much: a value that belongs at the far end of the array is swapped on every comparison along the way.',
    'Correct. The swap line sits outside the inner loop, so a pass either swaps once or not at all — at most n − 1 swaps for the whole sort.',
    'The comparison count is shared, and it does not transfer. Bubble sort compares and then often swaps; selection sort compares and only swaps at the very end.',
    'On the same array the algorithms still differ, because the swap is placed differently in the loops. On [7, 3, 5, 1, 4] bubble sort swaps 7 times, and selection sort on the same five values could not swap more than 4 times.'
  ]"
  group="sort-counts"
/>

<UnderTheHood heading="Best case: the already-sorted array">

Here is the question the worksheet's pseudocode invites: the array arrives
sorted, so surely both algorithms can notice and stop?

**Selection sort cannot, and does not try.** It makes `n(n - 1)/2` comparisons
on a sorted array, on a reverse-sorted array, and on every array in between —
the loop bounds do not consult the data at all. Its best case is its worst case
is its only case. It does make zero swaps on sorted input, because every pass
finds `min === i`, but the comparisons, which dominate the count, are unchanged.

**Bubble sort as written cannot either.** The pseudocode's outer loop is
`for i = 0 to n - 2`, with no condition attached, and the inner loop has no way
to report that a pass changed nothing. On sorted input it will still make
`n - 1` passes and `n(n - 1)/2` comparisons, and it will make zero swaps. So
**for the exam, bubble sort as the sheet gives it is Θ(n²), best case
included.** That is the answer to give.

The usual textbook variant adds a flag:

```
    swapped = false
    ... inside the inner loop, when a swap happens ...
        swapped = true
    if swapped == false
        stop        // this pass changed nothing, so the array is sorted
```

With that flag, a sorted array costs one pass — `n - 1` comparisons, no swaps —
and bubble sort's best case becomes `Θ(n)`. It is a real and useful variant, and
it is *not* on the sheet. If a question quotes the worksheet's pseudocode and
asks for the best case, the expected answer is `Θ(n²)`, and saying `Θ(n)` will
lose the marks. If a question asks what change would make it faster, the flag is
the right answer. Read which question you are being asked.

One more consequence worth having in your head: because the flag can only ever
*remove* work, the worst case is unaffected. A reverse-sorted array still makes
every comparison and every swap, which is why the `O(n²)` bound above survives
the variant and only the lower bound improves.

</UnderTheHood>

<Recap>

- Pass `i` of either sort makes `n - 1 - i` comparisons, because `i + 1` cells
  are already finished by then and are out of bounds.
- Adding `(n - 1) + (n - 2) + … + 1` gives `n(n - 1)/2` comparisons for **both**
  sorts: 10 for `n = 5`, 15 for `n = 6`.
- Multiplying out, `n(n - 1)/2 = ½n² − ½n`, so the dominant term is `½n²` and the
  growth rate is `Θ(n²)` — quadratic, which for the sheet is `O(n²)`.
- The comparison counts are identical, and the swap counts are not: bubble sort
  swaps inside the inner loop, up to `n(n - 1)/2` times, while selection sort
  swaps at most once per pass, so at most `n - 1` times.
- The worksheet's pseudocode has no early exit, so for the exam bubble sort is
  `Θ(n²)` in every case. Add a swap flag and its best case becomes `Θ(n)`,
  which is a different question's answer.

</Recap>

→ Next: **[4.1  Calls down, returns up](/part-4-recursion/calls-and-returns)**
