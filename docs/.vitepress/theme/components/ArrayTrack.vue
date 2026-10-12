<script setup>
// ---------------------------------------------------------------------------
// The array, drawn.
//
// Almost every trace in this book is "here is the array, here is what we are
// looking at right now". So there is one component for it, and the sort
// player, the trace drills and the exam walkthrough all use it. If the array
// looks the same everywhere, your eye only has to learn it once.
// ---------------------------------------------------------------------------
import { computed } from 'vue'

const props = defineProps({
  values: { type: Array, required: true },
  // indices being compared right now
  compare: { type: Array, default: () => [] },
  // index holding the running minimum (selection sort)
  min: { type: Number, default: -1 },
  // the position i we are about to fill (selection sort / bubble pass marker)
  cursor: { type: Number, default: -1 },
  // everything from this index rightwards is finished (bubble sort: the tail)
  sortedFrom: { type: Number, default: -1 },
  // everything below this index is finished (selection sort: the prefix)
  sortedBefore: { type: Number, default: -1 },
  // indices that just changed value
  changed: { type: Array, default: () => [] },
  // show the 0..n-1 index row
  showIndices: { type: Boolean, default: true },
  caption: { type: String, default: '' },
  // render small
  dense: { type: Boolean, default: false },
})

function cellClass(i) {
  const done =
    (props.sortedFrom >= 0 && i >= props.sortedFrom) ||
    (props.sortedBefore >= 0 && i < props.sortedBefore)
  return {
    'is-compare': props.compare.includes(i),
    'is-min': props.min === i,
    'is-cursor': props.cursor === i,
    'is-sorted': done,
    'is-changed': props.changed.includes(i),
    'is-dense': props.dense,
  }
}

const markers = computed(() => {
  // a one-line legend of what is lit up, so the colours are never a guess
  const out = []
  if (props.compare.length) out.push({ cls: 'is-compare', label: 'comparing' })
  if (props.min >= 0) out.push({ cls: 'is-min', label: 'running minimum' })
  if (props.cursor >= 0) out.push({ cls: 'is-cursor', label: 'position i' })
  if (props.sortedFrom >= 0 || props.sortedBefore >= 0)
    out.push({ cls: 'is-sorted', label: 'sorted' })
  return out
})
</script>

<template>
  <div class="at">
    <div class="at__row">
      <div v-for="(v, i) in values" :key="i" class="at__cell" :class="cellClass(i)">
        <span class="at__val">{{ v }}</span>
      </div>
    </div>

    <div v-if="showIndices" class="at__row at__row--idx">
      <div v-for="(v, i) in values" :key="i" class="at__idx">
        <span>{{ i }}</span>
      </div>
    </div>

    <div v-if="markers.length" class="at__legend">
      <span v-for="m in markers" :key="m.label" class="at__key">
        <i :class="m.cls" />{{ m.label }}
      </span>
    </div>

    <div v-if="caption" class="at__cap">{{ caption }}</div>
  </div>
</template>

<style scoped>
.at {
  margin: 18px 0;
  font-family: var(--vp-font-family-mono, monospace);
}
.at__row {
  display: flex;
  gap: 6px;
}
.at__row--idx {
  margin-top: 2px;
}
.at__cell,
.at__idx {
  flex: 0 0 auto;
  width: 54px;
  text-align: center;
}
.at__cell {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--lc-panel-2);
  border: 2px solid var(--lc-line);
  border-radius: 4px;
  color: var(--lc-text);
  font-size: 1.15rem;
  font-weight: 600;
  transition: background 0.18s, border-color 0.18s, transform 0.18s;
}
.at__cell.is-dense {
  width: 44px;
  height: 40px;
  font-size: 1rem;
}
.at__idx {
  color: var(--lc-dim);
  font-size: 0.7rem;
}

/* one colour per meaning, and the same colour everywhere in the book */
.at__cell.is-compare {
  border-color: var(--lc-sky);
  background: rgba(153, 204, 255, 0.16);
  color: #dceeff;
  transform: translateY(-2px);
}
.at__cell.is-min {
  border-color: var(--lc-gold);
  background: rgba(255, 204, 102, 0.16);
  color: #ffe9bd;
}
.at__cell.is-cursor {
  border-color: var(--lc-lilac);
  box-shadow: inset 0 -3px 0 var(--lc-lilac);
}
.at__cell.is-sorted {
  border-color: var(--lc-line);
  background: rgba(78, 53, 121, 0.34);
  color: var(--lc-plum-bright);
}
.at__cell.is-changed {
  border-color: var(--lc-amber);
  background: rgba(255, 153, 102, 0.2);
  color: #ffd9c2;
}

.at__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 10px;
  font-family: var(--vp-font-family-base);
  font-size: 0.74rem;
  color: var(--lc-dim);
}
.at__key {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.at__key i {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  border: 2px solid var(--lc-line);
  display: inline-block;
}
.at__key i.is-compare { border-color: var(--lc-sky); background: rgba(153, 204, 255, 0.3); }
.at__key i.is-min { border-color: var(--lc-gold); background: rgba(255, 204, 102, 0.3); }
.at__key i.is-cursor { border-color: var(--lc-lilac); background: rgba(204, 153, 204, 0.3); }
.at__key i.is-sorted { border-color: var(--lc-plum-bright); background: rgba(78, 53, 121, 0.6); }

.at__cap {
  margin-top: 10px;
  font-family: var(--vp-font-family-base);
  font-size: 0.82rem;
  color: var(--lc-dim);
}
</style>
