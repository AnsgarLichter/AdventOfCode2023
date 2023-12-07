import { CubeConundrum } from "./cubeConundrum";
import { Parser } from "./parser";

if (Bun.argv.length <= 2) {
    throw Error("Please provide the version to use as and path to the data as an argument: \n bun run index.ts <path to data>");
}

const filePath = Bun.argv[2];

const cubeConundrum = new CubeConundrum(
    {
        redCubes: 12,
        greenCubes: 13,
        blueCubes: 14
    },
    new Parser()
);

const result = await cubeConundrum.calculateSum(filePath);
console.log(`The total sum is ${result}`);