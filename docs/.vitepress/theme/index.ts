import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'

// The LCARS teaching blocks. They came from the shell book and are kept
// verbatim, because the shape of a chapter should not change just because the
// subject did.
import ChapterMeta from './components/ChapterMeta.vue'
import MentalModel from './components/MentalModel.vue'
import BuildIt from './components/BuildIt.vue'
import YouShouldSee from './components/YouShouldSee.vue'
import IfItsWrong from './components/IfItsWrong.vue'
import CommonMistake from './components/CommonMistake.vue'
import UnderTheHood from './components/UnderTheHood.vue'
import ExerciseBlock from './components/ExerciseBlock.vue'
import Recap from './components/Recap.vue'

// The interactive half. These are what make this a review tool rather than a
// set of notes: every algorithm in the exam can be run, paused and rewound.
import ArrayTrack from './components/ArrayTrack.vue'
import SortPlayer from './components/SortPlayer.vue'
import CodeStepper from './components/CodeStepper.vue'
import RecursionStack from './components/RecursionStack.vue'
import OpGrid from './components/OpGrid.vue'
import BigOChart from './components/BigOChart.vue'

// The assessment half.
import FillIn from './components/FillIn.vue'
import Quiz from './components/Quiz.vue'
import TraceTable from './components/TraceTable.vue'
import ExamQuestion from './components/ExamQuestion.vue'
import ScoreBoard from './components/ScoreBoard.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ChapterMeta', ChapterMeta)
    app.component('MentalModel', MentalModel)
    app.component('BuildIt', BuildIt)
    app.component('YouShouldSee', YouShouldSee)
    app.component('IfItsWrong', IfItsWrong)
    app.component('CommonMistake', CommonMistake)
    app.component('UnderTheHood', UnderTheHood)
    app.component('ExerciseBlock', ExerciseBlock)
    app.component('Recap', Recap)

    app.component('ArrayTrack', ArrayTrack)
    app.component('SortPlayer', SortPlayer)
    app.component('CodeStepper', CodeStepper)
    app.component('RecursionStack', RecursionStack)
    app.component('OpGrid', OpGrid)
    app.component('BigOChart', BigOChart)

    app.component('FillIn', FillIn)
    app.component('Quiz', Quiz)
    app.component('TraceTable', TraceTable)
    app.component('ExamQuestion', ExamQuestion)
    app.component('ScoreBoard', ScoreBoard)
  },
} satisfies Theme
