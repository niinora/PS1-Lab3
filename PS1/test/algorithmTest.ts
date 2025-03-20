import assert from "assert";

import { AnswerDifficulty, Flashcard, BucketMap } from "../src/flashcards";
import {
  toBucketSets,
  getBucketRange,
  practice,
  update,
  getHint,
  computeProgress,
} from "../src/algorithm";

/*
 * Testing strategy for toBucketSets():
 *
 * TODO: Describe your testing strategy for toBucketSets() here.
 */
describe('toBucketSets function', () => {
  it('should correctly convert a Map to an array of Sets', () => {
    const flashcard1 = new Flashcard("What is 2 + 2?", "4", "Basic math", ["math"]);
    const flashcard2 = new Flashcard("What is the capital of France?", "Paris", "European city", ["geography"]);
    const flashcard3 = new Flashcard("What is 3 + 5?", "8", "Basic math", ["math"]);
    const flashcard4 = new Flashcard("What is the capital of Germany?", "Berlin", "European city", ["geography"]);

    const buckets: BucketMap = new Map([
      [0, new Set([flashcard1, flashcard2])],
      [2, new Set([flashcard3, flashcard4])]
    ]);

    
    const result = toBucketSets(buckets);

    // Assert the result is as expected
    assert.deepStrictEqual(result[0], new Set([flashcard1, flashcard2]));  // Bucket 0 has flashcard1 and flashcard2
    assert.deepStrictEqual(result[1], new Set());  // Bucket 1 is empty
    assert.deepStrictEqual(result[2], new Set([flashcard3, flashcard4]));  // Bucket 2 has flashcard3 and flashcard4
  });

  it('should handle an empty map', () => {
    const buckets: BucketMap = new Map();

    // Call the function
    const result = toBucketSets(buckets);

    assert.deepStrictEqual(result, [new Set()]);  // No buckets, so result is an array with one empty set
  });

  it('should handle buckets with missing flashcards', () => {
    const flashcard1 = new Flashcard("What is 2 + 2?", "4", "Basic math", ["math"]);
    
    const buckets: BucketMap = new Map([
      [0, new Set([flashcard1])],
      [2, new Set()]
    ]);

    const result = toBucketSets(buckets);

    // Assert that the result contains empty sets for missing buckets
    assert.deepStrictEqual(result[0], new Set([flashcard1]));  // Bucket 0 has flashcard1
    assert.deepStrictEqual(result[1], new Set());  // Bucket 1 is empty
    assert.deepStrictEqual(result[2], new Set());  // Bucket 2 is empty
  });
});

/*
 * Testing strategy for getBucketRange():
 *
* - Test with a single bucket to ensure it covers the entire range.
 * - Test with multiple buckets to ensure they are evenly distributed.
 * - Test with bucketIndex at the beginning, middle, and end of the range.
 * - Test with negative and positive ranges.
 * - Test with large values for minValue and maxValue.
 * - Test with minValue equal to maxValue. */
describe("getBucketRange()", () => {
  it("should return the entire range for a single bucket", () => {
    const result = getBucketRange(0, 1, 0, 100);
    assert.deepEqual(result, { start: 0, end: 100 });
  });

  it("should evenly distribute ranges across multiple buckets", () => {
    const result1 = getBucketRange(0, 4, 0, 100);
    const result2 = getBucketRange(1, 4, 0, 100);
    const result3 = getBucketRange(2, 4, 0, 100);
    const result4 = getBucketRange(3, 4, 0, 100);
    assert.deepEqual(result1, { start: 0, end: 25 });
    assert.deepEqual(result2, { start: 25, end: 50 });
    assert.deepEqual(result3, { start: 50, end: 75 });
    assert.deepEqual(result4, { start: 75, end: 100 });
  });

  it("should handle negative and positive ranges", () => {
    const result = getBucketRange(1, 3, -50, 50);
    assert.deepEqual(result, { start: -16.67, end: 16.67 });
  });

  it("should handle large values for minValue and maxValue", () => {
    const result = getBucketRange(1, 3, 1000000, 3000000);
    assert.deepEqual(result, { start: 1666666.67, end: 2333333.33 });
  });

  it("should handle minValue equal to maxValue", () => {
    const result = getBucketRange(0, 1, 50, 50);
    assert.deepEqual(result, { start: 50, end: 50 });
  });

  it("should handle bucketIndex at the beginning, middle, and end of the range", () => {
    const result1 = getBucketRange(0, 3, 0, 90);
    const result2 = getBucketRange(1, 3, 0, 90);
    const result3 = getBucketRange(2, 3, 0, 90);
    assert.deepEqual(result1, { start: 0, end: 30 });
    assert.deepEqual(result2, { start: 30, end: 60 });
    assert.deepEqual(result3, { start: 60, end: 90 });
  });
});

/*
 * Testing strategy for getHint():
 *
 * TODO: Describe your testing strategy for getHint() here.
 */

describe('getHint', () => {
  it('should return the hint when a valid hint is provided', () => {
    const flashcard1 = new Flashcard('What is the capital of France?', 'Paris', 'City of lights', ['geography']);
    const hint1 = getHint(flashcard1);
    assert.strictEqual(hint1, 'City of lights', 'The hint should be "City of lights"');
  });

  it('should return "No hint available." when the hint is empty', () => {
    const flashcard2 = new Flashcard('What is the capital of Spain?', 'Madrid', '', ['geography']);
    const hint2 = getHint(flashcard2);
    assert.strictEqual(hint2, 'No hint available.', 'The hint should be "No hint available."');
  });

  it('should handle flashcards with no hint properly', () => {
    const flashcard3 = new Flashcard('What is the largest ocean?', 'Pacific', '', ['geography']);
    const hint3 = getHint(flashcard3);
    assert.strictEqual(hint3, 'No hint available.', 'The hint should be "No hint available."');
    
  });
});

/*
 * Testing strategy for computeProgress():
 *
 * TODO: Describe your testing strategy for computeProgress() here.
 */

describe('computeProgress Function', () => {
  it('should return updated progress and overall progress when some answers are correct', () => {
    const result1 = computeProgress([10, 20, 30], [true, false, true]);
    assert.deepStrictEqual(result1.topicProgress, [15, 20, 35]);
    assert.strictEqual(result1.overallProgress, 23.333333333333332);
  });

  it('should handle all correct answers and update progress for each topic', () => {
    const result2 = computeProgress([10, 20, 30], [true, true, true]);
assert.deepStrictEqual(result2.topicProgress, [15, 25, 35]);
assert.strictEqual(result2.overallProgress, 25);
  });

  it('should handle all incorrect answers and keep the progress unchanged', () => {
    const result3 = computeProgress([10, 20, 30], [false, false, false]);
    assert.deepStrictEqual(result3.topicProgress, [10, 20, 30]);
    assert.strictEqual(result3.overallProgress, 20);
  });

  it('should return an Nan if buckets is undefined', () => {
    const result4 = computeProgress(undefined, [true, false, true]);
    assert.deepStrictEqual(result4, { overallProgress: NaN, topicProgress: [] });
    
  const result5 = computeProgress([], []);
  assert.deepStrictEqual(result5, { overallProgress: NaN, topicProgress: [] });
  });


  it('should cap progress at 100 if topics are near the maximum progress', () => {
    const result6 = computeProgress([95, 99, 100], [true, true, true]);
    assert.deepStrictEqual(result6.topicProgress, [100, 100, 100]);
    assert.strictEqual(result6.overallProgress, 100);
  });
});