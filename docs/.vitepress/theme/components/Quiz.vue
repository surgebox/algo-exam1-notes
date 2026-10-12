<script setup>
// ---------------------------------------------------------------------------
// A multiple-choice check.
//
// Every option gets a verdict once you commit, not just the one you picked -
// knowing why the tempting wrong answer is wrong is most of the value. The
// question registers with the score board so a chapter can show progress.
// ---------------------------------------------------------------------------
import { computed, onMounted, ref } from 'vue'
import { useProgress } from '../progress'

const props = defineProps({
  question: { type: String, required: true },
  options: { type: Array, required: true },
  // index (or indices) of the correct option(s)
  answer: { type: [Number, Array], required: true },
  // one explanation per option - the wrong ones matter most
  why: { type: Array, default: () => [] },
  group: { type: String, default: 'default' },
  tag: { type: String, default: '' },
})

const correct = computed(() =>
  Array.isArray(props.answer) ? props.answer : [props.answer],
)
const multi = computed(() => correct.value.length > 1)

const picked = ref([])
const submitted = ref(false)

const { register, report } = useProgress()
let id = ''
onMounted(() => {
  id = register(props.group, 1)
})

function toggle(i) {
  if (submitted.value) return
  if (multi.value) {
    picked.value = picked.value.includes(i)
      ? picked.value.filter((x) => x !== i)
      : [...picked.value, i]
  } else {
    picked.value = [i]
  }
}

function submit() {
  if (!picked.value.length || submitted.value) return
  submitted.value = true
  const ok =
    picked.value.length === correct.value.length &&
    picked.value.every((p) => correct.value.includes(p))
  report(id, ok ? 1 : 0, true)
}

function retry() {
  picked.value = []
  submitted.value = false
  report(id, 0, false)
}

function cls(i) {
  if (!submitted.value) return { 'is-picked': picked.value.includes(i) }
  if (correct.value.includes(i)) return { 'is-right': true }
  if (picked.value.includes(i)) return { 'is-wrong': true }
  return {}
}

const state = computed(() => {
  if (!submitted.value) return 'idle'
  const ok =
    picked.value.length === correct.value.length &&
    picked.value.every((p) => correct.value.includes(p))
  return ok ? 'right' : 'wrong'
})
</script>

<template>
  <div class="qz" :class="'is-' + state">
    <div class="qz__head">
      <span class="qz__tag">{{ tag || 'Check yourself' }}</span>
      <span class="qz__q">{{ question }}</span>
    </div>

    <div class="qz__opts">
      <button
        v-for="(o, i) in options"
        :key="i"
        class="qz__opt"
        :class="cls(i)"
        @click="toggle(i)"
      >
        <span class="qz__letter">{{ String.fromCharCode(65 + i) }}</span>
        <span class="qz__otext">{{ o }}</span>
        <span v-if="submitted && correct.includes(i)" class="qz__icon">&#10003;</span>
        <span v-else-if="submitted && picked.includes(i)" class="qz__icon qz__icon--bad">&#10007;</span>
      </button>
    </div>

    <div class="qz__why" v-if="submitted && why.length">
      <div v-for="(w, i) in why" :key="i" class="qz__wrow" :class="{ 'is-right': correct.includes(i) }">
        <span class="qz__wletter">{{ String.fromCharCode(65 + i) }}</span>
        <span>{{ w }}</span>
      </div>
    </div>

    <div class="qz__actions">
      <template v-if="!submitted">
        <button class="qz__btn" :disabled="!picked.length" @click="submit">
          {{ multi ? 'Check (pick all that apply)' : 'Check' }}
        </button>
      </template>
      <template v-else>
        <span class="qz__verdict">
          {{ state === 'right' ? 'Correct.' : 'Not quite — read the notes above, then look again.' }}
        </span>
        <button class="qz__btn qz__btn--ghost" @click="retry">Try again</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.qz {
  border: 1px solid var(--lc-line);
  border-left: 6px solid var(--lc-lilac);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  padding: 14px 18px 16px;
  margin: 24px 0;
}
.qz.is-right {
  border-left-color: var(--lc-sky);
}
.qz.is-wrong {
  border-left-color: var(--lc-ember);
}

.qz__head {
  display: flex;
  gap: 10px;
  align-items: baseline;
  margin-bottom: 12px;
}
.qz__tag {
  flex: 0 0 auto;
  color: #1a1a1f;
  background: var(--lc-lilac);
  font-weight: 700;
  font-size: 0.64rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 2px;
}
.qz__q {
  color: var(--lc-text);
  font-size: 0.92rem;
  font-weight: 600;
}

.qz__opts {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.qz__opt {
  display: flex;
  align-items: baseline;
  gap: 10px;
  text-align: left;
  background: var(--lc-panel-2);
  border: 1px solid var(--lc-line);
  border-radius: 4px;
  padding: 8px 12px;
  color: var(--lc-text);
  font-size: 0.86rem;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.qz__opt:hover {
  border-color: var(--lc-lilac);
}
.qz__opt.is-picked {
  border-color: var(--lc-lilac);
  background: rgba(204, 153, 204, 0.12);
}
.qz__opt.is-right {
  border-color: var(--lc-sky);
  background: rgba(153, 204, 255, 0.12);
}
.qz__opt.is-wrong {
  border-color: var(--lc-ember);
  background: rgba(204, 102, 102, 0.12);
}
.qz__letter {
  flex: 0 0 auto;
  color: var(--lc-lilac);
  font-family: var(--vp-font-family-mono, monospace);
  font-weight: 700;
  font-size: 0.78rem;
}
.qz__otext {
  flex: 1;
}
.qz__icon {
  color: var(--lc-sky);
  font-weight: 700;
}
.qz__icon--bad {
  color: #ff9d9d;
}

.qz__why {
  margin-top: 12px;
  border-top: 1px solid var(--lc-line);
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.qz__wrow {
  display: flex;
  gap: 9px;
  font-size: 0.81rem;
  color: var(--lc-dim);
}
.qz__wrow.is-right {
  color: var(--lc-text);
}
.qz__wletter {
  flex: 0 0 auto;
  font-family: var(--vp-font-family-mono, monospace);
  font-weight: 700;
  color: var(--lc-dim);
}
.qz__wrow.is-right .qz__wletter {
  color: var(--lc-sky);
}

.qz__actions {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.qz__btn {
  background: var(--lc-panel-2);
  border: 1px solid var(--lc-line);
  color: var(--lc-text);
  border-radius: 3px;
  padding: 5px 14px;
  font-size: 0.78rem;
  cursor: pointer;
}
.qz__btn:hover:not(:disabled) {
  border-color: var(--lc-gold);
  color: var(--lc-gold);
}
.qz__btn:disabled {
  opacity: 0.45;
  cursor: default;
}
.qz__btn--ghost {
  color: var(--lc-dim);
}
.qz__verdict {
  font-size: 0.82rem;
  color: var(--lc-dim);
}
</style>
