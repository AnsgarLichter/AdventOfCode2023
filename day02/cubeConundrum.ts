import { Game, Parser } from "./parser";

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
        const validGames = this.getValidGames(games);

        return validGames.reduce((accumulator: number, game) => accumulator + (game.id || 0), 0);
    }

    private async readFile(path: string): Promise<string[]> {
        const file = Bun.file(path);
        const content = await file.text();
        return content.split(`\n`);
    }

    private getValidGames(games: Game[]): Game[] {
        const isGameValid = (game: Game) => {
            const hasInvalidBlueDraw = !!game.blueDraws.find(draw => draw > this.settings.blueCubes);
            const hasInvalidGreenDraw = !!game.greenDraws.find(draw => draw > this.settings.greenCubes);
            const hasInvalidRedDraw = !!game.redDraws.find(draw => draw > this.settings.redCubes);

            return !(hasInvalidBlueDraw || hasInvalidGreenDraw || hasInvalidRedDraw);
        };

        return games.filter(isGameValid);
    }

    public async calculateSum2(path: string): Promise<number> {
        const input = await this.readFile(path);
        const games = this.parser.parse(input);
        const powerOfGames = this.getPowerOfGames(games);

        return powerOfGames.reduce((accumulator: number, power) => accumulator + power, 0);
    }

    private getPowerOfGames(games: Game[]): number[] {
        const mapToPower = (game: Game) => {
            const fewestRedCubes = Math.max(...game.redDraws);
            const fewestGreenCubes = Math.max(...game.greenDraws);
            const fewestBlueCubes = Math.max(...game.blueDraws);

            return fewestBlueCubes * fewestRedCubes * fewestGreenCubes;
        };

        return games.map(mapToPower);
    }
}