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
 * TODO: Describe your testing strategy for getBucketRange() here.
 */
describe("getBucketRange()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});

/*
 * Testing strategy for practice():
 *
 * TODO: Describe your testing strategy for practice() here.
 */
describe("practice()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});

/*
 * Testing strategy for update():
 *
 * TODO: Describe your testing strategy for update() here.
 */
describe("update()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});

/*
 * Testing strategy for getHint():
 *
 * TODO: Describe your testing strategy for getHint() here.
 */
describe("getHint()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});

/*
 * Testing strategy for computeProgress():
 *
 * TODO: Describe your testing strategy for computeProgress() here.
 */
describe("computeProgress()", () => {
  it("Example test case - replace with your own tests", () => {
    assert.fail(
      "Replace this test case with your own tests based on your testing strategy"
    );
  });
});
