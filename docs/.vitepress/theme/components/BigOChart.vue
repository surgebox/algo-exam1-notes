<script setup>
// ---------------------------------------------------------------------------
// The Big-O picture.
//
// A Big-O proof is two lines of algebra and one picture. The algebra says
// "f(n) <= c*g(n) from some point onwards". The picture shows that this is a
// statement about a crossing point: before it the inequality can fail, after
// it it can never fail again. Once you can see the crossing, choosing n0 stops
// being a guess.
// ---------------------------------------------------------------------------
import { computed, ref } from 'vue'

const props = defineProps({
  // f(n) = fA*n + fB
  fA: { type: Number, required: true },
  fB: { type: Number, default: 0 },
  // g(n) = gA*n + gB
  gA: { type: Number, default: 1 },
  gB: { type: Number, default: 0 },
  c: { type: Number, required: true },
  nMax: { type: Number, default: 12 },
  // 'upper': we claim f(n) <= c*g(n)   (Big-O)
  // 'lower': we claim f(n) >= c*g(n)   (Big-Omega)
  direction: { type: String, default: 'upper' },
  fLabel: { type: String, default: '' },
  gLabel: { type: String, default: '' },
})

const f = (n) => props.fA * n + props.fB
const cg = (n) => props.c * (props.gA * n + props.gB)

const fName = computed(() => props.fLabel || `${props.fA}n + ${props.fB}`)
const gName = computed(() => props.gLabel || `${props.gA}n`)
const cgName = computed(() => `${props.c}(${gName.value})`)

// the crossing: fA*n + fB = c*(gA*n + gB)
const crossing = computed(() => {
  const num = props.c * props.gB - props.fB
  const den = props.fA - props.c * props.gA
  if (den === 0) return null
  return num / den
})

const n0 = computed(() => {
  const x = crossing.value
  if (x === null || !isFinite(x)) return 1
  return Math.max(1, Math.ceil(x))
})

// --- geometry -----------------------------------------------------------------
const W = 560
const H = 300
const P = { l: 52, r: 16, t: 18, b: 40 }
const iw = W - P.l - P.r
const ih = H - P.t - P.b

const yMax = computed(() => Math.max(f(props.nMax), cg(props.nMax), 1) * 1.08)
const yMin = computed(() => {
  const lo = Math.min(f(0), cg(0), 0)
  return lo < 0 ? lo * 1.15 : 0
})

const sx = (n) => P.l + (n / props.nMax) * iw
const sy = (y) => P.t + ih - ((y - yMin.value) / (yMax.value - yMin.value)) * ih

function line(fn) {
  const pts = []
  for (let i = 0; i <= 120; i++) {
    const n = (i / 120) * props.nMax
    pts.push(`${sx(n).toFixed(1)},${sy(fn(n)).toFixed(1)}`)
  }
  return pts.join(' ')
}

const fPath = computed(() => line(f))
const gPath = computed(() => line(cg))

const holds = (n) => (props.direction === 'upper' ? f(n) <= cg(n) + 1e-9 : f(n) >= cg(n) - 1e-9)

// --- the reader's cursor ------------------------------------------------------
const cursor = ref(props.nMax)
const cur = computed(() => {
  const n = cursor.value
  return {
    n,
    f: f(n),
    cg: cg(n),
    ok: holds(n),
  }
})

const xticks = computed(() => {
  const step = props.nMax <= 12 ? 1 : Math.round(props.nMax / 10)
  const out = []
  for (let n = 0; n <= props.nMax; n += step) out.push(n)
  return out
})
</script>

<template>
  <div class="bo">
    <div class="bo__head">
      <span class="bo__tag">Picture</span>
      <span class="bo__claim">
        {{ direction === 'upper' ? `${fName} ≤ c·g(n) for n ≥ n₀` : `${fName} ≥ c·g(n) for n ≥ n₀` }}
      </span>
      <span class="bo__c">c = {{ c }}</span>
    </div>

    <div class="bo__body">
      <svg :viewBox="`0 0 ${W} ${H}`" class="bo__svg" role="img">
        <!-- the region where the inequality holds -->
        <rect
          :x="sx(n0)"
          :y="P.t"
          :width="Math.max(0, sx(nMax) - sx(n0))"
          :height="ih"
          fill="rgba(153, 204, 255, 0.09)"
        />

        <!-- axes -->
        <line :x1="P.l" :y1="sy(0)" :x2="W - P.r" :y2="sy(0)" stroke="#2a2a38" />
        <line :x1="P.l" :y1="P.t" :x2="P.l" :y2="H - P.b" stroke="#2a2a38" />

        <!-- gridlines + ticks -->
        <g v-for="t in xticks" :key="t">
          <line :x1="sx(t)" :y1="P.t" :x2="sx(t)" :y2="H - P.b" stroke="#20202c" />
          <text :x="sx(t)" :y="H - P.b + 16" class="bo__tick">{{ t }}</text>
        </g>

        <!-- the crossing -->
        <line
          v-if="crossing !== null && crossing >= 0 && crossing <= nMax"
          :x1="sx(crossing)"
          :y1="P.t"
          :x2="sx(crossing)"
          :y2="H - P.b"
          stroke="#ff9966"
          stroke-dasharray="4 3"
        />
        <circle
          v-if="crossing !== null && crossing >= 0 && crossing <= nMax"
          :cx="sx(crossing)"
          :cy="sy(f(crossing))"
          r="4.5"
          fill="#ff9966"
        />
        <text
          v-if="crossing !== null && crossing >= 0 && crossing <= nMax"
          :x="sx(crossing) + 7"
          :y="P.t + 14"
          class="bo__n0"
        >
          crossing at n = {{ crossing }}
        </text>

        <!-- c*g(n) -->
        <polyline :points="gPath" fill="none" stroke="#9999ff" stroke-width="2.2" />
        <!-- f(n) -->
        <polyline :points="fPath" fill="none" stroke="#ffcc66" stroke-width="2.2" />

        <!-- reader cursor -->
        <line :x1="sx(cursor)" :y1="P.t" :x2="sx(cursor)" :y2="H - P.b" stroke="#cc99cc" stroke-width="1.4" />
        <circle :cx="sx(cursor)" :cy="sy(cur.f)" r="4" fill="#ffcc66" stroke="#0b0b10" stroke-width="1.5" />
        <circle :cx="sx(cursor)" :cy="sy(cur.cg)" r="4" fill="#9999ff" stroke="#0b0b10" stroke-width="1.5" />

        <text :x="W - P.r" :y="P.t + 12" class="bo__lbl bo__lbl--f" text-anchor="end">
          {{ fName }}
        </text>
        <text :x="W - P.r" :y="P.t + 28" class="bo__lbl bo__lbl--g" text-anchor="end">
          {{ cgName }}
        </text>
      </svg>

      <div class="bo__side">
        <label class="bo__slide">
          n = <strong>{{ cursor }}</strong>
          <input type="range" min="0" :max="nMax" v-model.number="cursor" />
        </label>

        <div class="bo__readout">
          <div class="bo__rrow">
            <span>f(n) = {{ fName }}</span><b>{{ cur.f }}</b>
          </div>
          <div class="bo__rrow">
            <span>c·g(n) = {{ cgName }}</span><b>{{ cur.cg }}</b>
          </div>
          <div class="bo__rrow" :class="cur.ok ? 'is-ok' : 'is-bad'">
            <span>{{ cur.f }} {{ direction === 'upper' ? '≤' : '≥' }} {{ cur.cg }} ?</span>
            <b>{{ cur.ok ? 'true' : 'false' }}</b>
          </div>
        </div>

        <div class="bo__verdict">
          <template v-if="cur.n < n0">
            At n = {{ cur.n }} the inequality is
            <em>{{ cur.ok ? 'already true, but that proves nothing on its own' : 'still false' }}</em
            >. The claim only has to hold from some point onwards — n₀ is where "onwards" starts.
          </template>
          <template v-else>
            At n = {{ cur.n }} the inequality holds, and it holds for every larger n too. n₀ =
            {{ n0 }} is a valid choice.
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bo {
  border: 1px solid var(--lc-line);
  border-left: 6px solid var(--lc-sky);
  border-radius: 2px 14px 14px 2px;
  background: var(--lc-panel);
  margin: 26px 0;
  overflow: hidden;
}
.bo__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background: var(--lc-panel-2);
  border-bottom: 1px solid var(--lc-line);
}
.bo__tag {
  color: #1a1a1f;
  background: var(--lc-sky);
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 2px;
}
.bo__claim {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.8rem;
  color: var(--lc-text);
}
.bo__c {
  margin-left: auto;
  color: var(--lc-gold);
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.8rem;
}

.bo__body {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 16px;
  padding: 14px 18px 18px;
  align-items: start;
}
@media (max-width: 820px) {
  .bo__body {
    grid-template-columns: 1fr;
  }
}

.bo__svg {
  width: 100%;
  height: auto;
  background: var(--lc-bg);
  border: 1px solid var(--lc-line);
  border-radius: 4px;
}
.bo__tick {
  fill: #7a7a90;
  font-size: 10px;
  text-anchor: middle;
  font-family: var(--vp-font-family-mono, monospace);
}
.bo__n0 {
  fill: #ff9966;
  font-size: 10.5px;
  font-family: var(--vp-font-family-mono, monospace);
}
.bo__lbl {
  font-size: 11px;
  font-family: var(--vp-font-family-mono, monospace);
}
.bo__lbl--f {
  fill: #ffcc66;
}
.bo__lbl--g {
  fill: #9999ff;
}

.bo__slide {
  display: block;
  color: var(--lc-dim);
  font-size: 0.78rem;
  font-family: var(--vp-font-family-mono, monospace);
}
.bo__slide strong {
  color: var(--lc-lilac);
}
.bo__slide input {
  width: 100%;
  margin-top: 6px;
  accent-color: var(--lc-lilac);
}

.bo__readout {
  border: 1px solid var(--lc-line);
  border-radius: 4px;
  overflow: hidden;
  margin: 12px 0;
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 0.76rem;
}
.bo__rrow {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 10px;
  border-bottom: 1px solid var(--lc-line);
  color: var(--lc-dim);
}
.bo__rrow:last-child {
  border-bottom: none;
}
.bo__rrow b {
  color: var(--lc-text);
  font-weight: 600;
}
.bo__rrow.is-ok {
  background: rgba(153, 204, 255, 0.1);
}
.bo__rrow.is-ok b {
  color: var(--lc-sky);
}
.bo__rrow.is-bad {
  background: rgba(204, 102, 102, 0.12);
}
.bo__rrow.is-bad b {
  color: #ff9d9d;
}

.bo__verdict {
  font-size: 0.82rem;
  color: var(--lc-dim);
  border-left: 3px solid var(--lc-sky);
  padding-left: 10px;
}
.bo__verdict em {
  color: var(--lc-text);
  font-style: normal;
}
</style>
