<script setup>
// ---------------------------------------------------------------------------
// A blank to fill in, with checking.
//
// The exam is a fill-in-the-blank worksheet, so the practice has to be too.
// Type the answer, press Enter, and find out. Wrong answers are not punished -
// you can keep trying, and the "show me" escape hatch is always there, because
// recognising the right answer is also learning.
// ---------------------------------------------------------------------------
import { computed, onMounted, ref } from 'vue'
import { checkAnswer, checkNumeric, useProgress } from '../progress'

const props = defineProps({
  label: { type: String, default: '' },
  // one accepted answer, or several
  answer: { type: [String, Array], default: '' },
  // if set, any answer whose only number equals this value is accepted
  numeric: { type: Number, default: null },
  placeholder: { type: String, default: 'type your answer' },
  // shown after a correct answer, or when the reader gives up
  solution: { type: String, default: '' },
  hint: { type: String, default: '' },
  group: { type: String, default: 'default' },
  // wide input for sentences
  wide: { type: Boolean, default: false },
})

const accepted = computed(() =>
  Array.isArray(props.answer) ? props.answer : props.answer ? [props.answer] : [],
)

const given = ref('')
const state = ref('idle') // idle | right | wrong | shown
const tries = ref(0)
const showHint = ref(false)

const { register, report } = useProgress()
let id = ''
onMounted(() => {
  id = register(props.group, 1)
})

function check() {
  if (!given.value.trim()) return
  state.value = 'idle'
  const ok = props.numeric !== null
    ? checkNumeric(given.value, props.numeric, accepted.value)
    : checkAnswer(given.value, accepted.value)
  if (ok) {
    state.value = 'right'
    report(id, 1, true)
  } else {
    state.value = 'wrong'
    tries.value++
    report(id, 0, tries.value >= 2)
  }
}

function reveal() {
  state.value = 'shown'
  if (accepted.value.length) given.value = accepted.value[0]
  report(id, 0, true)
}

function again() {
  given.value = ''
  state.value = 'idle'
  report(id, 0, false)
}

const shownAnswer = computed(() => accepted.value[0] || props.solution)
</script>

<template>
  <div class="fi" :class="'is-' + state">
    <div class="fi__row">
      <span v-if="label" class="fi__label">{{ label }}</span>

      <div class="fi__inputwrap" :class="{ 'is-wide': wide }">
        <input
          v-model="given"
          :placeholder="placeholder"
          :disabled="state === 'right' || state === 'shown'"
          @keyup.enter="check"
        />
        <span class="fi__mark" v-if="state === 'right'">&#10003;</span>
        <span class="fi__mark fi__mark--bad" v-else-if="state === 'wrong'">&#10007;</span>
      </div>

      <button class="fi__btn" v-if="state === 'idle' || state === 'wrong'" @click="check">Check</button>
      <button class="fi__btn fi__btn--ghost" v-if="state === 'idle' || state === 'wrong'" @click="reveal">
        Show me
      </button>
      <button class="fi__btn fi__btn--ghost" v-else @click="again">Try again</button>
    </div>

    <div class="fi__hintline" v-if="hint && state !== 'right'">
      <button v-if="!showHint" class="fi__hintbtn" @click="showHint = true">need a hint?</button>
      <span v-else class="fi__hint">{{ hint }}</span>
    </div>

    <div class="fi__fb" v-if="state === 'right'">
      <span class="fi__fbtag">Correct</span>
      <span v-if="solution">{{ solution }}</span>
    </div>
    <div class="fi__fb fi__fb--wrong" v-else-if="state === 'wrong'">
      <span class="fi__fbtag">Not yet</span>
      <span>{{ tries === 1 ? 'Close enough to be worth another look. Check the arithmetic, then try again.' : 'Try the "Show me" button - reading the right answer is a legitimate way to learn it.' }}</span>
    </div>
    <div class="fi__fb fi__fb--shown" v-else-if="state === 'shown'">
      <span class="fi__fbtag">Answer</span>
      <span><strong>{{ shownAnswer }}</strong><template v-if="solution"> — {{ solution }}</template></span>
    </div>
  </div>
</template>

<style scoped>
.fi {
  border-left: 3px solid var(--lc-line);
  border-radius: 0 6px 6px 0;
  padding: 9px 12px;
  margin: 10px 0;
  background: rgba(255, 255, 255, 0.014);
  transition: border-color 0.2s, background 0.2s;
}
.fi.is-right {
  border-left-color: var(--lc-sky);
  background: rgba(153, 204, 255, 0.07);
}
.fi.is-wrong {
  border-left-color: var(--lc-ember);
  background: rgba(204, 102, 102, 0.07);
}
.fi.is-shown {
  border-left-color: var(--lc-gold);
  background: rgba(255, 204, 102, 0.06);
}

.fi__row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.fi__label {
  color: var(--lc-text);
  font-size: 0.86rem;
  flex: 0 0 auto;
  max-width: 62%;
}
.fi__inputwrap {
  position: relative;
  flex: 1 1 150px;
  min-width: 130px;
  display: flex;
  align-items: center;
}
.fi__inputwrap.is-wide {
  flex-basis: 100%;
}
.fi__inputwrap input {
  width: 100%;
  background: var(--lc-bg);
  border: 1px solid var(--lc-line);
  border-bottom: 2px solid var(--lc-dim);
  border-radius: 3px;
  color: var(--lc-gold);
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.86rem;
  padding: 5px 26px 5px 9px;
  outline: none;
}
.fi__inputwrap input:focus {
  border-color: var(--lc-lilac);
  border-bottom-color: var(--lc-lilac);
}
.fi__inputwrap input:disabled {
  color: var(--lc-sky);
  border-bottom-color: var(--lc-sky);
}
.fi__mark {
  position: absolute;
  right: 8px;
  color: var(--lc-sky);
  font-weight: 700;
}
.fi__mark--bad {
  color: #ff9d9d;
}

.fi__btn {
  background: var(--lc-panel-2);
  border: 1px solid var(--lc-line);
  color: var(--lc-text);
  border-radius: 3px;
  padding: 5px 11px;
  font-size: 0.76rem;
  cursor: pointer;
  flex: 0 0 auto;
}
.fi__btn:hover {
  border-color: var(--lc-gold);
  color: var(--lc-gold);
}
.fi__btn--ghost {
  color: var(--lc-dim);
}

.fi__hintline {
  margin-top: 6px;
}
.fi__hintbtn {
  background: none;
  border: none;
  color: var(--lc-plum-bright);
  font-size: 0.72rem;
  cursor: pointer;
  padding: 0;
  text-decoration: underline dotted;
}
.fi__hint {
  color: var(--lc-plum-bright);
  font-size: 0.78rem;
}

.fi__fb {
  margin-top: 7px;
  font-size: 0.82rem;
  color: var(--lc-text);
  display: flex;
  gap: 8px;
  align-items: baseline;
}
.fi__fb--shown strong {
  color: var(--lc-gold);
  font-family: var(--vp-font-family-mono, monospace);
}
.fi__fbtag {
  flex: 0 0 auto;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--lc-sky);
  padding-top: 2px;
}
.fi__fb--wrong .fi__fbtag {
  color: #ff9d9d;
}
.fi__fb--shown .fi__fbtag {
  color: var(--lc-gold);
}
</style>
