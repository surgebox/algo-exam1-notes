import { reactive, computed } from 'vue'

// ---------------------------------------------------------------------------
// A tiny progress store.
//
// Every Quiz, FillIn and TraceTable registers itself here by `group`. That is
// what lets a chapter put a <ScoreBoard group="..."> at the top and have it
// actually mean something: the board counts the checks the reader has answered
// on this page, in this group, and nothing else.
//
// It is deliberately in-memory only. This is a review book, not an exam
// platform; refreshing the page resetting your score is the honest behaviour.
// ---------------------------------------------------------------------------

interface Item {
  id: string
  group: string
  total: number
  correct: number
  complete: boolean
}

const state = reactive({
  items: {} as Record<string, Item>,
  seq: 0,
})

export function useProgress() {
  function register(group: string, total: number): string {
    const id = `${group}#${++state.seq}`
    state.items[id] = { id, group, total, correct: 0, complete: false }
    return id
  }

  function report(id: string, correct: number, complete: boolean) {
    const it = state.items[id]
    if (!it) return
    it.correct = correct
    it.complete = complete
  }

  function stats(group: string) {
    const all = Object.values(state.items).filter((i) => i.group === group)
    const total = all.reduce((a, i) => a + i.total, 0)
    const correct = all.reduce((a, i) => a + i.correct, 0)
    const answered = all.reduce((a, i) => a + (i.complete ? i.total : 0), 0)
    return { total, correct, answered, count: all.length }
  }

  return { register, report, stats }
}

// ---------------------------------------------------------------------------
// Answer checking, shared by FillIn and TraceTable so the two agree.
// ---------------------------------------------------------------------------

/**
 * Normalise a free-text answer so that "n >= 4", "n ≥ 4" and "n>=4" are the
 * same answer. Readers type what they mean; the book should not be fussy
 * about spaces, case, or which greater-than sign they reached for.
 */
export function normalise(s: string): string {
  return (s ?? '')
    .toString()
    .trim()
    .toLowerCase()
    // unicode maths -> ascii
    .replace(/[≥⩾]/g, '>=')
    .replace(/[≤⩽]/g, '<=')
    .replace(/[²]/g, '^2')
    .replace(/[³]/g, '^3')
    .replace(/[₀]/g, '0')
    .replace(/[Ωω]/g, 'omega')
    .replace(/[Θθ]/g, 'theta')
    .replace(/[×✕✖·⋅]/g, '*')
    .replace(/[−–—]/g, '-')
    // drop every space, so "2n + 8" === "2n+8"
    .replace(/\s+/g, '')
    // a trailing period is punctuation, not an answer
    .replace(/[.,;]+$/, '')
}

export function checkAnswer(given: string, accepted: string[]): boolean {
  const g = normalise(given)
  if (!g) return false
  return accepted.some((a) => normalise(a) === g)
}

/**
 * For answers that are numeric with a visible value, we accept the number
 * however it was written: "4", "n0 = 4", "n >= 4" all read as 4 to a human
 * marking this by hand.
 */
export function checkNumeric(given: string, value: number, extra: string[] = []): boolean {
  const g = normalise(given)
  if (!g) return false
  if (extra.some((a) => normalise(a) === g)) return true
  const nums = g.match(/-?\d+(\.\d+)?/g)
  if (!nums || nums.length !== 1) return false
  return Number(nums[0]) === value
}

export function useScore(group: string) {
  const { stats } = useProgress()
  return computed(() => stats(group))
}
