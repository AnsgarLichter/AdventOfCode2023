export type Game = {
    id: number,
    redTotalCubes: number,
    greenTotalCubes: number,
    blueTotalCubes: number
}

export class Parser {
    public parse(input: String[]): Game[] {
        const games: Game[] = [];

        input.forEach(line => {
            const game = {
                id: 1,
                redTotalCubes: 1,
                greenTotalCubes: 1,
                blueTotalCubes: this.getBlueTotalCubes(line)
            }

            games.push(game);
        });
        
        return games;
    }

    private getBlueTotalCubes(line: String): number {
        const regex = new RegExp(/(?:\d* blue)+/g);
        const matches = regex.exec(line.toString());
        if (!matches || !matches.length) {
            console.log(`No matches found in ${line} for regex ${regex}`);
            return 0;
        }
        
        //TODO: Get numbers
        console.log(`Matches: ${matches.length}`);
        console.log(matches);

        return 0;   
    }
}