function encrypt() {
    const message = document.getElementById("message").value;
    const key = parseInt(document.getElementById("key").value);
    const encryptedText = encryptCesarCipher(message, key);
    document.getElementById("result").textContent = "Зашифрованный текст: " + encryptedText;
}

function decrypt() {
    const message = document.getElementById("message").value;
    const key = parseInt(document.getElementById("key").value);
    const decryptedText = decryptCesarCipher(message, key);
    document.getElementById("result").textContent = "Расшифрованный текст: " + decryptedText;
}

function encryptCesarCipher(message, key) {
    message = message.toUpperCase().replace(/ /g, '');

    if (key < 1 || key > 25) {
        return "Ключ должен быть в диапазоне от 1 до 25.";
    }

    let encryptedMessage = '';

    for (let i = 0; i < message.length; i++) {
        const char = message[i];
        if (char >= 'A' && char <= 'Z') {
            const encryptedChar = String.fromCharCode(((char.charCodeAt(0) - 65 + key) % 26) + 65);
            encryptedMessage += encryptedChar;
        } else {
            encryptedMessage += char;
        }
    }

    return encryptedMessage;
}

function decryptCesarCipher(ciphertext, key) {
    if (key < 1 || key > 25) {
        return "Ключ должен быть в диапазоне от 1 до 25.";
    }

    let decryptedMessage = '';

    for (let i = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i];
        if (char >= 'A' && char <= 'Z') {
            const decryptedChar = String.fromCharCode(((char.charCodeAt(0) - 65 - key + 26) % 26) + 65);
            decryptedMessage += decryptedChar;
        } else {
            decryptedMessage += char;
        }
    }

    return decryptedMessage;
}