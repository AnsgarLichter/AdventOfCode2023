import { CalibrationRegex, Parser } from './parser';

export class Configuration {
    public getParser(version: number) {
        const calibrationRegex = version === 1 ? this.getRegexForPart01() : this.getRegexForPart02();

        return new Parser(calibrationRegex);
    }

    private getRegexForPart01(): CalibrationRegex {
        return {
            firstNumber: new RegExp(/(1|2|3|4|5|6|7|8|9).*/),
            lastNumber: new RegExp(/.*(1|2|3|4|5|6|7|8|9).*/)
        };
    }

    private getRegexForPart02(): CalibrationRegex {
        return {
            firstNumber: new RegExp(/(one|1|two|2|three|3|four|4|five|5|six|6|seven|7|eight|8|nine|9).*/),
            lastNumber: new RegExp(/.*(one|1|two|2|three|3|four|4|five|5|six|6|seven|7|eight|8|nine|9).*/)
        };
    }
}