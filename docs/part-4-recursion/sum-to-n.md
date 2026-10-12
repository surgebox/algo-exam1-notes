---
title: "4.3  Tracing sum_to_n(4)"
description: "The second half of question 6: the calls going down with their pending additions, then the values coming back up, ending at sum_to_n(4) = 10."
---

# 4.3  Tracing sum_to_n(4)

<ChapterMeta
  reading-time="15 min"
  :difficulty="3"
  :prerequisites="['4.2  Tracing countdown(4)']"
  you-will-answer="The sum_to_n(4) half of question 6: the call phase with its pending expressions, the return phase with its values, and the final total."
/>

<ScoreBoard group="sum-to-n" label="sum_to_n(4) — calls and returns" />

This half of question 6 is harder than the last one, and the worksheet tells you
why before you read the function: it asks for **two** tables. First the calls
going down, then the returned values coming back up.

`countdown` never needed a second table. It does all of its work on the way
down, so the return phase has nothing to report — 4.2 could honestly say the
output is finished before the first frame returns. `sum_to_n` is the other kind
of recursion. Its return phase is where the answer is actually computed, so it
gets a table of its own.

Here is the function as the sheet gives it:

```python
def sum_to_n(n):
    if n == 0:
        return 0

    return n + sum_to_n(n - 1)
```

<MentalModel heading="Nothing can be added until the floor answers">

`return n + sum_to_n(n - 1)` is one line, and it reads left to right — but the
`+` cannot happen until the right-hand side has a value. Python evaluates the
recursive call first, then adds.

So each frame walks down the staircase carrying an unfinished addition: `n +`
something it does not know yet. The only frame that can answer immediately is
the base case at the bottom, and it answers 0.

Everything else follows from that. The additions happen on the way back up, in
reverse order, the smallest first. For `sum_to_n(4)` the first addition Python
performs is `1 + 0`, and the last is `4 + 6`.

</MentalModel>

## Run it before you write it

Step the panel one frame at a time and read the pending column — the right-hand
text inside each frame. That column is the first table of this chapter, written
out for you.

<RecursionStack mode="sum" :n="4" />

The phase label in the corner matters here in a way it did not in 4.2. While it
says **calls going down**, frames are piling up and no arithmetic has happened at
all. When it flips to **returns coming up**, frames start leaving with values
attached. If you can say which phase you are in, you can say which table you are
currently filling in.

<YouShouldSee heading="Five frames up, five values down">

Going down, you should see five frames — `sum_to_n(4)` through `sum_to_n(0)` —
and their pending text should read `4 + sum_to_n(3)`, `3 + sum_to_n(2)`,
`2 + sum_to_n(1)`, `1 + sum_to_n(0)`, and finally the base case, which the panel
marks as one that can answer immediately.

Notice that the answer panel stays empty through the whole descent. Nothing has
been added yet, and nothing *can* be added yet: four frames are waiting on the
fifth.

Coming back up, the values leave in this order: `sum_to_n(0) = 0`, then 1, then
3, then 6, then 10. Watch the frames disappear one at a time and watch what each
returned value is made of — `3` is `2 + 1`, which is the 1 that the frame below
handed back a moment earlier. Each value is a sum of the frame's own `n` and the
value that came up from underneath it.

</YouShouldSee>

## Phase one: the calls going down

The worksheet's first table has a Call phase column and a Pending expression
column. The calls are given to you; the pending expressions are not.

<TraceTable
  title="sum_to_n(4), the calls going down"
  group="sum-to-n"
  caption="The Pending expression column is what that frame is holding while it waits. Write it in the form the return line is written in."
  :columns="['Call phase', 'Pending expression']"
  :rows="[
    ['sum_to_n(4)', { answer: ['4 + sum_to_n(3)'], ph: '4 + ?', wide: true }],
    ['sum_to_n(3)', { answer: ['3 + sum_to_n(2)'], ph: '3 + ?', wide: true }],
    ['sum_to_n(2)', { answer: ['2 + sum_to_n(1)'], ph: '2 + ?', wide: true }],
    ['sum_to_n(1)', { answer: ['1 + sum_to_n(0)'], ph: '1 + ?', wide: true }],
    ['sum_to_n(0)', { answer: ['base case - returns 0 immediately', 'base case: returns 0 immediately', 'returns 0 immediately, it is the base case', 'base case, returns 0'], ph: 'what is different here?', wide: true }],
  ]"
/>

The first four rows are the return line with the arguments substituted. `n` is 4,
so the frame holds `4 + sum_to_n(3)`; `n` is 3, so it holds `3 + sum_to_n(2)`.
Write them in that form rather than as prose, because the point of the column is
that the expression is *unfinished* — you can see exactly what is missing.

Row 5 is the one that is not an unfinished addition. `sum_to_n(0)` never reaches
the return line with a call in it: the `if` fires, and the frame returns 0. It is
the only frame on the stack that can answer without help, and every other row
above it is waiting on that answer.

## Phase two: the values coming back up

Now the same five calls in reverse. This is the table the exam is really asking
for, and it is the one people get wrong by running it in the wrong direction.

<TraceTable
  title="sum_to_n(4), the values coming back up"
  group="sum-to-n"
  caption="The rows are in the order the frames actually finish, which is bottom-up: the base case comes first. Show the addition as well as the number if you want full marks."
  :columns="['Return phase', 'Value']"
  :rows="[
    ['sum_to_n(0)', { answer: ['0 (the base case)', '0, the base case', '0'], ph: '?', wide: true }],
    ['sum_to_n(1)', { answer: ['1 + 0 = 1', '1 = 1 + 0', '1'], ph: '1 + 0 = ?', wide: true }],
    ['sum_to_n(2)', { answer: ['2 + 1 = 3', '3 = 2 + 1', '3'], ph: '2 + 1 = ?', wide: true }],
    ['sum_to_n(3)', { answer: ['3 + 3 = 6', '6 = 3 + 3', '6'], ph: '3 + 3 = ?', wide: true }],
    ['sum_to_n(4)', { answer: ['4 + 6 = 10', '10 = 4 + 6', '10'], ph: '4 + 6 = ?', wide: true }],
  ]"
/>

Read the second column top to bottom and it is a sequence, not a total: 0, 1, 3,
6, 10. Each entry is the frame's own `n` added to the entry above it.

That "entry above it" is the whole mechanism. When `sum_to_n(1)` returns, the
`sum_to_n(0)` call inside its return line has produced 0, so the addition it
had been holding on to can finally be performed: `1 + 0 = 1`. The value travels
up one frame at a time, and each frame adds its own `n` to it before passing it
along.

So the last blank is not a new fact to learn. It is the total that the whole
table was building.

<FillIn
  label="sum_to_n(4) ="
  :numeric="10"
  placeholder="the total"
  solution="The frames return bottom-up: 0, then 1 + 0 = 1, then 2 + 1 = 3, then 3 + 3 = 6, then 4 + 6 = 10. The final value returned to the caller is sum_to_n(4) = 10."
  group="sum-to-n"
/>

One design point worth noticing, because it explains why this takes two tables:
the returned value is not being accumulated somewhere clever. There is no running
total variable, and no hidden state. The partial sum exists only as the value
currently travelling up the stack, and it is built entirely by the additions in
the return phase — smallest first.

<UnderTheHood heading="One stack, two phases">

The interpreter has one call stack the whole time. Nothing about it changes when
the recursion turns around; what changes is what the frames are doing.

While the stack is growing, every frame is in the same state: it is blocked on a
call it made. When the stack starts shrinking, one frame at a time is in a
different state: it has a value back from its call, so it can finish the
expression it was holding and return its own value.

That is why the return phase is in reverse call order and why every row of the
second table uses the row above it. A frame can only finish after everything it
started has finished — the same rule from 4.1, read in the other direction.

</UnderTheHood>

<CommonMistake heading="Writing a running total instead of what each frame returns">

The pending column is a list of additions you have just written, so the
temptation is to treat the return column as the same list, solved: `4 + 3 = 7`,
then `7 + 2 = 9`, then `9 + 1 = 10`. That produces 7, 9 and 10, and it looks
like arithmetic that is getting somewhere.

No frame in the program ever computes a 7. `sum_to_n(4)` cannot add 4 to 3,
because `sum_to_n(3)` does not return 3 — it returns **6**. The 3 that `4 + 3`
is reaching for belongs to a frame that is still waiting on its own call.

There is a tempting way to describe this as "the rows are in the wrong order",
and it is worth being precise about why that description is wrong. The rows of
the table are keyed by the call — `sum_to_n(0)` through `sum_to_n(4)` — so each
row's value is what *that* call returns, whatever order you fill them in.
Writing 10 in the `sum_to_n(4)` row is correct whether you got there first or
last. Order is not what distinguishes a right table from a wrong one here.

What distinguishes them is the rule you apply to each row:

> each row is the frame's own `n`, plus the value in the row **above** it.

`sum_to_n(3)` is `3 + 3 = 6` — the first 3 is its own `n`, the second is the 3
that came up from `sum_to_n(2)`. Nothing else from the table is involved. Apply
that rule and a running total is impossible, because a running total has no
frame in it.

<UnderTheHood heading="Why the total comes out right even when the table is wrong">

`4 + (3 + (2 + (1 + 0)))` and `(((0 + 1) + 2) + 3) + 4` are the same number.

That is why the running-total version of this table is dangerous rather than
merely wrong: the final blank is `10` either way, so the one answer you are most
likely to check yourself against agrees with the mistake. The 7 and the 9 in the
middle are the tell, and nothing in the program produces them.

For `sum_to_n` the association does not change the total because addition is
associative. Do not carry the habit to a recursion where it is not — subtraction
and division do not have this property, and a running total would give a
genuinely wrong answer rather than an oddly-shaped right one.

</UnderTheHood>

The exam asks for the return *sequence*, not the total. Write the additions into
the column — `1 + 0 = 1`, `2 + 1 = 3` — and the rule is visible on the page, so
a marker can see that each row used the row above it.

</CommonMistake>

<ExerciseBlock heading="Predict sum_to_n(5) and sum_to_n(6)" level="two minutes">

Before running anything, work both out from the return phase you traced above.
You do not need to trace either from scratch: you already know that
`sum_to_n(4) = 10`, and `sum_to_n(5)` is `5 + sum_to_n(4)`.

Answer both on paper first, then check them in the blanks.

<FillIn
  label="sum_to_n(5) ="
  :numeric="15"
  placeholder="the total"
  solution="Each new call adds its own n to the total from the call below it, so sum_to_n(5) = 5 + sum_to_n(4) = 5 + 10 = 15."
  group="sum-to-n"
/>

<FillIn
  label="sum_to_n(6) ="
  :numeric="21"
  placeholder="the total"
  solution="sum_to_n(6) = 6 + sum_to_n(5) = 6 + 15 = 21."
  group="sum-to-n"
/>

The sequence of totals — 1, 3, 6, 10, 15, 21 — rises by 2, then 3, then 4, then
5, then 6, which is the check that your arithmetic is not drifting: the jump from
one total to the next is always the new `n`. That is a sanity check on your
numbers, not a replacement for the table. The exam asks for the calls and the
returns, so a closed form for the total would not earn the marks on its own.

</ExerciseBlock>

<Recap>

- The worksheet asks for two tables because `sum_to_n` does its work in two
  phases: the calls go down, then the values come back up.
- Going down, each frame holds an unfinished addition: `4 + sum_to_n(3)`, then
  `3 + sum_to_n(2)`, `2 + sum_to_n(1)`, `1 + sum_to_n(0)`. Nothing is added yet.
- `sum_to_n(0)` is the base case, and it is the only call that can answer
  without waiting. It returns 0.
- Coming back up, the frames finish in reverse order: 0, then `1 + 0 = 1`, then
  `2 + 1 = 3`, then `3 + 3 = 6`, then `4 + 6 = 10`.
- `sum_to_n(4) = 10`, and that 10 is only ever built by the return phase. The
  additions happen smallest-first, so the first one performed is `1 + 0`.

</Recap>

→ Next: **[5.1  Every question, worked](/part-5-exam/every-question-worked)**
