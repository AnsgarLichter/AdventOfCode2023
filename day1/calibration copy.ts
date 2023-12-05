import { Parser } from "./parser";

if (Bun.argv.length === 0) {
    throw Error("Please provide the path to the data as an argument!");
}

const parser = new Parser();
const file = Bun.file(Bun.argv[0]);
const content = await file.text();
const calibrationInput = content.split(`\n`);

const result = parser.solve(calibrationInput);
const sum: Number = result.reduce((accumulator, currentValue) => accumulator.valueOf() + currentValue.valueOf(), 0);
console.log(`The total sum is ${sum.valueOf()}`);