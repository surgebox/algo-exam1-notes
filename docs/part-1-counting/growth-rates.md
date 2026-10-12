---
title: "1.2  Growth rates, and what to throw away"
description: "Why 5n becomes n, why n² + 3n + 40 becomes n², and what the sheet means by the dominant term and the growth rate."
---

# 1.2  Growth rates, and what to throw away

<ChapterMeta
  reading-time="16 min"
  :difficulty="2"
  :prerequisites="['1.1  Counting operations']"
  you-will-answer="The dominant term and growth rate blanks of question 1 — and the habit behind every O on the sheet."
/>

In 1.1 you produced `C(n) = 5n` and wrote down that the growth rate is `O(n)`.
The `5` survived into `C(n)` but not into `O(n)`. That is not an accident, and
understanding exactly what happened to it is most of what Part 2 formalises.

Suppose you count the operations in some other piece of code and get:

```
C(n) = 3n² + 12n + 40
```

Both `5n` and `3n² + 12n + 40` are perfectly good counts. Neither is a growth
rate. Turning one into the other is a deliberate act of throwing things away,
and it is worth being precise about what you are allowed to throw.

<MentalModel heading="Growth rate is about the shape, not the size">

Two algorithms can do wildly different amounts of work and still have the same
growth rate. That sounds wrong until you see the point: growth rate is not
"how much work", it is "how the work responds when n gets bigger".

`5n` and `1000n` are different amounts of work — one is two hundred times the
other. But feed both a ten-times-bigger input and both grow by a factor of ten.
Their shapes are identical.

The whole business of dropping constants and small terms is in service of that
one question: **when n gets large, what dominates?**

</MentalModel>

## The dominant term

The **dominant term** is the term that grows fastest as `n` grows. With large
enough `n`, it is the only term that matters.

Take `C(n) = 3n² + 12n + 40` and put some real numbers in:

| n | 3n² | 12n | 40 | total | share from 3n² |
|---|---|---|---|---|---|
| 1 | 3 | 12 | 40 | 55 | 5% |
| 10 | 300 | 120 | 40 | 460 | 65% |
| 100 | 30 000 | 1 200 | 40 | 31 240 | 96% |
| 1 000 | 3 000 000 | 12 000 | 40 | 3 012 040 | 99.6% |
| 10 000 | 300 000 000 | 120 000 | 40 | 300 120 040 | 99.96% |

Read that last column again. At `n = 1`, the constant `40` is *most* of the
work. At `n = 10 000`, everything except `3n²` has become a rounding error.

So for large inputs, `3n²` is the term that describes the algorithm. That is
why it is called dominant — not because it is biggest at `n = 1`, but because
it wins in the end.

<UnderTheHood heading="Why this feels like cheating, and why it is not">

It is a fair objection: real programs have small inputs, and at `n = 1` the
constant matters. This is true, and algorithm analysis deliberately ignores it.

The reason is that the constant is a property of your *hardware and compiler* —
it changes when you upgrade the machine, or when you turn on optimisation. The
growth rate is a property of the *algorithm*, and it does not change.

So the analysis is answering the question that survives a change of computer:
"if the input gets ten times bigger, what happens?" That is a question you can
answer once and keep.

</UnderTheHood>

## Dropping constants and small terms

Here is the whole method, as three rules. They are applied in this order.

**Rule 1 — drop lower-order terms.** Keep only the fastest-growing term.

```
3n² + 12n + 40   →   3n²
```

`12n` and `40` both grow more slowly than `n²`.

**Rule 2 — drop the constant multiplier.**

```
3n²   →   n²
```

The `3` is a fixed scaling factor. It changes the size of the answer but not
its shape.

**Rule 3 — write it as a bound.**

```
n²   →   O(n²)
```

Now let us apply the same three rules to 1.1's count:

```
C(n) = 5n        (only one term — nothing to drop in rule 1)
     →  n        (rule 2: drop the 5)
     →  O(n)     (rule 3)
```

That is exactly the `O(n)` you wrote on the sheet, and now you can say why.

## The ladder

You will meet a small number of growth rates on this sheet and in the rest of
the course. They are worth knowing in order.

| growth rate | name | typical source |
|---|---|---|
| `O(1)` | constant | a single statement; array indexing |
| `O(log n)` | logarithmic | halving the input each step |
| `O(n)` | linear | one loop over the input |
| `O(n log n)` | linearithmic | good sorting algorithms |
| `O(n²)` | quadratic | two nested loops over the input |
| `O(n³)` | cubic | three nested loops |
| `O(2ⁿ)` | exponential | brute-forcing subsets |

Two things to notice.

**The nested-loop pattern is on the ladder.** One loop over the input is
`O(n)`. Two nested loops are `O(n²)`, which is why 1.1's inner loop matters so
much: had its bound been `n` instead of `5`, the answer would have been
quadratic. *A constant inner bound does not add a level to the ladder.*

**Each row is dramatically worse than the one above it.** At `n = 1 000 000`,
`n log n` is about 20 million operations and `n²` is a trillion. Ordering them
correctly matters far more than any constant.

<Quiz
  question="What is the growth rate of C(n) = 4n² + 200n + 5 000?"
  :options="['O(n²)', 'O(n² + n)', 'O(4n²)', 'O(n³)']"
  :answer="0"
  :why="['Correct: n² is the dominant term, and both the lower terms and the 4 are dropped.', 'Lower-order terms are dropped — a bound never needs to list them.', 'The constant multiplier is dropped too; 4n² and n² have the same shape.', 'There is no n³ term anywhere in this count.']"
  group="growth"
/>

<Quiz
  question="Algorithm A does 1000n operations. Algorithm B does 3n² operations. Which is faster for large n, and why?"
  :options="[
    'A, because its growth rate O(n) is lower than B\'s O(n²)',
    'B, because 3 is smaller than 1000',
    'A, because 1000n is a smaller number than 3n²',
    'It depends — they cross over and neither dominates'
  ]"
  :answer="0"
  :why="[
    'Correct. At n = 1000 they tie; above that A wins and the gap only widens.',
    'The constant is dropped precisely because it does not decide this.',
    'That happens to be true above n = 333, but it is a consequence — the reason is the growth rate.',
    'They do cross (at n = 1000/3 ≈ 333), but after the crossing one stays ahead forever, which is exactly what the growth rate tells you.'
  ]"
  group="growth"
/>

<CommonMistake heading="Writing the dominant term as O(n²) instead of n²">

These are two different blanks on the sheet, and mixing them up costs marks
even when the underlying understanding is fine.

**The dominant term is a term.** It is a piece of the formula you counted, and
it keeps its constant: `3n²`, or `5n`.

**The growth rate is a bound.** It has had the constant removed, and it is
written with a letter in front: `O(n²)`, or `O(n)`.

So for 1.1 the two blanks are:

| blank | answer | note |
|---|---|---|
| Dominant Term | `5n` | a term — the `5` is part of it |
| Growth Rate | `O(n)` | a bound — the `5` is gone |

If your dominant term has an `O` in it, you have answered the wrong blank.

</CommonMistake>

<IfItsWrong error="growth rate: O(5n)" means="you dropped the lower-order terms but not the constant multiplier.">

`O(5n)` is not *wrong* exactly — it is a true statement that has not been
simplified. But it is not the answer the question is looking for, and it will
lose marks.

The convention is that a bound is written in its simplest form. `5n` and `n`
have the same growth rate, so there is no reason to keep the `5`, and keeping
it hides the thing the notation exists to show — that constants do not affect
the shape.

Write `O(n)`.

The same goes for `O(3n² + 12n + 40)`. Simplify it to `O(n²)`.

</IfItsWrong>

<ExerciseBlock heading="Count a variation, then classify it">

Do this one with a pencil before scrolling on. Here is a different loop:

```c
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        count++;
    }
}
```

Write down, in order:

1. the basic operation
2. C(n)
3. the dominant term
4. the growth rate

Then check yourself against the blanks below.

<FillIn label="Basic Operation:" answer="count++" group="growth" />

<FillIn label="C(n) =" :answer="['n^2', 'n2', 'n*n']" hint="both loops now depend on n" solution="n outer steps × n inner steps = n²." group="growth" />

<FillIn label="Dominant Term:" :answer="['n^2', 'n2']" solution="n² is the only term." group="growth" />

<FillIn label="Growth Rate:" :answer="['O(n^2)', 'O(n2)', 'On2']" hint="two nested loops over n" solution="Quadratic." group="growth" />

</ExerciseBlock>

<Recap>

- The **dominant term** is the fastest-growing term in the count — the one that
  wins for large `n`. For `5n` it is `5n`; for `3n² + 12n + 40` it is `3n²`.
- Simplify in three steps: drop lower-order terms, drop the constant
  multiplier, then write it as a bound.
- `5n` → `n` → `O(n)`. That is what happened to the `5`.
- **Dominant term** keeps its constant; **growth rate** does not, and is
  written with an `O`.
- One loop over `n` is `O(n)`. Two nested loops are `O(n²)`. A *constant* inner
  bound does not add a level — that is why question 1 is linear.

</Recap>

→ Next: **[2.1  What O, Ω and Θ claim](/part-2-asymptotics/what-the-claims-mean)**
