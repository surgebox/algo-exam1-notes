---
title: "How to use it"
description: "The blocks you will see on every page, what the colours mean, and a route through the book depending on how much time you have."
---

# How to use it

Every page in this book is made of the same handful of blocks. Once you know
what they are, you can skim a chapter in ten seconds and see whether it is
telling you something you already know.

## The blocks

| you will see | what it is |
|---|---|
| **Mental model** | the one idea the section turns on. If you read only these, you get the shape of the book. |
| **If it's wrong** | an answer someone actually writes, and what that answer reveals about the misunderstanding. |
| **Common mistake** | an answer that looks right, is plausible, and still loses marks. |
| **Under the hood** | collapsed. Optional depth, for when you want to know *why*. |
| **Exercise** | a variation to try, using only what you already have. |
| **What you now know** | a few bullets at the end. If any of them surprise you, re-read the chapter. |

The interactive blocks are named for what they do:

| block | what it does |
|---|---|
| <span class="pc">Count it</span> | one square per run of the basic operation, laid out as the loops lay it out. |
| <span class="pc">Trace</span> | steps through code, showing the live line and the state at each moment. |
| <span class="pc">Call stack</span> | recursion: frames piling up on the way down, coming off on the way up. |
| <span class="pc">Bubble sort</span> / <span class="pc">Selection sort</span> | plays the algorithm one step at a time, with a finished table in the exam's columns. |
| <span class="pc">Picture</span> | the Big-O crossing point, with a slider so you can watch the inequality flip. |
| <span class="pc">Fill it in</span> | the exam's own trace-table format, checked. |
| **Check yourself** | multiple choice, with a note on why each wrong option is wrong. |

## The colours in the array diagrams

These mean exactly one thing each, on every page:

- **blue** — the two values being compared right now
- **gold** — the running minimum (selection sort only)
- **purple underline** — position `i`, the slot being decided
- **plum** — finished, in its final place
- **orange** — just changed, by a swap

Nothing else is coloured. If a cell is not one of those, it is ordinary and
unfinished.

## A route through, depending on your time

**If the exam is tomorrow.** Read Part 5. It reproduces the sheet question by
question with the model answers. Do each one on paper first, then open the
answer. When you find the one you cannot do, follow the link back into the
chapter that teaches it, and do that chapter's checks.

**If you have a few days.** Read Parts 1 to 4 in order. Each is short. Do every
blank and every trace table — they are the actual assessment, and they are
marked for you.

**If you want to be certain.** Do the blank-sheet rehearsal in 5.2 last. It
gives you the six questions with no scaffolding at all, and only the answers
behind a fold. If you can do that page cold, you can do the exam.

## One habit worth building now

When the book says a trace is `10 comparisons and 7 swaps`, do not take the
number. Ask *why* 10. The exam will not ask you to sort `[7, 3, 5, 1, 4]` — it
will ask you to sort some other array, and the numbers will be different. What
transfers is the reason: `(n−1) + (n−2) + … + 1`.

That is the difference between memorising an answer and being able to produce
one, and it is the whole reason Part 3 ends with a chapter on counting
comparisons rather than only on tracing them.

→ Start at **[1.1  Counting operations](/part-1-counting/counting-operations)**
