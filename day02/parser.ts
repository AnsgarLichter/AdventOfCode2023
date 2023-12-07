export type Game = {
    id: number | null,
    redDraws: number[],
    greenDraws: number[],
    blueDraws: number[]
}

export class Parser {
    private regexRed = new RegExp(/(?:(\d*) red)+/g);
    private regexGreen = new RegExp(/(?:(\d*) green)+/g);
    private regexBlue = new RegExp(/(?:(\d*) blue)+/g);

    public parse(input: String[]): Game[] {
        const games: Game[] = [];

        input.forEach(line => {
            const game = {
                id: this.getGameId(line),
                redDraws: this.getRedTotalCubes(line),
                greenDraws: this.getGreenTotalCubes(line),
                blueDraws: this.getBlueTotalCubes(line)
            }

            games.push(game);
        });

        return games;
    }

    private getGameId(line: String): number | null {
        const regex = new RegExp(/(?<=Game )\d+/);
        const matches = regex.exec(line.toString());
        if (!matches || matches.length !== 1) {
            return null;
        }

        return Number.parseInt(matches[0]);
    }

    private getBlueTotalCubes(line: String): number[] {
        return this.calculateTotalForColor(this.regexBlue, line);
    }

    private getRedTotalCubes(line: String): number[] {
        return this.calculateTotalForColor(this.regexRed, line);
    }

    private getGreenTotalCubes(line: String): number[] {
        return this.calculateTotalForColor(this.regexGreen, line);
    }

    private calculateTotalForColor(regex: RegExp, line: String): number[] {
        const matchesIterator = this.getMatchesForColor(regex, line);
        const draws: number[] = [];

        for (const [_, capturedGroup] of matchesIterator || []) {
            const count = Number.parseInt(capturedGroup);
            if (count) {
                draws.push(count);
            }
        }

        return draws;
    }

    private getMatchesForColor(regex: RegExp, line: String): IterableIterator<RegExpExecArray> {
        const matchesIterator = line.matchAll(regex);
        /* if (matchesIterator.next().done) {
            console.log(`No matches found in ${line} for regex ${regex}`);
        } */

        return matchesIterator;
    }
}