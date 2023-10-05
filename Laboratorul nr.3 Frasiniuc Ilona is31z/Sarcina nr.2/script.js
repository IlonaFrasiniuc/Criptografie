function process() {
    const operation = document.getElementById('operation').value;
    const key = document.getElementById('key').value.toUpperCase();
    const message = document.getElementById('message').value.replace(/ /g, '').toUpperCase();

    if (key.length < 7) {
        alert('Длина ключа должна быть не менее 7 символов.');
        return;
    }

    if (!/^[A-Z]+$/.test(key)) {
        alert('Ключ может содержать только буквы от A до Z.');
        return;
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numLetters = 31;

    let result = '';
    for (let i = 0, j = 0; i < message.length; i++) {
        const char = message.charAt(i);

        if (/^[A-Z]$/.test(char)) {
            const charCode = char.charCodeAt(0) - 'A'.charCodeAt(0);
            const keyChar = key.charAt(j % key.length).charCodeAt(0) - 'A'.charCodeAt(0);

            let newCharCode;
            if (operation === 'encrypt') {
                newCharCode = (charCode + keyChar) % numLetters;
            } else {
                newCharCode = (charCode - keyChar + numLetters) % numLetters;
            }

            result += String.fromCharCode(newCharCode + 'A'.charCodeAt(0));
            j++;
        } else {
            result += char;
        }
    }

    document.getElementById('result').textContent = result;
}