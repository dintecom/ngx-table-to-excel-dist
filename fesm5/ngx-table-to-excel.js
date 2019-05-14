import { __spread } from 'tslib';
import saveAs from 'file-saver';
import ExcelJS from 'exceljs/dist/es5/exceljs.browser';
import { Injectable, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            var rows = __spread(htmlElement.getElementsByTagName("tr"));
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
                var tds = __spread(row.children);
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
    DomParserService.decorators = [
        { type: Injectable }
    ];
    return DomParserService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TableToExcelService = /** @class */ (function () {
    function TableToExcelService(parser) {
        this.parser = parser;
    }
    /**
     * @return {?}
     */
    TableToExcelService.prototype.initWorkBook = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var wb = new ExcelJS.Workbook();
        return wb;
    };
    /**
     * @param {?} wb
     * @param {?} sheetName
     * @return {?}
     */
    TableToExcelService.prototype.initSheet = /**
     * @param {?} wb
     * @param {?} sheetName
     * @return {?}
     */
    function (wb, sheetName) {
        /** @type {?} */
        var ws = wb.addWorksheet(sheetName);
        return ws;
    };
    /**
     * @param {?} wb
     * @param {?} fileName
     * @return {?}
     */
    TableToExcelService.prototype.save = /**
     * @param {?} wb
     * @param {?} fileName
     * @return {?}
     */
    function (wb, fileName) {
        wb.xlsx.writeBuffer().then((/**
         * @param {?} buffer
         * @return {?}
         */
        function (buffer) {
            saveAs(new Blob([buffer], { type: "application/octet-stream" }), fileName);
        }));
    };
    /**
     * @param {?} wb
     * @param {?} table
     * @param {?} opts
     * @return {?}
     */
    TableToExcelService.prototype.tableToSheet = /**
     * @param {?} wb
     * @param {?} table
     * @param {?} opts
     * @return {?}
     */
    function (wb, table, opts) {
        /** @type {?} */
        var ws = this.initSheet(wb, opts.sheet.name);
        ws = this.parser.parseDomToTable(ws, table, opts);
        return wb;
    };
    /**
     * @param {?} table
     * @param {?} opts
     * @return {?}
     */
    TableToExcelService.prototype.tableToBook = /**
     * @param {?} table
     * @param {?} opts
     * @return {?}
     */
    function (table, opts) {
        /** @type {?} */
        var wb = this.initWorkBook();
        wb = this.tableToSheet(wb, table, opts);
        return wb;
    };
    /**
     * @param {?} table
     * @param {?=} opts
     * @return {?}
     */
    TableToExcelService.prototype.convert = /**
     * @param {?} table
     * @param {?=} opts
     * @return {?}
     */
    function (table, opts) {
        if (opts === void 0) { opts = {}; }
        /** @type {?} */
        var defaultOpts = {
            name: "export.xlsx",
            autoStyle: false,
            sheet: {
                name: "Sheet 1"
            }
        };
        opts = Object.assign({}, defaultOpts, opts);
        /** @type {?} */
        var wb = this.tableToBook(table, opts);
        this.save(wb, opts.name);
    };
    TableToExcelService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TableToExcelService.ctorParameters = function () { return [
        { type: DomParserService }
    ]; };
    return TableToExcelService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxTableToExcelModule = /** @class */ (function () {
    function NgxTableToExcelModule() {
    }
    NgxTableToExcelModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        DomParserService,
                        TableToExcelService
                    ]
                },] }
    ];
    return NgxTableToExcelModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { DomParserService, TableToExcelService, NgxTableToExcelModule };

//# sourceMappingURL=ngx-table-to-excel.js.map