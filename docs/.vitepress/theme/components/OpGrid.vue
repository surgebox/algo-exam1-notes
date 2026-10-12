<script setup>
// ---------------------------------------------------------------------------
// Counting operations by hand, made visible.
//
// The nested-loop question on the exam is not really about loops. It is about
// being able to say "this line runs this many times" and defend it. So: one
// cell per execution of the basic operation, laid out as the loops lay it out
// (one row per outer iteration, one column per inner iteration), and a running
// total. Slide n and watch the shape of the count.
// ---------------------------------------------------------------------------
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  initialN: { type: Number, default: 6 },
  innerCount: { type: Number, default: 5 },
  // label for the line being counted
  op: { type: String, default: 'count++' },
  outerVar: { type: String, default: 'i' },
  innerVar: { type: String, default: 'j' },
  maxN: { type: Number, default: 12 },
})

const n = ref(props.initialN)
const filled = ref(props.innerCount * props.initialN) // how many cells have run
const running = ref(false)
let timer = null

const total = computed(() => n.value * props.innerCount)

const rows = computed(() =>
  Array.from({ length: n.value }, (_, i) => ({
    i,
    cells: Array.from({ length: props.innerCount }, (_, j) => ({
      j,
      index: i * props.innerCount + j,
    })),
  })),
)

const isOn = (idx) => idx < filled.value
const isLive = (idx) => idx === filled.value - 1

function clear() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}
function run() {
  if (running.value) return
  filled.value = 0
  running.value = true
  clear()
  timer = setInterval(() => {
    if (filled.value >= total.value) {
      running.value = false
      clear()
      return
    }
    filled.value++
  }, 130)
}
function reset() {
  clear()
  running.value = false
  filled.value = 0
}
function fillAll() {
  clear()
  running.value = false
  filled.value = total.value
}

watch(n, () => reset())
onBeforeUnmount(clear)

const table = computed(() =>
  [1, 5, 10, 100, 1000, 10000].map((v) => ({ n: v, c: v * props.innerCount })),
)
</script>

<template>
  <div class="og">
    <div class="og__head">
      <span class="og__tag">Count it</span>
      <span class="og__title">One square = one run of <code>{{ op }}</code></span>
      <span class="og__total">
        C(n) = <strong>{{ filled }}</strong> / {{ total }}
      </span>
    </div>

    <div class="og__body">
      <div class="og__left">
        <div class="og__axislabel">outer loop: {{ outerVar }}</div>
        <div class="og__gridwrap">
          <div v-for="row in rows" :key="row.i" class="og__row">
            <span class="og__rlab">{{ outerVar }}={{ row.i }}</span>
            <span
              v-for="c in row.cells"
              :key="c.j"
              class="og__cell"
              :class="{ 'is-on': isOn(c.index), 'is-live': isLive(c.index) }"
            />
          </div>
        </div>
        <div class="og__axislabel og__axislabel--inner">
          inner loop: {{ innerVar }} = 0 .. {{ innerCount - 1 }} &nbsp;→&nbsp; {{ innerCount }} columns
        </div>
      </div>

      <div class="og__right">
        <div class="og__slide">
          <label>
            n = <strong>{{ n }}</strong>
            <input type="range" min="1" :max="maxN" v-model.number="n" />
          </label>
        </div>

        <div class="og__controls">
          <button @click="run" :disabled="running">{{ running ? 'running…' : '▶ Run' }}</button>
          <button @click="fillAll">Fill all</button>
          <button @click="reset">Reset</button>
        </div>

        <div class="og__formula">
          <div class="og__frow">
            <span>outer loop runs</span><b>{{ n }} times</b>
          </div>
          <div class="og__frow">
            <span>inner loop runs</span><b>{{ innerCount }} times per outer step</b>
          </div>
          <div class="og__frow og__frow--sum">
            <span>C(n) =</span>
            <b>{{ n }} × {{ innerCount }} = {{ total }}</b>
          </div>
          <div class="og__frow og__frow--dom">
            <span>dominant term</span><b>{{ innerCount }}n</b>
          </div>
          <div class="og__frow og__frow--growth">
            <span>growth rate</span><b>O(n) — linear</b>
          </div>
        </div>

        <table class="og__tbl">
          <thead>
            <tr><th>n</th><th>C(n) = {{ innerCount }}n</th></tr>
          </thead>
          <tbody>
            <tr v-for="r in table" :key="r.n">
              <td>{{ r.n }}</td>
              <td>{{ r.c.toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
        <div class="og__punch">
          Every time n grows by a factor of 10, C(n) grows by a factor of 10. That is what
          "linear" means, and it is why the {{ innerCount }} is thrown away.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.og {
  border: 1px solid var(--lc-line);
  border-left: 6px solid var(--lc-amber);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  margin: 26px 0;
  overflow: hidden;
}
.og__head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: var(--lc-panel-2);
  border-bottom: 1px solid var(--lc-line);
}
.og__tag {
  color: #1a1a1f;
  background: var(--lc-amber);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 2px;
}
.og__title {
  color: var(--lc-text);
  font-size: 0.82rem;
}
.og__title code {
  background: transparent;
  border: none;
  color: var(--lc-gold);
}
.og__total {
  margin-left: auto;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.8rem;
  color: var(--lc-dim);
}
.og__total strong {
  color: var(--lc-gold);
}

.og__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;
  padding: 16px 18px 18px;
  align-items: start;
}
@media (max-width: 760px) {
  .og__body {
    grid-template-columns: 1fr;
  }
}

.og__axislabel {
  color: var(--lc-dim);
  font-size: 0.64rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.og__axislabel--inner {
  margin-top: 8px;
  margin-bottom: 0;
}
.og__row {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 3px;
}
.og__rlab {
  width: 42px;
  flex: 0 0 auto;
  color: var(--lc-dim);
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.66rem;
}
.og__cell {
  width: 26px;
  height: 22px;
  border: 1px solid var(--lc-line);
  border-radius: 2px;
  background: var(--lc-bg);
  transition: background 0.1s, border-color 0.1s;
}
.og__cell.is-on {
  background: rgba(255, 204, 102, 0.5);
  border-color: var(--lc-gold);
}
.og__cell.is-live {
  background: var(--lc-amber);
  border-color: var(--lc-amber);
  box-shadow: 0 0 8px rgba(255, 153, 102, 0.7);
}

.og__slide label {
  display: block;
  color: var(--lc-dim);
  font-size: 0.78rem;
  font-family: var(--vp-font-family-mono, monospace);
}
.og__slide strong {
  color: var(--lc-gold);
}
.og__slide input {
  width: 100%;
  margin-top: 6px;
  accent-color: var(--lc-amber);
}

.og__controls {
  display: flex;
  gap: 6px;
  margin: 10px 0 14px;
}
.og__controls button {
  background: var(--lc-panel-2);
  border: 1px solid var(--lc-line);
  color: var(--lc-text);
  border-radius: 3px;
  padding: 4px 11px;
  font-size: 0.76rem;
  cursor: pointer;
}
.og__controls button:hover:not(:disabled) {
  border-color: var(--lc-amber);
  color: var(--lc-amber);
}
.og__controls button:disabled {
  opacity: 0.55;
  cursor: default;
}

.og__formula {
  border: 1px solid var(--lc-line);
  border-radius: 4px;
  overflow: hidden;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.76rem;
  margin-bottom: 14px;
}
.og__frow {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 5px 10px;
  border-bottom: 1px solid var(--lc-line);
  color: var(--lc-dim);
}
.og__frow:last-child {
  border-bottom: none;
}
.og__frow b {
  color: var(--lc-text);
  font-weight: 600;
}
.og__frow--sum {
  background: rgba(255, 204, 102, 0.07);
}
.og__frow--sum b {
  color: var(--lc-gold);
}
.og__frow--growth b {
  color: var(--lc-sky);
}

.og__tbl {
  font-size: 0.72rem;
  font-family: var(--vp-font-family-mono, monospace);
}
.og__punch {
  margin-top: 12px;
  font-size: 0.8rem;
  color: var(--lc-dim);
  border-left: 3px solid var(--lc-amber);
  padding-left: 10px;
}
</style>
