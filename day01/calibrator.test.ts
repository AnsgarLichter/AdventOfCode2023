import { test, expect } from 'bun:test';

import { Calibrator } from './calibrator';
import { Configuration } from './config';

const configuration = new Configuration();

test('part 1 with example data', async () => {
    const calibrator = new Calibrator(configuration.getParser(1));

    const result = await calibrator.calculateSum(`${import.meta.dir}/data/examplePart01.txt`);

    expect(result).toEqual(142);
});

test('part 1', async () => {
    const calibrator = new Calibrator(configuration.getParser(1));

    const result = await calibrator.calculateSum(`${import.meta.dir}/data/data.txt`);

    expect(result).toEqual(54644);
});

test('part 2 with example data', async () => {
    const calibrator = new Calibrator(configuration.getParser(2));

    const result = await calibrator.calculateSum(`${import.meta.dir}/data/examplePart02.txt`);

    expect(result).toEqual(281);
});

test('part 2', async () => {
    const calibrator = new Calibrator(configuration.getParser(2));

    const result = await calibrator.calculateSum(`${import.meta.dir}/data/data.txt`);

    expect(result).toEqual(53348);
});