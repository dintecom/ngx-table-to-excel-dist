/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var DomParserService = /** @class */ (function () {
    function DomParserService() {
    }
    /**
     * Parse HTML table to excel worksheet
     * @param ws The worksheet object
     * @param table The table to be converted to excel sheet
     */
    /**
     * Parse HTML table to excel worksheet
     * @param {?} ws The worksheet object
     * @param {?} htmlElement
     * @param {?} opts
     * @return {?}
     */
    DomParserService.prototype.parseDomToTable = /**
     * Parse HTML table to excel worksheet
     * @param {?} ws The worksheet object
     * @param {?} htmlElement
     * @param {?} opts
     * @return {?}
     */
    function (ws, htmlElement, opts) {
        /** @type {?} */
        var _r;
        /** @type {?} */
        var _c;
        /** @type {?} */
        var cs;
        /** @type {?} */
        var rs;
        /** @type {?} */
        var r;
        /** @type {?} */
        var c;
        /** @type {?} */
        var tableObject = htmlElement.tagName === "TABLE";
        if (tableObject) {
            /** @type {?} */
            var rows = tslib_1.__spread(htmlElement.getElementsByTagName("tr"));
            /** @type {?} */
            var widths = htmlElement.getAttribute("data-cols-width");
            if (widths) {
                widths = widths.split(",").map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    return parseInt(item);
                }));
            }
            /** @type {?} */
            var merges = [];
            /** @type {?} */
            var wsRowCount = ws.rowCount;
            for (_r = 0; _r < rows.length; ++_r) {
                /** @type {?} */
                var row = rows[_r];
                r = wsRowCount + _r + 1; // Actual excel row number
                c = 1; // Actual excel col number
                if (row.getAttribute("data-exclude") === "true") {
                    rows.splice(_r, 1);
                    _r--;
                    continue;
                }
                if (row.getAttribute("data-height")) {
                    /** @type {?} */
                    var exRow = ws.getRow(r);
                    exRow.height = parseFloat(row.getAttribute("data-height"));
                }
                /** @type {?} */
                var tds = tslib_1.__spread(row.children);
                for (_c = 0; _c < tds.length; ++_c) {
                    /** @type {?} */
                    var td = tds[_c];
                    if (td.getAttribute("data-exclude") === "true") {
                        tds.splice(_c, 1);
                        _c--;
                        continue;
                    }
                    for (var _m = 0; _m < merges.length; ++_m) {
                        /** @type {?} */
                        var m = merges[_m];
                        if (m.s.c == c && m.s.r <= r && r <= m.e.r) {
                            c = m.e.c + 1;
                            _m = -1;
                        }
                    }
                    /** @type {?} */
                    var exCell = ws.getCell(this.getColumnAddress(c, r));
                    // calculate merges
                    cs = parseInt(td.getAttribute("colspan")) || 1;
                    rs = parseInt(td.getAttribute("rowspan")) || 1;
                    if (cs > 1 || rs > 1) {
                        merges.push({
                            s: { c: c, r: r },
                            e: { c: c + cs - 1, r: r + rs - 1 }
                        });
                    }
                    c += cs;
                    exCell.value = this.getValue(td, tableObject);
                    if (!opts.autoStyle) {
                        /** @type {?} */
                        var styles = this.getStylesDataAttr(td);
                        exCell.font = styles.font || null;
                        exCell.alignment = styles.alignment || null;
                        exCell.border = styles.border || null;
                        exCell.fill = styles.fill || null;
                        exCell.numFmt = styles.numFmt || null;
                        //Auto-detecting currency
                        if (exCell.numFmt == null && typeof exCell.value == "string") {
                            /** @type {?} */
                            var cellValueWithoutSpaces = exCell.value.replace(/ /g, '').replace(/\,/g, '');
                            /** @type {?} */
                            var regex = /^(\+|\-)?\$[0-9]+(\.[0-9]{1,2})?$/;
                            if (regex.test(cellValueWithoutSpaces)) {
                                exCell.value = exCell.value.replace(/[^0-9\+\-\.]/g, "");
                                exCell.value = Number(exCell.value);
                                exCell.numFmt = "$#,##0.00";
                            }
                        }
                    }
                }
            }
            //Setting column width
            if (widths) {
                widths.forEach((/**
                 * @param {?} width
                 * @param {?} _i
                 * @return {?}
                 */
                function (width, _i) {
                    ws.columns[_i].width = width;
                }));
            }
            this.applyMerges(ws, merges);
            return ws;
        }
        else {
            /** @type {?} */
            var widths = htmlElement.getAttribute("data-cols-width");
            if (widths) {
                widths = widths.split(",").map((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    return parseInt(item);
                }));
            }
            /** @type {?} */
            var merges = [];
            _r = 0;
            /** @type {?} */
            var row = htmlElement;
            r = ws.rowCount + _r + 1; // Actual excel row number
            c = 1; // Actual excel col number
            if (row.getAttribute("data-exclude") === "true") {
                return ws;
            }
            if (row.getAttribute("data-height")) {
                /** @type {?} */
                var exRow = ws.getRow(r);
                exRow.height = parseFloat(row.getAttribute("data-height"));
            }
            for (var _m = 0; _m < merges.length; ++_m) {
                /** @type {?} */
                var m = merges[_m];
                if (m.s.c == c && m.s.r <= r && r <= m.e.r) {
                    c = m.e.c + 1;
                    _m = -1;
                }
            }
            /** @type {?} */
            var exCell = ws.getCell(this.getColumnAddress(c, r));
            // calculate merges
            cs = parseInt(row.getAttribute("colspan")) || 1;
            rs = parseInt(row.getAttribute("rowspan")) || 1;
            if (cs > 1 || rs > 1) {
                merges.push({
                    s: { c: c, r: r },
                    e: { c: c + cs - 1, r: r + rs - 1 }
                });
            }
            c += cs;
            exCell.value = this.getValue(row, tableObject);
            if (!opts.autoStyle) {
                /** @type {?} */
                var styles = this.getStylesDataAttr(row);
                exCell.font = styles.font || null;
                exCell.alignment = styles.alignment || null;
                exCell.border = styles.border || null;
                exCell.fill = styles.fill || null;
                exCell.numFmt = styles.numFmt || null;
                //Auto-detecting currency
                if (exCell.numFmt == null && typeof exCell.value == "string") {
                    /** @type {?} */
                    var cellValueWithoutSpaces = exCell.value.replace(/ /g, '').replace(/\,/g, '');
                    /** @type {?} */
                    var regex = /^(\+|\-)?\$[0-9]+(\.[0-9]{1,2})?$/;
                    if (regex.test(cellValueWithoutSpaces)) {
                        exCell.value = exCell.value.replace(/[^0-9\+\-\.]/g, "");
                        exCell.value = Number(exCell.value);
                        exCell.numFmt = "$#,##0.00";
                    }
                }
            }
            //Setting column width
            if (widths)
                widths.forEach((/**
                 * @param {?} width
                 * @param {?} _i
                 * @return {?}
                 */
                function (width, _i) {
                    ws.columns[_i].width = width;
                }));
            this.applyMerges(ws, merges);
            return ws;
        }
    };
    ;
    /**
   * To apply merges on the sheet
   * @param ws The worksheet object
   * @param merges array of merges
   */
    /**
     * To apply merges on the sheet
     * @param {?} ws The worksheet object
     * @param {?} merges array of merges
     * @return {?}
     */
    DomParserService.prototype.applyMerges = /**
     * To apply merges on the sheet
     * @param {?} ws The worksheet object
     * @param {?} merges array of merges
     * @return {?}
     */
    function (ws, merges) {
        var _this = this;
        merges.forEach((/**
         * @param {?} m
         * @return {?}
         */
        function (m) {
            ws.mergeCells(_this.getExcelColumnName(m.s.c) +
                m.s.r +
                ":" +
                _this.getExcelColumnName(m.e.c) +
                m.e.r);
        }));
    };
    ;
    /**
   * Takes a positive integer and returns the corresponding column name.
   * @param num The positive integer to convert to a column name.
   * @return The column name.
   */
    /**
     * Takes a positive integer and returns the corresponding column name.
     * @param {?} num The positive integer to convert to a column name.
     * @return {?} The column name.
     */
    DomParserService.prototype.getExcelColumnName = /**
     * Takes a positive integer and returns the corresponding column name.
     * @param {?} num The positive integer to convert to a column name.
     * @return {?} The column name.
     */
    function (num) {
        for (var ret = "", a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
            ret = String.fromCharCode(Math.trunc((num % b) / a) + 65) + ret;
        }
        return ret;
    };
    ;
    /**
     * @param {?} col
     * @param {?} row
     * @return {?}
     */
    DomParserService.prototype.getColumnAddress = /**
     * @param {?} col
     * @param {?} row
     * @return {?}
     */
    function (col, row) {
        return this.getExcelColumnName(col) + row;
    };
    ;
    /**
   * Checks the data type specified and converts the value to it.
   */
    /**
     * Checks the data type specified and converts the value to it.
     * @param {?} td
     * @param {?} tableObject
     * @return {?}
     */
    DomParserService.prototype.getValue = /**
     * Checks the data type specified and converts the value to it.
     * @param {?} td
     * @param {?} tableObject
     * @return {?}
     */
    function (td, tableObject) {
        /** @type {?} */
        var dataType = td.getAttribute("data-t");
        /** @type {?} */
        var rawVal = tableObject ? this.htmldecode(td.innerHTML) : td.innerText;
        if (dataType) {
            /** @type {?} */
            var val = void 0;
            switch (dataType) {
                case "n": //number
                    rawVal = rawVal.replace(/[^0-9\+\-\.]/g, "");
                    val = Number(rawVal);
                    break;
                case "d": //date
                    val = new Date(rawVal);
                    break;
                case "b": //boolean
                    val =
                        rawVal.toLowerCase() === "true"
                            ? true
                            : rawVal.toLowerCase() === "false"
                                ? false
                                : Boolean(parseInt(rawVal));
                    break;
                default:
                    val = rawVal;
            }
            return val;
        }
        else if (td.getAttribute("data-hyperlink")) {
            return {
                text: rawVal,
                hyperlink: td.getAttribute("data-hyperlink")
            };
        }
        else if (td.getAttribute("data-error")) {
            return { error: td.getAttribute("data-error") };
        }
        return rawVal;
    };
    ;
    /**
   * Convert HTML to plain text
   */
    /**
     * Convert HTML to plain text
     * @param {?} str
     * @return {?}
     */
    DomParserService.prototype.htmldecode = /**
     * Convert HTML to plain text
     * @param {?} str
     * @return {?}
     */
    function (str) {
        /** @type {?} */
        var entities = [
            ["nbsp", " "],
            ["middot", "·"],
            ["quot", '"'],
            ["apos", "'"],
            ["gt", ">"],
            ["lt", "<"],
            ["amp", "&"]
        ].map((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return [new RegExp("&" + x[0] + ";", "g"), x[1]];
        }));
        /** @type {?} */
        var o = str
            .trim()
            .replace(/\s+/g, " ")
            .replace(/<\s*[bB][rR]\s*\/?>/g, "\n")
            .replace(/<[^>]*>/g, "");
        for (var i = 0; i < entities.length; ++i)
            o = o.replace(entities[i][0], entities[i][1]);
        return o;
    };
    ;
    /**
   * Convert computed colors to hex ARGB
   * @param computedColor Computed color string from getPropertyValue()
   */
    /**
     * Convert computed colors to hex ARGB
     * @param {?} computedColor Computed color string from getPropertyValue()
     * @return {?}
     */
    DomParserService.prototype.getHexArgbColor = /**
     * Convert computed colors to hex ARGB
     * @param {?} computedColor Computed color string from getPropertyValue()
     * @return {?}
     */
    function (computedColor) {
        //if RGB then convert to RGBA
        /** @type {?} */
        var computedColorStr = computedColor;
        if (computedColorStr.indexOf('a') == -1) {
            computedColorStr = computedColorStr.replace(')', ', 1)').replace('rgb', 'rgba');
        }
        /** @type {?} */
        var rgbaValues = computedColorStr.split("(")[1].split(")")[0].split(",");
        /** @type {?} */
        var r = (+rgbaValues[0]).toString(16);
        /** @type {?} */
        var g = (+rgbaValues[1]).toString(16);
        /** @type {?} */
        var b = (+rgbaValues[2]).toString(16);
        /** @type {?} */
        var a = Math.round(+rgbaValues[3] * 255).toString(16);
        if (a == '0') {
            return "";
        }
        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;
        // if (a.length == 1)
        //   a = "0" + a;
        return "F" + r.toUpperCase() + g.toUpperCase() + b.toUpperCase();
    };
    ;
    /**
   * Prepares the style object for a cell using the data attributes
   */
    /**
     * Prepares the style object for a cell using the data attributes
     * @param {?} td
     * @return {?}
     */
    DomParserService.prototype.getStylesDataAttr = /**
     * Prepares the style object for a cell using the data attributes
     * @param {?} td
     * @return {?}
     */
    function (td) {
        /** @type {?} */
        var cssComputedStyles = window.getComputedStyle(td, null);
        //Font attrs
        /** @type {?} */
        var font = {};
        if (td.getAttribute("data-f-name"))
            font.name = td.getAttribute("data-f-name");
        if (td.getAttribute("data-f-sz"))
            font.size = td.getAttribute("data-f-sz");
        if (td.getAttribute("data-f-color")) {
            if (td.getAttribute("data-f-color") != "none") {
                font.color = { argb: td.getAttribute("data-f-color") };
            }
        }
        else {
            //Set css color style by default
            /** @type {?} */
            var computedColor = cssComputedStyles.getPropertyValue("color");
            /** @type {?} */
            var convertedColor = this.getHexArgbColor(computedColor);
            if (convertedColor != "") {
                font.color = { argb: convertedColor };
            }
        }
        if (td.getAttribute("data-f-bold") === "true")
            font.bold = true;
        if (td.getAttribute("data-f-italic") === "true")
            font.italic = true;
        if (td.getAttribute("data-f-underline") === "true")
            font.underline = true;
        if (td.getAttribute("data-f-strike") === "true")
            font.strike = true;
        // Alignment attrs
        /** @type {?} */
        var alignment = {};
        if (td.getAttribute("data-a-h"))
            alignment.horizontal = td.getAttribute("data-a-h");
        if (td.getAttribute("data-a-v")) {
            alignment.vertical = td.getAttribute("data-a-v");
        }
        else {
            // By default
            alignment.vertical = "middle";
        }
        if (td.getAttribute("data-a-wrap") === "false") {
            alignment.wrapText = false;
        }
        else {
            // By default
            alignment.wrapText = true;
        }
        if (td.getAttribute("data-a-text-rotation"))
            alignment.textRotation = td.getAttribute("data-a-text-rotation");
        if (td.getAttribute("data-a-indent"))
            alignment.indent = td.getAttribute("data-a-indent");
        if (td.getAttribute("data-a-rtl") === "true")
            alignment.readingOrder = "rtl";
        // Border attrs
        /** @type {?} */
        var border = {
            top: {},
            left: {},
            bottom: {},
            right: {}
        };
        if (td.getAttribute("data-b-a-s")) {
            if (td.getAttribute("data-b-a-s") != "none") {
                /** @type {?} */
                var style = td.getAttribute("data-b-a-s");
                border.top.style = style;
                border.left.style = style;
                border.bottom.style = style;
                border.right.style = style;
            }
        }
        else {
            // By default
            border.top.style = "thin";
            border.left.style = "thin";
            border.bottom.style = "thin";
            border.right.style = "thin";
        }
        if (td.getAttribute("data-b-a-c")) {
            /** @type {?} */
            var color = { argb: td.getAttribute("data-b-a-c") };
            border.top.color = color;
            border.left.color = color;
            border.bottom.color = color;
            border.right.color = color;
        }
        if (td.getAttribute("data-b-t-s")) {
            border.top.style = td.getAttribute("data-b-t-s");
            if (td.getAttribute("data-b-t-c"))
                border.top.color = { argb: td.getAttribute("data-b-t-c") };
        }
        if (td.getAttribute("data-b-l-s")) {
            border.left.style = td.getAttribute("data-b-l-s");
            if (td.getAttribute("data-b-l-c"))
                border.left.color = { argb: td.getAttribute("data-b-t-c") };
        }
        if (td.getAttribute("data-b-b-s")) {
            border.bottom.style = td.getAttribute("data-b-b-s");
            if (td.getAttribute("data-b-b-c"))
                border.bottom.color = { argb: td.getAttribute("data-b-t-c") };
        }
        if (td.getAttribute("data-b-r-s")) {
            border.right.style = td.getAttribute("data-b-r-s");
            if (td.getAttribute("data-b-r-c"))
                border.right.color = { argb: td.getAttribute("data-b-t-c") };
        }
        //Fill
        /** @type {?} */
        var fill;
        if (td.getAttribute("data-fill-color")) {
            if (td.getAttribute("data-fill-color") != "none") {
                fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: td.getAttribute("data-fill-color") }
                };
            }
        }
        else {
            //Set css color style by default
            /** @type {?} */
            var computedBackgroundColor = cssComputedStyles.getPropertyValue("background-color");
            /** @type {?} */
            var convertedBackgroundColor = this.getHexArgbColor(computedBackgroundColor);
            if (convertedBackgroundColor != "") {
                fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: convertedBackgroundColor }
                };
            }
        }
        //number format
        /** @type {?} */
        var numFmt;
        if (td.getAttribute("data-num-fmt"))
            numFmt = td.getAttribute("data-num-fmt");
        return {
            font: font,
            alignment: alignment,
            border: border,
            fill: fill,
            numFmt: numFmt
        };
    };
    ;
    DomParserService.decorators = [
        { type: Injectable }
    ];
    return DomParserService;
}());
export { DomParserService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLXBhcnNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRhYmxlLXRvLWV4Y2VsLyIsInNvdXJjZXMiOlsibGliL2RvbS1wYXJzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0M7SUFBQTtJQTZhQSxDQUFDO0lBM2FHOzs7O09BSUc7Ozs7Ozs7O0lBQ0gsMENBQWU7Ozs7Ozs7SUFBZixVQUFnQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUk7O1lBQzdCLEVBQUU7O1lBQUUsRUFBRTs7WUFBRSxFQUFFOztZQUFFLEVBQUU7O1lBQUUsQ0FBQzs7WUFBRSxDQUFDOztZQUNwQixXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sS0FBSyxPQUFPO1FBQ2pELElBQUksV0FBVyxFQUFFOztnQkFDWCxJQUFJLG9CQUFPLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Z0JBQ2xELE1BQU0sR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDO1lBQ3hELElBQUksTUFBTSxFQUFFO2dCQUNWLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUc7Ozs7Z0JBQUMsVUFBVSxJQUFJO29CQUMzQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEIsQ0FBQyxFQUFDLENBQUM7YUFDSjs7Z0JBQ0csTUFBTSxHQUFHLEVBQUU7O2dCQUNYLFVBQVUsR0FBRyxFQUFFLENBQUMsUUFBUTtZQUM1QixLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUU7O29CQUMvQixHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQyxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENB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SSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUIsQ0FBQztZQUM1RSxJQUFJLHdCQUF3QixJQUFJLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxHQUFHO29CQUNMLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxPQUFPO29CQUNoQixPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUU7aUJBQzVDLENBQUM7YUFDSDtTQUNGOzs7WUFHRyxNQUFNO1FBQ1YsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQztZQUNqQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUzQyxPQUFPO1lBQ0wsSUFBSSxNQUFBO1lBQ0osU0FBUyxXQUFBO1lBQ1QsTUFBTSxRQUFBO1lBQ04sSUFBSSxNQUFBO1lBQ0osTUFBTSxRQUFBO1NBQ1AsQ0FBQztJQUNKLENBQUM7SUFBQSxDQUFDOztnQkE1YVAsVUFBVTs7SUE2YVgsdUJBQUM7Q0FBQSxBQTdhRCxJQTZhQztTQTVhWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEb21QYXJzZXJTZXJ2aWNlIHtcclxuICAgIC8qKlxyXG4gICAgICogUGFyc2UgSFRNTCB0YWJsZSB0byBleGNlbCB3b3Jrc2hlZXRcclxuICAgICAqIEBwYXJhbSB3cyBUaGUgd29ya3NoZWV0IG9iamVjdFxyXG4gICAgICogQHBhcmFtIHRhYmxlIFRoZSB0YWJsZSB0byBiZSBjb252ZXJ0ZWQgdG8gZXhjZWwgc2hlZXRcclxuICAgICAqL1xyXG4gICAgcGFyc2VEb21Ub1RhYmxlKHdzLCBodG1sRWxlbWVudCwgb3B0cykge1xyXG4gICAgICAgIGxldCBfciwgX2MsIGNzLCBycywgciwgYztcclxuICAgICAgICBsZXQgdGFibGVPYmplY3QgPSBodG1sRWxlbWVudC50YWdOYW1lID09PSBcIlRBQkxFXCI7XHJcbiAgICAgICAgaWYgKHRhYmxlT2JqZWN0KSB7XHJcbiAgICAgICAgICBsZXQgcm93cyA9IFsuLi5odG1sRWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRyXCIpXTtcclxuICAgICAgICAgIGxldCB3aWR0aHMgPSBodG1sRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbHMtd2lkdGhcIik7XHJcbiAgICAgICAgICBpZiAod2lkdGhzKSB7XHJcbiAgICAgICAgICAgIHdpZHRocyA9IHdpZHRocy5zcGxpdChcIixcIikubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGl0ZW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxldCBtZXJnZXMgPSBbXTtcclxuICAgICAgICAgIGxldCB3c1Jvd0NvdW50ID0gd3Mucm93Q291bnQ7XHJcbiAgICAgICAgICBmb3IgKF9yID0gMDsgX3IgPCByb3dzLmxlbmd0aDsgKytfcikge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gcm93c1tfcl07XHJcbiAgICAgICAgICAgIHIgPSB3c1Jvd0NvdW50ICsgX3IgKyAxOyAvLyBBY3R1YWwgZXhjZWwgcm93IG51bWJlclxyXG4gICAgICAgICAgICBjID0gMTsgLy8gQWN0dWFsIGV4Y2VsIGNvbCBudW1iZXJcclxuICAgICAgICAgICAgaWYgKHJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWV4Y2x1ZGVcIikgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgcm93cy5zcGxpY2UoX3IsIDEpO1xyXG4gICAgICAgICAgICAgIF9yLS07XHJcbiAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhlaWdodFwiKSkge1xyXG4gICAgICAgICAgICAgIGxldCBleFJvdyA9IHdzLmdldFJvdyhyKTtcclxuICAgICAgICAgICAgICBleFJvdy5oZWlnaHQgPSBwYXJzZUZsb2F0KHJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhlaWdodFwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBsZXQgdGRzID0gWy4uLnJvdy5jaGlsZHJlbl07XHJcbiAgICAgICAgICAgIGZvciAoX2MgPSAwOyBfYyA8IHRkcy5sZW5ndGg7ICsrX2MpIHtcclxuICAgICAgICAgICAgICBsZXQgdGQgPSB0ZHNbX2NdO1xyXG4gICAgICAgICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWV4Y2x1ZGVcIikgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0ZHMuc3BsaWNlKF9jLCAxKTtcclxuICAgICAgICAgICAgICAgIF9jLS07XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgX20gPSAwOyBfbSA8IG1lcmdlcy5sZW5ndGg7ICsrX20pIHtcclxuICAgICAgICAgICAgICAgIHZhciBtID0gbWVyZ2VzW19tXTtcclxuICAgICAgICAgICAgICAgIGlmIChtLnMuYyA9PSBjICYmIG0ucy5yIDw9IHIgJiYgciA8PSBtLmUucikge1xyXG4gICAgICAgICAgICAgICAgICBjID0gbS5lLmMgKyAxO1xyXG4gICAgICAgICAgICAgICAgICBfbSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBsZXQgZXhDZWxsID0gd3MuZ2V0Q2VsbCh0aGlzLmdldENvbHVtbkFkZHJlc3MoYywgcikpO1xyXG4gICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBtZXJnZXNcclxuICAgICAgICAgICAgICBjcyA9IHBhcnNlSW50KHRkLmdldEF0dHJpYnV0ZShcImNvbHNwYW5cIikpIHx8IDE7XHJcbiAgICAgICAgICAgICAgcnMgPSBwYXJzZUludCh0ZC5nZXRBdHRyaWJ1dGUoXCJyb3dzcGFuXCIpKSB8fCAxO1xyXG4gICAgICAgICAgICAgIGlmIChjcyA+IDEgfHwgcnMgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBtZXJnZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgIHM6IHsgYzogYywgcjogciB9LFxyXG4gICAgICAgICAgICAgICAgICBlOiB7IGM6IGMgKyBjcyAtIDEsIHI6IHIgKyBycyAtIDEgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGMgKz0gY3M7XHJcbiAgICAgICAgICAgICAgZXhDZWxsLnZhbHVlID0gdGhpcy5nZXRWYWx1ZSh0ZCwgdGFibGVPYmplY3QpO1xyXG4gICAgICAgICAgICAgIGlmICghb3B0cy5hdXRvU3R5bGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdHlsZXMgPSB0aGlzLmdldFN0eWxlc0RhdGFBdHRyKHRkKTtcclxuICAgICAgICAgICAgICAgIGV4Q2VsbC5mb250ID0gc3R5bGVzLmZvbnQgfHwgbnVsbDtcclxuICAgICAgICAgICAgICAgIGV4Q2VsbC5hbGlnbm1lbnQgPSBzdHlsZXMuYWxpZ25tZW50IHx8IG51bGw7XHJcbiAgICAgICAgICAgICAgICBleENlbGwuYm9yZGVyID0gc3R5bGVzLmJvcmRlciB8fCBudWxsO1xyXG4gICAgICAgICAgICAgICAgZXhDZWxsLmZpbGwgPSBzdHlsZXMuZmlsbCB8fCBudWxsO1xyXG4gICAgICAgICAgICAgICAgZXhDZWxsLm51bUZtdCA9IHN0eWxlcy5udW1GbXQgfHwgbnVsbDtcclxuICAgICAgICAgICAgICAgIC8vQXV0by1kZXRlY3RpbmcgY3VycmVuY3lcclxuICAgICAgICAgICAgICAgIGlmIChleENlbGwubnVtRm10ID09IG51bGwgJiYgdHlwZW9mIGV4Q2VsbC52YWx1ZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgIGxldCBjZWxsVmFsdWVXaXRob3V0U3BhY2VzID0gZXhDZWxsLnZhbHVlLnJlcGxhY2UoLyAvZywgJycpLnJlcGxhY2UoL1xcLC9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gL14oXFwrfFxcLSk/XFwkWzAtOV0rKFxcLlswLTldezEsMn0pPyQvO1xyXG4gICAgICAgICAgICAgICAgICBpZiAocmVnZXgudGVzdChjZWxsVmFsdWVXaXRob3V0U3BhY2VzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4Q2VsbC52YWx1ZSA9IGV4Q2VsbC52YWx1ZS5yZXBsYWNlKC9bXjAtOVxcK1xcLVxcLl0vZywgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICBleENlbGwudmFsdWUgPSBOdW1iZXIoZXhDZWxsLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBleENlbGwubnVtRm10ID0gXCIkIywjIzAuMDBcIjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy9TZXR0aW5nIGNvbHVtbiB3aWR0aFxyXG4gICAgICAgICAgaWYgKHdpZHRocykge1xyXG4gICAgICAgICAgICB3aWR0aHMuZm9yRWFjaCgod2lkdGgsIF9pKSA9PiB7XHJcbiAgICAgICAgICAgICAgd3MuY29sdW1uc1tfaV0ud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmFwcGx5TWVyZ2VzKHdzLCBtZXJnZXMpO1xyXG4gICAgICAgICAgcmV0dXJuIHdzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGxldCB3aWR0aHMgPSBodG1sRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbHMtd2lkdGhcIik7XHJcbiAgICAgICAgICBpZiAod2lkdGhzKSB7XHJcbiAgICAgICAgICAgIHdpZHRocyA9IHdpZHRocy5zcGxpdChcIixcIikubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGl0ZW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxldCBtZXJnZXMgPSBbXTtcclxuICAgICAgICAgIF9yID0gMDtcclxuICAgICAgICAgIGxldCByb3cgPSBodG1sRWxlbWVudDtcclxuICAgICAgICAgIHIgPSB3cy5yb3dDb3VudCArIF9yICsgMTsgLy8gQWN0dWFsIGV4Y2VsIHJvdyBudW1iZXJcclxuICAgICAgICAgIGMgPSAxOyAvLyBBY3R1YWwgZXhjZWwgY29sIG51bWJlclxyXG4gICAgICAgICAgaWYgKHJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWV4Y2x1ZGVcIikgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3cztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChyb3cuZ2V0QXR0cmlidXRlKFwiZGF0YS1oZWlnaHRcIikpIHtcclxuICAgICAgICAgICAgbGV0IGV4Um93ID0gd3MuZ2V0Um93KHIpO1xyXG4gICAgICAgICAgICBleFJvdy5oZWlnaHQgPSBwYXJzZUZsb2F0KHJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhlaWdodFwiKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgIGZvciAobGV0IF9tID0gMDsgX20gPCBtZXJnZXMubGVuZ3RoOyArK19tKSB7XHJcbiAgICAgICAgICAgIHZhciBtID0gbWVyZ2VzW19tXTtcclxuICAgICAgICAgICAgaWYgKG0ucy5jID09IGMgJiYgbS5zLnIgPD0gciAmJiByIDw9IG0uZS5yKSB7XHJcbiAgICAgICAgICAgICAgYyA9IG0uZS5jICsgMTtcclxuICAgICAgICAgICAgICBfbSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBsZXQgZXhDZWxsID0gd3MuZ2V0Q2VsbCh0aGlzLmdldENvbHVtbkFkZHJlc3MoYywgcikpO1xyXG4gICAgICAgICAgLy8gY2FsY3VsYXRlIG1lcmdlc1xyXG4gICAgICAgICAgY3MgPSBwYXJzZUludChyb3cuZ2V0QXR0cmlidXRlKFwiY29sc3BhblwiKSkgfHwgMTtcclxuICAgICAgICAgIHJzID0gcGFyc2VJbnQocm93LmdldEF0dHJpYnV0ZShcInJvd3NwYW5cIikpIHx8IDE7XHJcbiAgICAgICAgICBpZiAoY3MgPiAxIHx8IHJzID4gMSkge1xyXG4gICAgICAgICAgICBtZXJnZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgczogeyBjOiBjLCByOiByIH0sXHJcbiAgICAgICAgICAgICAgZTogeyBjOiBjICsgY3MgLSAxLCByOiByICsgcnMgLSAxIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjICs9IGNzO1xyXG4gICAgICAgICAgZXhDZWxsLnZhbHVlID0gdGhpcy5nZXRWYWx1ZShyb3csIHRhYmxlT2JqZWN0KTtcclxuICAgICAgICAgIGlmICghb3B0cy5hdXRvU3R5bGUpIHtcclxuICAgICAgICAgICAgbGV0IHN0eWxlcyA9IHRoaXMuZ2V0U3R5bGVzRGF0YUF0dHIocm93KTtcclxuICAgICAgICAgICAgZXhDZWxsLmZvbnQgPSBzdHlsZXMuZm9udCB8fCBudWxsO1xyXG4gICAgICAgICAgICBleENlbGwuYWxpZ25tZW50ID0gc3R5bGVzLmFsaWdubWVudCB8fCBudWxsO1xyXG4gICAgICAgICAgICBleENlbGwuYm9yZGVyID0gc3R5bGVzLmJvcmRlciB8fCBudWxsO1xyXG4gICAgICAgICAgICBleENlbGwuZmlsbCA9IHN0eWxlcy5maWxsIHx8IG51bGw7XHJcbiAgICAgICAgICAgIGV4Q2VsbC5udW1GbXQgPSBzdHlsZXMubnVtRm10IHx8IG51bGw7XHJcbiAgICAgICAgICAgIC8vQXV0by1kZXRlY3RpbmcgY3VycmVuY3lcclxuICAgICAgICAgICAgaWYgKGV4Q2VsbC5udW1GbXQgPT0gbnVsbCAmJiB0eXBlb2YgZXhDZWxsLnZhbHVlID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICBsZXQgY2VsbFZhbHVlV2l0aG91dFNwYWNlcyA9IGV4Q2VsbC52YWx1ZS5yZXBsYWNlKC8gL2csICcnKS5yZXBsYWNlKC9cXCwvZywgJycpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gL14oXFwrfFxcLSk/XFwkWzAtOV0rKFxcLlswLTldezEsMn0pPyQvO1xyXG4gICAgICAgICAgICAgIGlmIChyZWdleC50ZXN0KGNlbGxWYWx1ZVdpdGhvdXRTcGFjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBleENlbGwudmFsdWUgPSBleENlbGwudmFsdWUucmVwbGFjZSgvW14wLTlcXCtcXC1cXC5dL2csIFwiXCIpXHJcbiAgICAgICAgICAgICAgICBleENlbGwudmFsdWUgPSBOdW1iZXIoZXhDZWxsLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGV4Q2VsbC5udW1GbXQgPSBcIiQjLCMjMC4wMFwiO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy9TZXR0aW5nIGNvbHVtbiB3aWR0aFxyXG4gICAgICAgICAgaWYgKHdpZHRocylcclxuICAgICAgICAgICAgd2lkdGhzLmZvckVhY2goKHdpZHRoLCBfaSkgPT4ge1xyXG4gICAgICAgICAgICAgIHdzLmNvbHVtbnNbX2ldLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5hcHBseU1lcmdlcyh3cywgbWVyZ2VzKTtcclxuICAgICAgICAgIHJldHVybiB3cztcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvKipcclxuICAgICAqIFRvIGFwcGx5IG1lcmdlcyBvbiB0aGUgc2hlZXRcclxuICAgICAqIEBwYXJhbSB3cyBUaGUgd29ya3NoZWV0IG9iamVjdFxyXG4gICAgICogQHBhcmFtIG1lcmdlcyBhcnJheSBvZiBtZXJnZXNcclxuICAgICAqL1xyXG4gICAgYXBwbHlNZXJnZXMod3MsIG1lcmdlcykge1xyXG4gICAgICAgIG1lcmdlcy5mb3JFYWNoKG0gPT4ge1xyXG4gICAgICAgICAgd3MubWVyZ2VDZWxscyhcclxuICAgICAgICAgICAgdGhpcy5nZXRFeGNlbENvbHVtbk5hbWUobS5zLmMpICtcclxuICAgICAgICAgICAgbS5zLnIgK1xyXG4gICAgICAgICAgICBcIjpcIiArXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RXhjZWxDb2x1bW5OYW1lKG0uZS5jKSArXHJcbiAgICAgICAgICAgIG0uZS5yXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKiBUYWtlcyBhIHBvc2l0aXZlIGludGVnZXIgYW5kIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgY29sdW1uIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gbnVtIFRoZSBwb3NpdGl2ZSBpbnRlZ2VyIHRvIGNvbnZlcnQgdG8gYSBjb2x1bW4gbmFtZS5cclxuICAgICAqIEByZXR1cm4gVGhlIGNvbHVtbiBuYW1lLlxyXG4gICAgICovXHJcbiAgICBnZXRFeGNlbENvbHVtbk5hbWUobnVtOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGZvciAodmFyIHJldCA9IFwiXCIsIGEgPSAxLCBiID0gMjY7IChudW0gLT0gYSkgPj0gMDsgYSA9IGIsIGIgKj0gMjYpIHtcclxuICAgICAgICAgIHJldCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoTWF0aC50cnVuYygobnVtICUgYikgLyBhKSArIDY1KSArIHJldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgfTtcclxuICAgIFxyXG4gICAgICBnZXRDb2x1bW5BZGRyZXNzKGNvbCwgcm93KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RXhjZWxDb2x1bW5OYW1lKGNvbCkgKyByb3c7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvKipcclxuICAgICAqIENoZWNrcyB0aGUgZGF0YSB0eXBlIHNwZWNpZmllZCBhbmQgY29udmVydHMgdGhlIHZhbHVlIHRvIGl0LlxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZSh0ZCwgdGFibGVPYmplY3QpIHtcclxuICAgICAgICBsZXQgZGF0YVR5cGUgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRcIik7XHJcbiAgICAgICAgbGV0IHJhd1ZhbCA9IHRhYmxlT2JqZWN0ID8gdGhpcy5odG1sZGVjb2RlKHRkLmlubmVySFRNTCkgOiB0ZC5pbm5lclRleHQ7XHJcbiAgICAgICAgaWYgKGRhdGFUeXBlKSB7XHJcbiAgICAgICAgICBsZXQgdmFsO1xyXG4gICAgICAgICAgc3dpdGNoIChkYXRhVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiblwiOiAvL251bWJlclxyXG4gICAgICAgICAgICAgIHJhd1ZhbCA9IHJhd1ZhbC5yZXBsYWNlKC9bXjAtOVxcK1xcLVxcLl0vZywgXCJcIilcclxuICAgICAgICAgICAgICB2YWwgPSBOdW1iZXIocmF3VmFsKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRcIjogLy9kYXRlXHJcbiAgICAgICAgICAgICAgdmFsID0gbmV3IERhdGUocmF3VmFsKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJcIjogLy9ib29sZWFuXHJcbiAgICAgICAgICAgICAgdmFsID1cclxuICAgICAgICAgICAgICAgIHJhd1ZhbC50b0xvd2VyQ2FzZSgpID09PSBcInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICA/IHRydWVcclxuICAgICAgICAgICAgICAgICAgOiByYXdWYWwudG9Mb3dlckNhc2UoKSA9PT0gXCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgPyBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIDogQm9vbGVhbihwYXJzZUludChyYXdWYWwpKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICB2YWwgPSByYXdWYWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1oeXBlcmxpbmtcIikpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRleHQ6IHJhd1ZhbCxcclxuICAgICAgICAgICAgaHlwZXJsaW5rOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWh5cGVybGlua1wiKVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZXJyb3JcIikpIHtcclxuICAgICAgICAgIHJldHVybiB7IGVycm9yOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWVycm9yXCIpIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByYXdWYWw7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvKipcclxuICAgICAqIENvbnZlcnQgSFRNTCB0byBwbGFpbiB0ZXh0XHJcbiAgICAgKi9cclxuICAgIGh0bWxkZWNvZGUoc3RyKSB7XHJcbiAgICAgICAgbGV0IGVudGl0aWVzID0gW1xyXG4gICAgICAgICAgICBbXCJuYnNwXCIsIFwiIFwiXSxcclxuICAgICAgICAgICAgW1wibWlkZG90XCIsIFwiwrdcIl0sXHJcbiAgICAgICAgICAgIFtcInF1b3RcIiwgJ1wiJ10sXHJcbiAgICAgICAgICAgIFtcImFwb3NcIiwgXCInXCJdLFxyXG4gICAgICAgICAgICBbXCJndFwiLCBcIj5cIl0sXHJcbiAgICAgICAgICAgIFtcImx0XCIsIFwiPFwiXSxcclxuICAgICAgICAgICAgW1wiYW1wXCIsIFwiJlwiXVxyXG4gICAgICAgICAgXS5tYXAoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtuZXcgUmVnRXhwKFwiJlwiICsgeFswXSArIFwiO1wiLCBcImdcIiksIHhbMV1dO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBvID0gc3RyXHJcbiAgICAgICAgICAudHJpbSgpXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFxzKy9nLCBcIiBcIilcclxuICAgICAgICAgIC5yZXBsYWNlKC88XFxzKltiQl1bclJdXFxzKlxcLz8+L2csIFwiXFxuXCIpXHJcbiAgICAgICAgICAucmVwbGFjZSgvPFtePl0qPi9nLCBcIlwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgbyA9IG8ucmVwbGFjZShlbnRpdGllc1tpXVswXSwgZW50aXRpZXNbaV1bMV0pO1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IGNvbXB1dGVkIGNvbG9ycyB0byBoZXggQVJHQlxyXG4gICAgICogQHBhcmFtIGNvbXB1dGVkQ29sb3IgQ29tcHV0ZWQgY29sb3Igc3RyaW5nIGZyb20gZ2V0UHJvcGVydHlWYWx1ZSgpXHJcbiAgICAgKi9cclxuICAgIGdldEhleEFyZ2JDb2xvcihjb21wdXRlZENvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICAvL2lmIFJHQiB0aGVuIGNvbnZlcnQgdG8gUkdCQVxyXG4gICAgICAgIGxldCBjb21wdXRlZENvbG9yU3RyID0gY29tcHV0ZWRDb2xvcjtcclxuICAgICAgICBpZiAoY29tcHV0ZWRDb2xvclN0ci5pbmRleE9mKCdhJykgPT0gLTEpIHtcclxuICAgICAgICAgIGNvbXB1dGVkQ29sb3JTdHIgPSBjb21wdXRlZENvbG9yU3RyLnJlcGxhY2UoJyknLCAnLCAxKScpLnJlcGxhY2UoJ3JnYicsICdyZ2JhJyk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgbGV0IHJnYmFWYWx1ZXMgPSBjb21wdXRlZENvbG9yU3RyLnNwbGl0KFwiKFwiKVsxXS5zcGxpdChcIilcIilbMF0uc3BsaXQoXCIsXCIpO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IHIgPSAoK3JnYmFWYWx1ZXNbMF0pLnRvU3RyaW5nKDE2KSxcclxuICAgICAgICAgIGcgPSAoK3JnYmFWYWx1ZXNbMV0pLnRvU3RyaW5nKDE2KSxcclxuICAgICAgICAgIGIgPSAoK3JnYmFWYWx1ZXNbMl0pLnRvU3RyaW5nKDE2KSxcclxuICAgICAgICAgIGEgPSBNYXRoLnJvdW5kKCtyZ2JhVmFsdWVzWzNdICogMjU1KS50b1N0cmluZygxNik7XHJcbiAgICBcclxuICAgICAgICBpZiAoYSA9PSAnMCcpIHsgcmV0dXJuIFwiXCIgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKHIubGVuZ3RoID09IDEpXHJcbiAgICAgICAgICByID0gXCIwXCIgKyByO1xyXG4gICAgICAgIGlmIChnLmxlbmd0aCA9PSAxKVxyXG4gICAgICAgICAgZyA9IFwiMFwiICsgZztcclxuICAgICAgICBpZiAoYi5sZW5ndGggPT0gMSlcclxuICAgICAgICAgIGIgPSBcIjBcIiArIGI7XHJcbiAgICAgICAgLy8gaWYgKGEubGVuZ3RoID09IDEpXHJcbiAgICAgICAgLy8gICBhID0gXCIwXCIgKyBhO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIFwiRlwiICsgci50b1VwcGVyQ2FzZSgpICsgZy50b1VwcGVyQ2FzZSgpICsgYi50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKiBQcmVwYXJlcyB0aGUgc3R5bGUgb2JqZWN0IGZvciBhIGNlbGwgdXNpbmcgdGhlIGRhdGEgYXR0cmlidXRlc1xyXG4gICAgICovXHJcbiAgICBnZXRTdHlsZXNEYXRhQXR0cih0ZCkge1xyXG4gICAgICAgIGxldCBjc3NDb21wdXRlZFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRkLCBudWxsKTtcclxuICAgICAgICAvL0ZvbnQgYXR0cnNcclxuICAgICAgICBsZXQgZm9udDogYW55ID0ge307XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZi1uYW1lXCIpKVxyXG4gICAgICAgICAgZm9udC5uYW1lID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1mLW5hbWVcIik7XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZi1zelwiKSkgZm9udC5zaXplID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1mLXN6XCIpO1xyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWYtY29sb3JcIikpIHtcclxuICAgICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWYtY29sb3JcIikgIT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgZm9udC5jb2xvciA9IHsgYXJnYjogdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1mLWNvbG9yXCIpIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgLy9TZXQgY3NzIGNvbG9yIHN0eWxlIGJ5IGRlZmF1bHRcclxuICAgICAgICAgIGxldCBjb21wdXRlZENvbG9yID0gY3NzQ29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcImNvbG9yXCIpO1xyXG4gICAgICAgICAgbGV0IGNvbnZlcnRlZENvbG9yID0gdGhpcy5nZXRIZXhBcmdiQ29sb3IoY29tcHV0ZWRDb2xvcilcclxuICAgICAgICAgIGlmIChjb252ZXJ0ZWRDb2xvciAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGZvbnQuY29sb3IgPSB7IGFyZ2I6IGNvbnZlcnRlZENvbG9yIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWYtYm9sZFwiKSA9PT0gXCJ0cnVlXCIpIGZvbnQuYm9sZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZi1pdGFsaWNcIikgPT09IFwidHJ1ZVwiKSBmb250Lml0YWxpYyA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZi11bmRlcmxpbmVcIikgPT09IFwidHJ1ZVwiKSBmb250LnVuZGVybGluZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZi1zdHJpa2VcIikgPT09IFwidHJ1ZVwiKSBmb250LnN0cmlrZSA9IHRydWU7XHJcbiAgICBcclxuICAgICAgICAvLyBBbGlnbm1lbnQgYXR0cnNcclxuICAgICAgICBsZXQgYWxpZ25tZW50OiBhbnkgPSB7fTtcclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1hLWhcIikpXHJcbiAgICAgICAgICBhbGlnbm1lbnQuaG9yaXpvbnRhbCA9IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYS1oXCIpO1xyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWEtdlwiKSkge1xyXG4gICAgICAgICAgYWxpZ25tZW50LnZlcnRpY2FsID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1hLXZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgLy8gQnkgZGVmYXVsdFxyXG4gICAgICAgICAgYWxpZ25tZW50LnZlcnRpY2FsID0gXCJtaWRkbGVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYS13cmFwXCIpID09PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgIGFsaWdubWVudC53cmFwVGV4dCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIC8vIEJ5IGRlZmF1bHRcclxuICAgICAgICAgIGFsaWdubWVudC53cmFwVGV4dCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWEtdGV4dC1yb3RhdGlvblwiKSlcclxuICAgICAgICAgIGFsaWdubWVudC50ZXh0Um90YXRpb24gPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWEtdGV4dC1yb3RhdGlvblwiKTtcclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1hLWluZGVudFwiKSlcclxuICAgICAgICAgIGFsaWdubWVudC5pbmRlbnQgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWEtaW5kZW50XCIpO1xyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWEtcnRsXCIpID09PSBcInRydWVcIilcclxuICAgICAgICAgIGFsaWdubWVudC5yZWFkaW5nT3JkZXIgPSBcInJ0bFwiO1xyXG4gICAgXHJcbiAgICAgICAgLy8gQm9yZGVyIGF0dHJzXHJcbiAgICAgICAgbGV0IGJvcmRlcjogYW55ID0ge1xyXG4gICAgICAgICAgdG9wOiB7fSxcclxuICAgICAgICAgIGxlZnQ6IHt9LFxyXG4gICAgICAgICAgYm90dG9tOiB7fSxcclxuICAgICAgICAgIHJpZ2h0OiB7fVxyXG4gICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLWEtc1wiKSkge1xyXG4gICAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi1hLXNcIikgIT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgbGV0IHN0eWxlID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLWEtc1wiKTtcclxuICAgICAgICAgICAgYm9yZGVyLnRvcC5zdHlsZSA9IHN0eWxlO1xyXG4gICAgICAgICAgICBib3JkZXIubGVmdC5zdHlsZSA9IHN0eWxlO1xyXG4gICAgICAgICAgICBib3JkZXIuYm90dG9tLnN0eWxlID0gc3R5bGU7XHJcbiAgICAgICAgICAgIGJvcmRlci5yaWdodC5zdHlsZSA9IHN0eWxlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIC8vIEJ5IGRlZmF1bHRcclxuICAgICAgICAgIGJvcmRlci50b3Auc3R5bGUgPSBcInRoaW5cIjtcclxuICAgICAgICAgIGJvcmRlci5sZWZ0LnN0eWxlID0gXCJ0aGluXCI7XHJcbiAgICAgICAgICBib3JkZXIuYm90dG9tLnN0eWxlID0gXCJ0aGluXCI7XHJcbiAgICAgICAgICBib3JkZXIucmlnaHQuc3R5bGUgPSBcInRoaW5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi1hLWNcIikpIHtcclxuICAgICAgICAgIGxldCBjb2xvciA9IHsgYXJnYjogdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLWEtY1wiKSB9O1xyXG4gICAgICAgICAgYm9yZGVyLnRvcC5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgICAgYm9yZGVyLmxlZnQuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICAgIGJvcmRlci5ib3R0b20uY29sb3IgPSBjb2xvcjtcclxuICAgICAgICAgIGJvcmRlci5yaWdodC5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLXQtc1wiKSkge1xyXG4gICAgICAgICAgYm9yZGVyLnRvcC5zdHlsZSA9IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi10LXNcIik7XHJcbiAgICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLXQtY1wiKSlcclxuICAgICAgICAgICAgYm9yZGVyLnRvcC5jb2xvciA9IHsgYXJnYjogdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLXQtY1wiKSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLWwtc1wiKSkge1xyXG4gICAgICAgICAgYm9yZGVyLmxlZnQuc3R5bGUgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItbC1zXCIpO1xyXG4gICAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi1sLWNcIikpXHJcbiAgICAgICAgICAgIGJvcmRlci5sZWZ0LmNvbG9yID0geyBhcmdiOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItdC1jXCIpIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItYi1zXCIpKSB7XHJcbiAgICAgICAgICBib3JkZXIuYm90dG9tLnN0eWxlID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLWItc1wiKTtcclxuICAgICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItYi1jXCIpKVxyXG4gICAgICAgICAgICBib3JkZXIuYm90dG9tLmNvbG9yID0geyBhcmdiOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItdC1jXCIpIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItci1zXCIpKSB7XHJcbiAgICAgICAgICBib3JkZXIucmlnaHQuc3R5bGUgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItci1zXCIpO1xyXG4gICAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi1yLWNcIikpXHJcbiAgICAgICAgICAgIGJvcmRlci5yaWdodC5jb2xvciA9IHsgYXJnYjogdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLXQtY1wiKSB9O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8vRmlsbFxyXG4gICAgICAgIGxldCBmaWxsO1xyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpbGwtY29sb3JcIikpIHtcclxuICAgICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpbGwtY29sb3JcIikgIT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgZmlsbCA9IHtcclxuICAgICAgICAgICAgICB0eXBlOiBcInBhdHRlcm5cIixcclxuICAgICAgICAgICAgICBwYXR0ZXJuOiBcInNvbGlkXCIsXHJcbiAgICAgICAgICAgICAgZmdDb2xvcjogeyBhcmdiOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpbGwtY29sb3JcIikgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIC8vU2V0IGNzcyBjb2xvciBzdHlsZSBieSBkZWZhdWx0XHJcbiAgICAgICAgICBsZXQgY29tcHV0ZWRCYWNrZ3JvdW5kQ29sb3IgPSBjc3NDb21wdXRlZFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuICAgICAgICAgIGxldCBjb252ZXJ0ZWRCYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmdldEhleEFyZ2JDb2xvcihjb21wdXRlZEJhY2tncm91bmRDb2xvcilcclxuICAgICAgICAgIGlmIChjb252ZXJ0ZWRCYWNrZ3JvdW5kQ29sb3IgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBmaWxsID0ge1xyXG4gICAgICAgICAgICAgIHR5cGU6IFwicGF0dGVyblwiLFxyXG4gICAgICAgICAgICAgIHBhdHRlcm46IFwic29saWRcIixcclxuICAgICAgICAgICAgICBmZ0NvbG9yOiB7IGFyZ2I6IGNvbnZlcnRlZEJhY2tncm91bmRDb2xvciB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy9udW1iZXIgZm9ybWF0XHJcbiAgICAgICAgbGV0IG51bUZtdDtcclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1udW0tZm10XCIpKVxyXG4gICAgICAgICAgbnVtRm10ID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1udW0tZm10XCIpO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGZvbnQsXHJcbiAgICAgICAgICBhbGlnbm1lbnQsXHJcbiAgICAgICAgICBib3JkZXIsXHJcbiAgICAgICAgICBmaWxsLFxyXG4gICAgICAgICAgbnVtRm10XHJcbiAgICAgICAgfTtcclxuICAgICAgfTtcclxufVxyXG4iXX0=