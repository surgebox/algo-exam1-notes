<script setup>
// ---------------------------------------------------------------------------
// The trace table, as a drill.
//
// This is the exam's own format: a grid you complete by hand. Every variable
// cell here is a real input you can check, and the table tells you which cells
// are right and which are still blank. It is the bridge between understanding
// the algorithm and being able to answer the question under time pressure.
//
// A cell is either a plain string (given to you - it is context, not a
// question) or an object: { answer, numeric, ph, wide }.
// ---------------------------------------------------------------------------
import { computed, onMounted, reactive, ref } from 'vue'
import { checkAnswer, checkNumeric, useProgress } from '../progress'

const props = defineProps({
  title: { type: String, default: 'Trace table' },
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
  group: { type: String, default: 'default' },
  caption: { type: String, default: '' },
})

const isBlank = (c) => c !== null && typeof c === 'object'

const blanks = computed(() => {
  const out = []
  props.rows.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (isBlank(cell)) out.push({ r, c, cell })
    }),
  )
  return out
})

const given = reactive({})
const marks = reactive({}) // key -> 'right' | 'wrong' | null
const submitted = ref(false)
const revealed = ref(false)

const { register, report } = useProgress()
let id = ''

onMounted(() => {
  id = register(props.group, blanks.value.length)
})

const key = (r, c) => `${r}:${c}`

function cellOk(r, c, cell) {
  const v = given[key(r, c)] || ''
  if (!v.trim()) return false
  return cell.numeric !== undefined && cell.numeric !== null
    ? checkNumeric(v, cell.numeric, toList(cell.answer))
    : checkAnswer(v, toList(cell.answer))
}

function toList(a) {
  if (!a) return []
  return Array.isArray(a) ? a : [a]
}

function checkAll() {
  submitted.value = true
  let right = 0
  blanks.value.forEach(({ r, c, cell }) => {
    const ok = cellOk(r, c, cell)
    marks[key(r, c)] = ok ? 'right' : 'wrong'
    if (ok) right++
  })
  report(id, right, true)
}

function revealAll() {
  revealed.value = true
  submitted.value = true
  blanks.value.forEach(({ r, c, cell }) => {
    given[key(r, c)] = toList(cell.answer)[0] ?? ''
    marks[key(r, c)] = 'right'
  })
  report(id, blanks.value.length, true)
}

function clearAll() {
  blanks.value.forEach(({ r, c }) => {
    given[key(r, c)] = ''
    marks[key(r, c)] = null
  })
  submitted.value = false
  revealed.value = false
  report(id, 0, false)
}

const score = computed(() => {
  if (!submitted.value) return null
  const right = blanks.value.filter(({ r, c, cell }) => cellOk(r, c, cell)).length
  return { right, total: blanks.value.length }
})

// a cell can be right even if the overall table was not submitted yet
function cellClass(r, c) {
  const m = marks[key(r, c)]
  if (!m) return {}
  return m === 'right' ? { 'is-right': true } : { 'is-wrong': true }
}
</script>

<template>
  <div class="tt">
    <div class="tt__head">
      <span class="tt__tag">Fill it in</span>
      <span class="tt__title">{{ title }}</span>
      <span class="tt__score" v-if="score">
        {{ score.right }} / {{ score.total }} correct
      </span>
    </div>

    <div class="tt__body">
      <div v-if="caption" class="tt__cap">{{ caption }}</div>

      <div class="tt__scroll">
        <table>
          <thead>
            <tr>
              <th v-for="(c, i) in columns" :key="i">{{ c }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, r) in rows" :key="r">
              <td v-for="(cell, c) in row" :key="c" :class="[isBlank(cell) ? 'is-blank' : '', cellClass(r, c)]">
                <template v-if="isBlank(cell)">
                  <input
                    v-model="given[key(r, c)]"
                    :placeholder="cell.ph || '?'"
                    :class="{ 'is-wide': cell.wide }"
                    :disabled="revealed"
                    @keyup.enter="checkAll"
                  />
                </template>
                <template v-else>{{ cell }}</template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="tt__actions">
        <button class="tt__btn" @click="checkAll">Check my table</button>
        <button class="tt__btn tt__btn--ghost" @click="clearAll">Clear</button>
        <button class="tt__btn tt__btn--ghost" @click="revealAll">Fill in the answers</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tt {
  border: 1px solid var(--lc-line);
  border-left: 6px solid var(--lc-gold);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  margin: 26px 0;
  overflow: hidden;
}
.tt__head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: var(--lc-panel-2);
  border-bottom: 1px solid var(--lc-line);
}
.tt__tag {
  color: #1a1a1f;
  background: var(--lc-gold);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 2px;
}
.tt__title {
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--lc-text);
}
.tt__score {
  margin-left: auto;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.78rem;
  color: var(--lc-gold);
}

.tt__body {
  padding: 14px 18px 18px;
}
.tt__cap {
  font-size: 0.84rem;
  color: var(--lc-dim);
  margin-bottom: 12px;
}
.tt__scroll {
  overflow-x: auto;
}
.tt table {
  font-size: 0.74rem;
  font-family: var(--vp-font-family-mono, monospace);
}
.tt td.is-blank {
  padding: 3px 4px;
  background: rgba(255, 204, 102, 0.045);
}
.tt td.is-right {
  background: rgba(153, 204, 255, 0.9) !important;
}
.tt td.is-right input {
  color: #05202e;
  border-color: transparent;
  background: transparent;
}
.tt td.is-wrong {
  background: rgba(204, 102, 102, 0.28) !important;
}
.tt td.is-wrong input {
  color: #ffd7d7;
  border-bottom-color: #ff9d9d;
}
.tt input {
  width: 82px;
  background: var(--lc-bg);
  border: 1px solid var(--lc-line);
  border-bottom: 2px solid var(--lc-dim);
  border-radius: 3px;
  color: var(--lc-gold);
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.74rem;
  padding: 3px 6px;
  outline: none;
}
.tt input.is-wide {
  width: 100%;
  min-width: 150px;
}
.tt input:focus {
  border-color: var(--lc-lilac);
}
.tt input:disabled {
  opacity: 0.95;
}

.tt__actions {
  display: flex;
  gap: 8px;
  margin-top: 14px;
  flex-wrap: wrap;
}
.tt__btn {
  background: var(--lc-panel-2);
  border: 1px solid var(--lc-line);
  color: var(--lc-text);
  border-radius: 3px;
  padding: 5px 13px;
  font-size: 0.78rem;
  cursor: pointer;
}
.tt__btn:hover {
  border-color: var(--lc-gold);
  color: var(--lc-gold);
}
.tt__btn--ghost {
  color: var(--lc-dim);
}
</style>
