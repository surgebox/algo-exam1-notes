<script setup>
// The error you will hit, what it actually means, and the fix.
// This is the block that earns the book its keep: every entry here is an
// error that cost real time while building the shell.
defineProps({
  error: { type: String, required: true },
  means: { type: String, default: '' },
})
</script>

<template>
  <div class="lc-wrong">
    <div class="lc-wrong__head">If it's wrong</div>
    <div class="lc-wrong__err"><code>{{ error }}</code></div>
    <div class="lc-wrong__means" v-if="means">
      <span class="lc-wrong__key">Means</span> {{ means }}
    </div>
    <div class="lc-wrong__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.lc-wrong {
  border: 1px solid var(--lc-line);
  border-left: 6px solid var(--lc-ember);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  padding: 14px 18px;
  margin: 22px 0;
}
.lc-wrong__head {
  color: var(--lc-ember);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.lc-wrong__err code {
  display: inline-block;
  background: rgba(204, 102, 102, 0.14);
  color: #ffb3b3;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 0.82rem;
}
.lc-wrong__means {
  margin-top: 8px;
  font-size: 0.88rem;
  color: var(--lc-text);
}
.lc-wrong__key {
  color: var(--lc-ember);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-right: 4px;
}
.lc-wrong__body :deep(p:first-child) { margin-top: 8px; }
.lc-wrong__body :deep(p:last-child) { margin-bottom: 0; }
</style>
