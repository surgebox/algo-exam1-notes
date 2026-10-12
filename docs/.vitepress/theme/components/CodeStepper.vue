<script setup>
// ---------------------------------------------------------------------------
// A generic code walkthrough.
//
// Give it the code as lines and a list of steps; each step names the line that
// is live, says what just happened, and shows the whole state at that moment
// (variables, output so far, the call stack). Stepping through is the whole
// point - recursion and loop counting are both things you cannot see by
// staring at the source.
// ---------------------------------------------------------------------------
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  title: { type: String, default: 'Step through' },
  code: { type: Array, required: true },
  steps: { type: Array, required: true },
  outputLabel: { type: String, default: 'Output so far' },
  stackLabel: { type: String, default: '' },
  varsLabel: { type: String, default: 'State' },
})

const at = ref(0)
const playing = ref(false)
const speed = ref(1100)
let timer = null

const last = computed(() => props.steps.length - 1)
const step = computed(() => props.steps[Math.min(at.value, last.value)])

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
  }, speed.value)
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

watch(speed, () => playing.value && play())
onBeforeUnmount(clear)

const hasVars = computed(() => step.value.vars && Object.keys(step.value.vars).length > 0)
const hasStack = computed(() => Array.isArray(step.value.stack) && step.value.stack.length > 0)
const hasOutput = computed(() => Array.isArray(step.value.output))
</script>

<template>
  <div class="cs">
    <div class="cs__head">
      <span class="cs__tag">Trace</span>
      <span class="cs__title">{{ title }}</span>
      <span class="cs__count">{{ at + 1 }} / {{ last + 1 }}</span>
    </div>

    <div class="cs__body">
      <div class="cs__code">
        <div
          v-for="(ln, i) in code"
          :key="i"
          class="cs__line"
          :class="{ 'is-live': i === step.line }"
        >
          <span class="cs__ln">{{ i + 1 }}</span>
          <span class="cs__src">{{ ln }}</span>
        </div>
      </div>

      <div class="cs__side">
        <div class="cs__note">{{ step.note }}</div>

        <div v-if="hasStack" class="cs__panel">
          <div class="cs__ptitle">{{ stackLabel || 'Call stack' }}</div>
          <div class="cs__stack">
            <div
              v-for="(f, i) in step.stack"
              :key="i"
              class="cs__frame"
              :class="{ 'is-top': i === step.stack.length - 1 }"
            >
              <span class="cs__fname">{{ f.name }}</span>
              <span v-if="f.note" class="cs__fnote">{{ f.note }}</span>
            </div>
            <div v-if="!step.stack.length" class="cs__empty">empty - nothing is waiting</div>
          </div>
        </div>

        <div v-if="hasVars" class="cs__panel">
          <div class="cs__ptitle">{{ varsLabel }}</div>
          <div class="cs__vars">
            <div v-for="(v, k) in step.vars" :key="k" class="cs__var">
              <span class="cs__vk">{{ k }}</span>
              <span class="cs__vv">{{ v }}</span>
            </div>
          </div>
        </div>

        <div v-if="hasOutput" class="cs__panel">
          <div class="cs__ptitle">{{ outputLabel }}</div>
          <div class="cs__out">
            <template v-if="step.output.length">
              <span v-for="(o, i) in step.output" :key="i" class="cs__op">{{ o }}</span>
            </template>
            <span v-else class="cs__empty">(nothing yet)</span>
          </div>
        </div>
      </div>
    </div>

    <div class="cs__controls">
      <button class="cs__btn" @click="reset">&#9198;</button>
      <button class="cs__btn" @click="prev">&#9664;</button>
      <button class="cs__btn cs__btn--play" @click="toggle">
        {{ playing ? '&#10074;&#10074;  Pause' : '&#9654;  Play' }}
      </button>
      <button class="cs__btn" @click="next">&#9654;</button>
      <input
        class="cs__scrub"
        type="range"
        min="0"
        :max="last"
        :value="at"
        @input="pause(); at = Number($event.target.value)"
      />
      <select v-model.number="speed" class="cs__speed">
        <option :value="1800">slow</option>
        <option :value="1100">normal</option>
        <option :value="500">fast</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.cs {
  border: 1px solid var(--lc-line);
  border-left: 6px solid var(--lc-sky);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  margin: 26px 0;
  overflow: hidden;
}
.cs__head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: var(--lc-panel-2);
  border-bottom: 1px solid var(--lc-line);
}
.cs__tag {
  color: #1a1a1f;
  background: var(--lc-sky);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 2px;
}
.cs__title {
  color: var(--lc-text);
  font-size: 0.86rem;
  font-weight: 600;
}
.cs__count {
  margin-left: auto;
  color: var(--lc-dim);
  font-size: 0.74rem;
  font-family: var(--vp-font-family-mono, monospace);
}

.cs__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 18px;
  padding: 16px 18px 6px;
  align-items: start;
}
@media (max-width: 760px) {
  .cs__body {
    grid-template-columns: 1fr;
  }
}

.cs__code {
  background: var(--lc-bg);
  border: 1px solid var(--lc-line);
  border-radius: 4px;
  padding: 8px 0;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.8rem;
}
.cs__line {
  display: flex;
  gap: 10px;
  padding: 2px 12px;
  border-left: 3px solid transparent;
}
.cs__line.is-live {
  background: rgba(153, 204, 255, 0.13);
  border-left-color: var(--lc-sky);
}
.cs__line.is-live .cs__src {
  color: #e2f1ff;
}
.cs__ln {
  color: var(--lc-dim);
  width: 1.1em;
  text-align: right;
  flex: 0 0 auto;
  user-select: none;
}
.cs__src {
  color: var(--lc-text);
  white-space: pre;
}

.cs__note {
  border-left: 3px solid var(--lc-gold);
  background: rgba(255, 204, 102, 0.07);
  padding: 9px 12px;
  border-radius: 0 4px 4px 0;
  font-size: 0.86rem;
  color: var(--lc-text);
  font-family: var(--vp-font-family-mono, monospace);
  min-height: 56px;
  margin-bottom: 12px;
}

.cs__panel {
  margin-bottom: 12px;
}
.cs__ptitle {
  color: var(--lc-dim);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 5px;
}
.cs__vars {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.cs__var {
  background: var(--lc-panel-2);
  border: 1px solid var(--lc-line);
  border-radius: 3px;
  padding: 4px 9px;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.78rem;
  display: flex;
  gap: 8px;
}
.cs__vk {
  color: var(--lc-dim);
}
.cs__vv {
  color: var(--lc-gold);
}

.cs__stack {
  display: flex;
  flex-direction: column-reverse;
  gap: 4px;
}
.cs__frame {
  border: 1px solid var(--lc-line);
  border-left: 3px solid var(--lc-plum-bright);
  border-radius: 3px;
  background: var(--lc-panel-2);
  padding: 5px 10px;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.78rem;
  display: flex;
  gap: 10px;
  align-items: baseline;
}
.cs__frame.is-top {
  border-left-color: var(--lc-gold);
  background: rgba(255, 204, 102, 0.08);
}
.cs__fname {
  color: var(--lc-text);
}
.cs__fnote {
  margin-left: auto;
  color: var(--lc-dim);
  font-size: 0.7rem;
}

.cs__out {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  font-family: var(--vp-font-family-mono, monospace);
}
.cs__op {
  background: rgba(204, 153, 204, 0.16);
  border: 1px solid var(--lc-lilac);
  color: #f1dcff;
  border-radius: 3px;
  padding: 2px 8px;
  font-size: 0.82rem;
}
.cs__empty {
  color: var(--lc-dim);
  font-size: 0.78rem;
  font-style: italic;
}

.cs__controls {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 10px 18px 16px;
  margin-top: 4px;
  border-top: 1px solid var(--lc-line);
}
.cs__btn {
  background: var(--lc-panel-2);
  border: 1px solid var(--lc-line);
  color: var(--lc-text);
  border-radius: 3px;
  padding: 5px 12px;
  font-size: 0.82rem;
  cursor: pointer;
}
.cs__btn:hover {
  border-color: var(--lc-sky);
  color: #e2f1ff;
}
.cs__btn--play {
  min-width: 104px;
  color: var(--lc-gold);
}
.cs__scrub {
  flex: 1 1 120px;
  accent-color: var(--lc-sky);
}
.cs__speed {
  background: var(--lc-panel-2);
  color: var(--lc-text);
  border: 1px solid var(--lc-line);
  border-radius: 3px;
  padding: 4px 6px;
  font-size: 0.74rem;
}
</style>
