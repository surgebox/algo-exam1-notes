<script setup>
// The one idea a chapter turns on, stated before any code.
// If a chapter has no MentalModel, it is usually a sign the chapter is
// showing steps without teaching anything.
defineProps({
  heading: { type: String, default: '' },
})
</script>

<template>
  <div class="lc-model">
    <div class="lc-model__head">
      <span class="lc-model__tag">Mental model</span>
      <span v-if="heading">{{ heading }}</span>
    </div>
    <div class="lc-model__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.lc-model {
  border-left: 6px solid var(--lc-violet);
  border-radius: 2px 14px 14px 2px;
  background: linear-gradient(90deg, rgba(153, 153, 255, 0.09), transparent 70%);
  padding: 16px 20px;
  margin: 26px 0;
}
.lc-model__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
}
.lc-model__tag {
  color: var(--lc-violet);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.lc-model__head span:last-child {
  color: var(--lc-text);
  font-size: 1rem;
  font-weight: 600;
}
.lc-model__body :deep(p:first-child) { margin-top: 0; }
.lc-model__body :deep(p:last-child) { margin-bottom: 0; }
</style>
