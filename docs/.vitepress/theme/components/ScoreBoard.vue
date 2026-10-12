<script setup>
// ---------------------------------------------------------------------------
// How much of this page you have actually done.
//
// Reading a worked example feels like learning and is not. This counts the
// checks you answered on the page, so "I read it" and "I could do it" stay
// distinguishable.
// ---------------------------------------------------------------------------
import { computed } from 'vue'
import { useProgress } from '../progress'

const props = defineProps({
  group: { type: String, required: true },
  label: { type: String, default: 'Progress on this page' },
})

const { stats } = useProgress()
const s = computed(() => stats(props.group))
const pct = computed(() => (s.value.total ? Math.round((s.value.correct / s.value.total) * 100) : 0))
</script>

<template>
  <div class="sb">
    <div class="sb__top">
      <span class="sb__label">{{ label }}</span>
      <span class="sb__num">
        <template v-if="s.count === 0">no checks loaded yet</template>
        <template v-else>
          <strong>{{ s.correct }}</strong> / {{ s.total }} correct
          <span class="sb__sep">·</span>
          {{ s.answered }} attempted
        </template>
      </span>
    </div>
    <div class="sb__bar">
      <div class="sb__fill" :style="{ width: pct + '%' }" />
    </div>
    <div class="sb__hint" v-if="s.count && s.correct < s.total">
      {{ pct }}% — keep going. The blanks you got wrong are the ones worth re-reading.
    </div>
    <div class="sb__hint sb__hint--done" v-else-if="s.count">
      Every check on this page is correct. You can answer this question on paper.
    </div>
  </div>
</template>

<style scoped>
.sb {
  border: 1px solid var(--lc-line);
  border-radius: 4px;
  background: var(--lc-panel);
  padding: 11px 16px 13px;
  margin: 20px 0 26px;
}
.sb__top {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}
.sb__label {
  color: var(--lc-gold);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.sb__num {
  margin-left: auto;
  color: var(--lc-dim);
  font-size: 0.76rem;
  font-family: var(--vp-font-family-mono, monospace);
}
.sb__num strong {
  color: var(--lc-sky);
}
.sb__sep {
  opacity: 0.5;
  margin: 0 3px;
}
.sb__bar {
  height: 6px;
  border-radius: 3px;
  background: var(--lc-panel-2);
  overflow: hidden;
  margin: 9px 0 7px;
}
.sb__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--lc-lilac), var(--lc-sky));
  transition: width 0.35s ease;
}
.sb__hint {
  font-size: 0.74rem;
  color: var(--lc-dim);
}
.sb__hint--done {
  color: var(--lc-sky);
}
</style>
