---
title: "4.1  Calls down, returns up"
description: "The call stack, the frame, and the one difference that decides everything in question 6: whether a function does its work on the way down or on the way back up."
---

# 4.1  Calls down, returns up

<ChapterMeta
  reading-time="14 min"
  :difficulty="3"
  :prerequisites="['3.5  How many operations?']"
  you-will-answer="The direction question behind both halves of question 6: why countdown prints on the way down, and why sum_to_n can only add on the way up."
/>

Question 6 gives you two functions, and at a glance they are variations on the
same shape:

```python
def countdown(n):
    if n == 0:
        return

    print(n)
    countdown(n - 1)
```

```python
def sum_to_n(n):
    if n == 0:
        return 0

    return n + sum_to_n(n - 1)
```

Both open with the same stop condition. Both recurse on `n - 1`. One prints and
returns nothing; the other returns a number and prints nothing.

The worksheet asks you to trace both, and the two traces run in **opposite
directions** — not because the functions have different shapes, but because the
work sits in a different place. In `countdown` the `print(n)` happens *before*
the recursive call. In `sum_to_n` the `n + ...` cannot happen until *after* it.
That sentence is this chapter. Everything below is the machinery that makes it
true, so that in 4.2 and 4.3 you can fill the tables in from understanding
rather than from memory.

<MentalModel heading="A staircase you walk down, then back up">

A recursive call is a staircase. You walk down it, one frame at a time, until
you reach the floor — the base case — and then you walk back up, one frame at a
time, until the stack is empty.

Some functions do their work on the way **down**, on the descent. `countdown`
is one of those: it prints before it recurses, so its output is written on the
way to the floor. Other functions can only do their work on the way **up**,
once the floor has answered them. `sum_to_n` is one of those: it cannot perform
a single addition until the base case has handed it a number.

Know which direction a function works in and most of its trace table fills
itself in. Get the direction wrong and the table is wrong in every row, no
matter how careful the arithmetic is. That is why this chapter comes before
either trace.

</MentalModel>

## A call is a new frame, not a jump

When Python reaches `countdown(n - 1)`, it does not jump to the top of the
function and forget where it was. It builds a **new frame**: a fresh box
containing the new call's own `n`, and the place in the body it must come back
to when that call finishes.

The frame that made the call stays exactly where it is, frozen mid-line, and
waits.

Two consequences follow, and they are worth saying separately.

**Each frame has its own copy of `n`.** The frame for `countdown(3)` holds 3.
The frame for `countdown(2)` holds 2. They are different boxes with the same
label on them. Reassigning `n` inside one frame is invisible to every other
frame on the stack, which is what makes the pattern `countdown(n - 1)` behave
the way you expect.

**A frame cannot finish until the call it made has finished.** `countdown(3)`
cannot return while `countdown(2)` is still running, and `countdown(2)` cannot
return while `countdown(1)` is still running. The pile of waiting frames is the
entire reason recursion has a down phase and an up phase. There is no other
mechanism involved.

<UnderTheHood heading="What Python actually keeps in a frame">

A frame is a real object with a lifecycle: it is created on the call, pushed on
the interpreter's call stack, and popped when the function returns. Python
keeps the live ones in a stack, which is why the tracebacks you have seen read
from the innermost call downward.

A bare `return` — the one in `countdown` — returns `None`. So `countdown(4)` is
an expression whose value is `None`, and the printed numbers are what the
textbooks call a *side effect*: work done on the way past, which the caller
never receives. `sum_to_n` is the opposite kind of function: it returns a value
and prints nothing.

Both styles are fine. The worksheet picks one of each deliberately, because a
side-effecting recursion and a value-returning recursion trace differently.

</UnderTheHood>

## Work on the way down: `countdown`

Read the body in order:

```python
    print(n)
    countdown(n - 1)
```

`print(n)` comes first. So the moment the frame for `countdown(4)` starts
running, the next thing that happens is that 4 is printed. Only after that does
it call `countdown(3)`, which prints 3, and so on.

Three things follow from that, and all three show up in the exam table:

- **The printed order matches the order of the calls.** The calls go 4, 3, 2, 1,
  0 and the prints come out in the same descending order. Nothing ever prints on
  the way back up.
- **The base case prints nothing.** `countdown(0)` takes the `if`, hits the bare
  `return`, and is gone. It is a call that exists only to stop the recursion —
  not a call that does visible work.
- **The function needs no return value.** By the time a frame would have
  anything to hand back, its work is already done and already on the screen.

So for `countdown(4)` there are **five calls** and **four prints**. The two
numbers disagreeing is the single most common way to lose marks on this half of
question 6.

## Work on the way up: `sum_to_n`

Now read the other body:

```python
    return n + sum_to_n(n - 1)
```

This time the recursive call is *inside* the expression. Python evaluates
`n + something` by working out the `something` first, so it calls
`sum_to_n(n - 1)` and then waits for it to return. The frame sits on the stack
holding a pending expression:

`n + <something I do not know yet>`

Step back and look at what that means for the whole stack. Every frame above
the floor is holding an unfinished addition, and none of them can finish,
because the only frame that can answer immediately is the base case — and it is
at the bottom, waiting to be reached.

So nothing is added until the base case returns 0. Then the additions unwind
from the smallest upward: for `n = 4` the returned values are 0, then 1, then 3,
then 6, and finally `sum_to_n(4) = 10`.

Notice which addition happens *first*: `1 + 0`. The frame for `sum_to_n(1)` is
the first one to have both halves of its sum. `sum_to_n(4)` is the last, and its
addition is `4 + 6`.

|  | `countdown` | `sum_to_n` |
|---|---|---|
| where the work sits | `print(n)`, before the call | `n + ...`, around the call |
| direction of the work | down, on the descent | up, on the return |
| what a waiting frame holds | nothing it needs | `n + <something I do not know yet>` |
| what it returns | nothing (a bare `return`) | the running total |
| how the exam tables it | one row per call | two phases: calls, then returns |

<CommonMistake heading="A staircase is not a direction of work">

The drawing is the problem. A recursion is usually drawn as steps going down and
coming back up, and it is natural to assume that the interesting half — the
return, the unwinding — is where the output comes from.

For `countdown` it is not. Its output is complete before the first frame ever
returns: `4 3 2 1` is printed entirely on the way down. The entire up phase of
`countdown(4)` does nothing except pop five frames off the stack, and if you
step through it in the panel below you will see the output panel stop changing
the moment the staircase turns around.

If your trace of `countdown` has anything appearing in the output column during
the up phase, the direction is wrong. That is the signal.

</CommonMistake>

## Watch the pending column

The panel below builds its own frames; do not copy a stack from anywhere else.
Step it one frame at a time and read the right-hand column of each frame — that
is the pending expression, the thing the frame cannot finish yet.

<RecursionStack mode="countdown" :n="3" />

For `countdown`, the pending column reads `print 3, then call countdown(2)`,
then `print 2, then call countdown(1)`, and so on down to the floor. The work is
written *before* the call, so it happens as the frame is created. Watch the
output panel: it grows on the way down and does not move on the way up.

Now the same descent with additions instead of prints:

<RecursionStack mode="sum" :n="3" />

Same staircase. Same number of frames. The pending column now reads
`3 + sum_to_n(2)`, then `2 + sum_to_n(1)`, then `1 + sum_to_n(0)` — and the
deepest frame is the base case, which is the only one that can answer
immediately. Everything above it is holding an addition it is not allowed to
perform yet.

Step into the up phase and watch what leaves the stack: 0 goes up first, then 1,
then 3, then 6. Each frame disappears with a number attached, and that number is
what the frame beneath it has been waiting for. That is the return phase of the
worksheet's second table, happening.

## Two things every recursion needs

Before the trace chapters, fix the vocabulary, because the worksheet's model
answer uses it.

- `if n == 0` is the **base case**. It is the stop condition: the point at which
  the function answers without calling itself again. In `countdown` it returns
  nothing; in `sum_to_n` it returns 0. The value it returns is what starts the
  unwind, so in `sum_to_n` it is not decoration — it is the seed of the sum.
- `n - 1` is the **progress**. It is what guarantees each call is closer to the
  base case than the one before it. `countdown(4)` calls `countdown(3)`, which
  calls `countdown(2)`: the argument walks down one at a time and arrives at 0
  after a finite number of steps.

Every correct recursion has both. A recursion with a base case but no progress
never reaches it, and a recursion with progress but no base case has nothing to
stop at. Both failures look identical from the outside — the same exception —
which is why the diagnosis below is worth reading once.

<Quiz
  question="In countdown, when does print(n) run for a given frame — on the way down toward the base case, or on the way back up?"
  :options="['On the way down, before the recursive call it makes', 'On the way back up, after its recursive call has returned', 'Both: once on the way down and once on the way back up', 'It depends on the value of n']"
  :answer="0"
  :why="['Correct. print(n) is the statement before countdown(n - 1), so it runs while the frame is being created, before the descent continues.', 'That is the sum_to_n pattern, where the work is wrapped around the call. countdown has no code after its recursive call at all.', 'Nothing in countdown runs twice. If the output has more numbers than the argument, the direction of the print is the thing to re-check.', 'The argument changes the number of frames, never the order of the two statements inside the body.']"
  group="calls-and-returns"
/>

<IfItsWrong error="RecursionError: maximum recursion depth exceeded" means="the descent never found its floor: either the base case is missing, or the argument is not moving toward it.">

This is the error you get when the staircase has no bottom. Python does not
forgive it and does not warn you first — it keeps pushing frames until it hits
its own recursion limit, then raises this.

There are two ways to end up here, and they are worth telling apart.

**No base case.** Delete the `if n == 0: return` from `countdown` and every call
recurses forever. The argument still walks down through 0, into negative
numbers, and on past them, because nothing is checking.

**A base case that is never reached.** Change the recursive call to
`countdown(n - 2)` and start from an odd argument, say 5. The descent runs 5, 3,
1, −1, −3 and so on: it steps straight over 0 and keeps going down, forever. The
base case is present and correct, and the argument never lands on the value it
tests for. The fix is in the progress, not in the condition: the argument has to
arrive *at* the base case, not beside it.

Both of these produce the same traceback, so the traceback cannot tell you which
one you have. Reading the two lines that matter can: the `if` line, and the
recursive call. The exam expects you to know both exist, even though question 6
only ever asks you to trace functions that get them right.

</IfItsWrong>

<Recap>

- A recursive call creates a **new frame** with its own copy of `n`, and the
  frame that made the call waits until it returns.
- Work before the recursive call happens on the way **down**; work wrapped
  around the call happens on the way **up**.
- `countdown` prints on the way down, which is why its output is descending,
  why its output is complete before anything returns, and why it needs no return
  value at all.
- `sum_to_n` adds on the way up, which is why every frame above the base case
  holds an unfinished `n + <something I do not know yet>`, and why the first
  addition performed is `1 + 0`.
- Every correct recursion needs a **base case** (the stop condition) and
  **progress** toward it (`n - 1`). Missing either one gives
  `RecursionError: maximum recursion depth exceeded`.

</Recap>

→ Next: **[4.2  Tracing countdown(4)](/part-4-recursion/countdown)**
