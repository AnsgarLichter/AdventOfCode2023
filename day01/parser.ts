export type CalibrationRegex = {
    firstNumber: RegExp
    lastNumber: RegExp
};

export class Parser {
    constructor(private calibrationRegex: CalibrationRegex) {
        this.calibrationRegex = calibrationRegex;
    }

    public solve(calibrationInput: String[]): Number[] {
        const result: Number[] = new Array();

        calibrationInput.forEach(line => {
            const lineAsString = line.toString();
            const firstNumber = this.getFirstNumber(lineAsString);
            const lastNumber = this.getLastNumber(lineAsString);

            if (!firstNumber || !lastNumber) {
                console.log(`Couldn't parse line ${lineAsString} correctly. Found first number ${firstNumber} and last number ${lastNumber}`);
            }

            const number = Number.parseInt(`${firstNumber}${lastNumber}`);
            result.push(number);
        });

        return result;
    }

    private getFirstNumber(line: string): Number | null {
        const result = this.getFirstGroupInMatch(this.calibrationRegex.firstNumber, line);

        return result ? this.parseStringToNumber(result) : null;
    }

    private getLastNumber(line: string): Number | null {
        const result = this.getFirstGroupInMatch(this.calibrationRegex.lastNumber, line);

        return result ? this.parseStringToNumber(result) : null;
    }

    private getFirstGroupInMatch(regex: RegExp, line: string): string | null {
        const matches = regex.exec(line);
        if (!matches || !matches.length) {
            console.log(`No matches found in ${line} for regex ${regex}`);
            return null;
        }

        return matches[1];
    }

    private parseStringToNumber(string: string) {
        const number = Number.parseInt(string);
        if (!isNaN(number)) {
            return number;
        }

        return this.mapNumberAsWordToNumber(string);
    }

    private mapNumberAsWordToNumber(numberAsWord: string) {
        const wordNumberMap: { [key: string]: number } = {
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'five': 5,
            'six': 6,
            'seven': 7,
            'eight': 8,
            'nine': 9
        };

        return wordNumberMap[numberAsWord.toLowerCase()];
    }
}