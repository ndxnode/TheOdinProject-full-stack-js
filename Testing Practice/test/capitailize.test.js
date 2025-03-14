import { capitalize } from '../src/capitailize';

test("returns the string with the first letter capitailized", () => {
    expect(capitalize("baby")).toBe("Baby");
})