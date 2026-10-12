---
title: "2.3  Proving f(n) = Ω(g(n))"
description: "Question 3 on the sheet, one blank at a time: g(n) = n, 4n − 12 ≥ c·n, substituting c = 2, solving 2n ≥ 12, choosing n₀, and why the habit from the O proof gets it wrong."
---

# 2.3  Proving f(n) = Ω(g(n))

<ChapterMeta
  reading-time="15 min"
  :difficulty="3"
  :prerequisites="['2.2  Proving f(n) = O(g(n))']"
  you-will-answer="Question 3 on the sheet: all six blanks of the Big-Omega proof, plus the one thing that separates it from the Big-O proof."
/>

The third question on the sheet is this:

> Show that `4n − 12 = Ω(n)`, using `c = 2`.

Same six blanks as question 2:

- `g(n) =` ____
- Write the inequality: ____
- Substitute `c = 2`: ____
- Solve for `n`: ____
- A valid `n₀` is: ____
- Conclusion: ____

It looks like the same question with new numbers. It is the same question with new
numbers *and one flipped symbol*, and that flipped symbol is the whole point of
this chapter. Five of the six blanks are arithmetic you already have; the sixth
kind of mistake — the one that actually happens in exams — is reaching for the
previous answer.

<MentalModel heading="The same six blanks, with a floor instead of a ceiling">

Question 2 proved that `2n + 8` is **no worse than** a multiple of `n`. Question 3
proves that `4n − 12` is **no better than** a multiple of `n`. One is a ceiling,
the other is a floor, and the only change in the definition is which way the
inequality points:

```
O:   f(n) ≤ c·g(n)   for every n ≥ n₀
Ω:   f(n) ≥ c·g(n)   for every n ≥ n₀
```

Everything else is identical: two constants, a starting point, and a claim that
begins late and then never fails.

What that means in practice is that the algebra cannot be copied across. In
question 2 you moved the numbers to the left and solved for `n`; here you move
them the other way, and the boundary lands somewhere else entirely. The previous
chapter ended at `n₀ = 4`. This chapter does not.

</MentalModel>

## Blank 1: `g(n) = n`

Identical reasoning to 2.2, and it is worth noticing that it is identical rather
than re-deriving it:

- `f(n) = 4n − 12` is the count you are bounding.
- `g(n) = n` is the function inside the `Ω(...)`.

So `g(n) = n`. The direction of the bound does not change which function is which
— `f` is always the thing being bounded, and `g` is always what it is being
compared against. Changing `O` to `Ω` changes the *claim about them*, not their
names.

## Blank 2: write the inequality

The definition from 2.1, with `c` still symbolic:

`4n − 12 ≥ c·n`

Two notes, and both are differences from question 2.

**The non-negativity clause is optional here.** In the Big-O definition the
`0 ≤` in front is doing real work, because it rules out negative functions
satisfying the bound vacuously. For Ω the sheet states the definition without
it, and the form to write is simply

`4n − 12 ≥ c·n`

Writing `0 ≤ c·n ≤ 4n − 12` is also correct — it is the same statement with the
non-negativity made explicit — and it is the form 5.1 uses. Either is accepted.
What matters is that the middle term is `f(n)` on the **left** of the `≥`, not on
the right.

**The `− 12` stays in.** It is part of the function, and it is what makes this
question different from question 2 in a second way: subtracting a constant pulls
the function *down*, which makes a floor claim harder to satisfy at small `n`.
That is why the boundary here is later than you might expect.

## Blank 3: substitute `c = 2`

`4n − 12 ≥ 2n`

From here on it is ordinary algebra again. Check that the symbols point the way
the claim does: we are saying the left side is bigger, because we are claiming
`4n − 12` grows at least as fast as a multiple of `n`.

## Blank 4: solve for `n`

Move every `n` to one side and every number to the other:

```
4n − 12 ≥ 2n        subtract 2n from both sides
2n − 12 ≥ 0         add 12 to both sides
2n ≥ 12             divide both sides by 2
n ≥ 6
```

The third line, `2n ≥ 12`, is the form the sheet wants; `n ≥ 6` is what it means.

Compare this with 2.2's `8 ≤ 2n`. The shape is identical and the arithmetic is
almost identical — in both cases you collect the `n` terms on one side and the
plain numbers on the other. What differs is the sign of the plain number: in
question 2 it was `+8`, so it moved to the right of the `≤`; here it is `−12`, so
it moves to the right of the `≥`. That one sign is the reason the boundary sits
at `6` instead of `4`.

## Blank 5: a valid `n₀`

`n₀ = 6`, and the boundary check is where this question is won:

- At `n = 6`: `4(6) − 12 = 12` and `2(6) = 12`, so `12 ≥ 12` holds. ✓
- At `n = 5`: `4(5) − 12 = 8` and `2(5) = 10`, so `8 ≥ 10` is false. ✗

So `6` is in and `5` is out. The same equivalence argument as before covers every
later `n`: `4n − 12 ≥ 2n` is equivalent to `n ≥ 6`, for every `n` at once, so
there is nothing left to check after the boundary.

<BigOChart :f-a="4" :f-b="-12" :g-a="1" :c="2" :n-max="14" direction="lower" />

Gold is `f(n) = 4n − 12`, lilac is `c·g(n) = 2n`, and the verdict line asks the
`Ω` question: is gold at or above lilac? At `n = 5` it is not — `8 ≥ 10` fails.
At `n = 6` the two lines meet, and after that gold stays on top, because it gains
4 per step while lilac gains 2.

Two things about the left of that picture are worth pausing on. At `n = 1` gold
is at `−8`; at `n = 3` it is at `0`. The function is *negative* while `n` is
small, and the claim is still true. Nothing in the definition objects. The
starting point exists precisely so that this stretch can be ignored.

<YouShouldSee heading="The first few n, checked by hand">

| n | `4n − 12` | `2n` | does `4n − 12 ≥ 2n` hold? |
|---|---|---|---|
| 3 | 0 | 6 | no |
| 4 | 4 | 8 | no |
| 5 | 8 | 10 | no |
| 6 | 12 | 12 | yes |
| 7 | 16 | 14 | yes |

Three false rows before the claim starts, and that is allowed. With `n₀ = 6`
the claim only covers the rows where it holds.

</YouShouldSee>

## Blank 6: the conclusion

> Since `4n − 12 ≥ 2n` for all `n ≥ 6` with `c = 2`, by definition
> `4n − 12 = Ω(n)`.

Same four parts as before, with the new numbers and the new symbol:

1. The inequality, substituted — `4n − 12 ≥ 2n`.
2. The range — for all `n ≥ 6`.
3. Both constants, named — `c = 2`, `n₀ = 6`.
4. The claim — `4n − 12 = Ω(n)`, using `Ω` and not `O`.

That last point is not pedantry. The two symbols mean opposite things. A proof
that ends with the `O` symbol after showing a `≥` inequality has contradicted
itself in the final line, and that is exactly the kind of thing a marker circles.

## Do all six yourself

<ScoreBoard group="bigomega-proof" label="Question 3: the Big-Omega proof" />

<FillIn
  label="g(n) ="
  answer="n"
  placeholder="the function inside Ω(...)"
  hint="the claim is 4n − 12 = Ω(n)"
  solution="We are comparing 4n − 12 against n, so g(n) = n."
  group="bigomega-proof"
/>

<FillIn
  label="Write the inequality:"
  :answer="['4n − 12 ≥ c·n', '4n − 12 ≥ cn', '4n − 12 ≥ c*n', '4n - 12 ≥ c·n', 'f(n) ≥ c·n']"
  placeholder="leave c as a letter"
  wide
  hint="Ω is a floor, so which side is bigger?"
  solution="The definition for Ω is f(n) ≥ c·g(n), so 4n − 12 ≥ c·n."
  group="bigomega-proof"
/>

<FillIn
  label="Substitute c = 2:"
  :answer="['4n − 12 ≥ 2n', '4n − 12 ≥ 2·n', '4n − 12 ≥ 2*n', '4n - 12 ≥ 2n']"
  placeholder="replace c with 2"
  wide
  solution="Putting c = 2 into c·n gives 4n − 12 ≥ 2n."
  group="bigomega-proof"
/>

<FillIn
  label="Solve for n:"
  :answer="['2n ≥ 12', '12 ≤ 2n', 'n ≥ 6', '2n ≥ 12, so n ≥ 6', '2n - 12 ≥ 0']"
  placeholder="subtract 2n, then move the 12"
  wide
  hint="get the n terms on one side and the number on the other"
  solution="4n − 12 ≥ 2n becomes 2n ≥ 12 after subtracting 2n and adding 12, and n ≥ 6 after dividing by 2."
  group="bigomega-proof"
/>

<FillIn
  label="A valid n₀ is:"
  :numeric="6"
  answer="n₀ = 6"
  placeholder="a number"
  hint="the first n where the floor holds"
  solution="At n = 6 both sides are 12, so n₀ = 6 is valid. At n = 5 the claim is false."
  group="bigomega-proof"
/>

<FillIn
  label="Conclusion:"
  :answer="['Since 4n − 12 ≥ 2n for all n ≥ 6 with c = 2, by definition 4n − 12 = Ω(n).', '4n − 12 = Ω(n)', '4n − 12 = Ω(n) with c = 2 and n₀ = 6', '4n − 12 = Ω(n) with c = 2 and n0 = 6', 'By definition, 4n − 12 = Ω(n).', 'Therefore 4n − 12 = Ω(n).']"
  placeholder="name the constants and state the claim"
  wide
  hint="an inequality, a range, both constants, and the claim with the Ω symbol"
  solution="Name c and n₀, state the range, and finish with 4n − 12 = Ω(n)."
  group="bigomega-proof"
/>

<IfItsWrong error="n₀ = 4" means="you carried the previous proof's answer across. The O proof ended at n₀ = 4 and the habit survived the change of direction.">

This is the mistake this chapter exists for. `n₀ = 4` is not a slip in the
arithmetic — it is the right answer to the *other* question, produced by a hand
that had just finished writing it.

Check it at `n = 4`, with `c = 2`:

```
4(4) − 12 = 4
2(4)      = 8
```

and `4 ≥ 8` is false. The floor is not reached at `n = 4`; it is not reached at
`n = 5` either (`8 ≥ 10` is false). The two lines only meet at `n = 6`.

The way to make this error impossible is to stop treating `n₀` as a remembered
number and re-derive it every time. `n₀` comes from *solving the inequality you
just wrote*. If you wrote `4n − 12 ≥ 2n`, the only answers that can come out are
`n ≥ 6` and things it implies. A remembered `4` cannot appear from that algebra,
which is the point: do the algebra, read off the boundary, and check it by
substitution.

</IfItsWrong>

<CommonMistake heading="Moving the 12 without changing its sign">

The arithmetic here has one step that is easy to do by reflex and wrong:
`4n − 12 ≥ 2n`, and then subtracting `2n` from both sides gives `2n − 12 ≥ 0`.
Adding the 12 gives `2n ≥ 12`.

The wrong version writes `2n ≥ −12` — the `12` moved across without changing
sign, as though it were being subtracted from the other side — and then divides to
get `n ≥ −6`. That is true for every `n` the question cares about, which makes it
feel harmless, and it invites `n₀ = 1`.

It is not harmless. At `n = 1` the claim reads `−8 ≥ 2`, which is false. A
solution of the inequality that admits a value where the inequality fails is not
a solution of the inequality — it is an algebra slip that hid a wrong boundary.

The check that catches it costs one line: substitute your `n₀` into both sides
and compare. `4(1) − 12 = −8` and `2(1) = 2`. Done.

</CommonMistake>

## The two proofs, side by side

Everything that differs between questions 2 and 3 is in this table. The blanks
are the same six, in the same order, every time.

| step | Question 2 — Big-O | Question 3 — Big-Omega |
|---|---|---|
| the claim | `2n + 8 = O(n)` with `c = 4` | `4n − 12 = Ω(n)` with `c = 2` |
| meaning | `f` is no worse than a multiple of `g` | `f` is no better than a multiple of `g` |
| 1. `g(n)` | `n` | `n` |
| 2. the inequality | `0 ≤ 2n + 8 ≤ c·n` | `4n − 12 ≥ c·n` |
| 3. substitute `c` | `2n + 8 ≤ 4n` | `4n − 12 ≥ 2n` |
| 4. solve for `n` | `8 ≤ 2n` | `2n ≥ 12` |
| | so `n ≥ 4` | so `n ≥ 6` |
| 5. `n₀` | `4` | `6` |
| boundary check | `2(4) + 8 = 16 ≤ 4(4) = 16` ✓ | `4(6) − 12 = 12 ≥ 2(6) = 12` ✓ |
| the `n` that fails | `n = 3`: `14 ≤ 12` is false | `n = 5`: `8 ≥ 10` is false |
| 6. conclusion | Since `2n + 8 ≤ 4n` for all `n ≥ 4` with `c = 4`, `2n + 8 = O(n)`. | Since `4n − 12 ≥ 2n` for all `n ≥ 6` with `c = 2`, `4n − 12 = Ω(n)`. |

Read the table as a machine with one switch. Rows 1 and the blank structure never
change. The switch is the inequality direction, and when it flips, rows 3 to 6
flip with it: the sign in the inequality, the side the `n` terms end up on, the
boundary you solve for, and the symbol in the final sentence.

<UnderTheHood heading="Why 4n − 12 can be negative and the proof still stands">

The textbook definition of `Ω` is usually written as

`0 ≤ c·g(n) ≤ f(n)` for every `n ≥ n₀`

which sounds like it is demanding that `f` be non-negative. It is — but only from
`n₀` onwards, and `n₀` is yours to choose. Here `4n − 12` is negative until
`n = 3` and exactly `0` at `n = 3`, while `n₀ = 6` puts the whole claim past that
stretch, where `4n − 12 ≥ 12` and therefore positive.

The sheet's blank asks for the general form `4n − 12 ≥ c·n`, which is the
inequality that does all the work. If a marker wants the full textbook sentence,
the constants are the same ones.

There is also a general rule mirroring 2.2's. For `f(n) = a·n − b` with `a` and
`b` positive and any `c` strictly less than `a`, the algebra gives

```
a·n − b ≥ c·n
      b ≤ (a − c)·n
      n ≥ b / (a − c)
```

so with `a = 4` and `b = 12`, `c = 2` gives `12 / 2 = 6` and `c = 3` gives
`12 / 1 = 12`. Notice the condition points the other way now: here `c` must be
*below* the coefficient `4`, because the floor has to be low enough for `f` to
clear. That is the same trade as in 2.2 — a smaller `c` is easier to satisfy,
and it buys a smaller `n₀`.

</UnderTheHood>

<ExerciseBlock heading="The mirrored proof, with numbers you choose" level="no new ideas">

Show that `5n − 20 = Ω(n)` using `c = 3`. Six blanks, on paper.

The shape is 2.2's, mirrored: write `5n − 20 ≥ 3n`, subtract `3n` to get
`2n − 20 ≥ 0`, add the `20` to get `2n ≥ 20`, and read off `n ≥ 10`. So
`n₀ = 10`. Check the boundary — `5(10) − 20 = 30` and `3(10) = 30` — then write
the conclusion with both constants named and the `Ω` symbol in place.

If you found yourself reaching for `n₀ = 4` or `n₀ = 6` at any point, that is the
reflex this chapter is training out. `n₀` is never remembered. It is solved for.

</ExerciseBlock>

<Recap>

- `Ω` puts a floor under the function: `f(n) ≥ c·g(n)` for every `n ≥ n₀`. Only
  the direction of the inequality changes from Big-O.
- `g(n) = n` here too — `f` is the function being bounded, `g` is the function
  inside the brackets, whichever symbol is used.
- The inequality is `4n − 12 ≥ c·n`, and after `c = 2` it is `4n − 12 ≥ 2n`.
- Solving gives `2n ≥ 12`, so `n ≥ 6`, and the boundary check confirms it:
  `4(6) − 12 = 12` and `2(6) = 12`.
- `n₀ = 5` fails (`8 ≥ 10` is false), and `n₀ = 4` — the previous chapter's
  answer — fails too (`4 ≥ 8` is false). Never carry `n₀` across a change of
  question; re-derive it from the inequality you wrote.
- The conclusion names the inequality, the range, both constants, and finishes
  with `4n − 12 = Ω(n)`.

</Recap>

→ Next: **[3.1  Bubble sort, from the pseudocode](/part-3-sorting/bubble-sort)**
