import type { ReviewItem, ReviewableType } from "@/lib/domain/types";

// SM-2 inspired spaced repetition (spec §6.1). Short intervals for failed
// items, longer for mastered ones. Quality is simplified to a 0..5 grade.

const MIN_EASE = 1.3;

export function newReviewItem(
  itemType: ReviewableType,
  itemId: string,
): ReviewItem {
  return {
    itemType,
    itemId,
    easeFactor: 2.5,
    intervalDays: 0,
    dueDate: new Date().toISOString(),
    successCount: 0,
    failureCount: 0,
    lastReviewedAt: null,
  };
}

/** Grade an item (0..5). >= 3 is a success. Returns the updated item. */
export function review(item: ReviewItem, quality: number): ReviewItem {
  const q = Math.max(0, Math.min(5, quality));
  const now = new Date();
  let { easeFactor, intervalDays, successCount, failureCount } = item;

  if (q < 3) {
    // Lapse: reset interval, keep ease bounded.
    intervalDays = 1;
    failureCount += 1;
  } else {
    if (successCount === 0) intervalDays = 1;
    else if (successCount === 1) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * easeFactor);
    successCount += 1;
  }

  easeFactor = Math.max(
    MIN_EASE,
    easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)),
  );

  const due = new Date(now);
  due.setDate(due.getDate() + intervalDays);

  return {
    ...item,
    easeFactor,
    intervalDays,
    successCount,
    failureCount,
    dueDate: due.toISOString(),
    lastReviewedAt: now.toISOString(),
  };
}

export function isDue(item: ReviewItem, at: Date = new Date()): boolean {
  return new Date(item.dueDate).getTime() <= at.getTime();
}

export function dueItems(
  items: ReviewItem[],
  at: Date = new Date(),
): ReviewItem[] {
  return items.filter((i) => isDue(i, at));
}
