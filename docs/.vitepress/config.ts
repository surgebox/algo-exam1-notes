import { defineConfig } from 'vitepress'

// ---------------------------------------------------------------------------
// The order is the teaching. It is hand-written for the same reason the exam
// worksheet is ordered the way it is: counting operations has to come before
// growth rates, growth rates before the formal definition, and the definition
// before the proofs. A generated sidebar would destroy that.
// ---------------------------------------------------------------------------

const sidebar = [
  {
    text: 'Start here',
    collapsed: false,
    items: [
      { text: 'What this book is', link: '/introduction/what-this-book-is' },
      { text: 'How to use it', link: '/introduction/how-to-read-it' },
    ],
  },
  {
    text: 'Part 1 — Counting and growth',
    collapsed: false,
    items: [
      { text: '1.1  Counting operations', link: '/part-1-counting/counting-operations' },
      { text: '1.2  Growth rates, and what to throw away', link: '/part-1-counting/growth-rates' },
    ],
  },
  {
    text: 'Part 2 — The formal bounds',
    collapsed: false,
    items: [
      { text: '2.1  What O, Ω and Θ claim', link: '/part-2-asymptotics/what-the-claims-mean' },
      { text: '2.2  Proving f(n) = O(g(n))', link: '/part-2-asymptotics/big-o-proof' },
      { text: '2.3  Proving f(n) = Ω(g(n))', link: '/part-2-asymptotics/big-omega-proof' },
    ],
  },
  {
    text: 'Part 3 — The sorts',
    collapsed: false,
    items: [
      { text: '3.1  Bubble sort, from the pseudocode', link: '/part-3-sorting/bubble-sort' },
      { text: '3.2  The bubble sort trace', link: '/part-3-sorting/bubble-trace' },
      { text: '3.3  Selection sort, from the pseudocode', link: '/part-3-sorting/selection-sort' },
      { text: '3.4  The selection sort trace', link: '/part-3-sorting/selection-trace' },
      { text: '3.5  How many operations?', link: '/part-3-sorting/counting-comparisons' },
    ],
  },
  {
    text: 'Part 4 — Recursion',
    collapsed: false,
    items: [
      { text: '4.1  Calls down, returns up', link: '/part-4-recursion/calls-and-returns' },
      { text: '4.2  Tracing countdown(4)', link: '/part-4-recursion/countdown' },
      { text: '4.3  Tracing sum_to_n(4)', link: '/part-4-recursion/sum-to-n' },
    ],
  },
  {
    text: 'Part 5 — The exam',
    collapsed: false,
    items: [
      { text: '5.1  Every question, worked', link: '/part-5-exam/every-question-worked' },
      { text: '5.2  Blank-sheet rehearsal', link: '/part-5-exam/rehearsal' },
      { text: '5.3  Cheat sheet', link: '/part-5-exam/cheat-sheet' },
    ],
  },
]

export default defineConfig({
  // GitHub Pages serves a project site from /<repo>/, so every asset URL needs
  // that prefix baked in. The deploy workflow sets DOCS_BASE to the repository
  // name; for a root-served local dev server run `DOCS_BASE=/ npm run dev`.
  base: process.env.DOCS_BASE ?? '/algo-exam1-notes/',

  title: 'Algorithm Analysis — Exam 1',
  description:
    'An interactive review book for Algorithm Analysis Exam 1: counting operations, Big-O and Big-Omega proofs, bubble sort, selection sort and recursion tracing.',

  themeConfig: {
    nav: [
      { text: 'Start here', link: '/introduction/what-this-book-is' },
      { text: 'Counting', link: '/part-1-counting/counting-operations' },
      { text: 'Bounds', link: '/part-2-asymptotics/what-the-claims-mean' },
      { text: 'Sorts', link: '/part-3-sorting/bubble-sort' },
      { text: 'Recursion', link: '/part-4-recursion/calls-and-returns' },
      { text: 'The exam', link: '/part-5-exam/every-question-worked' },
    ],

    sidebar,

    outline: { level: [2, 3], label: 'On this page' },

    search: { provider: 'local' },

    docFooter: { prev: 'Previous', next: 'Next' },

    darkModeSwitchLabel: 'Appearance',
    returnToTopLabel: 'Back to top',

    footer: {
      message: 'Built around the Exam 1 practice question sheet.',
      copyright: 'algorithm analysis — exam 1',
    },
  },
})
