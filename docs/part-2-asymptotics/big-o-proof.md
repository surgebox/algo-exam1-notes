---
title: "2.2  Proving f(n) = O(g(n))"
description: "Question 2 on the sheet, one blank at a time: g(n) = n, the inequality, substituting c = 4, solving 8 ≤ 2n, choosing n₀, and writing the conclusion."
---

# 2.2  Proving f(n) = O(g(n))

<ChapterMeta
  reading-time="16 min"
  :difficulty="3"
  :prerequisites="['2.1  What O, Ω and Θ claim']"
  you-will-answer="Question 2 on the sheet: all six blanks of the Big-O proof, from a blank page."
/>

The second question on the sheet is this:

> Show that `2n + 8 = O(n)`, using `c = 4`.

and it has six blanks:

- `g(n) =` ____
- Write the inequality: ____
- Substitute `c = 4`: ____
- Solve for `n`: ____
- A valid `n₀` is: ____
- Conclusion: ____

Nothing in this chapter is new. 2.1 gave you the definition, and the definition
is the entire toolkit — these six blanks are that definition taken apart and laid
out in the order you fill them in. The algebra is two steps. Most of the work is
knowing *why* each blank says what it says, because that is what makes the answer
reproducible on a different question with different numbers.

<MentalModel heading="You are handing over two numbers">

Proving a bound is not the act of showing that `2n + 8` is roughly `n`. It is the
act of producing a witness: one `c`, one `n₀`, and a demonstration that the
inequality holds for everything from `n₀` on.

Here the question hands you `c = 4`. `n₀` is yours to find, and the algebra exists
for exactly one purpose — to find it. Substitute `c`, solve the inequality for
`n`, and the solution *is* the starting point. That is the whole proof.

Which means the failure modes are narrow and predictable. You can state a pair
that does not check out (too small an `n₀`, too small a `c`), or you can write the
inequality in the wrong direction. Everything else is correct by construction.

</MentalModel>

## Blank 1: `g(n) = n`

The claim is written `f(n) = O(g(n))`, and the sheet writes it as
`2n + 8 = O(n)`. Matching those up:

- Your function is the one **outside** the `O(...)` — here `f(n) = 2n + 8`. That
  is the count you got from counting operations in Part 1.
- The comparison function is the one **inside** the `O(...)` — here `g(n) = n`.

So `g(n) = n`, and the blank is checking that you know which side is which
without having to think about it. If the question had said `O(n²)`, the answer
would be `g(n) = n²`. If it had said `O(n log n)`, it would be `g(n) = n log n`.
The function inside the brackets is always `g`.

It is worth saying the obvious thing here, because it comes back in the last
blank: `n` is not what `2n + 8` equals. It is the shape you are comparing against.

## Blank 2: write the inequality

This blank has to be filled in with the definition's own inequality, with `c`
still symbolic:

`0 ≤ 2n + 8 ≤ c·n`

Three things about it:

**`f(n)` goes on the left as its full self.** Not the dominant term, not `2n`.
The definition is a statement about the function you were given, so `2n + 8`
appears whole. Throwing the `8` away is 1.2's move, and it happens later, inside
the algebra — not here.

**`c` is still a letter.** The next blank is the one that substitutes `4`. Putting
`4` in here loses the shape of the claim, which is what this blank is for.

**The `0 ≤` belongs there.** It is part of the definition from 2.1: a count of
operations is never negative. Some markers accept `2n + 8 ≤ c·n` for this blank;
none of them will mark `0 ≤ 2n + 8 ≤ c·n` wrong, so write it.

## Blank 3: substitute `c = 4`

Now `c` becomes a number, and the statement stops being a definition and becomes
an ordinary inequality:

`2n + 8 ≤ 4n`

This is the step that turns a claim about asymptotics into arithmetic. Everything
from here on is the algebra you already know. There is nothing asymptotic left to
think about — no limits, no "as `n` grows", just both sides of an inequality and
one unknown.

## Blank 4: solve for `n`

Two steps, and they are the same two steps every time.

```
2n + 8 ≤ 4n          subtract 2n from both sides
     8 ≤ 2n          divide both sides by 2
     n ≥ 4
```

The `8 ≤ 2n` form is the answer the sheet wants, and `n ≥ 4` is what it says.
Both are the same statement, so either is accepted; writing both is the safest
habit, because one of them is the algebra and the other is the meaning.

Notice what the algebra did: it moved the `8` to the far side and left `n` alone
on the right. Whatever `n` you feed in, the inequality is decided by whether
`n` is at least 4 — and once it is, no larger `n` can undo it, because the right
side grows at twice the rate of the left.

## Blank 5: a valid `n₀`

`n ≥ 4` is a range, and `n₀` is where the range starts:

`n₀ = 4`

Check it once, by hand, at the boundary — this is the check the whole blank is
worth:

- At `n = 4`: `2(4) + 8 = 16` and `4(4) = 16`, so `16 ≤ 16` holds. ✓
- At `n = 5`: `2(5) + 8 = 18` and `4(5) = 20`, so `18 ≤ 20` holds, with room to
  spare. ✓

And it cannot fail later, because the test at the boundary *is* the general
argument: `2n + 8 ≤ 4n` is equivalent to `n ≥ 4` for every `n`. There is no need
to check `n = 1000`; the algebra already answered for every `n` at once.

<BigOChart :f-a="2" :f-b="8" :g-a="1" :c="4" :n-max="12" direction="upper" />

Drag the slider. At `n = 3` the verdict is false — `14 ≤ 12` is not true. At
`n = 4` it flips to true, and every `n` after it stays true. The orange dashed
line is the crossing, and it lands exactly on `n = 4`, which is why `n₀ = 4` is
the smallest answer that works for this `c`.

`4` is not the only correct answer, though. `n₀ = 5` works, `n₀ = 100` works,
`n₀ = 10⁶` works. A larger `n₀` throws away more of the range, and since the
inequality holds over the part you kept, the claim is still true. Markers accept
any valid `n₀`; the smallest one is simply the one the algebra hands you for
free, which is why it is the expected answer.

## Blank 6: the conclusion

The last blank is the sentence that connects the arithmetic back to the
definition:

> Since `2n + 8 ≤ 4n` for all `n ≥ 4` with `c = 4`, by definition
> `2n + 8 = O(n)`.

Four things are in that sentence, and a full-mark answer has all four:

1. **The inequality**, in its substituted form — `2n + 8 ≤ 4n`.
2. **The range** — for all `n ≥ 4`.
3. **The constants, named** — `c = 4` and, in the range, `n₀ = 4`. The definition
   is a statement about the *existence* of these two numbers, so the conclusion
   has to show that you produced them.
4. **The claim, in the form the question used** — `2n + 8 = O(n)`.

A conclusion that reads only "therefore it is `O(n)`" is missing point 3, and
point 3 is the whole content of the definition. Write the sentence out in full;
it is one line, and it is the line that proves you know what you just did.

<YouShouldSee heading="The six blanks, filled in">

| blank | answer |
|---|---|
| `g(n) =` | `n` |
| Write the inequality | `0 ≤ 2n + 8 ≤ c·n` |
| Substitute `c = 4` | `2n + 8 ≤ 4n` |
| Solve for `n` | `8 ≤ 2n`, so `n ≥ 4` |
| A valid `n₀` is | `4` |
| Conclusion | Since `2n + 8 ≤ 4n` for all `n ≥ 4` with `c = 4`, by definition `2n + 8 = O(n)`. |

</YouShouldSee>

## Do all six yourself

Same question, six blanks, in the order the sheet puts them. Type an answer and
press Enter to check it. Nothing here is new since the walkthrough above — the
point is to produce the six from memory, because that is what the exam asks for.

<ScoreBoard group="bigo-proof" label="Question 2: the Big-O proof" />

<FillIn
  label="g(n) ="
  answer="n"
  placeholder="the function inside O(...)"
  hint="the claim is 2n + 8 = O(n) — what is inside the brackets?"
  solution="We are comparing 2n + 8 against n, so g(n) = n."
  group="bigo-proof"
/>

<FillIn
  label="Write the inequality:"
  :answer="['0 ≤ 2n + 8 ≤ c·n', '0 ≤ 2n + 8 ≤ cn', '0 ≤ 2n + 8 ≤ c*n', '2n + 8 ≤ c·n', '2n + 8 ≤ cn', '2n + 8 ≤ c*n']"
  placeholder="leave c as a letter for now"
  wide
  hint="the definition, with f(n) on the left and c still symbolic"
  solution="The definition is 0 ≤ f(n) ≤ c·g(n), so 0 ≤ 2n + 8 ≤ c·n."
  group="bigo-proof"
/>

<FillIn
  label="Substitute c = 4:"
  :answer="['2n + 8 ≤ 4n', '2n + 8 ≤ 4·n', '2n + 8 ≤ 4*n', '0 ≤ 2n + 8 ≤ 4n', '0 ≤ 2n + 8 ≤ 4*n']"
  placeholder="replace c with 4"
  wide
  solution="Putting c = 4 into c·n gives 2n + 8 ≤ 4n."
  group="bigo-proof"
/>

<FillIn
  label="Solve for n:"
  :answer="['8 ≤ 2n', '2n ≥ 8', 'n ≥ 4', '8 ≤ 2n, so n ≥ 4', '2n ≥ 8, so n ≥ 4']"
  placeholder="subtract 2n, then divide by 2"
  wide
  hint="move every n to one side and every number to the other"
  solution="2n + 8 ≤ 4n becomes 8 ≤ 2n after subtracting 2n, and n ≥ 4 after dividing by 2."
  group="bigo-proof"
/>

<FillIn
  label="A valid n₀ is:"
  :numeric="4"
  answer="n₀ = 4"
  placeholder="a number"
  hint="the first n where the inequality holds"
  solution="At n = 4 both sides are 16, so n₀ = 4 is valid. Any larger n₀ also works."
  group="bigo-proof"
/>

<FillIn
  label="Conclusion:"
  :answer="['Since 2n + 8 ≤ 4n for all n ≥ 4 with c = 4, by definition 2n + 8 = O(n).', '2n + 8 = O(n)', '2n + 8 = O(n) with c = 4 and n₀ = 4', '2n + 8 = O(n) with c = 4 and n0 = 4', 'By definition, 2n + 8 = O(n).', 'Therefore 2n + 8 = O(n).']"
  placeholder="name the constants and state the claim"
  wide
  hint="an inequality, a range, both constants, and the claim itself"
  solution="Name c and n₀, state the range, and finish with 2n + 8 = O(n)."
  group="bigo-proof"
/>

<IfItsWrong error="n₀ = 3" means="you took the n from the algebra one step too far back — probably by rounding n ≥ 4 down, or by using the last n where the inequality was still false.">

`n₀ = 3` is the off-by-one answer to this question, and it fails at the
boundary. With `c = 4` and `n = 3`:

```
2(3) + 8 = 14
4(3)     = 12
```

and `14 ≤ 12` is false. The definition needs the inequality to hold at `n₀`, and
at every integer after it. `n₀ = 3` promises something at `n = 3` that is not
true, so the proof does not go through — even though `n₀ = 4` would work
perfectly.

This is the mistake the `n ≥ 4` line protects you against. The algebra produced a
boundary, not a range with soft edges: `4` is in, `3` is out, and the test is to
substitute the boundary value into both sides and compare. Do that once, every
time, and this error cannot survive.

</IfItsWrong>

<CommonMistake heading="Thinking c has to be the smallest multiple that works">

It is easy to come away from this chapter believing that `c = 4` is special —
that the proof works because `4` is *the* multiple, in the way `n₀ = 4` is the
first `n` that works. It is not. `n₀` has a smallest valid value; `c` does not
have to be it.

Watch `c = 10` with `n₀ = 1`:

```
2(1) + 8 = 10
10(1)    = 10
```

so `10 ≤ 10` holds at the boundary. ✓ And it keeps holding, because
`2n + 8 ≤ 10n` becomes `8 ≤ 8n`, which is true for every `n ≥ 1`. That is a
complete, correct proof of `2n + 8 = O(n)`, and a marker has no reason to
prefer it to the `c = 4` version or to penalise it.

The reason this matters beyond the arithmetic: students who think `c` must be
minimal spend exam time hunting for a smaller constant and invent false rules
about which one is allowed. The definition says *there exist* `c` and `n₀`. Any
pair that checks out is a proof. On this sheet `c` is given to you anyway, which
removes the question entirely — take it, use it, and spend your time on `n₀`.

</CommonMistake>

<UnderTheHood heading="The general rule for a linear f">

For a function of the form `f(n) = a·n + b` with a positive `b`, and any `c`
strictly greater than `a`, the algebra always ends the same way:

```
a·n + b ≤ c·n
      b ≤ (c − a)·n
      n ≥ b / (c − a)
```

so the smallest valid `n₀` is `b / (c − a)` rounded up. For this question,
`a = 2` and `b = 8`, so with `c = 4` the answer is `8 / 2 = 4`, and with
`c = 10` it is `8 / 8 = 1`. Both match what the algebra gave above.

Notice the condition on `c`: it has to be bigger than `a`, the coefficient of
`n`. If `c = 2` the inequality reads `8 ≤ 0`, which is never true — no `n₀`
can rescue a `c` that does not allow `f` to be dominated at all. As `c` grows
past `2`, `n₀` shrinks: `c = 3` gives `8`, `c = 4` gives `4`, `c = 10` gives `1`.
That is the trade the table in 2.1 described, and it is the only freedom the
definition has.

</UnderTheHood>

<ExerciseBlock heading="The same proof, different numbers" level="no new ideas">

Show that `3n + 5 = O(n)` using `c = 4`. All six blanks, on paper, without
looking at the walkthrough above.

The shape is identical: write `3n + 5 ≤ 4n`, subtract `3n` to get `5 ≤ n`, and
read the answer off as `n₀ = 5`. Check it at the boundary — `3(5) + 5 = 20` and
`4(5) = 20` — then write the conclusion sentence with both constants named.

If any of that felt like guesswork, the blank that went wrong is the one to
re-read. The numbers change; the six blanks never do.

</ExerciseBlock>

<Recap>

- The proof is a witness, not a calculation: you produce a `c` and an `n₀` and
  show the inequality holds from `n₀` on.
- `g(n)` is the function inside the `O(...)`, so here `g(n) = n`.
- The inequality is written with `c` symbolic first — `0 ≤ 2n + 8 ≤ c·n` — and
  `c = 4` is substituted into it second: `2n + 8 ≤ 4n`.
- Solving gives `8 ≤ 2n`, so `n ≥ 4`, which puts the starting point at `n₀ = 4`.
  Check the boundary by hand: `2(4) + 8 = 16` and `4(4) = 16`.
- `n₀ = 3` fails at `n = 3`, where `14 ≤ 12` is false.
- `c` does not have to be minimal. `c = 10` with `n₀ = 1` is a valid proof too.
- The conclusion names the inequality, the range, both constants, and finishes
  with `2n + 8 = O(n)`.

</Recap>

→ Next: **[2.3  Proving f(n) = Ω(g(n))](/part-2-asymptotics/big-omega-proof)**
