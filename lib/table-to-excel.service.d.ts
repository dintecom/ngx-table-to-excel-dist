import { DomParserService } from "./dom-parser.service";
export declare class TableToExcelService {
    private readonly parser;
    constructor(parser: DomParserService);
    initWorkBook(): any;
    initSheet(wb: any, sheetName: any): any;
    save(wb: any, fileName: any): void;
    tableToSheet(wb: any, table: any, opts: any): any;
    tableToBook(table: any, opts: any): any;
    convert(table: any, opts?: any): void;
}
