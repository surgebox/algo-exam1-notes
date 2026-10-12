---
title: "5.2  Blank-sheet rehearsal"
description: "The same six questions with the scaffolding removed. Nothing but the numbers you have to produce."
---

# 5.2  Blank-sheet rehearsal

<ChapterMeta
  reading-time="40 min"
  :difficulty="3"
  :prerequisites="['5.1  Every question, worked']"
  you-will-answer="Everything, with nothing to lean on."
/>

Do this page last, and do it cold.

Everything explanatory is gone. There are no animations, no hints about which
pass shrinks, and no worked examples. Just the question, the blank table, and a
check button. If you can complete this page, you can complete the exam.

If you get stuck, the answer is there — but the way to use this page is: attempt
the whole question, *then* check. Checking cell by cell as you go turns
rehearsal back into reading.

<ScoreBoard group="rehearsal" label="Rehearsal — everything on this page" />

---

## 1. Nested loops

```c
for (int i = 0; i < n; i++) {
    for (int j = 0; j < 5; j++) {
        count++;
    }
}
```

<FillIn label="Basic Operation:" answer="count++" group="rehearsal" />
<FillIn label="C(n) =" answer="5n" group="rehearsal" />
<FillIn label="Dominant Term:" answer="5n" group="rehearsal" />
<FillIn label="Growth Rate:" :answer="['O(n)', 'On', 'linear']" group="rehearsal" />

::: details Answers — open only after you have written yours down

`count++`; `C(n) = 5n`; dominant term `5n`; growth rate `O(n)`.

:::

---

## 2. Show that 2n + 8 = O(n), using c = 4

<FillIn label="g(n) =" answer="n" group="rehearsal" />
<FillIn label="Inequality:" :answer="['0 <= 2n + 8 <= c*n', '0<=2n+8<=cn', '2n+8<=c*n']" wide group="rehearsal" />
<FillIn label="Substitute c = 4:" :answer="['2n + 8 <= 4n', '2n+8<=4n']" wide group="rehearsal" />
<FillIn label="Solve for n:" :answer="['8 <= 2n', 'n >= 4', '2n >= 8']" wide group="rehearsal" />
<FillIn label="n₀ =" :numeric="4" answer="n0 = 4" group="rehearsal" />
<FillIn label="Conclusion:" :answer="['2n + 8 = O(n)', '2n+8 = O(n)']" wide group="rehearsal" />

::: details Answers — open only after you have written yours down

`g(n) = n`; the inequality `0 ≤ 2n + 8 ≤ c·n`; substituted, `2n + 8 ≤ 4n`;
solving, `8 ≤ 2n` so `n ≥ 4`; a valid `n₀ = 4`; conclusion: since `2n + 8 ≤ 4n`
for all `n ≥ 4` with `c = 4`, by definition `2n + 8 = O(n)`.

:::

---

## 3. Show that 4n − 12 = Ω(n), using c = 2

<FillIn label="g(n) =" answer="n" group="rehearsal" />
<FillIn label="Inequality:" :answer="['4n - 12 >= c*n', '4n-12>=cn', 'c*n <= 4n - 12']" wide group="rehearsal" />
<FillIn label="Substitute c = 2:" :answer="['4n - 12 >= 2n', '4n-12>=2n']" wide group="rehearsal" />
<FillIn label="Solve for n:" :answer="['2n >= 12', 'n >= 6']" wide group="rehearsal" />
<FillIn label="n₀ =" :numeric="6" answer="n0 = 6" group="rehearsal" />
<FillIn label="Conclusion:" :answer="['4n - 12 = omega(n)', '4n-12 = Omega(n)', '4n-12 = Ω(n)']" wide group="rehearsal" />

::: details Answers — open only after you have written yours down

`g(n) = n`; the inequality `4n − 12 ≥ c·n`; substituted, `4n − 12 ≥ 2n`;
solving, `2n ≥ 12` so `n ≥ 6`; a valid `n₀ = 6`; conclusion: since
`4n − 12 ≥ 2n` for all `n ≥ 6` with `c = 2`, by definition `4n − 12 = Ω(n)`.

:::

---

## 4. Bubble sort on [7, 3, 5, 1, 4]

Complete the whole table. The **Comparison** column is given — it is just "which
two cells are being looked at" — so the blanks are the three columns that
actually require you to have done the work.

<FillIn label="Total comparisons:" :numeric="10" group="rehearsal" />
<FillIn label="Total swaps:" :numeric="7" group="rehearsal" />

<TraceTable
  title="Bubble sort — full trace"
  group="rehearsal"
  caption="Fill in Swap?, Array After Comparison and Array After Pass. The Sorted Suffix column is the finished tail after each pass."
  :columns="['Pass', 'Array at Start', 'Comparison', 'Swap?', 'Array After Comparison', 'Array After Pass', 'Sorted Suffix']"
  :rows="[
    [1, '[7, 3, 5, 1, 4]', 'A[0] vs A[1]: 7 vs 3', { answer: ['yes', 'y', 'swap'], ph: '?' }, { answer: ['[3, 7, 5, 1, 4]', '3, 7, 5, 1, 4'], ph: '?', wide: true }, { answer: ['[3, 5, 1, 4, 7]', '3, 5, 1, 4, 7'], ph: '?', wide: true }, { answer: ['[7]', '7'], ph: '?' }],
    ['', '', 'A[1] vs A[2]: 7 vs 5', { answer: ['yes', 'y', 'swap'], ph: '?' }, { answer: ['[3, 5, 7, 1, 4]', '3, 5, 7, 1, 4'], ph: '?', wide: true }, '', ''],
    ['', '', 'A[2] vs A[3]: 7 vs 1', { answer: ['yes', 'y', 'swap'], ph: '?' }, { answer: ['[3, 5, 1, 7, 4]', '3, 5, 1, 7, 4'], ph: '?', wide: true }, '', ''],
    ['', '', 'A[3] vs A[4]: 7 vs 4', { answer: ['yes', 'y', 'swap'], ph: '?' }, { answer: ['[3, 5, 1, 4, 7]', '3, 5, 1, 4, 7'], ph: '?', wide: true }, '', ''],
    [2, '[3, 5, 1, 4, 7]', 'A[0] vs A[1]: 3 vs 5', { answer: ['no', 'n'], ph: '?' }, { answer: ['[3, 5, 1, 4, 7]', '3, 5, 1, 4, 7'], ph: '?', wide: true }, { answer: ['[3, 1, 4, 5, 7]', '3, 1, 4, 5, 7'], ph: '?', wide: true }, { answer: ['[5, 7]', '5, 7'], ph: '?' }],
    ['', '', 'A[1] vs A[2]: 5 vs 1', { answer: ['yes', 'y', 'swap'], ph: '?' }, { answer: ['[3, 1, 5, 4, 7]', '3, 1, 5, 4, 7'], ph: '?', wide: true }, '', ''],
    ['', '', 'A[2] vs A[3]: 5 vs 4', { answer: ['yes', 'y', 'swap'], ph: '?' }, { answer: ['[3, 1, 4, 5, 7]', '3, 1, 4, 5, 7'], ph: '?', wide: true }, '', ''],
    [3, '[3, 1, 4, 5, 7]', 'A[0] vs A[1]: 3 vs 1', { answer: ['yes', 'y', 'swap'], ph: '?' }, { answer: ['[1, 3, 4, 5, 7]', '1, 3, 4, 5, 7'], ph: '?', wide: true }, { answer: ['[1, 3, 4, 5, 7]', '1, 3, 4, 5, 7'], ph: '?', wide: true }, { answer: ['[4, 5, 7]', '4, 5, 7'], ph: '?' }],
    ['', '', 'A[1] vs A[2]: 3 vs 4', { answer: ['no', 'n'], ph: '?' }, { answer: ['[1, 3, 4, 5, 7]', '1, 3, 4, 5, 7'], ph: '?', wide: true }, '', ''],
    [4, '[1, 3, 4, 5, 7]', 'A[0] vs A[1]: 1 vs 3', { answer: ['no', 'n'], ph: '?' }, { answer: ['[1, 3, 4, 5, 7]', '1, 3, 4, 5, 7'], ph: '?', wide: true }, { answer: ['[1, 3, 4, 5, 7]', '1, 3, 4, 5, 7'], ph: '?', wide: true }, { answer: ['[3, 4, 5, 7]', '3, 4, 5, 7'], ph: '?' }]
  ]"
/>

<FillIn label="Final sorted array:" :answer="['[1, 3, 4, 5, 7]', '1, 3, 4, 5, 7', '1 3 4 5 7']" wide group="rehearsal" />

---

## 5. Selection sort on [8, 4, 6, 2, 7, 1]

<FillIn label="Total comparisons:" :numeric="15" group="rehearsal" />
<FillIn label="Total swaps:" :numeric="3" group="rehearsal" />

<TraceTable
  title="Selection sort — full trace"
  group="rehearsal"
  caption="Min Starts At / Min Found / Swap / Array After Pass are yours. Remember: record the minimum only after the whole unsorted portion has been scanned."
  :columns="['Pass', 'Array at Start', 'Min Starts At', 'Min Found', 'Swap', 'Array After Pass']"
  :rows="[
    [1, '[8, 4, 6, 2, 7, 1]', { answer: ['index 0 (value 8)', 'index 0', '0', 'i = 0'], ph: '?' }, { answer: ['index 5 (value 1)', 'index 5', '5'], ph: '?' }, { answer: ['A[0] <-> A[5]', 'A[0] and A[5]', 'swap A[0] and A[5]', '0 and 5'], ph: '?' }, { answer: ['[1, 4, 6, 2, 7, 8]', '1, 4, 6, 2, 7, 8'], ph: '?', wide: true }],
    [2, '[1, 4, 6, 2, 7, 8]', { answer: ['index 1 (value 4)', 'index 1', '1', 'i = 1'], ph: '?' }, { answer: ['index 3 (value 2)', 'index 3', '3'], ph: '?' }, { answer: ['A[1] <-> A[3]', 'A[1] and A[3]', 'swap A[1] and A[3]', '1 and 3'], ph: '?' }, { answer: ['[1, 2, 6, 4, 7, 8]', '1, 2, 6, 4, 7, 8'], ph: '?', wide: true }],
    [3, '[1, 2, 6, 4, 7, 8]', { answer: ['index 2 (value 6)', 'index 2', '2', 'i = 2'], ph: '?' }, { answer: ['index 3 (value 4)', 'index 3', '3'], ph: '?' }, { answer: ['A[2] <-> A[3]', 'A[2] and A[3]', 'swap A[2] and A[3]', '2 and 3'], ph: '?' }, { answer: ['[1, 2, 4, 6, 7, 8]', '1, 2, 4, 6, 7, 8'], ph: '?', wide: true }],
    [4, '[1, 2, 4, 6, 7, 8]', { answer: ['index 3 (value 6)', 'index 3', '3', 'i = 3'], ph: '?' }, { answer: ['index 3 (value 6)', 'index 3', '3'], ph: '?' }, { answer: ['none', 'no swap', 'no', 'min = i'], ph: '?' }, { answer: ['[1, 2, 4, 6, 7, 8]', '1, 2, 4, 6, 7, 8'], ph: '?', wide: true }],
    [5, '[1, 2, 4, 6, 7, 8]', { answer: ['index 4 (value 7)', 'index 4', '4', 'i = 4'], ph: '?' }, { answer: ['index 4 (value 7)', 'index 4', '4'], ph: '?' }, { answer: ['none', 'no swap', 'no', 'min = i'], ph: '?' }, { answer: ['[1, 2, 4, 6, 7, 8]', '1, 2, 4, 6, 7, 8'], ph: '?', wide: true }]
  ]"
/>

<FillIn label="Final sorted array:" :answer="['[1, 2, 4, 6, 7, 8]', '1, 2, 4, 6, 7, 8', '1 2 4 6 7 8']" wide group="rehearsal" />

---

## 6a. Trace countdown(4)

```python
def countdown(n):
    if n == 0:
        return

    print(n)
    countdown(n - 1)
```

<TraceTable
  title="countdown(4)"
  group="rehearsal"
  :columns="['Step', 'Current Call', 'Value of n', 'What happens next?']"
  :rows="[
    [1, 'countdown(4)', { answer: ['4'], numeric: 4, ph: '?' }, { answer: ['print 4, then call countdown(3)', 'print 4 then call countdown(3)'], ph: '?', wide: true }],
    [2, 'countdown(3)', { answer: ['3'], numeric: 3, ph: '?' }, { answer: ['print 3, then call countdown(2)', 'print 3 then call countdown(2)'], ph: '?', wide: true }],
    [3, 'countdown(2)', { answer: ['2'], numeric: 2, ph: '?' }, { answer: ['print 2, then call countdown(1)', 'print 2 then call countdown(1)'], ph: '?', wide: true }],
    [4, 'countdown(1)', { answer: ['1'], numeric: 1, ph: '?' }, { answer: ['print 1, then call countdown(0)', 'print 1 then call countdown(0)'], ph: '?', wide: true }],
    [5, 'countdown(0)', { answer: ['0'], numeric: 0, ph: '?' }, { answer: ['base case - return, print nothing', 'n == 0 so return', 'return, nothing printed', 'base case, returns'], ph: '?', wide: true }]
  ]"
/>

<FillIn label="Output:" :answer="['4 3 2 1', '4, 3, 2, 1', '4321']" wide group="rehearsal" />
<FillIn label="Number of calls made:" :numeric="5" group="rehearsal" />
<FillIn label="Number of values printed:" :numeric="4" group="rehearsal" />

---

## 6b. Trace sum_to_n(4)

```python
def sum_to_n(n):
    if n == 0:
        return 0

    return n + sum_to_n(n - 1)
```

<TraceTable
  title="sum_to_n(4) — calls going down"
  group="rehearsal"
  :columns="['Call phase', 'Pending expression']"
  :rows="[
    ['sum_to_n(4)', { answer: ['4 + sum_to_n(3)', '4+sum_to_n(3)'], ph: '?', wide: true }],
    ['sum_to_n(3)', { answer: ['3 + sum_to_n(2)', '3+sum_to_n(2)'], ph: '?', wide: true }],
    ['sum_to_n(2)', { answer: ['2 + sum_to_n(1)', '2+sum_to_n(1)'], ph: '?', wide: true }],
    ['sum_to_n(1)', { answer: ['1 + sum_to_n(0)', '1+sum_to_n(0)'], ph: '?', wide: true }],
    ['sum_to_n(0)', { answer: ['base case', 'base case - returns 0', 'returns 0'], ph: '?', wide: true }]
  ]"
/>

<TraceTable
  title="sum_to_n(4) — returns coming up"
  group="rehearsal"
  :columns="['Return phase', 'Value returned']"
  :rows="[
    ['sum_to_n(0)', { answer: ['0'], numeric: 0, ph: '?' }],
    ['sum_to_n(1)', { answer: ['1 + 0 = 1', '1', '1+0=1'], numeric: 1, ph: '?' }],
    ['sum_to_n(2)', { answer: ['2 + 1 = 3', '3', '2+1=3'], numeric: 3, ph: '?' }],
    ['sum_to_n(3)', { answer: ['3 + 3 = 6', '6', '3+3=6'], numeric: 6, ph: '?' }],
    ['sum_to_n(4)', { answer: ['4 + 6 = 10', '10', '4+6=10'], numeric: 10, ph: '?' }]
  ]"
/>

<FillIn label="sum_to_n(4) =" :numeric="10" group="rehearsal" />

---

<Recap>

- If this page was easy, stop studying and go to bed. That is genuinely the
  right move.
- If one question was hard, go back to the corresponding chapter — not to 5.1.
  The machinery is in the chapters; 5.1 is only the answer key.
- If the *arithmetic* was the problem rather than the method — a pass counted
  wrong, an array copied wrong — the fix is slower writing, not more study.
  These are the questions where care beats speed.
- The last thing to re-read before the exam: the check that catches the most
  errors across this whole sheet is **plug your answer back in**. `n₀`, the
  array after a pass, `sum_to_n(4)`. Every one of them is verifiable in seconds.

</Recap>

→ Next: **[5.3  Cheat sheet](/part-5-exam/cheat-sheet)**
