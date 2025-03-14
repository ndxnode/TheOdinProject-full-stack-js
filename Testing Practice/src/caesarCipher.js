export function caesarCipher(string, number) {
    let res = "";
    for (let i = 0; i < string.length; i++){
        const charCode = char.charCodeAt(string[i]);
        if (charCode >= 97 && charCode <= 122) {
            res += String.fromCharCode(((charCode - 97 + number) % 26) + 97);
        }
        if (charCode >= 65 && charCode <= 90) {
            res += String.fromCharCode(((charCode - 65 + number) % 26) + 65);
        }
        else {
            res += String.fromCharCode(charCode);
        }
    }
}