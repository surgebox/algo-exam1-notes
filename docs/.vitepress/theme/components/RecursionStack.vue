<script setup>
// ---------------------------------------------------------------------------
// Recursion, drawn as a staircase.
//
// A recursive call is easy to read and hard to see. What this draws is the
// thing the exam table is really asking about: frames piling up on the way
// down, each one holding an unfinished piece of work, and then those frames
// coming back off the stack with answers attached.
//
// The pending column is the important one. In sum_to_n, every frame holds
// "n + <something I do not know yet>" - which is why nothing can be added up
// until the base case has been reached and the stack starts unwinding.
// ---------------------------------------------------------------------------
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'countdown' }, // 'countdown' | 'sum'
  n: { type: Number, default: 4 },
})

const fnName = computed(() => (props.mode === 'sum' ? 'sum_to_n' : 'countdown'))

function build() {
  const n = props.n
  const steps = []
  const stack = []
  const output = []

  if (props.mode === 'sum') {
    // ---- calls going down ----
    for (let k = n; k >= 0; k--) {
      const pending = k === 0 ? 'base case - this one can answer immediately' : `${k} + ${fnName.value}(${k - 1})`
      stack.push({ name: `${fnName.value}(${k})`, pending })
      steps.push({
        stack: stack.map((f) => ({ ...f })),
        note:
          k === 0
            ? `Call ${fnName.value}(0). n == 0, so this is the base case: it returns 0 immediately. Nothing needs to be called.`
            : `Call ${fnName.value}(${k}). The body is "return ${k} + ${fnName.value}(${k - 1})". Python cannot add ${k} to anything yet, so this frame waits while it calls ${fnName.value}(${k - 1}).`,
        output: [...output],
        phase: 'down',
      })
    }
    // ---- returns coming up ----
    const values = {}
    for (let k = 0; k <= n; k++) {
      values[k] = k === 0 ? 0 : k + values[k - 1]
      const top = stack.pop()
      if (top) top.value = values[k]
      steps.push({
        stack: stack.map((f) => ({ ...f })),
        note:
          k === 0
            ? `Base case returns 0 to the frame below it.`
            : `${fnName.value}(${k}) now has everything it needs: ${k} + ${values[k - 1]} = ${values[k]}. It returns ${values[k]}.`,
        output: [...output],
        phase: 'up',
        returned: `${fnName.value}(${k}) = ${values[k]}`,
      })
    }
    return { steps, answer: values[n] }
  }

  // ---- countdown ----
  for (let k = n; k >= 0; k--) {
    const isBase = k === 0
    stack.push({ name: `${fnName.value}(${k})`, pending: isBase ? 'base case - return without printing' : `print ${k}, then call ${fnName.value}(${k - 1})` })
    if (!isBase) output.push(k)
    steps.push({
      stack: stack.map((f) => ({ ...f })),
      note: isBase
        ? `Call ${fnName.value}(0). n == 0, so the base case fires: bare return, nothing printed. The recursion stops here - this is the floor of the staircase.`
        : `Call ${fnName.value}(${k}). Print ${k}, then call ${fnName.value}(${k - 1}). The print happens on the way DOWN, before the next call.`,
      output: [...output],
      phase: 'down',
    })
  }
  for (let k = 0; k <= n; k++) {
    stack.pop()
    steps.push({
      stack: stack.map((f) => ({ ...f })),
      note:
        k === 0
          ? `The base case returns to ${fnName.value}(1). There is no code after the call, so ${fnName.value}(1) returns too.`
          : `${fnName.value}(${k}) has nothing left to do - the call to ${fnName.value}(${k - 1}) already finished and there is no code after it. It returns, and the frame disappears.`,
      output: [...output],
      phase: 'up',
    })
  }
  return { steps, answer: output.join(', ') }
}

const built = computed(build)

const at = ref(0)
const playing = ref(false)
let timer = null

const last = computed(() => built.value.steps.length - 1)
const step = computed(() => built.value.steps[Math.min(at.value, last.value)])

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
    if (at.value >= last.value) return pause()
    at.value++
  }, 1400)
}
function pause() {
  playing.value = false
  clear()
}
const toggle = () => (playing.value ? pause() : play())
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

watch(
  () => [props.mode, props.n],
  () => {
    pause()
    at.value = 0
  },
)
onBeforeUnmount(clear)
</script>

<template>
  <div class="rs">
    <div class="rs__head">
      <span class="rs__tag">Call stack</span>
      <span class="rs__title">{{ fnName }}({{ n }})</span>
      <span class="rs__phase" :class="'is-' + step.phase">
        {{ step.phase === 'down' ? 'calls going down' : 'returns coming up' }}
      </span>
    </div>

    <div class="rs__body">
      <div class="rs__stack">
        <div class="rs__stacktitle">Frames, deepest call at the top</div>
        <div
          v-for="(f, i) in step.stack"
          :key="i"
          class="rs__frame"
          :class="{ 'is-top': i === step.stack.length - 1 }"
          :style="{ marginLeft: (i * 14) + 'px' }"
        >
          <span class="rs__fname">{{ f.name }}</span>
          <span class="rs__fpending">{{ f.pending }}</span>
        </div>
        <div v-if="!step.stack.length" class="rs__empty">
          Stack is empty - every call has returned.
        </div>
      </div>

      <div class="rs__side">
        <div class="rs__note">{{ step.note }}</div>

        <div class="rs__panel">
          <div class="rs__ptitle">{{ mode === 'sum' ? 'Values returned so far' : 'Printed so far' }}</div>
          <div v-if="mode === 'sum'" class="rs__out">
            <span v-for="(o, i) in step.output" :key="i" class="rs__op">{{ o }}</span>
            <span v-if="step.returned" class="rs__ret">{{ step.returned }}</span>
            <span v-if="!step.output.length && !step.returned" class="rs__nothing">(nothing yet)</span>
          </div>
          <div v-else class="rs__out">
            <span v-for="(o, i) in step.output" :key="i" class="rs__op">{{ o }}</span>
            <span v-if="!step.output.length" class="rs__nothing">(nothing yet)</span>
          </div>
        </div>

        <div class="rs__panel">
          <div class="rs__ptitle">The answer</div>
          <div class="rs__answer">
            {{ mode === 'sum' ? `${fnName}(${n}) = ${built.answer}` : `prints: ${built.answer}` }}
          </div>
        </div>
      </div>
    </div>

    <div class="rs__controls">
      <button class="rs__btn" @click="reset">&#9198;</button>
      <button class="rs__btn" @click="prev">&#9664;</button>
      <button class="rs__btn rs__btn--play" @click="toggle">
        {{ playing ? '&#10074;&#10074;  Pause' : '&#9654;  Play' }}
      </button>
      <button class="rs__btn" @click="next">&#9654;</button>
      <input
        class="rs__scrub"
        type="range"
        min="0"
        :max="last"
        :value="at"
        @input="pause(); at = Number($event.target.value)"
      />
      <span class="rs__count">{{ at + 1 }} / {{ last + 1 }}</span>
    </div>
  </div>
</template>

<style scoped>
.rs {
  border: 1px solid var(--lc-line);
  border-left: 6px solid var(--lc-violet);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  margin: 26px 0;
  overflow: hidden;
}
.rs__head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: var(--lc-panel-2);
  border-bottom: 1px solid var(--lc-line);
}
.rs__tag {
  color: #1a1a1f;
  background: var(--lc-violet);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 2px;
}
.rs__title {
  font-family: var(--vp-font-family-mono, monospace);
  color: var(--lc-text);
  font-size: 0.86rem;
}
.rs__phase {
  margin-left: auto;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.rs__phase.is-down {
  color: var(--lc-amber);
}
.rs__phase.is-up {
  color: var(--lc-sky);
}

.rs__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 18px;
  padding: 16px 18px;
  align-items: start;
}
@media (max-width: 760px) {
  .rs__body {
    grid-template-columns: 1fr;
  }
}

.rs__stacktitle,
.rs__ptitle {
  color: var(--lc-dim);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.rs__frame {
  display: flex;
  gap: 10px;
  align-items: baseline;
  border: 1px solid var(--lc-line);
  border-left: 3px solid var(--lc-plum-bright);
  border-radius: 3px;
  background: var(--lc-bg);
  padding: 6px 10px;
  margin-bottom: 4px;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.76rem;
  transition: margin 0.2s;
}
.rs__frame.is-top {
  border-left-color: var(--lc-gold);
  background: rgba(255, 204, 102, 0.09);
}
.rs__fname {
  color: var(--lc-text);
  white-space: nowrap;
}
.rs__fpending {
  margin-left: auto;
  color: var(--lc-dim);
  font-size: 0.68rem;
  text-align: right;
}
.rs__empty {
  color: var(--lc-dim);
  font-size: 0.78rem;
  font-style: italic;
  padding: 8px 0;
}

.rs__note {
  border-left: 3px solid var(--lc-violet);
  background: rgba(153, 153, 255, 0.08);
  padding: 9px 12px;
  border-radius: 0 4px 4px 0;
  font-size: 0.85rem;
  color: var(--lc-text);
  font-family: var(--vp-font-family-mono, monospace);
  min-height: 76px;
  margin-bottom: 12px;
}

.rs__panel {
  margin-bottom: 12px;
}
.rs__out {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-family: var(--vp-font-family-mono, monospace);
}
.rs__op {
  background: rgba(204, 153, 204, 0.16);
  border: 1px solid var(--lc-lilac);
  color: #f1dcff;
  border-radius: 3px;
  padding: 2px 8px;
  font-size: 0.82rem;
}
.rs__ret {
  background: rgba(153, 204, 255, 0.14);
  border: 1px solid var(--lc-sky);
  color: #dceeff;
  border-radius: 3px;
  padding: 2px 8px;
  font-size: 0.82rem;
}
.rs__nothing {
  color: var(--lc-dim);
  font-size: 0.78rem;
  font-style: italic;
}
.rs__answer {
  color: var(--lc-gold);
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.9rem;
}

.rs__controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 10px 18px 16px;
  border-top: 1px solid var(--lc-line);
}
.rs__btn {
  background: var(--lc-panel-2);
  border: 1px solid var(--lc-line);
  color: var(--lc-text);
  border-radius: 3px;
  padding: 5px 12px;
  font-size: 0.82rem;
  cursor: pointer;
}
.rs__btn:hover {
  border-color: var(--lc-violet);
  color: #dcdcff;
}
.rs__btn--play {
  min-width: 104px;
  color: var(--lc-gold);
}
.rs__scrub {
  flex: 1 1 120px;
  accent-color: var(--lc-violet);
}
.rs__count {
  color: var(--lc-dim);
  font-size: 0.72rem;
  font-family: var(--vp-font-family-mono, monospace);
}
</style>
