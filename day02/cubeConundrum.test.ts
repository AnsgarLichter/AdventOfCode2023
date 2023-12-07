import { test, expect } from 'bun:test';
import { CubeConundrum } from './cubeConundrum';
import { Parser } from './parser';

test('part 1 with example data', async () => {
    const testSubject = new CubeConundrum(
        {
            redCubes: 12,
            greenCubes: 13,
            blueCubes: 14
        },
        new Parser()
    );

    const result = await testSubject.calculateSum(`${import.meta.dir}/data/examplePart01.txt`);

    expect(result).toEqual(8);
});