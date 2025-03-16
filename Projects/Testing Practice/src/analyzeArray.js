export function analyzeArray(array) {
  if (!Array.isArray(array) || array.length === 0) {
    throw new Error("Input must be a non-empty array of numbers");
  }

  if (!array.every((item) => typeof item === "number")) {
    throw new Error("All array elements must be numbers");
  }

  const length = array.length;
  const sum = array.reduce((acc, curr) => acc + curr, 0);
  const average = sum / length;
  const min = Math.min(...array);
  const max = Math.max(...array);

  return {
    average,
    min,
    max,
    length,
  };
}
