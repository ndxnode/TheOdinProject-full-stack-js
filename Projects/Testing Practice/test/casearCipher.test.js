import { caesarCipher } from "../src/caesarCipher";

test("caesar cipher of x number", () => {
    expect(caesarCipher("abc!", 3)).toBe("def!");
    expect(caesarCipher("XYZ ", 3)).toBe("ABC ");
})