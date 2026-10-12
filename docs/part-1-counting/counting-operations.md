---
title: "1.1  Counting operations"
description: "The first question on the sheet: pick the basic operation, count how many times it runs, and write the count as a formula in n."
---

# 1.1  Counting operations

<ChapterMeta
  reading-time="14 min"
  :difficulty="2"
  :prerequisites="['How to use it']"
  you-will-answer="Question 1: the basic operation, C(n), the dominant term and the growth rate."
/>

The first question on the sheet is this:

```c
for (int i = 0; i < n; i++) {
    for (int j = 0; j < 5; j++) {
        count++;
    }
}
```

and it asks for four things: the **basic operation**, **C(n)**, the **dominant
term**, and the **growth rate**.

It looks like a trick question, because the inner bound is the constant `5`
rather than `n`. It is not a trick. It is the cleanest possible version of the
thing the whole exam is about: *how many times does the work happen, as a
function of how big the input is?*

That question has one word in it that does all the work — **as a function of**.
You are not being asked how long the loop takes. You are being asked how the
amount of work *changes* when `n` changes. That is why there is a formula and
not a number.

<MentalModel heading="Count the innermost thing, then multiply outwards">

Find the one line that does the actual work. That line runs some number of
times. Everything else in the code exists to decide how many times.

Here the line that does the work is `count++`. So the entire question is: how
many times does `count++` run?

Work outwards. The inner loop runs 5 times per outer step. The outer loop takes
`n` such steps. So `count++` runs `5n` times. That is the whole answer, and the
rest is vocabulary.

</MentalModel>

## What counts as "the basic operation"

A **basic operation** is the single line whose repetition you are measuring. It
should be the operation the algorithm exists to perform — the thing whose count
you would put on a chart.

In this loop, the candidates are:

| line | is it the basic operation? | why |
|---|---|---|
| `i++` | no | bookkeeping. It runs once per outer step, but it is not the work. |
| `j++` | no | same, one level in. |
| `i < n` | no | a loop test, not the work. |
| `count++` | **yes** | this is the line the loop exists to run. |

The exam's blank wants you to name the line, so answer `count++`.

Two things are worth saying out loud about this choice, because they will come
back in Part 3.

**You are allowed to choose, as long as you say what you chose and stay
consistent.** If you decided the basic operation was the comparison in the
inner loop header instead, you would get a slightly different formula — but the
same growth rate. What you may not do is count one thing while the question
asked about another.

**The basic operation's count is what C(n) means.** `C(n)` is "the number of
basic operations, for an input of size n". It is a function, not a number,
because the answer depends on `n`.

## Counting it

Here is the loop with one square per run of `count++`. The squares are laid out
the way the loops lay them out: one row per outer iteration, one column per
inner iteration.

<OpGrid :initial-n="6" :inner-count="5" op="count++" />

Press **Run** and watch the squares fill in order. The pattern worth noticing is
that the count goes up by exactly 5, every time, forever. Not 5, then 6, then
7 — a flat 5 per row.

That is what the constant bound buys you, and it is why this is the easy case.

### The outer loop

```c
for (int i = 0; i < n; i++)
```

`i` takes the values `0, 1, 2, …, n − 1`. That is **n** iterations. Count them
on your fingers with `n = 4`: `0, 1, 2, 3` — four of them. This off-by-one is
the single most common source of lost marks in the whole exam, and it is worth
being mechanical about:

> A loop running from `0` **while** `i < n` runs exactly `n` times.
> A loop running `for i = 0 to n - 2` runs exactly `n − 1` times.

The second one is the one used by both sorting algorithms on this sheet. Check
it with `n = 5`: `0, 1, 2, 3` is four values, and `n − 1 = 4`. ✓

### The inner loop

```c
for (int j = 0; j < 5; j++)
```

This one does not mention `n` at all. `j` takes the values `0, 1, 2, 3, 4` —
**5** iterations, no matter what `n` is. It is a constant, and constants are
about to become very disposable.

### Putting them together

The inner loop is *inside* the outer loop, so it starts over from scratch every
time the outer loop ticks. The inner loop runs 5 times, and then it runs 5 more
times at the next `i`, and so on for `n` values of `i`:

```
total = (runs per outer step) × (number of outer steps)
      = 5 × n
      = 5n
```

So:

- **Basic operation**: `count++`
- **C(n)** = `5n`
- **Dominant term**: `5n`
- **Growth rate**: `O(n)` — linear

<YouShouldSee>

The four blanks on the sheet, filled in:

| blank | answer |
|---|---|
| Basic Operation | `count++` |
| C(n) | `5n` |
| Dominant Term | `5n` |
| Growth Rate | `O(n)` |

</YouShouldSee>

## Check yourself

<ScoreBoard group="counting" label="Counting operations" />

<FillIn
  label="Basic Operation:"
  answer="count++"
  placeholder="the line that does the work"
  solution="count++ is the line the loop exists to run."
  group="counting"
/>

<FillIn
  label="C(n) ="
  answer="5n"
  hint="runs per outer step × number of outer steps"
  solution="The inner loop runs 5 times, and the outer loop has n steps, so C(n) = 5n."
  group="counting"
/>

<FillIn
  label="Dominant Term:"
  answer="5n"
  solution="There is only one term in 5n, so it is its own dominant term."
  group="counting"
/>

<FillIn
  label="Growth Rate:"
  answer="O(n)"
  hint="does the count double when n doubles?"
  solution="Doubling n doubles C(n), so the growth is linear: O(n)."
  group="counting"
/>

<Quiz
  question="If the inner loop were `for (int j = 0; j < n; j++)` instead of `j < 5`, what would C(n) be?"
  :options="['n', '5n', 'n²', 'n² + 5']"
  :answer="2"
  :why="['That would be right if the loops were not nested.', 'That is the count for the original code, with the constant 5.', 'Correct: n outer steps × n inner steps = n² basic operations.', 'There is no added constant here — the addition would come from counting the loop tests, which this question does not do.']"
  group="counting"
/>

<CommonMistake heading="Answering `n` because you only looked at the outer loop">

Writing `C(n) = n` is the most common wrong answer to this question, and it
comes from a specific habit: reading the outer loop header, seeing `i < n`,
writing `n`, and stopping.

The inner loop is not decoration. It runs 5 times for *every* value of `i`, so
the body executes 5 times more often than the outer loop ticks. The correct
answer has the `5` in it.

There is a quick sanity check that catches this. Ask: what is different about
the code that runs `C(n)` times, compared to the code that runs `n` times? If
you cannot point at a line, you have probably skipped a level of nesting.

</CommonMistake>

<IfItsWrong error="C(n) = n + 5" means="you added the two loop counts instead of multiplying them.">

Addition is what you do for loops that run **one after the other**. This is the
other case:

```c
for (int i = 0; i < n; i++) { ... }   // n operations
for (int j = 0; j < 5; j++) { ... }   // 5 operations
// total: n + 5
```

Nested loops multiply, because the inner loop is restarted by the outer one:

```c
for (int i = 0; i < n; i++) {
    for (int j = 0; j < 5; j++) { ... }   // 5 operations, n times over
}
// total: 5n
```

The test is to ask what happens to the inner loop's executions when the outer
loop ticks. If the answer is "they all happen again", multiply.

</IfItsWrong>

<UnderTheHood heading="Why the loop tests do not change the answer">

Strictly, `count++` is not the only thing that executes. Each `i < n` test
runs n + 1 times (the extra one is the test that fails and ends the loop), and
`i++` runs n times. A fully literal count would be something like

```
C(n) = 5n + 2n + 1 + … 
```

and the `5` would become a `7`, and so on.

This does not matter, and it is worth understanding *why* it does not matter,
because that reason is the entire subject of 1.2. The extra terms are all
proportional to `n` (or constant), and the growth rate only cares about the
shape — `7n` and `5n` grow at exactly the same rate.

The exam avoids the ambiguity by naming a single basic operation. When a
question does that, count only that line. When a question does *not* name one,
say which line you counted — that is what makes an answer defensible.

</UnderTheHood>

<Recap>

- The **basic operation** is the single line whose repetition you are counting.
  Here it is `count++`.
- `C(n)` means "how many basic operations, as a function of the input size n".
- Nested loops **multiply**: the inner loop runs 5 times, and the outer loop
  makes that happen n times, so `C(n) = 5n`.
- A loop `for i = 0 to n - 2` runs `n − 1` times, not `n`. Both sorting
  algorithms on this sheet start that way.
- The dominant term is `5n`, and the growth rate is `O(n)` — linear.

</Recap>

→ Next: **[1.2  Growth rates, and what to throw away](/part-1-counting/growth-rates)**
