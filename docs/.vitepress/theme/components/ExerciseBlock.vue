<script setup>
// A variation to try without being shown how. The point is that you already
// have everything needed - if an exercise requires new knowledge, it belongs
// in the chapter body instead.
defineProps({
  heading: { type: String, default: 'Try it' },
  level: { type: String, default: '' },
})
</script>

<template>
  <div class="lc-ex">
    <div class="lc-ex__head">
      <span class="lc-ex__tag">Exercise</span>
      <span>{{ heading }}</span>
      <span class="lc-ex__level" v-if="level">{{ level }}</span>
    </div>
    <div class="lc-ex__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.lc-ex {
  border: 1px solid var(--lc-line);
  border-left: 6px solid var(--lc-lilac);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  padding: 16px 20px;
  margin: 26px 0;
}
.lc-ex__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
}
.lc-ex__tag {
  color: #1a1a1f;
  background: var(--lc-lilac);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 2px;
}
.lc-ex__head span:nth-child(2) { color: var(--lc-text); font-weight: 600; }
.lc-ex__level {
  margin-left: auto;
  color: var(--lc-lilac);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.lc-ex__body :deep(p:first-child) { margin-top: 0; }
.lc-ex__body :deep(p:last-child) { margin-bottom: 0; }
</style>
