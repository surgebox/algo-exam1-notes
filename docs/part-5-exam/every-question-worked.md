---
title: "5.1  Every question, worked"
description: "The practice sheet, question by question, in its own words and its own order — with the working space and the model answer."
---

# 5.1  Every question, worked

<ChapterMeta
  reading-time="35 min"
  :difficulty="3"
  :prerequisites="['4.3  Tracing sum_to_n(4)']"
  you-will-answer="All six questions on the practice sheet, cold."
/>

This is the sheet, reproduced question by question and in order. Each question
appears exactly as it does on the worksheet, with the same blanks. Do the
working on paper — the blanks here are for checking, not for thinking in.

The model answer is behind the fold at the bottom of each question. Open it
only after you have written something down. A model answer you read is worth
almost nothing; a model answer you compare against your own attempt is worth a
great deal.

<ScoreBoard group="exam" label="Everything on this page" />

---

## Question 1 — Counting operations and growth rates

<ExamQuestion
  number="1"
  title="Nested loops"
  prompt="Counting Operations and Growth Rates — Nested Loops."
  marks="4 blanks"
>

The worksheet gives this code:

```c
for (int i = 0; i < n; i++) {
    for (int j = 0; j < 5; j++) {
        count++;
    }
}
```

and this table to complete:

| | answer |
|---|---|
| Basic Operation | |
| C(n) | |
| Dominant Term | |
| Growth Rate | |

**Your working space.** Do it on paper first, then check each blank.

<FillIn label="Basic Operation:" answer="count++" placeholder="which line?" group="exam" />
<FillIn label="C(n) =" answer="5n" group="exam" />
<FillIn label="Dominant Term:" answer="5n" group="exam" />
<FillIn label="Growth Rate:" :answer="['O(n)', 'On', 'linear']" group="exam" />

<template #answer>

**Basic Operation: `count++`**

It is the line the loops exist to run. The loop headers (`i < n`, `j < 5`) and
the increments are bookkeeping that decides how often the work happens; they
are not the work.

**C(n) = 5n**

The outer loop runs `n` times — `i` takes the values `0 … n − 1`. The inner
loop runs 5 times for **each** of those. Nested loops multiply:

```
C(n) = 5 × n = 5n
```

**Dominant Term: `5n`**

There is only one term, so it is trivially dominant. Had the count been
`5n + 3`, the dominant term would still be `5n` — the `3` does not grow.

**Growth Rate: `O(n)` — linear**

Drop the constant multiplier `5`, and what remains is `n`. Doubling `n` doubles
C(n):

| n | C(n) = 5n |
|---|---|
| 10 | 50 |
| 100 | 500 |
| 1 000 | 5 000 |
| 10 000 | 50 000 |

That constant factor of ten per factor of ten is what "linear" means.

**The point of the question.** The inner bound is `5`, a constant, so it does
not add a level to the growth rate. If it had been `j < n`, the answer would
have been `C(n) = n²` and `O(n²)`. The exam is checking that you can tell those
two apart.

<YouShouldSee heading="The whole answer on one line each">

| | answer |
|---|---|
| Basic Operation | `count++` |
| C(n) | `5n` |
| Dominant Term | `5n` |
| Growth Rate | `O(n)` |

</YouShouldSee>

</template>

</ExamQuestion>

---

## Question 2 — Big-O

<ExamQuestion
  number="2"
  title="Big-O upper bound"
  prompt="Show that 2n + 8 = O(n), using c = 4."
  marks="6 blanks"
>

The worksheet states the definition:

> Big-O describes an asymptotic upper bound. We write f(n) = O(g(n)) when we can
> find constants c > 0 and n₀ such that f(n) stays at or below c·g(n) for every
> n ≥ n₀.
>
> 0 ≤ f(n) ≤ c·g(n) for every n ≥ n₀

and gives these blanks:

**Your working space.**

<FillIn label="g(n) =" answer="n" group="exam" />
<FillIn label="Write the inequality:" :answer="['0 <= 2n + 8 <= c*n', '0<=2n+8<=cn', '2n+8<=c*n']" wide group="exam" />
<FillIn label="Substitute c = 4:" :answer="['2n + 8 <= 4n', '2n+8<=4n']" wide group="exam" />
<FillIn label="Solve for n:" :answer="['8 <= 2n', 'n >= 4', '2n >= 8']" wide group="exam" />
<FillIn label="A valid n₀ is:" :numeric="4" answer="n0 = 4" group="exam" />
<FillIn label="Conclusion:" :answer="['2n + 8 = O(n)', '2n+8 = O(n)']" wide group="exam" />

<template #answer>

**g(n) = n**

We are claiming `2n + 8` grows no faster than a multiple of `n`, so the
comparison function is `n` itself. The exam gave you `c = 4`, and `c` is what
supplies the "multiple".

**Write the inequality**

```
0 ≤ 2n + 8 ≤ c·n        for every n ≥ n₀
```

The left-hand `0 ≤` is doing real work: a count of operations is never negative,
and the definition says so explicitly. Write it down — it is part of the
definition and markers look for it.

**Substitute c = 4**

```
2n + 8 ≤ 4n
```

**Solve for n**

```
2n + 8 ≤ 4n
     8 ≤ 4n − 2n
     8 ≤ 2n
     4 ≤ n
```

which is the same statement as `n ≥ 4`.

**A valid n₀ is: 4**

At `n = 4`, both sides are equal: `2(4) + 8 = 16` and `4(4) = 16`. So `≤` holds
at `n = 4` (it is an equality, and equality satisfies `≤`), and the inequality
holds for every larger `n` as well — the right-hand side grows twice as fast.

Check it at `n = 5`: `2(5) + 8 = 18 ≤ 20`. ✓

**Conclusion**

> Since `2n + 8 ≤ 4n` for all `n ≥ 4`, with `c = 4` and `n₀ = 4`, by definition
> `2n + 8 = O(n)`.

<UnderTheHood heading="Why 4 works and 3 does not">

The crossing point is exactly `n = 4`. Below it, the claim is false:

| n | 2n + 8 | 4n | 2n+8 ≤ 4n ? |
|---|---|---|---|
| 2 | 12 | 8 | false |
| 3 | 14 | 12 | false |
| 4 | 16 | 16 | true (equal) |
| 5 | 18 | 20 | true |
| 10 | 28 | 40 | true |

This is why `n₀ = 3` is a wrong answer while `n₀ = 4`, `n₀ = 5` and `n₀ = 100`
are all right. The definition only asks for **a** valid `n₀`, not the smallest
one — but it must actually be valid.

</UnderTheHood>

<IfItsWrong error="n₀ = 3" means="you solved the algebra but did not check the answer against the inequality.">

Three is where people land by off-by-one habit, and it is worth seeing exactly
why it fails.

At `n = 3`: `2(3) + 8 = 14` and `4(3) = 12`. Is `14 ≤ 12`? No.

The algebra said `n ≥ 4`. Three is not `≥ 4`, so the definition is not
satisfied. The fix is not more algebra — it is one substitution, which takes
four seconds and catches this every time.

**Always plug your `n₀` back in.** It is the single highest-value habit on this
exam.

</IfItsWrong>

</template>

</ExamQuestion>

---

## Question 3 — Big-Omega

<ExamQuestion
  number="3"
  title="Big-Omega lower bound"
  prompt="Show that 4n − 12 = Ω(n), using c = 2."
  marks="6 blanks"
>

The worksheet states the definition:

> Big-Omega describes an asymptotic lower bound. We write f(n) = Ω(g(n)) when we
> can find constants c > 0 and n₀ such that f(n) stays at or above c·g(n) for
> every n ≥ n₀.

**Your working space.**

<FillIn label="g(n) =" answer="n" group="exam" />
<FillIn label="Write the inequality:" :answer="['4n - 12 >= c*n', '4n-12>=cn', 'c*n <= 4n - 12', '0 <= c*n <= 4n - 12']" wide group="exam" />
<FillIn label="Substitute c = 2:" :answer="['4n - 12 >= 2n', '4n-12>=2n']" wide group="exam" />
<FillIn label="Solve for n:" :answer="['2n >= 12', 'n >= 6']" wide group="exam" />
<FillIn label="A valid n₀ is:" :numeric="6" answer="n0 = 6" group="exam" />
<FillIn label="Conclusion:" :answer="['4n - 12 = omega(n)', '4n-12 = Omega(n)']" wide group="exam" />

<template #answer>

**g(n) = n**

Same reasoning as question 2 — we are comparing against `n`, and `c = 2`
supplies the multiple.

**Write the inequality**

```
0 ≤ c·n ≤ 4n − 12        for every n ≥ n₀
```

Note the direction. This is the only real difference from the Big-O proof, and
it is where marks are lost. For an upper bound we need `f` **below** the line;
for a lower bound we need `f` **above** it.

**Substitute c = 2**

```
4n − 12 ≥ 2n
```

**Solve for n**

```
4n − 12 ≥ 2n
4n − 2n ≥ 12
     2n ≥ 12
      n ≥ 6
```

**A valid n₀ is: 6**

At `n = 6`: `4(6) − 12 = 12` and `2(6) = 12`, so `≥` holds with equality. And
since the left side grows at 4 per step while the right grows at 2, the gap only
widens.

Check at `n = 7`: `4(7) − 12 = 16 ≥ 14`. ✓

**Conclusion**

> Since `4n − 12 ≥ 2n` for all `n ≥ 6`, with `c = 2` and `n₀ = 6`, by definition
> `4n − 12 = Ω(n)`.

<IfItsWrong error="n₀ = 4" means="you carried the answer over from question 2 instead of solving this one.">

The two proofs look almost identical, and that is what makes this mistake so
easy to make under time pressure. Four was right for `2n + 8 = O(n)`. It is
wrong here.

At `n = 4`: `4(4) − 12 = 4` and `2(4) = 8`. Is `4 ≥ 8`? No.

The cause is the `−12`. `4n − 12` starts *below* `2n` and has to catch up, so
the crossing is further right than it was in the previous question. Solve the
algebra for this function; do not recall the last one.

</IfItsWrong>

<YouShouldSee heading="The two proofs, side by side">

| step | 2n + 8 = O(n), c = 4 | 4n − 12 = Ω(n), c = 2 |
|---|---|---|
| g(n) | n | n |
| inequality | `0 ≤ 2n + 8 ≤ c·n` | `0 ≤ c·n ≤ 4n − 12` |
| substitute | `2n + 8 ≤ 4n` | `4n − 12 ≥ 2n` |
| solve | `8 ≤ 2n` → `n ≥ 4` | `2n ≥ 12` → `n ≥ 6` |
| n₀ | 4 | 6 |
| conclusion | `2n + 8 = O(n)` | `4n − 12 = Ω(n)` |

The algebra is the same four moves each time. The only thing that changes is
which way the inequality points.

</YouShouldSee>

</template>

</ExamQuestion>

---

## Question 4 — Bubble sort trace

<ExamQuestion
  number="4"
  title="Bubble sort full trace"
  prompt="Complete every column for each pass. Starting array: [7, 3, 5, 1, 4]."
  marks="full table + final array"
>

The worksheet gives the pseudocode:

```
BubbleSort(A[0..n - 1])
    for i = 0 to n - 2
        for j = 0 to n - 2 - i
            if A[j + 1] < A[j]
                swap A[j] and A[j + 1]
```

and the tracing method:

1. Start at the left side of the unsorted portion of the array.
2. Compare the adjacent values A[j] and A[j + 1].
3. If the left value is larger than the right value, swap them.
4. Record the comparison, whether a swap occurred, and the updated array.
5. Move one position to the right and repeat until the end of the unsorted portion.
6. After the pass, the largest remaining value is in its final position on the right.

The columns to complete are **Pass / Array at Start / Comparison / Swap? /
Array After Comparison / Array After Pass / Sorted Suffix**, for starting array
`[7, 3, 5, 1, 4]`, followed by **Final Sorted Array**.

**Your working space.** Do this one on paper — all four passes — then check the
answers below. The step player at the bottom of the answer will walk you through
it if you get stuck.

<FillIn label="How many passes?" :numeric="4" group="exam" />
<FillIn label="How many comparisons in total?" :numeric="10" group="exam" />
<FillIn label="How many swaps in total?" :numeric="7" group="exam" />
<FillIn label="Final sorted array:" :answer="['[1, 3, 4, 5, 7]', '1, 3, 4, 5, 7', '1 3 4 5 7']" wide group="exam" />

<template #answer>

**Pass 1.** `n = 5`, so the inner loop runs `j = 0 … 3` — four comparisons.

| j | comparison | swap? | array after |
|---|---|---|---|
| 0 | A[0] = 7 vs A[1] = 3 | yes — 3 < 7 | `[3, 7, 5, 1, 4]` |
| 1 | A[1] = 7 vs A[2] = 5 | yes — 5 < 7 | `[3, 5, 7, 1, 4]` |
| 2 | A[2] = 7 vs A[3] = 1 | yes — 1 < 7 | `[3, 5, 1, 7, 4]` |
| 3 | A[3] = 7 vs A[4] = 4 | yes — 4 < 7 | `[3, 5, 1, 4, 7]` |

Array after pass 1: `[3, 5, 1, 4, 7]`. Sorted suffix: `[7]`.

The `7` did what the name says — it bubbled right, one comparison at a time,
until it hit the end.

**Pass 2.** `i = 1`, so the inner loop runs `j = 0 … 2` — three comparisons. The
`7` is now off limits; the bound `n - 2 - i` does that.

| j | comparison | swap? | array after |
|---|---|---|---|
| 0 | A[0] = 3 vs A[1] = 5 | no — 5 < 3 is false | `[3, 5, 1, 4, 7]` |
| 1 | A[1] = 5 vs A[2] = 1 | yes — 1 < 5 | `[3, 1, 5, 4, 7]` |
| 2 | A[2] = 5 vs A[3] = 4 | yes — 4 < 5 | `[3, 1, 4, 5, 7]` |

Array after pass 2: `[3, 1, 4, 5, 7]`. Sorted suffix: `[5, 7]`.

**Pass 3.** `i = 2`, so `j = 0 … 1` — two comparisons.

| j | comparison | swap? | array after |
|---|---|---|---|
| 0 | A[0] = 3 vs A[1] = 1 | yes — 1 < 3 | `[1, 3, 4, 5, 7]` |
| 1 | A[1] = 3 vs A[2] = 4 | no — 4 < 3 is false | `[1, 3, 4, 5, 7]` |

Array after pass 3: `[1, 3, 4, 5, 7]`. Sorted suffix: `[4, 5, 7]`.

**Pass 4.** `i = 3`, so `j = 0 … 0` — one comparison.

| j | comparison | swap? | array after |
|---|---|---|---|
| 0 | A[0] = 1 vs A[1] = 3 | no — 3 < 1 is false | `[1, 3, 4, 5, 7]` |

Array after pass 4: `[1, 3, 4, 5, 7]`. Sorted suffix: `[3, 4, 5, 7]`.

**Final Sorted Array: `[1, 3, 4, 5, 7]`**

<YouShouldSee heading="The whole trace in the sheet's columns">

| Pass | Array at Start | Comparison | Swap? | Array After Comparison | Array After Pass | Sorted Suffix |
|---|---|---|---|---|---|---|
| 1 | `[7,3,5,1,4]` | 7 vs 3 | yes | `[3,7,5,1,4]` | `[3,5,1,4,7]` | `[7]` |
| 1 | | 7 vs 5 | yes | `[3,5,7,1,4]` | | |
| 1 | | 7 vs 1 | yes | `[3,5,1,7,4]` | | |
| 1 | | 7 vs 4 | yes | `[3,5,1,4,7]` | | |
| 2 | `[3,5,1,4,7]` | 3 vs 5 | no | `[3,5,1,4,7]` | `[3,1,4,5,7]` | `[5,7]` |
| 2 | | 5 vs 1 | yes | `[3,1,5,4,7]` | | |
| 2 | | 5 vs 4 | yes | `[3,1,4,5,7]` | | |
| 3 | `[3,1,4,5,7]` | 3 vs 1 | yes | `[1,3,4,5,7]` | `[1,3,4,5,7]` | `[4,5,7]` |
| 3 | | 3 vs 4 | no | `[1,3,4,5,7]` | | |
| 4 | `[1,3,4,5,7]` | 1 vs 3 | no | `[1,3,4,5,7]` | `[1,3,4,5,7]` | `[3,4,5,7]` |

Final: `[1, 3, 4, 5, 7]` — 4 passes, **10 comparisons, 7 swaps**.

</YouShouldSee>

If any pass went wrong, rewind into it here rather than re-reading the table:

<SortPlayer algorithm="bubble" :initial="[7, 3, 5, 1, 4]" />

<CommonMistake heading="Recording the array after the pass in the comparison column">

The sheet asks for two different arrays and they are easy to conflate:

- **Array After Comparison** is the array *immediately* after one `if` has been
  resolved. In pass 1 it changes four times.
- **Array After Pass** is the array once the whole inner loop has finished. It
  changes once per pass.

In pass 1 the comparison column reads
`[3,7,5,1,4]`, `[3,5,7,1,4]`, `[3,5,1,7,4]`, `[3,5,1,4,7]` — four different
arrays. The pass column reads `[3,5,1,4,7]` once. If your two columns are
identical, you have filled in the pass value four times.

The other version of this mistake is the opposite one: writing the array
*before* the comparison in the comparison column. The column says **after**.

</CommonMistake>

<IfItsWrong error="Pass 2 does 4 comparisons" means="you kept the inner bound at n - 2 instead of n - 2 - i.">

The inner bound is `n - 2 - i`, and `i` is not decoration — it is what makes the
sort terminate with a growing sorted suffix.

Pass 1, `i = 0`: `j` runs `0 … n−2` = `0 … 3` → 4 comparisons.
Pass 2, `i = 1`: `j` runs `0 … n−3` = `0 … 2` → 3 comparisons.
Pass 3, `i = 2`: `j` runs `0 … n−4` = `0 … 1` → 2 comparisons.
Pass 4, `i = 3`: `j` runs `0 … n−5` = `0 … 0` → 1 comparison.

Total: 4 + 3 + 2 + 1 = **10**.

The shrinking bound exists because after pass 1 the largest value is already in
the last slot. Comparing against it again would be wasted work — it cannot move.

</IfItsWrong>

</template>

</ExamQuestion>

---

## Question 5 — Selection sort trace

<ExamQuestion
  number="5"
  title="Selection sort full trace"
  prompt="Complete every column for each pass. Starting array: [8, 4, 6, 2, 7, 1]."
  marks="full table + final array"
>

The worksheet gives the pseudocode:

```
SelectionSort(A[0..n - 1])
    for i = 0 to n - 2
        min = i
        for j = i + 1 to n - 1
            if A[j] < A[min]
                min = j
        swap A[i] and A[min]
```

and the tracing method:

1. Set `i` to the first unsorted position.
2. Set `min = i`. This is where `min` starts for the pass.
3. Scan the remaining unsorted values from left to right.
4. If `A[j] < A[min]`, update `min` to `j`.
5. After the scan ends, record the index and value where the minimum was found.
6. Swap `A[i]` with `A[min]`. The value placed at index `i` is now in its final sorted position.

Plus the worksheet's own reminder: **"Record the minimum only after the entire
unsorted portion has been scanned. Then perform the swap."**

The columns are **Pass / Array at Start / Min Starts At / Min Found / Swap /
Array After Pass**, for starting array `[8, 4, 6, 2, 7, 1]`.

**Your working space.**

<FillIn label="How many passes?" :numeric="5" group="exam" />
<FillIn label="How many comparisons in total?" :numeric="15" group="exam" />
<FillIn label="How many swaps actually happened?" :numeric="3" group="exam" />
<FillIn label="Final sorted array:" :answer="['[1, 2, 4, 6, 7, 8]', '1, 2, 4, 6, 7, 8', '1 2 4 6 7 8']" wide group="exam" />

<template #answer>

**Pass 1.** `i = 0`, `min` starts at index 0. Scan `j = 1 … 5`.

| j | compare | update min? | running min |
|---|---|---|---|
| 1 | A[1] = 4 < A[0] = 8 | yes | index 1 (value 4) |
| 2 | A[2] = 6 < 4 | no | index 1 (value 4) |
| 3 | A[3] = 2 < 4 | yes | index 3 (value 2) |
| 4 | A[4] = 7 < 2 | no | index 3 (value 2) |
| 5 | A[5] = 1 < 2 | yes | index 5 (value 1) |

- **Min starts at:** index 0 (value 8)
- **Min found:** index 5 (value 1)
- **Swap:** `A[0]` and `A[5]`
- **Array after pass:** `[1, 4, 6, 2, 7, 8]`

**Pass 2.** `i = 1`, `min` starts at index 1. Scan `j = 2 … 5`.

| j | compare | update min? | running min |
|---|---|---|---|
| 2 | A[2] = 6 < A[1] = 4 | no | index 1 (value 4) |
| 3 | A[3] = 2 < 4 | yes | index 3 (value 2) |
| 4 | A[4] = 7 < 2 | no | index 3 (value 2) |
| 5 | A[5] = 8 < 2 | no | index 3 (value 2) |

- **Min starts at:** index 1 (value 4)
- **Min found:** index 3 (value 2)
- **Swap:** `A[1]` and `A[3]`
- **Array after pass:** `[1, 2, 6, 4, 7, 8]`

**Pass 3.** `i = 2`, `min` starts at index 2. Scan `j = 3 … 5`.

| j | compare | update min? | running min |
|---|---|---|---|
| 3 | A[3] = 4 < A[2] = 6 | yes | index 3 (value 4) |
| 4 | A[4] = 7 < 4 | no | index 3 (value 4) |
| 5 | A[5] = 8 < 4 | no | index 3 (value 4) |

- **Min starts at:** index 2 (value 6)
- **Min found:** index 3 (value 4)
- **Swap:** `A[2]` and `A[3]`
- **Array after pass:** `[1, 2, 4, 6, 7, 8]`

**Pass 4.** `i = 3`, `min` starts at index 3. Scan `j = 4 … 5`.

- **Min starts at:** index 3 (value 6)
- **Min found:** index 3 (value 6) — nothing smaller was found
- **Swap:** none. `min === i`, so the swap would exchange index 3 with itself.
- **Array after pass:** `[1, 2, 4, 6, 7, 8]`

**Pass 5.** `i = 4`, `min` starts at index 4. Scan `j = 5 … 5`.

- **Min starts at:** index 4 (value 7)
- **Min found:** index 4 (value 7)
- **Swap:** none, `min === i`.
- **Array after pass:** `[1, 2, 4, 6, 7, 8]`

**Final Sorted Array: `[1, 2, 4, 6, 7, 8]`**

<YouShouldSee heading="The whole trace in the sheet's columns">

| Pass | Array at Start | Min Starts At | Min Found | Swap | Array After Pass |
|---|---|---|---|---|---|
| 1 | `[8,4,6,2,7,1]` | index 0 (value 8) | index 5 (value 1) | `A[0]` ↔ `A[5]` | `[1,4,6,2,7,8]` |
| 2 | `[1,4,6,2,7,8]` | index 1 (value 4) | index 3 (value 2) | `A[1]` ↔ `A[3]` | `[1,2,6,4,7,8]` |
| 3 | `[1,2,6,4,7,8]` | index 2 (value 6) | index 3 (value 4) | `A[2]` ↔ `A[3]` | `[1,2,4,6,7,8]` |
| 4 | `[1,2,4,6,7,8]` | index 3 (value 6) | index 3 (value 6) | none — `min` is already `i` | `[1,2,4,6,7,8]` |
| 5 | `[1,2,4,6,7,8]` | index 4 (value 7) | index 4 (value 7) | none — `min` is already `i` | `[1,2,4,6,7,8]` |

Final: `[1, 2, 4, 6, 7, 8]` — 5 passes, **15 comparisons, 3 swaps**.

</YouShouldSee>

<SortPlayer algorithm="selection" :initial="[8, 4, 6, 2, 7, 1]" />

<CommonMistake heading="Performing a swap in passes 4 and 5">

By habit, most people write a swap in every row. In passes 4 and 5 of this
trace, `min` never moves from `i`, so `swap A[i] and A[min]` would exchange a
position with itself.

Look at what that means. If you swap index 3 with index 3, the array is
identical before and after. The *array after pass* column is correct either
way. But the *min found* column should read index 4 (value 7) in pass 5, not
some smaller index, and the *swap* column should say there was nothing to do.

The diagnostic question: **is the value already in the right place?** If the
minimum was found exactly where the scan started, the answer is yes and the
swap is a no-op.

This is also why the answer to "how many swaps?" is **3**, not 5. Only three
passes actually moved anything.

</CommonMistake>

<IfItsWrong error="Min found in pass 1: index 3" means="you stopped the scan early, or recorded the second-smallest value.">

Index 3 holds `2`, which *is* smaller than everything to its left — so it is an
understandable answer. But the scan does not stop at the first improvement.

| index | value | smaller than current min? |
|---|---|---|
| 1 | 4 | yes → min = 1 |
| 2 | 6 | no |
| 3 | 2 | yes → min = 3 |
| 4 | 7 | no |
| **5** | **1** | **yes → min = 5** |

The `1` sits at the very end of the array, which is exactly where a scan that
stops too soon will miss it. That is what the worksheet's reminder is about:
**record the minimum only after the entire unsorted portion has been scanned.**

</IfItsWrong>

</template>

</ExamQuestion>

---

## Question 6 — Recursion

<ExamQuestion
  number="6"
  title="Trace the calls"
  prompt="Two recursions: one that prints on the way down, one that adds on the way up."
  marks="two tables"
>

### 6a — countdown

The worksheet gives:

```python
def countdown(n):
    if n == 0:
        return

    print(n)
    countdown(n - 1)
```

> Trace `countdown(4)`. Record each new function call as the recursion moves
> toward the base case.

Columns: **Step / Current Call / Value of n / What happens next?**

**Your working space.**

<FillIn label="Output of countdown(4):" :answer="['4 3 2 1', '4, 3, 2, 1', '4321']" wide group="exam" />
<FillIn label="How many calls are made?" :numeric="5" group="exam" />
<FillIn label="How many numbers are printed?" :numeric="4" group="exam" />

### 6b — sum_to_n

The worksheet gives:

```python
def sum_to_n(n):
    if n == 0:
        return 0

    return n + sum_to_n(n - 1)
```

> Trace `sum_to_n(4)`. First record the calls going down. Then record the
> returned values coming back up.

Columns: **Call phase / Pending expression / Return phase.**

**Your working space.**

<FillIn label="sum_to_n(4) =" :numeric="10" group="exam" />

<template #answer>

### 6a — countdown(4)

| Step | Current Call | Value of n | What happens next? |
|---|---|---|---|
| 1 | `countdown(4)` | 4 | Print 4, then call `countdown(3)` |
| 2 | `countdown(3)` | 3 | Print 3, then call `countdown(2)` |
| 3 | `countdown(2)` | 2 | Print 2, then call `countdown(1)` |
| 4 | `countdown(1)` | 1 | Print 1, then call `countdown(0)` |
| 5 | `countdown(0)` | 0 | `n == 0`, so the base case fires: return, printing nothing |

**Output: `4 3 2 1`**

Two numbers that are easy to swap:

- **5 calls** were made — `countdown(4)` down to `countdown(0)`.
- **4 numbers** were printed — `countdown(0)` prints nothing, because it returns
  before reaching `print(n)`.

The work here happens on the way **down**. Each call prints *before* it
recurses, which is why the output comes out in descending order.

<RecursionStack mode="countdown" :n="4" />

### 6b — sum_to_n(4)

**Call phase — going down.** Each frame holds an expression it cannot finish
yet, because it is still waiting on the call it made.

| Call phase | Pending expression |
|---|---|
| `sum_to_n(4)` | `4 + sum_to_n(3)` |
| `sum_to_n(3)` | `3 + sum_to_n(2)` |
| `sum_to_n(2)` | `2 + sum_to_n(1)` |
| `sum_to_n(1)` | `1 + sum_to_n(0)` |
| `sum_to_n(0)` | base case — returns 0 immediately |

**Return phase — coming back up.** Now the stack unwinds, smallest first, and
each frame finally has a number to add.

| Return phase | value |
|---|---|
| `sum_to_n(0)` | `0` (the base case) |
| `sum_to_n(1)` | `1 + 0 = 1` |
| `sum_to_n(2)` | `2 + 1 = 3` |
| `sum_to_n(3)` | `3 + 3 = 6` |
| `sum_to_n(4)` | `4 + 6 = 10` |

**`sum_to_n(4) = 10`**

The work here happens on the way **up**. Nothing can be added until the base
case has been reached: every frame is holding `n + <something I do not know
yet>`. That is the single most important thing to understand about this
function, and it is the reason the worksheet asks for both phases separately.

<RecursionStack mode="sum" :n="4" />

<IfItsWrong error="sum_to_n return phase: 4, 7, 9, 10, 10" means="you added the returned value to the pending expression in the wrong order.">

This is what happens when you read the call phase top-down and treat it as
already-solved arithmetic: `4 + 3 = 7`, `7 + 2 = 9`, and so on. The numbers look
plausible, but they are not what the machine does.

The machine cannot do that. When `sum_to_n(4)` runs, `sum_to_n(3)` has not
returned yet — there is no value to add 4 to. Every frame is blocked until the
base case unblocks it.

So the additions happen in reverse: `1 + 0` first, then `2 + 1`, then `3 + 3`,
then `4 + 6`.

On this particular function the total happens to come out the same either way,
because addition is associative. The *sequence* does not, and the exam asks for
the sequence.

</IfItsWrong>

<CommonMistake heading="Answering 5 for the number of prints in countdown(4)">

The count of *calls* is 5 and the count of *prints* is 4, and they are one apart
for an easy reason: `countdown(0)` never reaches the `print` statement.

```python
def countdown(n):
    if n == 0:
        return          # ← countdown(0) leaves here

    print(n)            # ← every other call reaches here
    countdown(n - 1)
```

So the calls are `countdown(4)`, `(3)`, `(2)`, `(1)`, `(0)` — five — and the
prints are 4, 3, 2, 1 — four.

The general shape: a recursion from `n` down to `0` makes **n + 1** calls, and
this particular one makes **n** prints.

</CommonMistake>

</template>

</ExamQuestion>

<Recap>

- **Question 1:** basic operation `count++`, `C(n) = 5n`, dominant term `5n`,
  growth rate `O(n)`.
- **Questions 2 and 3:** the same four algebraic moves each time; only the
  direction of the inequality changes. `n₀ = 4` for the O proof, `n₀ = 6` for
  the Ω proof.
- **Question 4:** bubble sort on `[7,3,5,1,4]` gives `[1,3,4,5,7]` in 4 passes,
  10 comparisons and 7 swaps. The comparison column changes every step; the
  pass column changes once per pass.
- **Question 5:** selection sort on `[8,4,6,2,7,1]` gives `[1,2,4,6,7,8]` in 5
  passes, 15 comparisons and **3** swaps. Passes 4 and 5 swap nothing.
- **Question 6:** `countdown(4)` prints `4 3 2 1` (5 calls, 4 prints);
  `sum_to_n(4) = 10`, built up as `0 → 1 → 3 → 6 → 10`.

</Recap>

→ Next: **[5.2  Blank-sheet rehearsal](/part-5-exam/rehearsal)**
