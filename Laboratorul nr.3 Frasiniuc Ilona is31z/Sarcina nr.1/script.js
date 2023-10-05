function createPlayfairMatrix(key) {
    // Убрать дубликаты символов из ключа
    key = key.replace(/[^A-Z]/g, ""); // Убрать символы, которые не являются большими буквами
    key = key.split("").filter((value, index, self) => self.indexOf(value) === index).join("");
    
    // Создать матрицу
    let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // Алфавит без буквы J
    const matrix = [];
    
    // Заполнить матрицу символами из ключа
    for (let i = 0; i < key.length; i++) {
        matrix.push(key[i]);
        alphabet = alphabet.replace(key[i], ""); // Убрать буквы из текущего алфавита
    }
    
    // Добавить оставшиеся буквы из текущего алфавита
    for (let i = 0; i < alphabet.length; i++) {
        matrix.push(alphabet[i]);
    }
    
    // Преобразовать матрицу в двумерный массив 5x5
    const matrixArray = [];
    for (let i = 0; i < 5; i++) {
        matrixArray.push(matrix.slice(i * 5, i * 5 + 5));
    }
    
    return matrixArray;
}

// Функция для шифрования сообщения с помощью алгоритма Playfair
function playfairEncrypt(matrix, message) {
    // Функция для получения позиции буквы в матрице
    function getLetterPosition(letter) {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (matrix[row][col] === letter) {
                    return { row, col };
                }
            }
        }
    }
    
    // Функция для обработки пар букв в сообщении
    function processLetterPair(pair) {
        const pos1 = getLetterPosition(pair[0]);
        const pos2 = getLetterPosition(pair[1]);
        let encryptedPair = "";

        if (pos1.row === pos2.row) { // Буквы на одной строке
            encryptedPair += matrix[pos1.row][(pos1.col + 1) % 5];
            encryptedPair += matrix[pos2.row][(pos2.col + 1) % 5];
        } else if (pos1.col === pos2.col) { // Буквы в одном столбце
            encryptedPair += matrix[(pos1.row + 1) % 5][pos1.col];
            encryptedPair += matrix[(pos2.row + 1) % 5][pos2.col];
        } else { // Буквы в разных строках и столбцах
            encryptedPair += matrix[pos1.row][pos2.col];
            encryptedPair += matrix[pos2.row][pos1.col];
        }

        return encryptedPair;
    }
    
    // Убрать символы, которые не являются большими буквами из сообщения
    message = message.replace(/[^A-Z]/g, "");
    
    // Обработать пары букв в сообщении
    let encryptedMessage = "";
    let i = 0;
    while (i < message.length) {
        if (i === message.length - 1) {
            // Если у нас есть только одна буква в паре, добавить фиктивную букву (например, 'X')
            encryptedMessage += processLetterPair(message[i] + "X");
            i++;
        } else if (message[i] === message[i + 1]) {
            // Если у нас есть две одинаковые буквы в паре, добавить фиктивную букву (например, 'X')
            encryptedMessage += processLetterPair(message[i] + "X");
            i += 2;
        } else {
            encryptedMessage += processLetterPair(message[i] + message[i + 1]);
            i += 2;
        }
    }

    return encryptedMessage;
}

// Функция для дешифрования сообщения с помощью алгоритма Playfair
function playfairDecrypt(matrix, message) {
    // Функция для получения позиции буквы в матрице
    function getLetterPosition(letter) {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (matrix[row][col] === letter) {
                    return { row, col };
                }
            }
        }
    }
    
    // Функция для обработки пар букв в сообщении
    function processLetterPair(pair) {
        const pos1 = getLetterPosition(pair[0]);
        const pos2 = getLetterPosition(pair[1]);
        let decryptedPair = "";

        if (pos1.row === pos2.row) { // Буквы на одной строке
            decryptedPair += matrix[pos1.row][(pos1.col + 4) % 5]; // Используем остаток от деления на 5, чтобы получить обратную позицию
            decryptedPair += matrix[pos2.row][(pos2.col + 4) % 5];
        } else if (pos1.col === pos2.col) { // Буквы в одном столбце
            decryptedPair += matrix[(pos1.row + 4) % 5][pos1.col]; // Используем остаток от деления на 5, чтобы получить обратную позицию
            decryptedPair += matrix[(pos2.row + 4) % 5][pos2.col];
        } else { // Буквы в разных строках и столбцах
            decryptedPair += matrix[pos1.row][pos2.col];
            decryptedPair += matrix[pos2.row][pos1.col];
        }

        return decryptedPair;
    }
    
    // Убрать символы, которые не являются большими буквами из сообщения
    message = message.replace(/[^A-Z]/g, "");
    
    // Обработать пары букв в сообщении
    let decryptedMessage = "";
    let i = 0;
    while (i < message.length) {
        decryptedMessage += processLetterPair(message[i] + message[i + 1]);
        i += 2;
    }

    return decryptedMessage;
}

function process() {
    const key = document.getElementById("key").value.toUpperCase();
    const message = document.getElementById("message").value.toUpperCase();
    const operation = document.getElementById("operation").value;
    
    // Проверить ключ и сообщение
    if (key.length < 7) {
        alert("Ключ должен иметь минимальную длину 7 символов.");
        return;
    }
    
    // Создать матрицу Playfair из ключа
    const matrix = createPlayfairMatrix(key);
    
    // Выполнить алгоритм Playfair
    let result = "";
    
    if (operation === "encrypt") {
        result = playfairEncrypt(matrix, message);
    } else {
        result = playfairDecrypt(matrix, message);
    }
    
    document.getElementById("result").textContent = result;
}
