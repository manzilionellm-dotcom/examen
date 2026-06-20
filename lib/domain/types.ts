// Domain model for TaxiSvenska Français.
//
// IMPORTANT (spec §10, §13): legal/exam content is data-driven and lives in
// `lib/content` and `lib/config`. Never hardcode current legal/exam facts in
// business logic — store them as data with `OfficialSource` references and
// review dates so they can be verified and updated over the air.

/** Source (gloss) language. French is the launch pair; the model is
 * parameterized from day one so the same Swedish exam content can serve other
 * native languages (spec §14 commercial scale). */
export type NativeLanguage = "fr" | "ar" | "en" | "so" | "ti" | "fa";

/** The two parts of the official knowledge test (kunskapsprov). */
export type Delprov = 1 | 2;

export type QuestionType =
  | "knowledge"
  | "scenario"
  | "calculation"
  | "map"
  | "sign";

export type Difficulty = 1 | 2 | 3;

/** A label for one official knowledge area. The authoritative list and its
 * mapping to delprov must be VERIFIED against the current Trafikverket
 * provspecifikation (see content/knowledgeAreas.ts). */
export interface KnowledgeArea {
  id: string;
  delprov: Delprov;
  /** Swedish name as used in the official knowledge requirements. */
  swedishName: string;
  /** Gloss/explanation in the learner's native language. */
  glossFr: string;
  /** Relative exam weight (0..1 within its delprov), used for question
   * distribution and exam-weighted review scheduling (spec §6.8). */
  weight: number;
}

export interface MockQuestion {
  id: string;
  delprov: Delprov;
  knowledgeArea: string; // KnowledgeArea.id
  questionType: QuestionType;
  swedishText: string;
  /** Native-language gloss of the question stem (toggleable). */
  frenchGloss: string;
  options: string[]; // Swedish option texts
  /** Index into `options`. Usually exactly one correct answer. */
  correctAnswer: number;
  frenchExplanation: string;
  swedishKeyTerms: string[];
  sourceArea: string; // KnowledgeArea.id this was authored from
  difficultyLevel: Difficulty;
  /** Empirically tracked share correct (0..1), null until enough data. */
  empiricalDifficulty: number | null;
  /** Compliance flag (spec §13): all content is original. Always false. */
  isOfficialQuestionCopied: false;
}

export interface Phrase {
  id: string;
  category: string;
  swedishText: string;
  frenchTranslation: string;
  pronunciationHint: string;
  literalTranslation?: string;
  contextFr: string;
  politeVariant?: string;
  difficultyLevel: Difficulty;
}

export interface RoadSign {
  id: string;
  /** Synthetic asset reference — original/licensed assets only (spec §16). */
  signAssetRef: string;
  swedishName: string;
  frenchName: string;
  meaningFr: string;
  category: string;
}

/** A single exam-vocabulary entry. All entries live in ONE consolidated
 * glossary: the Swedish term tested in the exam + its French translation, with
 * a short domain tag used only for optional filtering. */
export interface ExamTerm {
  id: string;
  swedish: string;
  french: string;
  domain: string;
}

export interface CalculationProblem {
  id: string;
  template: string;
  promptSwedish: string;
  promptFr: string;
  correctAnswer: number;
  unit: string;
  solutionStepsFr: string[];
}

export interface EligibilityCriterion {
  id: string;
  /** Native-language label of the criterion. */
  labelFr: string;
  guidanceFr: string;
  /** If true, failing this blocks licensing regardless of study (spec §5.8). */
  blocking: boolean;
}

export type EligibilityStatus = "unknown" | "ok" | "blocked" | "action_needed";

export interface LogisticsItem {
  id: string;
  titleFr: string;
  bodyFr: string;
  /** Reference figure that must be verified against the authorities. */
  referenceValue?: string;
  sourceId?: string; // OfficialSource.id
}

export interface OfficialSource {
  id: string;
  authorityName: string;
  title: string;
  url: string;
  /** ISO date the value was last retrieved/verified, or null if unverified. */
  retrievedAt: string | null;
  summary: string;
  contentArea: string;
  /** ISO date the entry should be re-checked. */
  reviewDueDate: string;
}

export interface CurriculumWeek {
  week: number;
  titleFr: string;
  languageFocusFr: string;
  examFocusFr: string;
}

// ---- Learner progress (persisted client-side, offline-first) ----

export type ReviewableType = "vocab" | "phrase" | "sign" | "question";

/** SM-2 style spaced-repetition state for a single item. */
export interface ReviewItem {
  itemType: ReviewableType;
  itemId: string;
  easeFactor: number;
  intervalDays: number;
  /** ISO date the item is next due. */
  dueDate: string;
  successCount: number;
  failureCount: number;
  lastReviewedAt: string | null;
}

export interface MockAttempt {
  id: string;
  delprov: Delprov;
  startedAt: string;
  /** Correct answers count. */
  score: number;
  /** Total scored questions in the attempt. */
  scored: number;
  passed: boolean;
  /** Per knowledge-area: [correct, total]. */
  perArea: Record<string, [number, number]>;
  /** Whether the attempt used the full official format. */
  fullFormat: boolean;
}

export interface UserProfile {
  nativeLanguage: NativeLanguage;
  dailyGoalMinutes: number;
  programStartDate: string | null;
  currentDay: number;
  streakCount: number;
  lastActiveDate: string | null;
  /** Show the native-language gloss on questions by default. */
  glossEnabled: boolean;
}

export interface ProgressState {
  profile: UserProfile;
  reviewItems: Record<string, ReviewItem>; // key: `${itemType}:${itemId}`
  attempts: MockAttempt[];
  eligibility: Record<string, EligibilityStatus>;
}
