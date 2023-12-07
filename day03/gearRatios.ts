export class GearRatios {
    public async calculateSum(path: string): Promise<number> {
        const input = await this.readFile(path);

        const rows = input.map(row => row.split(''));
        const height = rows.length;
        const width = rows[0].length;

        let total = 0;
        for (let y = 0; y < height; y++) {
            let x0: number | null = null;

            for (let x = 0; x < width; x++) {
                const char = rows[y][x];

                if (this.isNumber(char.toString()) && x0 == null) {
                    x0 = x;
                } else if (!this.isNumber(char.toString()) && x0 != null) {
                    if (this.hasAdjacentSymbol(rows, y, x0, x - 1)) {
                        console.log(Number(rows[y].slice(x0, x).join('')));
                        total += Number(rows[y].slice(x0, x).join(''));
                    }

                    x0 = null;
                }
            }

            if(x0 !== null) {
                if (this.hasAdjacentSymbol(rows, y, x0, width)) {
                    console.log(Number(rows[y].slice(x0, width).join('')));
                    total += Number(rows[y].slice(x0, width).join(''));
                }
            }
        }

        return total;
    }

    private async readFile(path: string): Promise<string[]> {
        const file = Bun.file(path);
        const content = await file.text();
        return content.split(`\n`);
    }

    private hasAdjacentSymbol(rows: String[][], rowNumber: number, startPosition: number, endPosition: number) {
        // Check row upwards
        const start = Math.max(startPosition - 1, 0);
        const end = Math.min(endPosition + 1, rows[rowNumber].length - 1);


        //Check upwards and below
        for (let i = start; i <= end; i++) {
            if (rowNumber > 0 && this.isSymbol(rows[rowNumber - 1][i])) {
                return true;
            }

            if (rowNumber < rows[rowNumber].length - 1 && this.isSymbol(rows[rowNumber + 1][i])) {
                return true;
            }
        }

        //Check current row
        if (this.isSymbol(rows[rowNumber][start]) || this.isSymbol(rows[rowNumber][end])) {
            return true;
        }
    }

    private isSymbol(char: String) {
        return !this.isNumber(char.toString()) && char !== '.';
    }

    private isNumber(string: string) {
        return !isNaN(Number.parseInt(string));
    }

}