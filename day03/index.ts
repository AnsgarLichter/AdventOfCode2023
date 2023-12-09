import { GearRatios } from "./gearRatios";

if (Bun.argv.length <= 2) {
    throw Error("Please provide the version to use as and path to the data as an argument: \n bun run index.ts <path to data>");
}

const filePath = Bun.argv[2];

const gearRatios = new GearRatios();

const result = await gearRatios.calculateGearRatios(filePath);
console.log(`The total sum is ${result}`);