<script setup>
// The chapter's opening panel: what it costs you, what you need, what you get.
//
// `youWillBuild` is inherited from the shell book; `youWillAnswer` is this
// book's version of the same row, because there is nothing to build here.
defineProps({
  readingTime: { type: String, default: '10 min' },
  difficulty: { type: Number, default: 1 },
  prerequisites: { type: Array, default: () => [] },
  youWillBuild: { type: String, default: '' },
  youWillAnswer: { type: String, default: '' },
})
</script>

<template>
  <div class="lc-meta">
    <div class="lc-meta__row">
      <span class="lc-meta__key">Reading time</span>
      <span class="lc-meta__val">{{ readingTime }}</span>
    </div>

    <div class="lc-meta__row">
      <span class="lc-meta__key">Difficulty</span>
      <span class="lc-meta__val">
        <span class="lc-meta__pip" v-for="n in 5" :key="n"
              :class="{ 'is-on': n <= difficulty }" />
      </span>
    </div>

    <div class="lc-meta__row" v-if="prerequisites.length">
      <span class="lc-meta__key">Prerequisites</span>
      <span class="lc-meta__val">{{ prerequisites.join(' / ') }}</span>
    </div>

    <div class="lc-meta__build" v-if="youWillAnswer">
      <span class="lc-meta__key">You will answer</span>
      <span>{{ youWillAnswer }}</span>
    </div>

    <div class="lc-meta__build" v-else-if="youWillBuild">
      <span class="lc-meta__key">You will build</span>
      <span>{{ youWillBuild }}</span>
    </div>
  </div>
</template>

<style scoped>
.lc-meta {
  border: 1px solid var(--lc-line);
  border-left: 6px solid var(--lc-gold);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  padding: 14px 18px;
  margin: 24px 0 32px;
  font-size: 0.86rem;
}
.lc-meta__row {
  display: flex;
  gap: 12px;
  padding: 2px 0;
}
.lc-meta__key {
  flex: 0 0 108px;
  color: var(--lc-gold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.74rem;
  padding-top: 2px;
}
.lc-meta__val { color: var(--lc-text); }
.lc-meta__pip {
  display: inline-block;
  width: 16px;
  height: 8px;
  margin-right: 3px;
  background: var(--lc-line);
  border-radius: 1px;
}
.lc-meta__pip.is-on { background: var(--lc-gold); }
.lc-meta__build {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--lc-line);
  display: flex;
  gap: 12px;
}
.lc-meta__build span:last-child { color: var(--lc-amber); }
</style>
