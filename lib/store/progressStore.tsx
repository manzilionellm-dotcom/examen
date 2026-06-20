"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  EligibilityStatus,
  MockAttempt,
  ProgressState,
  ReviewItem,
  ReviewableType,
  UserProfile,
} from "@/lib/domain/types";
import { newReviewItem, review as srsReview } from "@/lib/engine/srs";

// Offline-first progress store (spec §10). All learner state is persisted to
// localStorage so study works without a network; sync is optional/future.

const STORAGE_KEY = "taxisvenska.progress.v1";

const DEFAULT_PROFILE: UserProfile = {
  nativeLanguage: "fr",
  dailyGoalMinutes: 30,
  programStartDate: null,
  currentDay: 1,
  streakCount: 0,
  lastActiveDate: null,
  glossEnabled: true,
};

function defaultState(): ProgressState {
  return {
    profile: DEFAULT_PROFILE,
    reviewItems: {},
    attempts: [],
    eligibility: {},
  };
}

function load(): ProgressState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...defaultState(), ...parsed, profile: { ...DEFAULT_PROFILE, ...parsed.profile } };
  } catch {
    return defaultState();
  }
}

interface Store {
  state: ProgressState;
  ready: boolean;
  updateProfile: (patch: Partial<UserProfile>) => void;
  recordAttempt: (attempt: MockAttempt) => void;
  reviewItem: (type: ReviewableType, id: string, quality: number) => void;
  setEligibility: (id: string, status: EligibilityStatus) => void;
  reset: () => void;
}

const StoreContext = createContext<Store | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(defaultState);
  const [ready, setReady] = useState(false);

  // Load persisted state on mount only (not during render) to avoid an
  // SSR/client hydration mismatch — the server has no localStorage.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage may be unavailable (private mode); fail silently.
    }
  }, [state, ready]);

  const updateProfile = useCallback((patch: Partial<UserProfile>) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }));
  }, []);

  const recordAttempt = useCallback((attempt: MockAttempt) => {
    setState((s) => ({ ...s, attempts: [...s.attempts, attempt] }));
  }, []);

  const reviewItem = useCallback(
    (type: ReviewableType, id: string, quality: number) => {
      setState((s) => {
        const key = `${type}:${id}`;
        const existing: ReviewItem = s.reviewItems[key] ?? newReviewItem(type, id);
        return {
          ...s,
          reviewItems: { ...s.reviewItems, [key]: srsReview(existing, quality) },
        };
      });
    },
    [],
  );

  const setEligibility = useCallback((id: string, status: EligibilityStatus) => {
    setState((s) => ({ ...s, eligibility: { ...s.eligibility, [id]: status } }));
  }, []);

  const reset = useCallback(() => setState(defaultState()), []);

  const value = useMemo<Store>(
    () => ({ state, ready, updateProfile, recordAttempt, reviewItem, setEligibility, reset }),
    [state, ready, updateProfile, recordAttempt, reviewItem, setEligibility, reset],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useProgress(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useProgress must be used within <ProgressProvider>");
  return ctx;
}
