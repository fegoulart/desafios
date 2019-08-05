'use strict';

let fs = require('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.module = {
    part1BreakText: part1BreakText,
    part2JustifyText: part2JustifyText,
    breakText: breakText,
    breakPhrase: breakPhrase,
    isLessOrEqualThanMax: isLessOrEqualThanMax,
    justifyLine: justifyLine
};

readline.question(`Inform input file path please :`, (filePath) => {

    let path = filePath || '../input/input_parte1.txt';

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        let brokenText = part1BreakText(data, 40);
        let justifiedText = part2JustifyText(brokenText, 40);

        let fileName = filePath;
        if (filePath.lastIndexOf("/") > 0) {
            fileName = filePath.substr(filePath.lastIndexOf("/") + 1)
        }
        let outputFile1 = '../output/' + fileName + '_parte1.txt';
        let outputFile2 = '../output/' + fileName + '_parte2.txt';
        writeOutput(outputFile1, brokenText);
        writeOutput(outputFile2, justifiedText);
        console.log("\ndone");
        console.log("check files: \n" + outputFile1 + "\n" + outputFile2);
        readline.close()
    });
});


function part1BreakText(data, maxLineLength) {

    if (typeof data != "string") {
        throw TypeError("Data should be a string.")
    }
    if (!Number.isInteger(maxLineLength) || maxLineLength <= 0) {
        throw TypeError("Length should be a positive integer.")
    }
    let brokenText = breakText(data, maxLineLength);
    let noLastEmptyLineText = brokenText.substring(0, brokenText.length - 1);
    return noLastEmptyLineText
};

function part2JustifyText(data, maxLineLength) {

    if (typeof data != "string") {
        throw TypeError("Data should be a string.")
    }
    if (!Number.isInteger(maxLineLength) || maxLineLength <= 0) {
        throw TypeError("Length should be a positive integer.")
    }
    let text = "";
    let lines = data.split("\n");
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length < maxLineLength) {
            text += justifyLine(lines[i], maxLineLength)
        } else {
            text += lines[i];
        }
        if (i < lines.length - 1) {
            text += "\n"
        }
    }
    return text
}

function breakText(data, maxLineLength) {

    if (typeof data != "string") {
        throw TypeError("Data should be a string.")
    }
    if (!Number.isInteger(maxLineLength) || maxLineLength <= 0) {
        throw TypeError("Length should be a positive integer.")
    }
    let phrases = data.split("\n");
    let text = "";
    for (let i = 0; i < phrases.length; i++) {
        text += breakPhrase(phrases[i], maxLineLength);
    }
    return text
}

function breakPhrase(phrase, maxLineLength) {
    let returnText = "";
    if (phrase.length === 0) {
        return "\n"
    }

    let arrayOfWords = phrase.split(" ");
    let totalNumberOfWords = arrayOfWords.length;
    let currentWordIndex = 0;
    let lineLastWordIndex = 0;

    while (currentWordIndex < totalNumberOfWords) {

        let currentLineLength = arrayOfWords[currentWordIndex].length;
        lineLastWordIndex = currentWordIndex + 1;
        let oneMoreWordLineLength = currentLineLength;

        while (lineLastWordIndex < totalNumberOfWords && isLessOrEqualThanMax(oneMoreWordLineLength, maxLineLength)) {

            oneMoreWordLineLength = arrayOfWords[lineLastWordIndex].length + currentLineLength + 1;
            if (isLessOrEqualThanMax(oneMoreWordLineLength, maxLineLength)) {
                currentLineLength = oneMoreWordLineLength;
                lineLastWordIndex++;
            }
        }
        let line = "";
        for (let i = currentWordIndex; i < lineLastWordIndex; i++) {
            line += arrayOfWords[i] + " ";
        }
        returnText += line.trim() + "\n";
        currentWordIndex = lineLastWordIndex;
    }

    return returnText;
}

function isLessOrEqualThanMax(textLength, max) {
    return textLength <= max;

}

function justifyLine(line, maxLineLength) {

    if (typeof line != "string") {
        throw TypeError("Data should be a string.")
    }
    if (!Number.isInteger(maxLineLength) || maxLineLength <= 0) {
        throw TypeError("Length should be a positive integer.")
    }
    let currentLineLength = line.length;
    let arrayOfWords = line.split(" ");
    let currentWordIndex = 0;
    let lineLastWordIndex = arrayOfWords.length - 1;

    let difference = lineLastWordIndex - currentWordIndex;
    let spaces = (maxLineLength - currentLineLength) / difference;
    let remainder = (maxLineLength - currentLineLength) % difference;
    let justifiedLine = "";

    for (let i = currentWordIndex; i <= lineLastWordIndex; i++) {
        let word = arrayOfWords[i];
        justifiedLine += word;

        if (i < lineLastWordIndex) {
            let limit = spaces + ((i - currentWordIndex) < remainder ? 1 : 0);
            for (let j = 0; j <= limit; j++) {
                justifiedLine += " ";
            }
        }
    }
    return justifiedLine;
}

function writeOutput(filename, text) {
    fs.writeFile(filename, text, function (err) {
        if (err) {
            return console.error(err);
        }
    });
}

