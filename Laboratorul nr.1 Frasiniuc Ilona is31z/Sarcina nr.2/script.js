function encrypt() {
    const message = document.getElementById("message").value;
    const key1 = parseInt(document.getElementById("key1").value);
    const key2 = document.getElementById("key2").value;
    const encryptedText = encryptTwoKeyCaesar(message, key1, key2);
    document.getElementById("result").textContent = "Зашифрованный текст: " + encryptedText;
}

function decrypt() {
    const message = document.getElementById("message").value;
    const key1 = parseInt(document.getElementById("key1").value);
    const key2 = document.getElementById("key2").value;
    const decryptedText = decryptTwoKeyCaesar(message, key1, key2);
    document.getElementById("result").textContent = "Расшифрованный текст: " + decryptedText;
}

function encryptTwoKeyCaesar(message, key1, key2) {
    message = message.toUpperCase().replace(/ /g, '');

    if (key1 < 1 || key1 > 25 || key2.length < 7 || !/^[A-Za-z]+$/.test(key2)) {
        return "Что-то не в порядке с вашими ключами.";
    }

    let encryptedMessage = '';

    for (let i = 0; i < message.length; i++) {
        const char = message[i];
        if (char >= 'A' && char <= 'Z') {
            const keyIndex = i % key2.length;
            const key2Char = key2[keyIndex].toUpperCase();
            const key2Offset = key2Char.charCodeAt(0) - 65;

            const encryptedChar = String.fromCharCode(((char.charCodeAt(0) - 65 + key1 + key2Offset) % 26) + 65);
            encryptedMessage += encryptedChar;
        } else {
            encryptedMessage += char;
        }
    }

    return encryptedMessage;
}

function decryptTwoKeyCaesar(ciphertext, key1, key2) {
    if (key1 < 1 || key1 > 25 || key2.length < 7 || !/^[A-Za-z]+$/.test(key2)) {
        return "Что-то не в порядке с вашими ключами.";
    }

    let decryptedMessage = '';

    for (let i = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i];
        if (char >= 'A' && char <= 'Z') {
            const keyIndex = i % key2.length;
            const key2Char = key2[keyIndex].toUpperCase();
            const key2Offset = key2Char.charCodeAt(0) - 65;

            const decryptedChar = String.fromCharCode(((char.charCodeAt(0) - 65 - key1 - key2Offset + 26) % 26) + 65);
            decryptedMessage += decryptedChar;
        } else {
            decryptedMessage += char;
        }
    }

    return decryptedMessage;
}