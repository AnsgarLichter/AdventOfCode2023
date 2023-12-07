import { Parser } from "./parser";

export type GameSettings = {
    redCubes: number,
    greenCubes: number,
    blueCubes: number
}

export class CubeConundrum {
    public constructor(private settings: GameSettings, private parser: Parser) {
        this.settings = settings;
        this.parser = parser;
    }

    public async calculateSum(path: string): Promise<number> {
        const input = await this.readFile(path);
        const games = this.parser.parse(input);

        return 0;
    }

    private async readFile(path: string): Promise<string[]> {
        const file = Bun.file(path);
        const content = await file.text();
        return content.split(`\n`);
    }
}