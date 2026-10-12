---
title: "2.1  What O, Ω and Θ claim"
description: "A bound is a promise about shape, not a stopwatch: what f(n) = O(g(n)) actually claims, why the equals sign is an abuse of notation, and what the two constants are doing."
---

# 2.1  What O, Ω and Θ claim

<ChapterMeta
  reading-time="13 min"
  :difficulty="2"
  :prerequisites="['1.2  Growth rates, and what to throw away']"
  you-will-answer="Questions 2 and 3 on the sheet: what a bound claims, and what the two constants inside it are for."
/>

Part 1 ended with a sentence you can already write: the count is `5n`, and the
growth rate is `O(n)`. That sentence is doing something more precise than it
looks, and questions 2 and 3 on the sheet ask you to show the same kind of thing
with all of the working visible.

So this chapter is the definition behind that sentence. There is no proof in it.
The proofs are 2.2 and 2.3, and each of them turns out to be two lines of algebra
once the definition is clear in your head.

## The whole claim in one sentence

`2n + 8 = O(n)` does not say that `2n + 8` equals `n`. It does not say that
`2n + 8` is small, or fast, or that its running time is two seconds. It says:

> from some point onwards, `2n + 8` is at most a fixed multiple of `n`.

Two pieces of that sentence do all the work. **A fixed multiple** — some number
you pick once, and then leave alone. And **from some point onwards** — the claim
does not have to hold for small `n` at all.

<MentalModel heading="A bound is a promise about shape, and it starts late">

`f(n) = O(g(n))` compares how `f` grows with how `g` grows, and it carries two
escape hatches while it does it: a constant factor, and a starting point.

The constant factor exists because 1.2 taught you to throw constants away. This
is the definition that licenses it — the throwaway is not sloppiness, it is built
into the claim. The starting point exists because the behaviour that matters is
the behaviour at large `n`, and a formula can sit above its bound while `n` is
small without that meaning anything.

Everything before the starting point is **unconstrained**. Of everything in this
chapter, that is the one sentence worth memorising.

</MentalModel>

## The definition, exactly

Here is the definition of Big-O, in the form the exam expects you to use:

> There exist constants `c > 0` and `n₀ ≥ 0` such that
> `0 ≤ f(n) ≤ c·g(n)` for every `n ≥ n₀`.

Read it once as English: *you can find a scaling factor `c` and a starting point
`n₀`, so that from `n₀` onwards, your function never exceeds `c` times `g`.*

Three details in there are easy to skim past, and each one costs marks.

**"There exist" means you are the one who produces them.** The proof of a bound
is not a computation of some number that already exists; it is you handing over
two numbers that work. That is why every proof chapter has a blank for `c` and a
blank for `n₀`, and why a proof that never names them is not a proof.

**The `0 ≤` part.** A count of operations is never negative, so a function that
describes a count is non-negative once `n` is big enough. The clause is in the
definition to rule out sign tricks: without it, `f(n) = −n` would satisfy
`f(n) ≤ c·n` for every `n` with `c = 1`, and a negative number of operations
would count as `O(n)`.

**`c·g(n)`, not `g(n)`.** The constant is inside the comparison, not beside it.
`2n + 8 ≤ c·n` with `c = 4` is a statement about `4n`, a different line from `n`.

## Why the equals sign is a lie

`2n + 8 = O(n)` writes an `=` where it does not belong. What is meant is

`2n + 8 ∈ O(n)`

— the function `2n + 8` is *a member of* the set of functions called `O(n)`.
`O(n)` is a set: every function that grows no faster than `n`, up to a constant.
`5n`, `n + 700`, `0.5n` and `2n + 8` are all in it.

The abuse of notation is universal, and the exam uses it, so you should use it
too. What matters is that you do not start doing algebra with it. Two things go
wrong if you do:

- **It is not symmetric.** `2n + 8 = O(n)` is true, and `n = O(2n + 8)` is also
  true, but `n = O(n²)` is true while `n² = O(n)` is false. An equals sign that
  can be written in one direction and not the other is telling you it is not
  really an equals sign.
- **It is not unique.** `2n + 8 = O(n)` and `2n + 8 = O(n²)` are both true
  statements about the same function. That is the subject of the next few
  paragraphs, and it is the reason a question has to tell you which bound to
  prove.

## The two constants

| symbol | what it is | who chooses it | what changing it does |
|---|---|---|---|
| `c` | the scaling factor: how many times bigger than `g(n)` you are letting `f(n)` be | you — or the question, as in "using `c = 4`" | a bigger `c` makes the claim easier, so a smaller `n₀` will do |
| `n₀` | the starting point: the `n` from which the claim begins to hold | you, every time | a bigger `n₀` makes the claim easier, so a smaller `c` may do |

Neither number is unique, and neither has to be the smallest one that works.
"What is the smallest valid `n₀`?" and "is this `n₀` valid?" are different
questions, and only the second one is asked on this sheet.

Now the part that goes wrong most often. Take the claim `2n + 8 = O(n)` with
`c = 4` and look at the left end of the range:

| n | `2n + 8` | `4n` | does `2n + 8 ≤ 4n` hold? |
|---|---|---|---|
| 1 | 10 | 4 | no |
| 2 | 12 | 8 | no |
| 3 | 14 | 12 | no |
| 4 | 16 | 16 | yes |

The claim is true anyway. The definition never asked about `n = 1`, `n = 2` or
`n = 3` — it asked for the inequality to hold **from some `n₀` onwards**. Three
false rows at the start are not a counterexample; they are the reason the
definition has an `n₀` in it in the first place.

That is why `n₀ = 4` is part of the answer to question 2, and not a footnote.

## The crossing, drawn

<BigOChart :f-a="2" :f-b="8" :g-a="1" :c="6" :n-max="12" direction="upper" />

Gold is `f(n) = 2n + 8`. Lilac is `c·g(n) = 6n`. Drag the slider and watch the
verdict line under it.

At `n = 1` the claim is false: `10 ≤ 6` is not true. At `n = 2` it becomes true,
and from there on it can never become false again, because the gap widens in
gold's favour every step. So with `c = 6`, `n₀ = 2` is a valid pair, and the
orange dashed line is where the two graphs cross.

Change the constant and the crossing moves. Question 2 gives you `c = 4`, and
with `c = 4` the crossing sits at `n = 4`. Both statements are proofs of
`2n + 8 = O(n)`. **The pair `(c, n₀)` is not unique — it is a witness you
choose, and any pair that checks out is a complete answer.**

## Ω is the same claim, upside down

`Ω` (Big-Omega) puts a floor under the function instead of a ceiling:

> There exist constants `c > 0` and `n₀ ≥ 0` such that
> `f(n) ≥ c·g(n)` for every `n ≥ n₀`.

Everything else is identical: two constants, a starting point, a claim that
begins late and then never fails. Only the direction of the inequality flips.

- `O` says: `f` is **no worse than** a multiple of `g`. It is an upper bound.
- `Ω` says: `f` is **no better than** a multiple of `g`. It is a lower bound.
- `Θ` (Big-Theta) says both at once: `f` is sandwiched between `c₁·g(n)` and
  `c₂·g(n)` from some point on.

Question 2 asks for an `O` proof and question 3 asks for an `Ω` proof, so the
direction is handed to you in each case. The one thing you cannot do is prove the
`Ω` claim with the `O` inequality, and 2.3 is built entirely around that mistake.

## Loose is still true

Here is a statement that sounds wrong and is not:

> `2n + 8 = O(n²)` is true.

Check it. Take `c = 1` and `n₀ = 4`. Then the claim is `2n + 8 ≤ n²` for every
`n ≥ 4`, and

`n² − 2n − 8 = (n − 4)(n + 2)`

which is non-negative for every `n ≥ 4`, because both factors are. At `n = 4`
the two sides are equal (16 and 16), and after that the square runs away. So
`2n + 8` is in `O(n²)` as well as in `O(n)`.

A bound fails only when it is too **small**. `2n + 8 = O(1)` is false: it would
need `2n + 8 ≤ c·1`, and no single constant `c` can stay above `2n + 8` as `n`
grows without limit. `O(n)` works because `n` grows; `O(1)` does not, because a
constant does not. An oversized bound is not an error; it is just less
informative.

That is what makes `Θ` worth having. `2n + 8 = O(n²)` is true, and
`2n + 8 = O(n)` is true, but only one of them is the truth about how fast the
function grows. `Θ(n)` is the statement that says `n` is the right shape, and a
question that wants the tight answer asks for `Θ`. This sheet never does; it
tells you `c` and which symbol to use, which is the same thing said more
helpfully.

## Check yourself

<ScoreBoard group="claims" label="What the claims mean" />

<Quiz
  question="Which of these is what 2n + 8 = O(n) actually claims?"
  :options="[
    'That 2n + 8 never exceeds n, for every n',
    'That 2n + 8 never exceeds some fixed multiple of n, from some point onwards',
    'That 2n + 8 and n grow at exactly the same rate, so their run times are equal',
    'That an algorithm doing 2n + 8 operations is fast'
  ]"
  :answer="1"
  :why="[
    'There is no constant in this reading, and it is false: at n = 2, 2n + 8 is 12 and n is 2.',
    'Correct: a fixed multiple, and only from some point onwards. Those are the two escape hatches in the definition.',
    'O allows a constant factor and says nothing about run time. 2n + 8 and 900n are both O(n) and behave very differently.',
    'Speed is not in the definition. A small O can still be a slow program, and a big O can be a fast one on the inputs you actually have.'
  ]"
  group="claims"
/>

<Quiz
  question="With c = 4, which of these is a valid n₀ for the claim 2n + 8 = O(n)?"
  :options="['n₀ = 1', 'n₀ = 3', 'n₀ = 4', 'No value works with c = 4']"
  :answer="2"
  :why="[
    'At n = 1 the inequality reads 10 ≤ 4, which is false, so the claim does not hold from 1 onwards.',
    'At n = 3 it reads 14 ≤ 12, which is false. n₀ = 3 is the off-by-one version of the right answer.',
    'Correct: at n = 4 both sides are 16, and from then on the gap only widens in the right direction.',
    'c = 4 works. 2.2 does the algebra that finds n₀ = 4 for it.'
  ]"
  group="claims"
/>

<Quiz
  question="Another student says 2n + 8 = O(n²) is false, because n² grows faster than 2n + 8. Who is right?"
  :options="[
    'The other student: a bound has to be tight to be a bound',
    'Neither: a bound has to hold for every n, and it does not at n = 1',
    'The claim is true: an oversized bound is still a bound, and 2n + 8 ≤ n² holds from n = 4 onwards with c = 1',
    'The claim is true only if c is smaller than 1'
  ]"
  :answer="2"
  :why="[
    'Nothing in the definition asks for tightness. Tightness is what Θ adds, as an extra claim on top.',
    'The definition does not ask for every n. It asks for every n at or above n₀, and n₀ = 4 clears n = 1 entirely.',
    'Correct. c = 1 and n₀ = 4 make it check out, so the statement is true, just less informative than O(n).',
    'Smaller c makes the claim harder, not easier. With c = 1 it already holds from n = 4.'
  ]"
  group="claims"
/>

<CommonMistake heading="Reading O(n) as a speed">

The most common way to lose a mark in Part 2 is to answer with an adjective
instead of an argument. "It is linear, so it is fast" is not a proof of anything,
and the definition contains no notion of fast.

Two functions can both be `O(n)` and differ by any constant factor you like.
`2n + 8` and `900n` are both `O(n)`. If `n` is 20 in the actual input, the second
one does twenty times the work of the first, and calling both "fast" hides that.

The opposite mistake is also common: assuming an `O(n²)` algorithm is always the
slower choice. On small inputs, a quadratic algorithm with tiny constants can
beat a linear one with large constants. Asymptotics describe what happens as `n`
grows, and the exam is asking about that — not about your laptop.

What a marker wants is the claim, the two constants, and the algebra that shows
the inequality holds from `n₀` onwards. Nothing else earns marks.

</CommonMistake>

<IfItsWrong error="n₀ = 0, because the inequality is true for almost every n" means="you treated n₀ as decoration and never checked the start of the range.">

`n₀ = 0` is a promise that the inequality holds from `n = 0` onwards, and it
does not. With `c = 4` and `n = 0`, the claim reads `8 ≤ 0`.

The whole point of `n₀` is that it gets checked. Slide the chart above down to
`n = 0` and read the verdict line: false, and false at 1, 2 and 3 as well. The
first `n` where `2n + 8 ≤ 4n` holds is `n = 4`.

So "almost every `n`" is exactly the kind of phrase the definition was written to
exclude. The definition says *every* `n` from `n₀` onwards, and small values of
`n` are not exempt — they are simply outside the range the claim covers, as long
as `n₀` is set past them.

</IfItsWrong>

<UnderTheHood heading="Why the definition bothers with 0 ≤ f(n)">

A count of operations cannot be negative, so the clause looks like
housekeeping. It is doing real work.

Drop it, and consider `f(n) = −n` with `g(n) = n`. Then `f(n) ≤ c·g(n)` reads
`−n ≤ c·n`, which is true for every `n ≥ 0` with `c = 1`. By that reasoning a
negative operation count would be `O(n)` — vacuously true, completely useless.

With the `0 ≤` in place, the definition also lines up with the way `Ω` is usually
written, as `0 ≤ c·g(n) ≤ f(n)`. `O` and `Ω` then say the same thing with the
middle term swapped, which is why 2.2 and 2.3 are near-copies of one another.

</UnderTheHood>

<Recap>

- `f(n) = O(g(n))` claims that from some point onwards, `f(n)` is at most a
  fixed multiple of `g(n)` — not that the two are equal, and not that `f` is
  fast.
- The definition needs **two** constants: `c`, the scaling factor, and `n₀`, the
  point from which the claim holds. A proof is the act of producing a pair that
  works.
- Everything before `n₀` is unconstrained. With `c = 4`, `2n + 8 ≤ 4n` is false
  at `n = 3` and true at `n = 4`, and that is a valid proof, not a flaw in it.
- `O` is an upper bound, `Ω` is a lower bound, `Θ` is both at once. Only the
  direction of the inequality changes between them.
- A loose bound is still true: `2n + 8 = O(n²)` holds with `c = 1` and `n₀ = 4`.
  Bounds fail only when they are too small.
- `=` in `f(n) = O(g(n))` really means membership: `f ∈ O(g(n))`. Use the exam's
  notation, but do not do algebra with it.

</Recap>

→ Next: **[2.2  Proving f(n) = O(g(n))](/part-2-asymptotics/big-o-proof)**
