export function caesarCipher(string, number = 1) {
    let res = "";
    for (let i = 0; i < string.length; i++){
        const charCode = string.charCodeAt(i);
        if (charCode >= 97 && charCode <= 122) {
            // Lowercase letters (a-z)
            res += String.fromCharCode(((charCode - 97 + number) % 26) + 97);
        }
        else if (charCode >= 65 && charCode <= 90) {
            // Uppercase letters (A-Z)
            res += String.fromCharCode(((charCode - 65 + number) % 26) + 65);
        }
        else {
            // Non-alphabetic characters
            res += string[i];
        }
    }
    return res;
}
