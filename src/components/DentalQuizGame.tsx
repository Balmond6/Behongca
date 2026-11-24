import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Timer,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Trophy,
  Flame,
  Shuffle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { Language, QuizQuestion } from '../types';
import { DENTAL_GUARDIAN_QUIZ } from '../data/paperData';
import {
  getIsSoundMuted,
  playCorrectSound,
  playQuizFinishSound,
  playTimeoutSound,
  playTimerTickSound,
  playWrongSound,
  startQuizBacksound,
  stopQuizBacksound,
  subscribeSoundMuted,
  toggleSoundMuted,
} from '../utils/soundEngine';

interface DentalQuizGameProps {
  lang: Language;
}

type QuizMode = 'relaxed' | 'timed';
type QuizPhase = 'intro' | 'playing' | 'summary';
type QuestionCountOption = 10 | 20 | 30;

const TIMED_SECONDS = 15;
const QUESTION_COUNTS: QuestionCountOption[] = [10, 20, 30];

function shuffleArray<T>(list: T[]): T[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildShuffledQuizDeck(count: QuestionCountOption): QuizQuestion[] {
  const picked = shuffleArray(DENTAL_GUARDIAN_QUIZ).slice(0, count);
  return picked.map((q) => {
    const indexedOptions = q.options.map((opt, idx) => ({
      opt,
      isCorrect: idx === q.correctIndex,
    }));
    const shuffledOptions = shuffleArray(indexedOptions);
    const newCorrectIndex = shuffledOptions.findIndex((item) => item.isCorrect);
    return {
      ...q,
      options: shuffledOptions.map((item) => item.opt),
      correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
    };
  });
}

export const DentalQuizGame: React.FC<DentalQuizGameProps> = ({ lang }) => {
  const [questionCount, setQuestionCount] = useState<QuestionCountOption>(10);
  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>(() =>
    buildShuffledQuizDeck(10)
  );
  const [mode, setMode] = useState<QuizMode>('relaxed');
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMED_SECONDS);
  const [isMuted, setIsMuted] = useState<boolean>(getIsSoundMuted);

  const totalBankCount = DENTAL_GUARDIAN_QUIZ.length;
  const activeTotal = sessionQuestions.length;
  const currentQ = sessionQuestions[currentIndex] || DENTAL_GUARDIAN_QUIZ[0];
  const isAnswered = selectedOption !== null || timedOut;

  // Keep local mute indicator synchronized with global audio engine
  useEffect(() => {
    return subscribeSoundMuted(setIsMuted);
  }, []);

  // Manage quiz background music strictly during active gameplay
  useEffect(() => {
    if (phase === 'playing' && !isMuted) {
      startQuizBacksound();
    } else {
      stopQuizBacksound();
    }
    return () => {
      stopQuizBacksound();
    };
  }, [phase, isMuted]);

  // Countdown timer & timer tick/timeout SFX for Timed Challenge Mode
  useEffect(() => {
    if (phase !== 'playing' || mode !== 'timed' || isAnswered) return;

    if (timeLeft <= 0) {
      setTimedOut(true);
      setStreak(0);
      playTimeoutSound();
      return;
    }

    if (timeLeft <= 5) {
      playTimerTickSound(timeLeft <= 2);
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [phase, mode, isAnswered, timeLeft]);

  const startQuiz = (chosenMode: QuizMode) => {
    const freshDeck = buildShuffledQuizDeck(questionCount);
    setSessionQuestions(freshDeck);
    setMode(chosenMode);
    setPhase('playing');
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setBestStreak(0);
    setSelectedOption(null);
    setTimedOut(false);
    setTimeLeft(TIMED_SECONDS);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);

    if (idx === currentQ.correctIndex) {
      const nextStreak = streak + 1;
      const streakBonus = nextStreak >= 2 ? (nextStreak - 1) * 5 : 0;
      const timeBonus = mode === 'timed' ? timeLeft : 0;
      setScore((s) => s + 10 + streakBonus + timeBonus);
      setCorrectCount((c) => c + 1);
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
      playCorrectSound(nextStreak);
    } else {
      setStreak(0);
      playWrongSound();
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= activeTotal) {
      const accuracyPct = activeTotal > 0 ? Math.round((correctCount / activeTotal) * 100) : 0;
      setPhase('summary');
      playQuizFinishSound(accuracyPct);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setTimedOut(false);
      setTimeLeft(TIMED_SECONDS);
    }
  };

  const getReactionBadge = () => {
    if (timedOut) {
      return lang === 'id' ? '⏰ Waktu Habis! Yuk simak penjelasannya' : "⏰ Time's Up! Check the answer";
    }
    if (selectedOption === currentQ.correctIndex) {
      if (streak >= 3) {
        return lang === 'id'
          ? `🔥 Luar Biasa! ${streak}x Streak Combo!`
          : `🔥 Awesome! ${streak}x Streak Combo!`;
      }
      return lang === 'id' ? '🎉 Tepat Sekali!' : '🎉 Spot On!';
    }
    return lang === 'id' ? '💡 Hampir Tepat! Pelajari fakta ini' : '💡 Almost! Here is the key fact';
  };

  const accuracyPct = activeTotal > 0 ? Math.round((correctCount / activeTotal) * 100) : 0;

  const getRankInfo = () => {
    if (accuracyPct >= 80) {
      return {
        emoji: '🏆',
        title: { id: 'Grand Dental Guardian', en: 'Grand Dental Guardian' },
        msg: {
          id: 'Menang telak! Kamu menguasai rahasia kesehatan gigi & riset herbal BEHONGCA.',
          en: 'Victory! You mastered dental hygiene science and BEHONGCA herbal research.',
        },
      };
    }
    if (accuracyPct >= 50) {
      return {
        emoji: '🌿',
        title: { id: 'Herbal Bioactive Explorer', en: 'Herbal Bioactive Explorer' },
        msg: {
          id: 'Bagus! Pemahamanmu tentang pH mulut dan bahan alami sudah sangat kuat.',
          en: 'Great work! Your grasp of oral pH balance and natural extracts is strong.',
        },
      };
    }
    return {
      emoji: '🦷',
      title: { id: 'Fresh Smile Learner', en: 'Fresh Smile Learner' },
      msg: {
        id: 'Langkah awal yang bagus! Coba lagi dengan soal acak baru untuk meraih streak lebih tinggi.',
        en: 'Good start! Play another shuffled round to unlock a higher streak combo.',
      },
    };
  };

  return (
    <div id="quiz" className="mt-10 rounded-xl border border-[#DCE5DE] bg-white p-6 sm:p-8 dark:border-[#23332D] dark:bg-[#141E1B]">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE5DE] pb-4 dark:border-[#23332D]">
        <div>
          <p className="font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
            🎯 DENTAL QUIZ GAME · {totalBankCount}{' '}
            {lang === 'id' ? 'BANK SOAL ACAK' : 'SHUFFLED QUESTION BANK'}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold text-[#13201B] dark:text-[#EFF5F1]">
            {lang === 'id'
              ? 'Kuis Seru Kesehatan Gigi & Riset BEHONGCA'
              : 'Fun Dental Hygiene & BEHONGCA Science Trivia'}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
          {phase === 'playing' && streak >= 2 && (
            <motion.span
              key={streak}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-1 rounded-md bg-[#FEF3C7] px-2.5 py-1 font-bold text-[#B45309] dark:bg-[#2A2212] dark:text-[#FBBF24]"
            >
              <Flame className="h-3.5 w-3.5" />
              {streak}x Combo
            </motion.span>
          )}

          {phase === 'playing' && (
            <span className="font-bold tabular-nums text-[#0D7A5F] dark:text-[#34D399]">
              ✨ {score} pts
            </span>
          )}

          <button
            type="button"
            data-sound-toggle="true"
            onClick={() => toggleSoundMuted()}
            aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE5DE] bg-[#F7FAF8] px-3 py-1.5 text-xs font-semibold text-[#13201B] transition-colors hover:border-[#0D7A5F] dark:border-[#23332D] dark:bg-[#0F1714] dark:text-[#E3ECE7] dark:hover:border-[#34D399] whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5 text-[#788D84]" />
                <span>{lang === 'id' ? 'Suara Mati' : 'Muted'}</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 text-[#0D7A5F] dark:text-[#34D399]" />
                <span>{lang === 'id' ? 'Audio Aktif' : 'Sound On'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* PHASE 1: INTRO, QUESTION COUNT SELECTOR & MODE SELECTOR */}
      {phase === 'intro' && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-sm leading-relaxed text-[#3D4F47] dark:text-[#B9CBC2]">
              {lang === 'id'
                ? `Uji pengetahuanmu dari bank ${totalBankCount} soal acak seputar pencegahan karies, pH aman email, 5 bahan herbal BEHONGCA, dan metode HTST — lengkap dengan musik latar & efek suara interaktif!`
                : `Challenge yourself from our shuffled ${totalBankCount}-question bank on caries prevention, enamel pH, BEHONGCA’s 5 botanicals, and HTST science — complete with quiz music & interactive sound effects!`}
            </p>

            {/* User-selectable Question Count (10 / 20 / 30) */}
            <div>
              <p className="font-mono text-[11px] font-semibold text-[#556960] dark:text-[#8CA398]">
                {lang === 'id' ? 'PILIH JUMLAH SOAL SESI INI' : 'SELECT QUESTIONS PER ROUND'}
              </p>
              <div
                role="radiogroup"
                aria-label={lang === 'id' ? 'Jumlah soal kuis' : 'Quiz question count'}
                className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-[#DCE5DE] bg-[#EEF4F0] p-1 dark:border-[#23332D] dark:bg-[#0F1714]"
              >
                {QUESTION_COUNTS.map((cnt) => {
                  const selected = questionCount === cnt;
                  return (
                    <button
                      key={cnt}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setQuestionCount(cnt)}
                      className={`rounded-md border px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selected
                          ? 'border-[#0D7A5F]/25 bg-white text-[#0D7A5F] shadow-2xs dark:border-[#34D399]/75 dark:bg-[#0D4A3A] dark:text-white'
                          : 'border-transparent text-[#44574F] hover:text-[#13201B] dark:text-[#A9BDB3] dark:hover:text-white'
                      }`}
                    >
                      {cnt} {lang === 'id' ? 'Soal' : 'Q'}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#556960] dark:text-[#8CA398]">
              <span className="inline-flex items-center gap-1">
                <Shuffle className="h-3.5 w-3.5 text-[#0D7A5F] dark:text-[#34D399]" />
                {lang === 'id' ? 'Soal & Opsi Diacak' : 'Shuffled Questions & Choices'}
              </span>
              <span>·</span>
              <span>🎵 {lang === 'id' ? 'Backsound & SFX' : 'Backsound & SFX'}</span>
              <span>·</span>
              <span>🔥 Streak Combo</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-6">
            <button
              type="button"
              onClick={() => startQuiz('relaxed')}
              className="group flex flex-col justify-between rounded-xl border border-[#DCE5DE] bg-[#F7FAF8] p-5 text-left transition-transform hover:-translate-y-0.5 hover:border-[#0D7A5F] dark:border-[#23332D] dark:bg-[#0F1714] dark:hover:border-[#34D399] cursor-pointer"
            >
              <div>
                <span className="text-2xl" aria-hidden="true">
                  🌿
                </span>
                <h4 className="mt-2 font-display text-base font-bold text-[#13201B] dark:text-[#EFF5F1]">
                  {lang === 'id' ? 'Mode Santai' : 'Relaxed Mode'}
                </h4>
                <p className="mt-1 text-xs text-[#44574F] dark:text-[#A9BDB3]">
                  {lang === 'id'
                    ? `${questionCount} soal acak tanpa batas waktu.`
                    : `${questionCount} random questions with no timer pressure.`}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                {lang === 'id' ? `Mulai ${questionCount} Soal` : `Play ${questionCount} Q`}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => startQuiz('timed')}
              className="group flex flex-col justify-between rounded-xl border border-[#0D7A5F]/40 bg-[#0D7A5F]/6 p-5 text-left transition-transform hover:-translate-y-0.5 hover:border-[#0D7A5F] dark:border-[#34D399]/40 dark:bg-[#34D399]/8 dark:hover:border-[#34D399] cursor-pointer"
            >
              <div>
                <span className="text-2xl" aria-hidden="true">
                  ⚡
                </span>
                <h4 className="mt-2 font-display text-base font-bold text-[#13201B] dark:text-[#EFF5F1]">
                  {lang === 'id' ? 'Tantangan Waktu' : 'Timed Challenge'}
                </h4>
                <p className="mt-1 text-xs text-[#44574F] dark:text-[#A9BDB3]">
                  {lang === 'id'
                    ? `${questionCount} soal acak · 15 detik/soal + bonus kecepatan!`
                    : `${questionCount} random questions · 15s/question + speed bonus!`}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
                {lang === 'id' ? `Tantang ${questionCount} Soal` : `Start ${questionCount} Q`}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* PHASE 2: ACTIVE GAMEPLAY */}
      {phase === 'playing' && (
        <div className="mt-6">
          {/* Progress & Timer Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs font-semibold tabular-nums text-[#556960] dark:text-[#8CA398]">
              {lang === 'id' ? 'Soal' : 'Question'} {currentIndex + 1} / {activeTotal} ·{' '}
              {currentQ.biome}
            </span>

            {mode === 'timed' && (
              <span
                className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold tabular-nums ${
                  timeLeft <= 5
                    ? 'text-[#DC2626] dark:text-[#F87171]'
                    : 'text-[#0D7A5F] dark:text-[#34D399]'
                }`}
              >
                <Timer className="h-3.5 w-3.5" />
                {timeLeft}s
              </span>
            )}
          </div>

          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#E5EDE8] dark:bg-[#1E2C26]">
            <motion.div
              className="h-full bg-[#0D7A5F] dark:bg-[#34D399]"
              animate={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / activeTotal) * 100}%` }}
              transition={{ duration: 0.25 }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-6"
            >
              <div className="flex items-start gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF4F0] text-2xl dark:bg-[#0F1714]">
                  {currentQ.emoji}
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold leading-snug text-[#13201B] dark:text-[#EFF5F1]">
                  {currentQ.question[lang]}
                </h4>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {currentQ.options.map((opt, idx) => {
                  const isChosen = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let style =
                    'border-[#DCE5DE] bg-[#F7FAF8] text-[#13201B] hover:border-[#0D7A5F] dark:border-[#23332D] dark:bg-[#0F1714] dark:text-[#E3ECE7] dark:hover:border-[#34D399]';

                  if (isAnswered) {
                    if (isCorrect) {
                      style =
                        'border-[#0D7A5F] bg-[#0D7A5F]/12 text-[#0D7A5F] dark:border-[#34D399] dark:bg-[#34D399]/15 dark:text-[#6EE7B7]';
                    } else if (isChosen) {
                      style =
                        'border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] dark:border-[#F87171] dark:bg-[#F87171]/12 dark:text-[#FCA5A5]';
                    } else {
                      style =
                        'border-[#DCE5DE] bg-[#F7FAF8]/50 text-[#556960] opacity-65 dark:border-[#23332D] dark:bg-[#0F1714]/50 dark:text-[#8CA398]';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      data-quiz-option="true"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`flex items-center justify-between gap-2 rounded-xl border px-4 py-3.5 text-left text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:cursor-default ${style}`}
                    >
                      <span>{opt[lang]}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                      )}
                      {isAnswered && isChosen && !isCorrect && (
                        <XCircle className="h-4 w-4 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex flex-col gap-3 rounded-xl border border-[#DCE5DE] bg-[#EEF4F0] p-4 sm:flex-row sm:items-center sm:justify-between dark:border-[#23332D] dark:bg-[#0F1714]"
                >
                  <div>
                    <p className="text-xs font-bold text-[#0D7A5F] dark:text-[#34D399]">
                      {getReactionBadge()}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#31423B] dark:text-[#C5D5CD]">
                      {currentQ.explanation[lang]}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0D7A5F] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0A634D] dark:bg-[#10B981] dark:text-[#071510] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>
                      {currentIndex + 1 >= activeTotal
                        ? lang === 'id'
                          ? 'Lihat Hasil Akhir'
                          : 'View Final Score'
                        : lang === 'id'
                          ? 'Soal Berikutnya'
                          : 'Next Question'}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* PHASE 3: SUMMARY & RANK */}
      {phase === 'summary' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 rounded-xl border border-[#DCE5DE] bg-[#F7FAF8] p-6 text-center dark:border-[#23332D] dark:bg-[#0F1714]"
        >
          <div className="text-4xl" aria-hidden="true">
            {getRankInfo().emoji}
          </div>
          <p className="mt-2 font-mono text-xs font-semibold text-[#0D7A5F] dark:text-[#34D399]">
            {getRankInfo().title[lang]}
          </p>
          <h4 className="mt-1 font-display text-3xl font-bold tabular-nums text-[#13201B] dark:text-[#EFF5F1]">
            {score} {lang === 'id' ? 'Poin' : 'Points'}
          </h4>
          <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-[#44574F] dark:text-[#A9BDB3]">
            {getRankInfo().msg[lang]}
          </p>

          <div className="mt-5 inline-flex flex-wrap justify-center gap-6 rounded-lg border border-[#DCE5DE] bg-white px-6 py-3 font-mono text-xs tabular-nums dark:border-[#23332D] dark:bg-[#141E1B]">
            <span>
              ✅ {lang === 'id' ? 'Benar' : 'Correct'}:{' '}
              <strong>
                {correctCount}/{activeTotal} ({accuracyPct}%)
              </strong>
            </span>
            <span>
              🔥 Best Streak: <strong>{bestStreak}x</strong>
            </span>
            <span>
              <Trophy className="mr-1 inline h-3.5 w-3.5 text-[#D97706]" />
              {mode === 'timed'
                ? lang === 'id'
                  ? 'Mode Tantangan'
                  : 'Timed Mode'
                : lang === 'id'
                  ? 'Mode Santai'
                  : 'Relaxed Mode'}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => startQuiz(mode)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0D7A5F] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#0A634D] dark:bg-[#10B981] dark:text-[#071510] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{lang === 'id' ? 'Main Lagi (Acak Baru)' : 'Play Again (New Shuffle)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setPhase('intro')}
              className="inline-flex items-center gap-2 rounded-lg border border-[#DCE5DE] bg-white px-5 py-2.5 text-xs font-semibold text-[#13201B] hover:border-[#0D7A5F] dark:border-[#23332D] dark:bg-[#141E1B] dark:text-[#E3ECE7] cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{lang === 'id' ? 'Atur Jumlah & Mode' : 'Change Count & Mode'}</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
