export type Coordinate = {
    x: number,
    y: number
}

export class GearRatios {
    public async calculatePartNumbers(path: string): Promise<number> {
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

            if (x0 !== null) {
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

    private isSymbol(char: String): boolean {
        return !this.isNumber(char.toString()) && char !== '.';
    }

    private isNumber(char: string): boolean {
        return !isNaN(Number.parseInt(char));
    }

    private isGearRatio(char: String): boolean {
        return char === "*";
    }

    public async calculateGearRatios(path: string) {
        const input = await this.readFile(path);

        const rows = input.map(row => row.split(''));
        const height = rows.length;
        const width = rows[0].length;

        const gearsWithTouches = new Map<Coordinate, number[]>();
        for (let y = 0; y < height; y++) {
            let x0: number | null = null;
            for (let x = 0; x < width; x++) {
                const char = rows[y][x];

                if (this.isNumber(char.toString()) && x0 == null) {
                    x0 = x;
                } else if (!this.isNumber(char.toString()) && x0 != null) {
                    const gearTouch = this.findAdjacentTouch(rows, y, x0, x - 1, this.isGearRatio);

                    if (gearTouch != null) {
                        const currentNumber = Number(rows[y].slice(x0, x).join(''));
                        console.log(`${currentNumber} has Gear Touch ${gearTouch.x}, ${gearTouch.y}`);
                        const numbersOfGear = gearsWithTouches.get(gearTouch);

                        numbersOfGear ? numbersOfGear.push(currentNumber) : gearsWithTouches.set(gearTouch, [currentNumber]);
                    }

                    x0 = null;
                }
            }

            if (x0 !== null) {
                const gearTouch = this.findAdjacentTouch(rows, y, x0, width, this.isGearRatio);

                if (gearTouch != null) {
                    const currentNumber = Number(rows[y].slice(x0, width).join(''));
                    console.log(`${currentNumber} has Gear Touch ${gearTouch}`);
                    const numbersOfGear = gearsWithTouches.get(gearTouch);

                    numbersOfGear ? numbersOfGear.push(currentNumber) : gearsWithTouches.set(gearTouch, [currentNumber]);
                }
            }
        }

        let total = 0;
        gearsWithTouches.forEach((value) => {
            if (value.length == 2) {
                total += (value[0] * value[1]);
            }
        });

        return total;
    }

    private findAdjacentTouch(rows: String[][], rowNumber: number, startPosition: number, endPosition: number, isTouch: (char: String) => boolean): Coordinate | null {
        const start = Math.max(startPosition - 1, 0);
        const end = Math.min(endPosition + 1, rows[rowNumber].length - 1);


        //Check upwards and below
        for (let i = start; i <= end; i++) {
            if (rowNumber > 0 && isTouch(rows[rowNumber - 1][i])) {
                return {
                    x: i,
                    y: rowNumber - 1
                };
            }

            if (rowNumber < rows[rowNumber].length - 1 && isTouch(rows[rowNumber + 1][i])) {
                return {
                    x: i,
                    y: rowNumber + 1
                };
            }
        }

        //Check current row
        if (isTouch(rows[rowNumber][start])) {
            return {
                x: start,
                y: rowNumber
            };
        }

        if (isTouch(rows[rowNumber][end])) {
            return {
                x: end,
                y: rowNumber
            };
        }

        return null;
    }

}