<script setup>
// Something that runs without erroring but is still the wrong instinct -
// usually because it works today and breaks later, or works here and not
// at another screen size. Distinct from IfItsWrong, which is about errors.
defineProps({
  heading: { type: String, default: '' },
})
</script>

<template>
  <div class="lc-mistake">
    <div class="lc-mistake__head">
      <span class="lc-mistake__tag">Common mistake</span>
      <span v-if="heading">{{ heading }}</span>
    </div>
    <div class="lc-mistake__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.lc-mistake {
  border-left: 6px solid var(--lc-rust);
  border-radius: 2px 14px 14px 2px;
  background: linear-gradient(90deg, rgba(204, 102, 51, 0.10), transparent 70%);
  padding: 16px 20px;
  margin: 26px 0;
}
.lc-mistake__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
}
.lc-mistake__tag {
  color: var(--lc-rust);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.lc-mistake__head span:last-child { color: var(--lc-text); font-weight: 600; }
.lc-mistake__body :deep(p:first-child) { margin-top: 0; }
.lc-mistake__body :deep(p:last-child) { margin-bottom: 0; }
</style>
