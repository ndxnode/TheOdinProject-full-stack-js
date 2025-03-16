import { calculator } from "../src/calculator";

test("calculator object that can add, subtract, multiple, and divide two numbers", () => {
    expect(calculator.add(1,2)).toBe(3);
    expect(calculator.subtract(2,1)).toBe(1);
    expect(calculator.multiply(3,2)).toBe(6);
    expect(calculator.divide(8,4)).toBe(2);
})