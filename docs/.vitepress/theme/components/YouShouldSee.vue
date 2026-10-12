<script setup>
// What the screen should look like when the step worked.
// Pair with an image when there is one: <YouShouldSee> ... <img src="..."> ...
defineProps({
  heading: { type: String, default: 'You should see' },
})
</script>

<template>
  <div class="lc-see">
    <div class="lc-see__head">{{ heading }}</div>
    <div class="lc-see__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.lc-see {
  border: 1px dashed var(--lc-line);
  border-left: 6px solid var(--lc-sky);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  padding: 14px 18px;
  margin: 22px 0;
}
.lc-see__head {
  color: var(--lc-sky);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.lc-see__body :deep(p:first-child) { margin-top: 0; }
.lc-see__body :deep(p:last-child) { margin-bottom: 0; }
.lc-see__body :deep(img) {
  display: block;
  margin: 12px 0 0;
  border: 1px solid var(--lc-line);
  border-radius: 4px;
}
</style>
