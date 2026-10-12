<script setup>
// End-of-chapter summary. Short - if it needs more than a few lines, the
// chapter is probably carrying two ideas.
defineProps({
  heading: { type: String, default: 'What you now know' },
})
</script>

<template>
  <div class="lc-recap">
    <div class="lc-recap__head">{{ heading }}</div>
    <div class="lc-recap__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.lc-recap {
  border-top: 2px solid var(--lc-gold);
  border-bottom: 2px solid var(--lc-gold);
  background: var(--lc-panel);
  padding: 16px 20px;
  margin: 36px 0 24px;
}
.lc-recap__head {
  color: var(--lc-gold);
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.lc-recap__body :deep(ul) { margin: 0; padding-left: 20px; }
.lc-recap__body :deep(li) { margin: 4px 0; }
.lc-recap__body :deep(p:last-child) { margin-bottom: 0; }
</style>
