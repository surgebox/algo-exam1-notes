---
title: "4.2  Tracing countdown(4)"
description: "The first half of question 6, done the way the worksheet asks for it: one row per call, down to the base case, plus the two counts that are easy to get wrong."
---

# 4.2  Tracing countdown(4)

<ChapterMeta
  reading-time="12 min"
  :difficulty="2"
  :prerequisites="['4.1  Calls down, returns up']"
  you-will-answer="The countdown(4) half of question 6: the call table, the printed output, and the number of calls versus the number of prints."
/>

<ScoreBoard group="countdown" label="countdown(4)" />

The worksheet hands you a table with four columns — Step, Current Call, Value of
n, What happens next? — fills in the first two, and leaves the rest to you. Ten
blanks, one function, four lines of Python.

The two blank columns are asking different questions, which is why they are
worth separating before you start writing:

- **Value of n** is what that frame has in hand. It is a fact about the frame.
- **What happens next?** is what that frame *does* with it. It is a fact about
  the code — the body read in order, starting from the top.

Answer the second one by reading the body, never by pattern-matching the rows
around it. Rows 1 to 4 look identical in shape, and row 5 is where a trace done
by pattern goes wrong.

<MentalModel heading="The base case is a call, not an absence">

`countdown(0)` is not the moment the recursion stops existing. It is a real
call, with a real frame, that runs two lines and returns without printing
anything.

That is why the table has **five** rows and the output has **four** numbers. The
counts disagree because one of the five calls has nothing to print — and it is
the call sitting at the bottom of the staircase, the one the whole descent was
aiming at.

When a count in this question surprises you, look at the base-case row first. It
is almost always the row that did it.

</MentalModel>

## Step it before you write it

Do not fill the table in from memory. Run the recursion first, one frame at a
time.

<RecursionStack mode="countdown" :n="4" />

Use the single-step arrow rather than Play. At a frame every 1.4 seconds, Play
is fast enough to watch and too fast to write: by the time you have decided what
`countdown(2)` is going to do, `countdown(0)` has already been and gone.

Read two things per step. First the topmost frame — that is the call currently
running, and its pending text tells you what it is about to do. Then the output
panel: it is the print sequence as it is being built, which is the answer to the
first blank of the chapter.

<YouShouldSee heading="Four frames down, four numbers printed">

Stepping through `countdown(4)` you should see exactly five frames exist, in this
order, and no others: `countdown(4)`, `countdown(3)`, `countdown(2)`,
`countdown(1)`, `countdown(0)`.

The output panel should accumulate `4`, then `3`, then `2`, then `1` — one
number per frame, appearing as each frame is created. On the fifth frame nothing
is added, because `countdown(0)` takes the `if` branch and returns immediately.

Then watch the up phase, and check that the output panel does not change at all.
Four frames disappear, the output stays `4 3 2 1`, and the stack ends up empty.
If your written trace has anything happening in the output column after the
turnaround, re-read 4.1 before filling the table in.

</YouShouldSee>

## The table the worksheet wants

Now put it on paper. Same four columns as the sheet; Step and Current Call are
given to you, so the work is the other two.

<TraceTable
  title="countdown(4), one row per call"
  group="countdown"
  caption="Value of n is the argument that frame holds. What happens next? is the body of the function applied to that value, read from the top."
  :columns="['Step', 'Current Call', 'Value of n', 'What happens next?']"
  :rows="[
    [1, 'countdown(4)', { numeric: 4, ph: 'n = ?' }, { answer: ['print 4, then call countdown(3)', 'print 4 then call countdown(3)', 'print 4, then countdown(3)', 'print 4 then countdown(3)'], ph: 'what does this frame do?', wide: true }],
    [2, 'countdown(3)', { numeric: 3, ph: 'n = ?' }, { answer: ['print 3, then call countdown(2)', 'print 3 then call countdown(2)', 'print 3, then countdown(2)', 'print 3 then countdown(2)'], ph: 'what does this frame do?', wide: true }],
    [3, 'countdown(2)', { numeric: 2, ph: 'n = ?' }, { answer: ['print 2, then call countdown(1)', 'print 2 then call countdown(1)', 'print 2, then countdown(1)', 'print 2 then countdown(1)'], ph: 'what does this frame do?', wide: true }],
    [4, 'countdown(1)', { numeric: 1, ph: 'n = ?' }, { answer: ['print 1, then call countdown(0)', 'print 1 then call countdown(0)', 'print 1, then countdown(0)', 'print 1 then countdown(0)'], ph: 'what does this frame do?', wide: true }],
    [5, 'countdown(0)', { numeric: 0, ph: 'n = ?' }, { answer: ['base case: return without printing anything, no further call is made', 'n == 0, so the base case fires: return with nothing printed, no further call is made', 'the base case fires and returns without printing anything', 'return without printing anything'], ph: 'what does this frame do?', wide: true }],
  ]"
/>

Two rows are worth saying out loud, because they are the two the exam is
testing.

**Row 4 is the last row with a print in it.** `countdown(1)` prints 1 and then
calls `countdown(0)`. It does not know that the call it is about to make will
print nothing — and it does not care. Reading the body is enough to write the
row.

**Row 5 is not a special case of the pattern; it is the pattern ending.** The
condition `n == 0` is true, so the body stops at the bare `return`. No print, no
recursive call, and therefore no sixth row.

## The output, in order

The prints happen on the way down, before each recursive call, so the output
order is the order of the calls.

<FillIn
  label="countdown(4) prints, in order:"
  answer="4 3 2 1"
  placeholder="the numbers, separated by spaces"
  solution="The print is the statement before the recursive call, so each frame prints its own n as it is created: 4, then 3, then 2, then 1. The base-case call prints nothing, so the sequence ends at 1 and never reaches 0."
  group="countdown"
  wide
/>

This is the same fact as "the work happens on the way down" in 4.1, turned into
an answer you can write in one line. If the descent is 4, 3, 2, 1, 0 then the
prints are the first four of those, in that order.

## Five calls, four prints

Now the two counts. They are the reason markers like this question: the numbers
are close together, and one of them includes a call that produces nothing.

<FillIn
  label="How many calls to countdown are made in total?"
  :numeric="5"
  placeholder="a number"
  solution="One call for each value of n that is reached: countdown(4), countdown(3), countdown(2), countdown(1) and countdown(0). The base-case call counts, because it is a real call — it is a call that prints nothing, not a call that does not happen."
  group="countdown"
/>

<FillIn
  label="How many numbers does countdown(4) print?"
  :numeric="4"
  placeholder="a number"
  solution="4 is printed by countdown(4), 3 by countdown(3), 2 by countdown(2) and 1 by countdown(1). countdown(0) takes the if branch and returns, so it prints nothing. Four prints."
  group="countdown"
/>

The gap between the two answers is the base case, and nothing else. One call
exists purely to stop the recursion, so it adds a row to the call table and
contributes nothing to the output.

If you want a check that generalises: for `countdown(n)` there are `n + 1` calls
and `n` prints, for any `n` at or above 0. Both numbers come from the same walk
down the staircase — the calls count every step, the prints count every step
except the floor.

<CommonMistake heading="Answering 5 to the prints">

Everything in this chapter comes in fives. Five rows in the table, five
arguments mentioned, five frames on the staircase, and the first blank you are
asked for is the number of calls, which is 5.

So "how many numbers are printed?" gets answered 5, by carrying the previous
answer across. It looks right on the page, it matches the table above it, and it
costs a mark — because `countdown(0)` never reaches the `print(n)` line at all.
It returns from inside the `if`.

The fix is not to be more careful. It is to answer the two questions from
different evidence: count the calls by counting rows in the trace table, and
count the prints by counting entries in the output column. Two counts, two
sources, and the disagreement between them is real information rather than an
arithmetic slip.

</CommonMistake>

<IfItsWrong error="output: 4 3 2 1 0" means="you counted the base-case call as a print, which is the same mistake as answering 5 to the number of prints.">

The trace that produces this answer is usually self-consistent: five rows down
to `countdown(0)`, then five numbers written in the output line, one per row.
The row-to-output mapping is the error. `countdown(0)` has nothing to print, so
it contributes a call and no output.

On the worksheet this is worth checking explicitly, because the two numbers you
are asked for — how many calls, how many prints — are different numbers, and a
marker will treat a matching pair as two separate errors rather than one
oversight.

The rule that catches it in one second: **the output has one entry per call that
reaches `print(n)`**. `countdown(0)` does not reach that line, because the `if`
above it fires first.

</IfItsWrong>

<ExerciseBlock heading="Predict countdown(6)" level="one minute">

The panel on this page is fixed at `n = 4`, so do this one on paper. Answer all
three questions before you check them:

1. What is printed, in order?
2. How many calls are made?
3. How many numbers are printed?

The pattern from this chapter gives you all three: the prints are the arguments
from the starting value down to 1, the calls also include the floor, and the
number of prints is one fewer than the number of calls.

<FillIn
  label="countdown(6) prints:"
  answer="6 5 4 3 2 1"
  placeholder="the numbers, separated by spaces"
  group="countdown"
  wide
/>

<FillIn
  label="Calls made:"
  :numeric="7"
  placeholder="a number"
  group="countdown"
/>

<FillIn
  label="Numbers printed:"
  :numeric="6"
  placeholder="a number"
  group="countdown"
/>

The answers are `6 5 4 3 2 1`, seven calls and six prints — but the point of the
exercise is to have committed to that *before* checking, because that is exactly
what the exam asks you to do with `countdown(4)`.

</ExerciseBlock>

<Recap>

- `countdown(4)` makes **five** calls — `countdown(4)` down to `countdown(0)` —
  and prints **four** numbers: `4 3 2 1`.
- Every row of the worksheet table is the body of the function applied to that
  frame's own `n`: print `n`, then call the function on `n - 1`.
- The last row is the base case. `countdown(0)` returns without printing and
  without calling again, which is what ends the table.
- The prints happen on the way down, so the output order is the same as the
  order of the calls, and the up phase produces no output at all.
- For `countdown(n)`: `n + 1` calls and `n` prints. The base case is the call
  that adds a row and no number.

</Recap>

→ Next: **[4.3  Tracing sum_to_n(4)](/part-4-recursion/sum-to-n)**
