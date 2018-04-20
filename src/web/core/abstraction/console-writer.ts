import { IConsoleWriter } from './console-writer.interface';

export class ConsoleWriter implements IConsoleWriter {
    write(obj: any, ...optionalParams: any[]) {
        console.log(obj, ...optionalParams);
    }
}