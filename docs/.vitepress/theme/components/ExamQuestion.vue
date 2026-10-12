<script setup>
// ---------------------------------------------------------------------------
// One question from the actual practice sheet.
//
// The book keeps the original wording verbatim and in order, so that the last
// part of it reads like the exam and not like a summary of the exam. The
// answer is behind a fold: try it first, on paper, then open.
// ---------------------------------------------------------------------------
defineProps({
  number: { type: [Number, String], required: true },
  title: { type: String, default: '' },
  prompt: { type: String, default: '' },
  // what the marker is looking for, shown next to the answer
  marks: { type: String, default: '' },
})
</script>

<template>
  <div class="eq">
    <div class="eq__head">
      <span class="eq__num">Q{{ number }}</span>
      <span class="eq__title">{{ title }}</span>
      <span v-if="marks" class="eq__marks">{{ marks }}</span>
    </div>

    <div class="eq__prompt" v-if="prompt">{{ prompt }}</div>

    <div class="eq__body">
      <slot />
    </div>

    <details class="eq__ans">
      <summary>
        <span class="eq__atag">Answer</span>
        <span>Worked solution — open only after you have tried it</span>
      </summary>
      <div class="eq__abody">
        <slot name="answer" />
      </div>
    </details>
  </div>
</template>

<style scoped>
.eq {
  border: 1px solid var(--lc-line);
  border-left: 6px solid var(--lc-amber);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  margin: 30px 0;
  overflow: hidden;
}
.eq__head {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 10px 18px;
  background: var(--lc-panel-2);
  border-bottom: 1px solid var(--lc-line);
}
.eq__num {
  color: #1a1a1f;
  background: var(--lc-amber);
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  padding: 2px 9px;
  border-radius: 2px;
  flex: 0 0 auto;
}
.eq__title {
  color: var(--lc-text);
  font-weight: 600;
  font-size: 0.95rem;
}
.eq__marks {
  margin-left: auto;
  color: var(--lc-dim);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.eq__prompt {
  padding: 12px 18px 0;
  color: var(--lc-amber);
  font-size: 0.86rem;
}
.eq__body {
  padding: 12px 18px 4px;
}
.eq__body :deep(p:first-child) {
  margin-top: 0;
}

.eq__ans {
  border-top: 1px dashed var(--lc-line);
  margin-top: 10px;
  padding: 12px 18px 16px;
}
.eq__ans summary {
  cursor: pointer;
  display: flex;
  align-items: baseline;
  gap: 10px;
  color: var(--lc-dim);
  font-size: 0.8rem;
  outline: none;
}
.eq__atag {
  color: #1a1a1f;
  background: var(--lc-sky);
  font-weight: 700;
  font-size: 0.64rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 2px;
}
.eq__abody {
  padding-top: 12px;
}
.eq__abody :deep(p:first-child) {
  margin-top: 0;
}
</style>
