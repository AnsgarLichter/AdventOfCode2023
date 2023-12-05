import { Configuration } from './config';
import { Parser } from "./parser";

export class Calibrator {
    constructor(private parser: Parser) {
        this.parser = parser;
    }

    public async calculateSum(path: string) {
        const input = await this.readFile(path);
        const numbers = this.parser.solve(input);

        return this.sum(numbers);
    }

    private async readFile(path: string): Promise<string[]> {
        const file = Bun.file(path);
        const content = await file.text();
        return content.split(`\n`);
    }

    private sum(numbers: Number[]): number {
        return numbers.reduce((accumulator: number, currentValue) => accumulator + currentValue.valueOf(), 0);
    }
}