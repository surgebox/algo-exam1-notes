---
title: "5.3  Cheat sheet"
description: "The whole exam on one page: the four moves of a proof, the two traces, the two recursions, and the checks that catch the common errors."
---

# 5.3  Cheat sheet

<ChapterMeta
  reading-time="8 min"
  :difficulty="1"
  :prerequisites="['5.2  Blank-sheet rehearsal']"
  you-will-answer="Nothing new — this is the page you re-read on the way in."
/>

Everything on the sheet, compressed. This is a revision page, not a teaching
page: if anything here is not obvious, follow the link back to the chapter that
explains it.

## The six questions and their answers

| # | asked | answer |
|---|---|---|
| 1 | nested loop, inner bound 5 | basic op `count++`; `C(n) = 5n`; dominant term `5n`; growth rate `O(n)` |
| 2 | `2n + 8 = O(n)`, `c = 4` | `g(n) = n`; `2n + 8 ≤ 4n`; `8 ≤ 2n`; `n ≥ 4`; **`n₀ = 4`** |
| 3 | `4n − 12 = Ω(n)`, `c = 2` | `g(n) = n`; `4n − 12 ≥ 2n`; `2n ≥ 12`; `n ≥ 6`; **`n₀ = 6`** |
| 4 | bubble sort `[7,3,5,1,4]` | `[1,3,4,5,7]` — 4 passes, 10 comparisons, 7 swaps |
| 5 | selection sort `[8,4,6,2,7,1]` | `[1,2,4,6,7,8]` — 5 passes, 15 comparisons, 3 swaps |
| 6 | `countdown(4)`, `sum_to_n(4)` | prints `4 3 2 1`; `sum_to_n(4) = 10` |

## The four moves of a bound proof

Both proofs use the same four moves. Only the direction of the inequality
changes.

1. **Name `g(n)`.** What are you comparing against? Usually `n`.
2. **Write the definition's inequality,** with `c` still a letter. Include the
   `0 ≤` on the left — it is part of the definition.
3. **Substitute `c`** and solve for `n`.
4. **Name `n₀`** and then **check it** by substituting back in.

| | Big-O | Big-Omega |
|---|---|---|
| claim | `f(n) = O(g(n))` | `f(n) = Ω(g(n))` |
| meaning | upper bound | lower bound |
| inequality | `0 ≤ f(n) ≤ c·g(n)` | `0 ≤ c·g(n) ≤ f(n)` |
| the picture | `f` ends up **below** `c·g` | `f` ends up **above** `c·g` |

## The two traces

### Bubble sort

```
BubbleSort(A[0..n - 1])
    for i = 0 to n - 2
        for j = 0 to n - 2 - i
            if A[j + 1] < A[j]
                swap A[j] and A[j + 1]
```

- Each pass drags the largest remaining value to the **right**, so the **sorted
  suffix** grows: after pass 1 the last slot is final, after pass 2 the last
  two, and so on.
- The inner bound `n - 2 - i` shrinks by one per pass — that is the same fact,
  written down.
- Comparisons in pass `i` = `n − 1 − i`. Total = `n(n−1)/2`.

### Selection sort

```
SelectionSort(A[0..n - 1])
    for i = 0 to n - 2
        min = i
        for j = i + 1 to n - 1
            if A[j] < A[min]
                min = j
        swap A[i] and A[min]
```

- Each pass finds the smallest remaining value and moves it to the **left**, so
  the **sorted prefix** grows.
- `min` holds an **index**, not a value. The comparison is always
  `A[j] < A[min]`.
- The scan starts at `i + 1`, because `A[i]` is already the running minimum.
- Record the minimum only **after** the whole scan — a smaller value can be
  anywhere, including the last slot.
- Comparisons in pass `i` = `n − 1 − i`. Total = `n(n−1)/2`.

## The two recursions

```python
def countdown(n):          # work happens on the way DOWN
    if n == 0:
        return             # base case
    print(n)               # prints before recursing
    countdown(n - 1)
```

`countdown(4)` → prints `4 3 2 1`. **5 calls, 4 prints** — `countdown(0)` prints
nothing.

```python
def sum_to_n(n):           # work happens on the way UP
    if n == 0:
        return 0           # base case
    return n + sum_to_n(n - 1)
```

Call phase: `4 + sum_to_n(3)` → `3 + sum_to_n(2)` → `2 + sum_to_n(1)` →
`1 + sum_to_n(0)` → base case.

Return phase: `0` → `1` → `3` → `6` → **`10`**.

The additions run **bottom-up**, because no frame can add anything until the
base case has handed a number back.

## Checks that catch the common errors

Run these before you hand in. Each takes seconds and each one catches a
mistake that costs marks.

| check | catches |
|---|---|
| Plug your `n₀` back into the inequality | `n₀ = 3` (should be 4); `n₀ = 4` on the Ω proof (should be 6) |
| Count the blanks your proof filled | a proof that "shows" the answer without naming `c` and `n₀` |
| Does the inner loop bound mention `i`? | doing `n − 1` comparisons in every bubble pass |
| Is the array after the **pass** the same as after the **last comparison**? | only in the final pass — if they match everywhere, you filled one column twice |
| Did `min` actually move in that pass? | writing a swap in selection passes 4 and 5 |
| Is `countdown(0)` counted as a *print*? | answering 5 prints instead of 4 |
| Is the return phase written smallest-first? | writing the additions in call order |

## Vocabulary, in one line each

- **Basic operation** — the single line whose repetition you are counting.
- **C(n)** — the number of basic operations, as a function of input size `n`.
- **Dominant term** — the fastest-growing term; keeps its constant (`5n`,
  `3n²`).
- **Growth rate** — the bound, constants dropped (`O(n)`, `O(n²)`).
- **`O(g(n))`** — asymptotic upper bound: `f` is eventually at or below `c·g`.
- **`Ω(g(n))`** — asymptotic lower bound: `f` is eventually at or above `c·g`.
- **`c`** — the constant multiplier in the definition. Any positive value that
  works is correct.
- **`n₀`** — the input size from which the claim starts holding. Everything
  below it is unconstrained.
- **Base case** — the condition that stops a recursion.
- **Call stack** — the frames of unfinished calls. A frame cannot finish until
  the call it made finishes.

## The one habit

The single highest-value thing on this page: **check your answer by
substituting it back in.** `n₀`, the array after a pass, `sum_to_n(4)` — all of
them are verifiable in seconds, and almost every lost mark on this sheet comes
from an answer that was never checked.

<Recap>

- Six questions, six answers, all on this page.
- Both proofs are the same four moves; only the inequality direction changes.
- Bubble grows a sorted suffix; selection grows a sorted prefix.
- Both sorts do `n(n−1)/2` comparisons. Only the swaps differ: up to `n−1` for
  selection, up to `n(n−1)/2` for bubble.
- `countdown` works on the way down; `sum_to_n` works on the way up.
- Substitute your answer back in. Every time.

</Recap>

→ Back to the start: **[What this book is](/introduction/what-this-book-is)**
