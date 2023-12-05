import { Configuration } from './config';
import { Calibrator } from "./calibrator";
import { Parser } from "./parser";

if (Bun.argv.length <= 3) {
    throw Error("Please provide the version to use as and path to the data as an argument: \n bun run calibration.ts <1 or 2> <path to data>");
}

const configuration = new Configuration();
const version = Number.parseInt(Bun.argv[2]);
const filePath = Bun.argv[3];

const calibrator = new Calibrator(configuration.getParser(version));
const result = await calibrator.calculateSum(filePath);
console.log(`The total sum is ${result}`);