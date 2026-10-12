---
title: "What this book is"
description: "A review book built around one practice sheet: the six questions on it, the algorithms behind them, and a check at every step."
---

# What this book is

You have an Exam 1 practice sheet. It is six questions long, and it is not a
reading exercise — it is a worksheet with blanks, tables to complete, and
`____` where the algebra goes.

This book exists to get you to the point where you can fill in every one of
those blanks, from a blank page, without help.

That is a narrower goal than "learn algorithm analysis", and the narrowness is
the point. There is no merge sort here. There is no master theorem, no
amortised analysis, no graph traversal. Those may well be on Exam 2. They are
not on this sheet, and every page spent on them is a page not spent on the
seven things that *are*:

- counting the operations in a nested loop,
- saying what C(n), the dominant term and the growth rate are,
- the formal definition of Big-O,
- the formal definition of Big-Omega,
- a complete hand trace of bubble sort,
- a complete hand trace of selection sort,
- tracing a recursion both down the calls and back up the returns.

## Why it is interactive

Reading a worked trace feels like learning. It is not. You can follow
`[7, 3, 5, 1, 4]` → `[3, 7, 5, 1, 4]` perfectly well and still lose the marks,
because the exam is not asking whether you can follow — it is asking whether
you can *produce*.

So every algorithm in this book can be run. There is a play button that walks
bubble sort one comparison at a time with the live pseudocode line beside it.
There is a scrubber, so when you get a pass wrong you can rewind into it
instead of starting over. There is a call stack that fills up and empties out
as `sum_to_n` unwinds. And the blanks you fill in are actually checked, with the
same forgiving answer matching a person would use.

## Why it is built around the sheet

Because the sheet tells you exactly what you will be asked.

The worksheet is reproduced here **verbatim and in order**, in Part 5. Every
question gets the same treatment: the working space with the blanks as they
appear on the sheet, then the model answer. Before that, each question gets a
chapter or two of the machinery it needs — and those chapters say out loud
which question they are for.

If you are short on time, read Part 5 first. Find the question you cannot do.
Then go and read the chapter it points at. That is a legitimate way to use this
book, and it is probably the fastest one.

## What it is not

It is not a substitute for doing the trace on paper. The animations are there to
show you what the algorithm does, and to let you check your work; they are not
there to be watched instead of the work. The way to use a chapter here is:
read it, close it, do the trace on paper, then come back and put your answers
in the blanks.

It is also not exhaustive. Where a concept is genuinely needed but is not on the
sheet — for instance "what does an asymptotic bound even mean" — it gets a
short section inside the chapter that needs it, and no more.

→ Next: **[How to use it](/introduction/how-to-read-it)**
