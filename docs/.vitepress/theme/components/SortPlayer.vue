<script setup>
// ---------------------------------------------------------------------------
// Bubble sort and selection sort, run one step at a time.
//
// The exam asks you to fill in a trace table by hand. This is the same trace,
// but you can rewind it, slow it down, and watch which line of the pseudocode
// is live at each moment. The point is not to replace the hand trace - it is
// to let you check yours against something that never miscounts.
//
// "Table" mode shows the finished trace in exactly the columns the exam
// worksheet uses, so you can compare column by column.
// ---------------------------------------------------------------------------
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import ArrayTrack from './ArrayTrack.vue'

const props = defineProps({
  algorithm: { type: String, default: 'bubble' }, // 'bubble' | 'selection'
  initial: { type: Array, required: true },
})

const CODE = {
  bubble: [
    'BubbleSort(A[0..n-1])',
    '  for i = 0 to n - 2',
    '    for j = 0 to n - 2 - i',
    '      if A[j+1] < A[j]',
    '        swap A[j] and A[j+1]',
  ],
  selection: [
    'SelectionSort(A[0..n-1])',
    '  for i = 0 to n - 2',
    '    min = i',
    '    for j = i + 1 to n - 1',
    '      if A[j] < A[min]',
    '        min = j',
    '    swap A[i] and A[min]',
  ],
}

const code = computed(() => CODE[props.algorithm] || CODE.bubble)

// --- build every step up front -------------------------------------------------

function buildBubble(start) {
  const A = [...start]
  const n = A.length
  const steps = []
  let comparisons = 0
  let swaps = 0

  const snap = (extra) => ({
    values: [...A],
    compare: [],
    min: -1,
    cursor: -1,
    sortedFrom: -1,
    changed: [],
    line: 0,
    note: '',
    comparisons,
    swaps,
    pass: 0,
    ...extra,
  })

  steps.push(
    snap({ line: 0, note: `Start. n = ${n}. We make n - 1 = ${n - 1} passes.`, pass: 0 }),
  )

  for (let i = 0; i <= n - 2; i++) {
    const passNo = i + 1
    const unsortedEnd = n - 1 - i // last index still in play
    steps.push(
      snap({
        line: 1,
        pass: passNo,
        sortedFrom: unsortedEnd + 1,
        note: `Pass ${passNo}: i = ${i}. Compare every adjacent pair from index 0 up to index ${unsortedEnd - 1}. Indices ${unsortedEnd + 1}..${n - 1} are already final.`,
      }),
    )

    for (let j = 0; j <= n - 2 - i; j++) {
      comparisons++
      const left = A[j]
      const right = A[j + 1]
      const isSwap = right < left
      steps.push(
        snap({
          line: 3,
          pass: passNo,
          compare: [j, j + 1],
          cursor: j,
          sortedFrom: unsortedEnd + 1,
          note: `Compare A[${j}] = ${left} with A[${j + 1}] = ${right}.  Is A[${j + 1}] < A[${j}]?   ${right} < ${left} is ${isSwap ? 'true' : 'false'}.`,
        }),
      )
      if (isSwap) {
        A[j] = right
        A[j + 1] = left
        swaps++
        steps.push(
          snap({
            line: 4,
            pass: passNo,
            compare: [j, j + 1],
            cursor: j,
            changed: [j, j + 1],
            sortedFrom: unsortedEnd + 1,
            note: `Swap. The bigger value ${left} moves one place right. Array is now [${A.join(', ')}].`,
          }),
        )
      } else {
        steps.push(
          snap({
            line: 3,
            pass: passNo,
            compare: [j, j + 1],
            cursor: j,
            sortedFrom: unsortedEnd + 1,
            note: `No swap - they are already in order. Array is unchanged: [${A.join(', ')}].`,
          }),
        )
      }
    }

    steps.push(
      snap({
        line: 1,
        pass: passNo,
        sortedFrom: n - 1 - i,
        note: `End of pass ${passNo}. The largest remaining value, ${A[n - 1 - i]}, has bubbled all the way to index ${n - 1 - i} and is final. Array: [${A.join(', ')}].`,
      }),
    )
  }

  steps.push(
    snap({
      line: 0,
      pass: n - 1,
      sortedFrom: 0,
      note: `Done after ${n - 1} passes and ${comparisons} comparisons. Sorted: [${A.join(', ')}].`,
    }),
  )
  return { steps, sorted: [...A], comparisons, swaps }
}

function buildSelection(start) {
  const A = [...start]
  const n = A.length
  const steps = []
  let comparisons = 0
  let swaps = 0

  const snap = (extra) => ({
    values: [...A],
    compare: [],
    min: -1,
    cursor: -1,
    sortedBefore: -1,
    sortedFrom: -1,
    changed: [],
    line: 0,
    note: '',
    comparisons,
    swaps,
    pass: 0,
    ...extra,
  })

  steps.push(
    snap({ line: 0, note: `Start. n = ${n}. We make n - 1 = ${n - 1} passes.`, pass: 0 }),
  )

  for (let i = 0; i <= n - 2; i++) {
    const passNo = i + 1
    let min = i
    steps.push(
      snap({
        line: 2,
        pass: passNo,
        min,
        cursor: i,
        sortedBefore: i,
        note: `Pass ${passNo}: min starts at index ${i}, holding ${A[i]}. Indices 0..${i - 1} are already final${i === 0 ? ' (none yet)' : ''}.`,
      }),
    )

    for (let j = i + 1; j <= n - 1; j++) {
      comparisons++
      const cand = A[j]
      const best = A[min]
      const smaller = cand < best
      steps.push(
        snap({
          line: 4,
          pass: passNo,
          min,
          cursor: i,
          sortedBefore: i,
          compare: [j, min],
          note: `Compare A[${j}] = ${cand} against the running minimum A[${min}] = ${best}.  Is ${cand} < ${best}?   ${smaller ? 'true' : 'false'}.`,
        }),
      )
      if (smaller) {
        const old = min
        min = j
        steps.push(
          snap({
            line: 5,
            pass: passNo,
            min,
            cursor: i,
            sortedBefore: i,
            compare: [j],
            note: `Yes - the running minimum moves from index ${old} to index ${j} (now holding ${A[min]}).`,
          }),
        )
      }
    }

    const minValue = A[min]
    steps.push(
      snap({
        line: 6,
        pass: passNo,
        min,
        cursor: i,
        sortedBefore: i,
        note: `The scan is over. The smallest value in the unsorted part is ${minValue}, found at index ${min}.`,
      }),
    )

    if (min !== i) {
      const tmp = A[i]
      A[i] = A[min]
      A[min] = tmp
      swaps++
      steps.push(
        snap({
          line: 6,
          pass: passNo,
          min: i,
          cursor: i,
          sortedBefore: i,
          changed: [i, min],
          note: `Swap A[${i}] and A[${min}]: ${tmp} goes to index ${min}, ${minValue} comes to index ${i}. Array: [${A.join(', ')}].`,
        }),
      )
    } else {
      steps.push(
        snap({
          line: 6,
          pass: passNo,
          min: i,
          cursor: i,
          sortedBefore: i,
          note: `min === i, so the swap would exchange a position with itself. Nothing moves. Array: [${A.join(', ')}].`,
        }),
      )
    }

    steps.push(
      snap({
        line: 1,
        pass: passNo,
        min: i,
        cursor: i,
        sortedBefore: i + 1,
        note: `End of pass ${passNo}. Index ${i} now holds ${A[i]}, its final value. Array: [${A.join(', ')}].`,
      }),
    )
  }

  steps.push(
    snap({
      line: 0,
      pass: n - 1,
      sortedBefore: n,
      note: `Done after ${n - 1} passes and ${comparisons} comparisons. Sorted: [${A.join(', ')}].`,
    }),
  )
  return { steps, sorted: [...A], comparisons, swaps }
}

const built = computed(() =>
  props.algorithm === 'selection' ? buildSelection(props.initial) : buildBubble(props.initial),
)

// --- playback -----------------------------------------------------------------

const at = ref(0)
const playing = ref(false)
const speed = ref(900)
const mode = ref('step') // 'step' | 'table'
let timer = null

const step = computed(() => built.value.steps[Math.min(at.value, built.value.steps.length - 1)])
const last = computed(() => built.value.steps.length - 1)

function clear() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function play() {
  if (at.value >= last.value) at.value = 0
  playing.value = true
  clear()
  timer = setInterval(() => {
    if (at.value >= last.value) {
      pause()
      return
    }
    at.value++
  }, speed.value)
}

function pause() {
  playing.value = false
  clear()
}

function toggle() {
  playing.value ? pause() : play()
}

watch(speed, () => {
  if (playing.value) play()
})
watch(
  () => [props.algorithm, props.initial.join(',')],
  () => {
    pause()
    at.value = 0
  },
)
onBeforeUnmount(clear)

const next = () => {
  pause()
  if (at.value < last.value) at.value++
}
const prev = () => {
  pause()
  if (at.value > 0) at.value--
}
const reset = () => {
  pause()
  at.value = 0
}

// --- the finished trace, in the exam's columns ---------------------------------

const traceRows = computed(() => {
  const A = [...props.initial]
  const n = A.length
  const rows = []
  if (props.algorithm === 'selection') {
    for (let i = 0; i <= n - 2; i++) {
      const startArr = [...A]
      let min = i
      for (let j = i + 1; j <= n - 1; j++) if (A[j] < A[min]) min = j
      const minValue = A[min]
      const tmp = A[i]
      A[i] = A[min]
      A[min] = tmp
      rows.push({
        pass: i + 1,
        start: `[${startArr.join(', ')}]`,
        startsAt: `index ${i} (value ${startArr[i]})`,
        found: `index ${min} (value ${minValue})`,
        swap: min === i ? `none needed (min === i)` : `A[${i}] <-> A[${min}]`,
        after: `[${A.join(', ')}]`,
      })
    }
  } else {
    for (let i = 0; i <= n - 2; i++) {
      const startArr = [...A]
      const pairs = []
      for (let j = 0; j <= n - 2 - i; j++) {
        const before = [A[j], A[j + 1]]
        const swapped = A[j + 1] < A[j]
        if (swapped) {
          const t = A[j]
          A[j] = A[j + 1]
          A[j + 1] = t
        }
        pairs.push({
          cmp: `A[${j}] vs A[${j + 1}]: ${before[0]} vs ${before[1]}`,
          swap: swapped ? 'yes' : 'no',
          after: `[${A.join(', ')}]`,
        })
      }
      rows.push({
        pass: i + 1,
        start: `[${startArr.join(', ')}]`,
        pairs,
        after: `[${A.join(', ')}]`,
        suffix: `[${A.slice(n - 1 - i).join(', ')}]`,
      })
    }
  }
  return { rows, sorted: A }
})

const label = computed(() =>
  props.algorithm === 'selection' ? 'Selection sort' : 'Bubble sort',
)
</script>

<template>
  <div class="sp">
    <div class="sp__head">
      <span class="sp__tag">{{ label }}</span>
      <span class="sp__sub">n = {{ initial.length }}</span>
      <div class="sp__tabs">
        <button :class="{ 'is-on': mode === 'step' }" @click="mode = 'step'">Step through</button>
        <button :class="{ 'is-on': mode === 'table' }" @click="mode = 'table'">Finished table</button>
      </div>
    </div>

    <!-- ---------------------------------------------------------------- steps -->
    <div v-if="mode === 'step'" class="sp__body">
      <div class="sp__grid">
        <!-- code -->
        <div class="sp__code">
          <div class="sp__codetitle">Pseudocode</div>
          <div
            v-for="(ln, i) in code"
            :key="i"
            class="sp__line"
            :class="{ 'is-live': i === step.line }"
          >
            <span class="sp__ln">{{ i + 1 }}</span>
            <span class="sp__src">{{ ln }}</span>
          </div>
        </div>

        <!-- state -->
        <div class="sp__state">
          <div class="sp__statrow">
            <div class="sp__stat">
              <span class="sp__statk">Pass</span>
              <span class="sp__statv">{{ step.pass || '-' }}</span>
            </div>
            <div class="sp__stat">
              <span class="sp__statk">Comparisons</span>
              <span class="sp__statv">{{ step.comparisons }}</span>
            </div>
            <div class="sp__stat">
              <span class="sp__statk">Swaps</span>
              <span class="sp__statv">{{ step.swaps }}</span>
            </div>
            <div class="sp__stat">
              <span class="sp__statk">Step</span>
              <span class="sp__statv">{{ at + 1 }} / {{ last + 1 }}</span>
            </div>
          </div>

          <div class="sp__note">{{ step.note }}</div>
        </div>
      </div>

      <ArrayTrack
        :values="step.values"
        :compare="step.compare"
        :min="step.min"
        :cursor="step.cursor"
        :sorted-from="step.sortedFrom"
        :sorted-before="step.sortedBefore"
        :changed="step.changed"
      />

      <div class="sp__controls">
        <button class="sp__btn" title="First step" @click="reset">&#9198;</button>
        <button class="sp__btn" title="Previous step" @click="prev">&#9664;</button>
        <button class="sp__btn sp__btn--play" @click="toggle">
          {{ playing ? '&#10074;&#10074;  Pause' : '&#9654;  Play' }}
        </button>
        <button class="sp__btn" title="Next step" @click="next">&#9654;</button>

        <input
          class="sp__scrub"
          type="range"
          min="0"
          :max="last"
          :value="at"
          @input="pause(); at = Number($event.target.value)"
        />

        <label class="sp__speed">
          speed
          <select v-model.number="speed">
            <option :value="1600">slow</option>
            <option :value="900">normal</option>
            <option :value="420">fast</option>
            <option :value="160">very fast</option>
          </select>
        </label>
      </div>
    </div>

    <!-- ------------------------------------------------------------- the table -->
    <div v-else class="sp__table">
      <template v-if="algorithm === 'selection'">
        <table>
          <thead>
            <tr>
              <th>Pass</th>
              <th>Array at start</th>
              <th>Min starts at</th>
              <th>Min found</th>
              <th>Swap</th>
              <th>Array after pass</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in traceRows.rows" :key="r.pass">
              <td class="c">{{ r.pass }}</td>
              <td class="m">{{ r.start }}</td>
              <td>{{ r.startsAt }}</td>
              <td>{{ r.found }}</td>
              <td>{{ r.swap }}</td>
              <td class="m">{{ r.after }}</td>
            </tr>
            <tr class="sp__final">
              <td colspan="5"><strong>Final sorted array</strong></td>
              <td class="m">{{ traceRows.sorted.join(', ') }}</td>
            </tr>
          </tbody>
        </table>
      </template>

      <template v-else>
        <table>
          <thead>
            <tr>
              <th>Pass</th>
              <th>Array at start</th>
              <th>Comparison</th>
              <th>Swap?</th>
              <th>Array after comparison</th>
              <th>Array after pass</th>
              <th>Sorted suffix</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="r in traceRows.rows" :key="r.pass">
              <tr v-for="(p, k) in r.pairs" :key="r.pass + '-' + k">
                <td v-if="k === 0" class="c" :rowspan="r.pairs.length">{{ r.pass }}</td>
                <td v-if="k === 0" class="m" :rowspan="r.pairs.length">{{ r.start }}</td>
                <td class="m">{{ p.cmp }}</td>
                <td class="c">{{ p.swap }}</td>
                <td class="m">{{ p.after }}</td>
                <td v-if="k === 0" class="m" :rowspan="r.pairs.length">{{ r.after }}</td>
                <td v-if="k === 0" class="m" :rowspan="r.pairs.length">{{ r.suffix }}</td>
              </tr>
            </template>
            <tr class="sp__final">
              <td colspan="4"><strong>Final sorted array</strong></td>
              <td colspan="3" class="m">{{ traceRows.sorted.join(', ') }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<style scoped>
.sp {
  border: 1px solid var(--lc-line);
  border-left: 6px solid var(--lc-lilac);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  margin: 26px 0;
  overflow: hidden;
}
.sp__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: var(--lc-panel-2);
  border-bottom: 1px solid var(--lc-line);
}
.sp__tag {
  color: #1a1a1f;
  background: var(--lc-lilac);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 2px;
}
.sp__sub {
  color: var(--lc-dim);
  font-size: 0.78rem;
  font-family: var(--vp-font-family-mono, monospace);
}
.sp__tabs {
  margin-left: auto;
  display: flex;
  gap: 4px;
}
.sp__tabs button {
  background: transparent;
  border: 1px solid var(--lc-line);
  color: var(--lc-dim);
  font-size: 0.72rem;
  padding: 3px 10px;
  border-radius: 3px;
  cursor: pointer;
}
.sp__tabs button.is-on {
  color: #1a1a1f;
  background: var(--lc-lilac);
  border-color: var(--lc-lilac);
}

.sp__body {
  padding: 16px 18px 18px;
}
.sp__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}
@media (max-width: 720px) {
  .sp__grid {
    grid-template-columns: 1fr;
  }
}

.sp__code {
  background: var(--lc-bg);
  border: 1px solid var(--lc-line);
  border-radius: 4px;
  padding: 8px 0;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.8rem;
}
.sp__codetitle {
  color: var(--lc-dim);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0 12px 6px;
}
.sp__line {
  display: flex;
  gap: 10px;
  padding: 2px 12px;
  border-left: 3px solid transparent;
  transition: background 0.15s, border-color 0.15s;
}
.sp__line.is-live {
  background: rgba(204, 153, 204, 0.14);
  border-left-color: var(--lc-lilac);
}
.sp__line.is-live .sp__src {
  color: #f0dcff;
}
.sp__ln {
  color: var(--lc-dim);
  width: 1.1em;
  text-align: right;
  flex: 0 0 auto;
  user-select: none;
}
.sp__src {
  color: var(--lc-text);
  white-space: pre;
}

.sp__statrow {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}
.sp__stat {
  flex: 1 1 70px;
  background: var(--lc-panel-2);
  border: 1px solid var(--lc-line);
  border-radius: 3px;
  padding: 6px 9px;
}
.sp__statk {
  display: block;
  color: var(--lc-dim);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.sp__statv {
  color: var(--lc-gold);
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.95rem;
}
.sp__note {
  border-left: 3px solid var(--lc-sky);
  background: rgba(153, 204, 255, 0.07);
  padding: 9px 12px;
  border-radius: 0 4px 4px 0;
  font-size: 0.86rem;
  color: var(--lc-text);
  min-height: 62px;
  font-family: var(--vp-font-family-mono, monospace);
}

.sp__controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--lc-line);
}
.sp__btn {
  background: var(--lc-panel-2);
  border: 1px solid var(--lc-line);
  color: var(--lc-text);
  border-radius: 3px;
  padding: 5px 12px;
  font-size: 0.82rem;
  cursor: pointer;
}
.sp__btn:hover {
  border-color: var(--lc-lilac);
  color: #f0dcff;
}
.sp__btn--play {
  min-width: 104px;
  color: var(--lc-gold);
}
.sp__scrub {
  flex: 1 1 120px;
  accent-color: var(--lc-lilac);
}
.sp__speed {
  color: var(--lc-dim);
  font-size: 0.72rem;
  display: flex;
  align-items: center;
  gap: 6px;
}
.sp__speed select {
  background: var(--lc-panel-2);
  color: var(--lc-text);
  border: 1px solid var(--lc-line);
  border-radius: 3px;
  padding: 3px 6px;
  font-size: 0.74rem;
}

.sp__table {
  padding: 6px 18px 18px;
  overflow-x: auto;
  font-size: 0.76rem;
}
.sp__table table {
  font-family: var(--vp-font-family-mono, monospace);
}
.sp__table td.c {
  text-align: center;
}
.sp__table td.m {
  white-space: nowrap;
}
.sp__final td {
  background: rgba(255, 204, 102, 0.08);
  color: var(--lc-gold);
}
</style>
