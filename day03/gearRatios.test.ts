import { test, expect } from 'bun:test';
import { GearRatios } from './gearRatios';

test('part 1 with example data', async () => {
    const testSubject = new GearRatios();

    const result = await testSubject.calculatePartNumbers(`${import.meta.dir}/data/examplePart01.txt`);

    expect(result).toEqual(925);
});

test('part 1 with data', async () => {
    const testSubject = new GearRatios();

    const result = await testSubject.calculatePartNumbers(`${import.meta.dir}/data/data.txt`);

    expect(result).toEqual(549908);
});

test('part 2 with example data', async () => {
    const testSubject = new GearRatios();

    const result = await testSubject.calculateGearRatios(`${import.meta.dir}/data/examplePart02.txt`);

    expect(result).toEqual(467835);
});

/* test('part 2 with data', async () => {
    const testSubject = new GearRatios();

    const result = await testSubject.calculateSum2(`${import.meta.dir}/data/data.txt`);

    expect(result).toEqual(549908);
}); */