export declare class DomParserService {
    /**
     * Parse HTML table to excel worksheet
     * @param ws The worksheet object
     * @param table The table to be converted to excel sheet
     */
    parseDomToTable(ws: any, htmlElement: any, opts: any): any;
    /**
   * To apply merges on the sheet
   * @param ws The worksheet object
   * @param merges array of merges
   */
    applyMerges(ws: any, merges: any): void;
    /**
   * Takes a positive integer and returns the corresponding column name.
   * @param num The positive integer to convert to a column name.
   * @return The column name.
   */
    getExcelColumnName(num: number): string;
    getColumnAddress(col: any, row: any): string;
    /**
   * Checks the data type specified and converts the value to it.
   */
    getValue(td: any, tableObject: any): any;
    /**
   * Convert HTML to plain text
   */
    htmldecode(str: any): any;
    /**
   * Convert computed colors to hex ARGB
   * @param computedColor Computed color string from getPropertyValue()
   */
    getHexArgbColor(computedColor: string): string;
    /**
   * Prepares the style object for a cell using the data attributes
   */
    getStylesDataAttr(td: any): {
        font: any;
        alignment: any;
        border: any;
        fill: any;
        numFmt: any;
    };
}
