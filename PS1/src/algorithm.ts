/**
 * Problem Set 1: Flashcards - Algorithm Functions
 *
 * This file contains the implementations for the flashcard algorithm functions
 * as described in the problem set handout.
 *
 * Please DO NOT modify the signatures of the exported functions in this file,
 * or you risk failing the autograder.
 */

import { Flashcard, AnswerDifficulty, BucketMap } from "./flashcards";

/**
 * Converts a Map representation of learning buckets into an Array-of-Set representation.
 *
 * @param buckets Map where keys are bucket numbers and values are sets of Flashcards.
 * @returns Array of Sets, where element at index i is the set of flashcards in bucket i.
 *          Buckets with no cards will have empty sets in the array.
 * @spec.requires buckets is a valid representation of flashcard buckets.
 */
export function toBucketSets(buckets: BucketMap): Array<Set<Flashcard>> {
  // TODO: Implement this function
  const maxBucket = Math.max(...Array.from(buckets.keys()),0);
  const result: Array<Set<Flashcard>> = new Array(maxBucket+1).fill(null).map(()=>new Set<Flashcard>());

  buckets.forEach((Flashcards,bucket)=>{
    result[bucket]=Flashcards;
  })
  return result;
}

/**
 * Finds the range of buckets that contain flashcards, as a rough measure of progress.
 *
 * @param buckets Array-of-Set representation of buckets.
 * @returns object with minBucket and maxBucket properties representing the range,
 *          or undefined if no buckets contain cards.
 * @spec.requires buckets is a valid Array-of-Set representation of flashcard buckets.
 */
export function getBucketRange(bucketIndex: number, bucketCount: number, minValue: number, maxValue: number): { start: number, end: number } {
  const rangeSize = (maxValue - minValue) / bucketCount;
  const start = minValue + bucketIndex * rangeSize;
  const end = bucketIndex === bucketCount - 1 ? maxValue : start + rangeSize;
  return { 
      start: Math.round(start * 100) / 100, 
      end: Math.round(end * 100) / 100 
  };
}
/**
 * Selects cards to practice on a particular day.
 *
 * @param buckets Array-of-Set representation of buckets.
 * @param day current day number (starting from 0).
 * @returns a Set of Flashcards that should be practiced on day `day`,
 *          according to the Modified-Leitner algorithm.
 * @spec.requires buckets is a valid Array-of-Set representation of flashcard buckets.
 */
export function practice(
  buckets: Array<Set<Flashcard>>,
  day: number
): Set<Flashcard> {
  // TODO: Implement this function
  throw new Error("Implement me!");
}

/**
 * Updates a card's bucket number after a practice trial.
 *
 * @param buckets Map representation of learning buckets.
 * @param card flashcard that was practiced.
 * @param difficulty how well the user did on the card in this practice trial.
 * @returns updated Map of learning buckets.
 * @spec.requires buckets is a valid representation of flashcard buckets.
 */
export function update(
  buckets: BucketMap,
  card: Flashcard,
  difficulty: AnswerDifficulty
): BucketMap {
  // TODO: Implement this function
  throw new Error("Implement me!");
}

/**
 * Generates a hint for a flashcard.
 *
 * @param card The flashcard to generate a hint for.
 * @returns A hint for the front of the flashcard, which should be a subset of the hint provided in the Flashcard.
 *          The hint can be empty if no hint exists.
 * @spec.requires card is a valid Flashcard with a non-empty `hint` property.
 * @spec.effects Returns the hint string from the Flashcard's `hint` property.
 */
export function getHint(card: Flashcard): string {
  // TODO: Implement this function (and strengthen the spec!)
  if (card.hint) {
    return card.hint;
  }
  return "No hint available.";
}

/**
 * Computes the user's learning progress based on their answer history.
 *
 * @param {number[] | undefined} buckets - An array representing current progress for each topic (0 to 100).
 * @param {boolean[]} history - An array representing if each answer was correct (true) or incorrect (false).
 *
 * @returns {object} An object containing:
 *   - overallProgress {number}: The average progress across all topics.
 *   - topicProgress {number[]}: Updated progress for each topic.
 *
 * @spec.requires buckets must be an array of numbers between 0 and 100 or undefined.
 * @spec.effects Increases progress by +5 for correct answers (capped at 100), leaves incorrect ones unchanged.
 *               Returns { overallProgress: NaN, topicProgress: [] } if buckets is undefined or empty.
 */

export function computeProgress(
  buckets: number[] | undefined,
  history: boolean[]
): { overallProgress: number; topicProgress: number[] } {
  // Handle undefined or empty buckets
  if (!buckets || buckets.length === 0) {
    return { overallProgress: NaN, topicProgress: [] };
  }

  // Compute new progress per topic
  const topicProgress = buckets.map((progress, index) =>
    history[index] ? Math.min(progress + 5, 100) : progress
  );

  // Calculate overall progress as the average of topic progress
  const totalProgress = topicProgress.reduce((sum, val) => sum + val, 0);
  const overallProgress = totalProgress / topicProgress.length;

  return { overallProgress, topicProgress };
}
