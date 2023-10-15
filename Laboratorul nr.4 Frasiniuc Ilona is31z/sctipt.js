function calculateSj() {
    var j = parseInt(document.getElementById('j').value);
    var Bj = document.getElementById('Bj').value;

    var sBox1 = [
        [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    ];

    var tablesDiv = document.getElementById('tables');
    tablesDiv.innerHTML = 'Tabel S' + j + ': ' + JSON.stringify(sBox1[j]);

    var binaryBj = convertToBinary(Bj); 

    var result = sBox1[j][parseInt(binaryBj, 2)]; 
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Rezultatul S' + j + '(B' + j + '): ' + result;
}

function convertToBinary(decimal) {
    return (parseInt(decimal, 10) >>> 0).toString(2);
}