<script setup>
// How something actually works underneath, when the behaviour would otherwise
// be surprising. Use sparingly - it is a reward, not a requirement.
defineProps({
  heading: { type: String, default: 'Under the hood' },
})
</script>

<template>
  <details class="lc-hood">
    <summary>{{ heading }}</summary>
    <div class="lc-hood__body">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.lc-hood {
  border: 1px solid var(--lc-line);
  border-left: 6px solid var(--lc-plum);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  padding: 10px 18px;
  margin: 22px 0;
}
.lc-hood summary {
  cursor: pointer;
  color: var(--lc-plum-bright);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  outline: none;
}
.lc-hood summary::marker { color: var(--lc-plum-bright); }
.lc-hood__body { padding-top: 10px; font-size: 0.92rem; }
.lc-hood__body :deep(p:first-child) { margin-top: 0; }
.lc-hood__body :deep(p:last-child) { margin-bottom: 0; }
</style>
