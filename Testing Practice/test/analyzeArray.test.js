import { analyzeArray } from "../src/analyzeArray.js";

describe("analyzeArray", () => {
  test("analyzes an array of numbers correctly", () => {
    const result = analyzeArray([1, 8, 3, 4, 2, 6]);

    expect(result).toEqual({
      average: 4,
      min: 1,
      max: 8,
      length: 6,
    });
  });

  test("works with negative numbers", () => {
    const result = analyzeArray([-1, -5, -3, -8]);

    expect(result).toEqual({
      average: -4.25,
      min: -8,
      max: -1,
      length: 4,
    });
  });

  test("works with decimal numbers", () => {
    const result = analyzeArray([1.5, 2.5, 3.5]);

    expect(result).toEqual({
      average: 2.5,
      min: 1.5,
      max: 3.5,
      length: 3,
    });
  });

  test("throws error for empty array", () => {
    expect(() => analyzeArray([])).toThrow(
      "Input must be a non-empty array of numbers"
    );
  });

  test("throws error for non-array input", () => {
    expect(() => analyzeArray("not an array")).toThrow(
      "Input must be a non-empty array of numbers"
    );
  });

  test("throws error if array contains non-number elements", () => {
    expect(() => analyzeArray([1, 2, "three", 4])).toThrow(
      "All array elements must be numbers"
    );
  });
});
