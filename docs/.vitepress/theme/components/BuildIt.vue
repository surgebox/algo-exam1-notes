<script setup>
// The code you are writing, as opposed to code shown for reference.
// Use this whenever the reader should type something and then look at the result.
defineProps({
  heading: { type: String, default: '' },
  file: { type: String, default: '' },
})
</script>

<template>
  <div class="lc-build">
    <div class="lc-build__head">
      <span class="lc-build__tag">Build</span>
      <span class="lc-build__heading" v-if="heading">{{ heading }}</span>
      <code class="lc-build__file" v-if="file">{{ file }}</code>
    </div>
    <div class="lc-build__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.lc-build {
  border: 1px solid var(--lc-line);
  border-left: 6px solid var(--lc-amber);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  margin: 26px 0;
  overflow: hidden;
}
.lc-build__head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: var(--lc-panel-2);
  border-bottom: 1px solid var(--lc-line);
}
.lc-build__tag {
  color: #1a1a1f;
  background: var(--lc-amber);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 2px;
}
.lc-build__heading { color: var(--lc-amber); font-size: 0.86rem; }
.lc-build__file {
  margin-left: auto;
  color: var(--lc-dim);
  font-size: 0.78rem;
  background: transparent;
  padding: 0;
}
/* the code block inside should not double up borders */
.lc-build__body :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
}
.lc-build__body :deep(pre) { margin: 0; border-radius: 0; }
</style>
