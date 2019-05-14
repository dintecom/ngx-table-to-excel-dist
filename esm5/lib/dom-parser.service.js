/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ DomParserService.ngInjectableDef = i0.defineInjectable({ factory: function DomParserService_Factory() { return new DomParserService(); }, token: DomParserService, providedIn: "root" });
    return DomParserService;
}());
export { DomParserService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLXBhcnNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRhYmxlLXRvLWV4Y2VsLyIsInNvdXJjZXMiOlsibGliL2RvbS1wYXJzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDO0lBQUE7S0ErYUM7SUEzYUc7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCwwQ0FBZTs7Ozs7OztJQUFmLFVBQWdCLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSTs7WUFDN0IsRUFBRTs7WUFBRSxFQUFFOztZQUFFLEVBQUU7O1lBQUUsRUFBRTs7WUFBRSxDQUFDOztZQUFFLENBQUM7O1lBQ3BCLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxLQUFLLE9BQU87UUFDakQsSUFBSSxXQUFXLEVBQUU7O2dCQUNYLElBQUksb0JBQU8sV0FBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDOztnQkFDbEQsTUFBTSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUM7WUFDeEQsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRzs7OztnQkFBQyxVQUFVLElBQUk7b0JBQzNDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixDQUFDLEVBQUMsQ0FBQzthQUNKOztnQkFDRyxNQUFNLEdBQUcsRUFBRTs7Z0JBQ1gsVUFBVSxHQUFHLEVBQUUsQ0FBQyxRQUFRO1lBQzVCLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRTs7b0JBQy9CLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNsQixDQUFDLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyww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QUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDO1lBQzVFLElBQUksd0JBQXdCLElBQUksRUFBRSxFQUFFO2dCQUNsQyxJQUFJLEdBQUc7b0JBQ0wsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLE9BQU87b0JBQ2hCLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRTtpQkFDNUMsQ0FBQzthQUNIO1NBQ0Y7OztZQUdHLE1BQU07UUFDVixJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDO1lBQ2pDLE1BQU0sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTNDLE9BQU87WUFDTCxJQUFJLE1BQUE7WUFDSixTQUFTLFdBQUE7WUFDVCxNQUFNLFFBQUE7WUFDTixJQUFJLE1BQUE7WUFDSixNQUFNLFFBQUE7U0FDUCxDQUFDO0lBQ0osQ0FBQztJQUFBLENBQUM7O2dCQTlhUCxVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzs7MkJBSkQ7Q0FpYkMsQUEvYUQsSUErYUM7U0E1YVksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEb21QYXJzZXJTZXJ2aWNlIHtcclxuICAgIC8qKlxyXG4gICAgICogUGFyc2UgSFRNTCB0YWJsZSB0byBleGNlbCB3b3Jrc2hlZXRcclxuICAgICAqIEBwYXJhbSB3cyBUaGUgd29ya3NoZWV0IG9iamVjdFxyXG4gICAgICogQHBhcmFtIHRhYmxlIFRoZSB0YWJsZSB0byBiZSBjb252ZXJ0ZWQgdG8gZXhjZWwgc2hlZXRcclxuICAgICAqL1xyXG4gICAgcGFyc2VEb21Ub1RhYmxlKHdzLCBodG1sRWxlbWVudCwgb3B0cykge1xyXG4gICAgICAgIGxldCBfciwgX2MsIGNzLCBycywgciwgYztcclxuICAgICAgICBsZXQgdGFibGVPYmplY3QgPSBodG1sRWxlbWVudC50YWdOYW1lID09PSBcIlRBQkxFXCI7XHJcbiAgICAgICAgaWYgKHRhYmxlT2JqZWN0KSB7XHJcbiAgICAgICAgICBsZXQgcm93cyA9IFsuLi5odG1sRWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRyXCIpXTtcclxuICAgICAgICAgIGxldCB3aWR0aHMgPSBodG1sRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbHMtd2lkdGhcIik7XHJcbiAgICAgICAgICBpZiAod2lkdGhzKSB7XHJcbiAgICAgICAgICAgIHdpZHRocyA9IHdpZHRocy5zcGxpdChcIixcIikubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGl0ZW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxldCBtZXJnZXMgPSBbXTtcclxuICAgICAgICAgIGxldCB3c1Jvd0NvdW50ID0gd3Mucm93Q291bnQ7XHJcbiAgICAgICAgICBmb3IgKF9yID0gMDsgX3IgPCByb3dzLmxlbmd0aDsgKytfcikge1xyXG4gICAgICAgICAgICBsZXQgcm93ID0gcm93c1tfcl07XHJcbiAgICAgICAgICAgIHIgPSB3c1Jvd0NvdW50ICsgX3IgKyAxOyAvLyBBY3R1YWwgZXhjZWwgcm93IG51bWJlclxyXG4gICAgICAgICAgICBjID0gMTsgLy8gQWN0dWFsIGV4Y2VsIGNvbCBudW1iZXJcclxuICAgICAgICAgICAgaWYgKHJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWV4Y2x1ZGVcIikgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgcm93cy5zcGxpY2UoX3IsIDEpO1xyXG4gICAgICAgICAgICAgIF9yLS07XHJcbiAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhlaWdodFwiKSkge1xyXG4gICAgICAgICAgICAgIGxldCBleFJvdyA9IHdzLmdldFJvdyhyKTtcclxuICAgICAgICAgICAgICBleFJvdy5oZWlnaHQgPSBwYXJzZUZsb2F0KHJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhlaWdodFwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBsZXQgdGRzID0gWy4uLnJvdy5jaGlsZHJlbl07XHJcbiAgICAgICAgICAgIGZvciAoX2MgPSAwOyBfYyA8IHRkcy5sZW5ndGg7ICsrX2MpIHtcclxuICAgICAgICAgICAgICBsZXQgdGQgPSB0ZHNbX2NdO1xyXG4gICAgICAgICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWV4Y2x1ZGVcIikgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0ZHMuc3BsaWNlKF9jLCAxKTtcclxuICAgICAgICAgICAgICAgIF9jLS07XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgZm9yIChsZXQgX20gPSAwOyBfbSA8IG1lcmdlcy5sZW5ndGg7ICsrX20pIHtcclxuICAgICAgICAgICAgICAgIHZhciBtID0gbWVyZ2VzW19tXTtcclxuICAgICAgICAgICAgICAgIGlmIChtLnMuYyA9PSBjICYmIG0ucy5yIDw9IHIgJiYgciA8PSBtLmUucikge1xyXG4gICAgICAgICAgICAgICAgICBjID0gbS5lLmMgKyAxO1xyXG4gICAgICAgICAgICAgICAgICBfbSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBsZXQgZXhDZWxsID0gd3MuZ2V0Q2VsbCh0aGlzLmdldENvbHVtbkFkZHJlc3MoYywgcikpO1xyXG4gICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBtZXJnZXNcclxuICAgICAgICAgICAgICBjcyA9IHBhcnNlSW50KHRkLmdldEF0dHJpYnV0ZShcImNvbHNwYW5cIikpIHx8IDE7XHJcbiAgICAgICAgICAgICAgcnMgPSBwYXJzZUludCh0ZC5nZXRBdHRyaWJ1dGUoXCJyb3dzcGFuXCIpKSB8fCAxO1xyXG4gICAgICAgICAgICAgIGlmIChjcyA+IDEgfHwgcnMgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBtZXJnZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgIHM6IHsgYzogYywgcjogciB9LFxyXG4gICAgICAgICAgICAgICAgICBlOiB7IGM6IGMgKyBjcyAtIDEsIHI6IHIgKyBycyAtIDEgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGMgKz0gY3M7XHJcbiAgICAgICAgICAgICAgZXhDZWxsLnZhbHVlID0gdGhpcy5nZXRWYWx1ZSh0ZCwgdGFibGVPYmplY3QpO1xyXG4gICAgICAgICAgICAgIGlmICghb3B0cy5hdXRvU3R5bGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzdHlsZXMgPSB0aGlzLmdldFN0eWxlc0RhdGFBdHRyKHRkKTtcclxuICAgICAgICAgICAgICAgIGV4Q2VsbC5mb250ID0gc3R5bGVzLmZvbnQgfHwgbnVsbDtcclxuICAgICAgICAgICAgICAgIGV4Q2VsbC5hbGlnbm1lbnQgPSBzdHlsZXMuYWxpZ25tZW50IHx8IG51bGw7XHJcbiAgICAgICAgICAgICAgICBleENlbGwuYm9yZGVyID0gc3R5bGVzLmJvcmRlciB8fCBudWxsO1xyXG4gICAgICAgICAgICAgICAgZXhDZWxsLmZpbGwgPSBzdHlsZXMuZmlsbCB8fCBudWxsO1xyXG4gICAgICAgICAgICAgICAgZXhDZWxsLm51bUZtdCA9IHN0eWxlcy5udW1GbXQgfHwgbnVsbDtcclxuICAgICAgICAgICAgICAgIC8vQXV0by1kZXRlY3RpbmcgY3VycmVuY3lcclxuICAgICAgICAgICAgICAgIGlmIChleENlbGwubnVtRm10ID09IG51bGwgJiYgdHlwZW9mIGV4Q2VsbC52YWx1ZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgIGxldCBjZWxsVmFsdWVXaXRob3V0U3BhY2VzID0gZXhDZWxsLnZhbHVlLnJlcGxhY2UoLyAvZywgJycpLnJlcGxhY2UoL1xcLC9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gL14oXFwrfFxcLSk/XFwkWzAtOV0rKFxcLlswLTldezEsMn0pPyQvO1xyXG4gICAgICAgICAgICAgICAgICBpZiAocmVnZXgudGVzdChjZWxsVmFsdWVXaXRob3V0U3BhY2VzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4Q2VsbC52YWx1ZSA9IGV4Q2VsbC52YWx1ZS5yZXBsYWNlKC9bXjAtOVxcK1xcLVxcLl0vZywgXCJcIilcclxuICAgICAgICAgICAgICAgICAgICBleENlbGwudmFsdWUgPSBOdW1iZXIoZXhDZWxsLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBleENlbGwubnVtRm10ID0gXCIkIywjIzAuMDBcIjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy9TZXR0aW5nIGNvbHVtbiB3aWR0aFxyXG4gICAgICAgICAgaWYgKHdpZHRocykge1xyXG4gICAgICAgICAgICB3aWR0aHMuZm9yRWFjaCgod2lkdGgsIF9pKSA9PiB7XHJcbiAgICAgICAgICAgICAgd3MuY29sdW1uc1tfaV0ud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmFwcGx5TWVyZ2VzKHdzLCBtZXJnZXMpO1xyXG4gICAgICAgICAgcmV0dXJuIHdzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGxldCB3aWR0aHMgPSBodG1sRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNvbHMtd2lkdGhcIik7XHJcbiAgICAgICAgICBpZiAod2lkdGhzKSB7XHJcbiAgICAgICAgICAgIHdpZHRocyA9IHdpZHRocy5zcGxpdChcIixcIikubWFwKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGl0ZW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxldCBtZXJnZXMgPSBbXTtcclxuICAgICAgICAgIF9yID0gMDtcclxuICAgICAgICAgIGxldCByb3cgPSBodG1sRWxlbWVudDtcclxuICAgICAgICAgIHIgPSB3cy5yb3dDb3VudCArIF9yICsgMTsgLy8gQWN0dWFsIGV4Y2VsIHJvdyBudW1iZXJcclxuICAgICAgICAgIGMgPSAxOyAvLyBBY3R1YWwgZXhjZWwgY29sIG51bWJlclxyXG4gICAgICAgICAgaWYgKHJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWV4Y2x1ZGVcIikgPT09IFwidHJ1ZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3cztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChyb3cuZ2V0QXR0cmlidXRlKFwiZGF0YS1oZWlnaHRcIikpIHtcclxuICAgICAgICAgICAgbGV0IGV4Um93ID0gd3MuZ2V0Um93KHIpO1xyXG4gICAgICAgICAgICBleFJvdy5oZWlnaHQgPSBwYXJzZUZsb2F0KHJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhlaWdodFwiKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgIGZvciAobGV0IF9tID0gMDsgX20gPCBtZXJnZXMubGVuZ3RoOyArK19tKSB7XHJcbiAgICAgICAgICAgIHZhciBtID0gbWVyZ2VzW19tXTtcclxuICAgICAgICAgICAgaWYgKG0ucy5jID09IGMgJiYgbS5zLnIgPD0gciAmJiByIDw9IG0uZS5yKSB7XHJcbiAgICAgICAgICAgICAgYyA9IG0uZS5jICsgMTtcclxuICAgICAgICAgICAgICBfbSA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBsZXQgZXhDZWxsID0gd3MuZ2V0Q2VsbCh0aGlzLmdldENvbHVtbkFkZHJlc3MoYywgcikpO1xyXG4gICAgICAgICAgLy8gY2FsY3VsYXRlIG1lcmdlc1xyXG4gICAgICAgICAgY3MgPSBwYXJzZUludChyb3cuZ2V0QXR0cmlidXRlKFwiY29sc3BhblwiKSkgfHwgMTtcclxuICAgICAgICAgIHJzID0gcGFyc2VJbnQocm93LmdldEF0dHJpYnV0ZShcInJvd3NwYW5cIikpIHx8IDE7XHJcbiAgICAgICAgICBpZiAoY3MgPiAxIHx8IHJzID4gMSkge1xyXG4gICAgICAgICAgICBtZXJnZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgczogeyBjOiBjLCByOiByIH0sXHJcbiAgICAgICAgICAgICAgZTogeyBjOiBjICsgY3MgLSAxLCByOiByICsgcnMgLSAxIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjICs9IGNzO1xyXG4gICAgICAgICAgZXhDZWxsLnZhbHVlID0gdGhpcy5nZXRWYWx1ZShyb3csIHRhYmxlT2JqZWN0KTtcclxuICAgICAgICAgIGlmICghb3B0cy5hdXRvU3R5bGUpIHtcclxuICAgICAgICAgICAgbGV0IHN0eWxlcyA9IHRoaXMuZ2V0U3R5bGVzRGF0YUF0dHIocm93KTtcclxuICAgICAgICAgICAgZXhDZWxsLmZvbnQgPSBzdHlsZXMuZm9udCB8fCBudWxsO1xyXG4gICAgICAgICAgICBleENlbGwuYWxpZ25tZW50ID0gc3R5bGVzLmFsaWdubWVudCB8fCBudWxsO1xyXG4gICAgICAgICAgICBleENlbGwuYm9yZGVyID0gc3R5bGVzLmJvcmRlciB8fCBudWxsO1xyXG4gICAgICAgICAgICBleENlbGwuZmlsbCA9IHN0eWxlcy5maWxsIHx8IG51bGw7XHJcbiAgICAgICAgICAgIGV4Q2VsbC5udW1GbXQgPSBzdHlsZXMubnVtRm10IHx8IG51bGw7XHJcbiAgICAgICAgICAgIC8vQXV0by1kZXRlY3RpbmcgY3VycmVuY3lcclxuICAgICAgICAgICAgaWYgKGV4Q2VsbC5udW1GbXQgPT0gbnVsbCAmJiB0eXBlb2YgZXhDZWxsLnZhbHVlID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICBsZXQgY2VsbFZhbHVlV2l0aG91dFNwYWNlcyA9IGV4Q2VsbC52YWx1ZS5yZXBsYWNlKC8gL2csICcnKS5yZXBsYWNlKC9cXCwvZywgJycpO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHJlZ2V4ID0gL14oXFwrfFxcLSk/XFwkWzAtOV0rKFxcLlswLTldezEsMn0pPyQvO1xyXG4gICAgICAgICAgICAgIGlmIChyZWdleC50ZXN0KGNlbGxWYWx1ZVdpdGhvdXRTcGFjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBleENlbGwudmFsdWUgPSBleENlbGwudmFsdWUucmVwbGFjZSgvW14wLTlcXCtcXC1cXC5dL2csIFwiXCIpXHJcbiAgICAgICAgICAgICAgICBleENlbGwudmFsdWUgPSBOdW1iZXIoZXhDZWxsLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGV4Q2VsbC5udW1GbXQgPSBcIiQjLCMjMC4wMFwiO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy9TZXR0aW5nIGNvbHVtbiB3aWR0aFxyXG4gICAgICAgICAgaWYgKHdpZHRocylcclxuICAgICAgICAgICAgd2lkdGhzLmZvckVhY2goKHdpZHRoLCBfaSkgPT4ge1xyXG4gICAgICAgICAgICAgIHdzLmNvbHVtbnNbX2ldLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhpcy5hcHBseU1lcmdlcyh3cywgbWVyZ2VzKTtcclxuICAgICAgICAgIHJldHVybiB3cztcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvKipcclxuICAgICAqIFRvIGFwcGx5IG1lcmdlcyBvbiB0aGUgc2hlZXRcclxuICAgICAqIEBwYXJhbSB3cyBUaGUgd29ya3NoZWV0IG9iamVjdFxyXG4gICAgICogQHBhcmFtIG1lcmdlcyBhcnJheSBvZiBtZXJnZXNcclxuICAgICAqL1xyXG4gICAgYXBwbHlNZXJnZXMod3MsIG1lcmdlcykge1xyXG4gICAgICAgIG1lcmdlcy5mb3JFYWNoKG0gPT4ge1xyXG4gICAgICAgICAgd3MubWVyZ2VDZWxscyhcclxuICAgICAgICAgICAgdGhpcy5nZXRFeGNlbENvbHVtbk5hbWUobS5zLmMpICtcclxuICAgICAgICAgICAgbS5zLnIgK1xyXG4gICAgICAgICAgICBcIjpcIiArXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RXhjZWxDb2x1bW5OYW1lKG0uZS5jKSArXHJcbiAgICAgICAgICAgIG0uZS5yXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKiBUYWtlcyBhIHBvc2l0aXZlIGludGVnZXIgYW5kIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgY29sdW1uIG5hbWUuXHJcbiAgICAgKiBAcGFyYW0gbnVtIFRoZSBwb3NpdGl2ZSBpbnRlZ2VyIHRvIGNvbnZlcnQgdG8gYSBjb2x1bW4gbmFtZS5cclxuICAgICAqIEByZXR1cm4gVGhlIGNvbHVtbiBuYW1lLlxyXG4gICAgICovXHJcbiAgICBnZXRFeGNlbENvbHVtbk5hbWUobnVtOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGZvciAodmFyIHJldCA9IFwiXCIsIGEgPSAxLCBiID0gMjY7IChudW0gLT0gYSkgPj0gMDsgYSA9IGIsIGIgKj0gMjYpIHtcclxuICAgICAgICAgIHJldCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoTWF0aC50cnVuYygobnVtICUgYikgLyBhKSArIDY1KSArIHJldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgfTtcclxuICAgIFxyXG4gICAgICBnZXRDb2x1bW5BZGRyZXNzKGNvbCwgcm93KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RXhjZWxDb2x1bW5OYW1lKGNvbCkgKyByb3c7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvKipcclxuICAgICAqIENoZWNrcyB0aGUgZGF0YSB0eXBlIHNwZWNpZmllZCBhbmQgY29udmVydHMgdGhlIHZhbHVlIHRvIGl0LlxyXG4gICAgICovXHJcbiAgICBnZXRWYWx1ZSh0ZCwgdGFibGVPYmplY3QpIHtcclxuICAgICAgICBsZXQgZGF0YVR5cGUgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRcIik7XHJcbiAgICAgICAgbGV0IHJhd1ZhbCA9IHRhYmxlT2JqZWN0ID8gdGhpcy5odG1sZGVjb2RlKHRkLmlubmVySFRNTCkgOiB0ZC5pbm5lclRleHQ7XHJcbiAgICAgICAgaWYgKGRhdGFUeXBlKSB7XHJcbiAgICAgICAgICBsZXQgdmFsO1xyXG4gICAgICAgICAgc3dpdGNoIChkYXRhVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiblwiOiAvL251bWJlclxyXG4gICAgICAgICAgICAgIHJhd1ZhbCA9IHJhd1ZhbC5yZXBsYWNlKC9bXjAtOVxcK1xcLVxcLl0vZywgXCJcIilcclxuICAgICAgICAgICAgICB2YWwgPSBOdW1iZXIocmF3VmFsKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImRcIjogLy9kYXRlXHJcbiAgICAgICAgICAgICAgdmFsID0gbmV3IERhdGUocmF3VmFsKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJcIjogLy9ib29sZWFuXHJcbiAgICAgICAgICAgICAgdmFsID1cclxuICAgICAgICAgICAgICAgIHJhd1ZhbC50b0xvd2VyQ2FzZSgpID09PSBcInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICA/IHRydWVcclxuICAgICAgICAgICAgICAgICAgOiByYXdWYWwudG9Mb3dlckNhc2UoKSA9PT0gXCJmYWxzZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgPyBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIDogQm9vbGVhbihwYXJzZUludChyYXdWYWwpKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICB2YWwgPSByYXdWYWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1oeXBlcmxpbmtcIikpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRleHQ6IHJhd1ZhbCxcclxuICAgICAgICAgICAgaHlwZXJsaW5rOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWh5cGVybGlua1wiKVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZXJyb3JcIikpIHtcclxuICAgICAgICAgIHJldHVybiB7IGVycm9yOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWVycm9yXCIpIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByYXdWYWw7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvKipcclxuICAgICAqIENvbnZlcnQgSFRNTCB0byBwbGFpbiB0ZXh0XHJcbiAgICAgKi9cclxuICAgIGh0bWxkZWNvZGUoc3RyKSB7XHJcbiAgICAgICAgbGV0IGVudGl0aWVzID0gW1xyXG4gICAgICAgICAgICBbXCJuYnNwXCIsIFwiIFwiXSxcclxuICAgICAgICAgICAgW1wibWlkZG90XCIsIFwiwrdcIl0sXHJcbiAgICAgICAgICAgIFtcInF1b3RcIiwgJ1wiJ10sXHJcbiAgICAgICAgICAgIFtcImFwb3NcIiwgXCInXCJdLFxyXG4gICAgICAgICAgICBbXCJndFwiLCBcIj5cIl0sXHJcbiAgICAgICAgICAgIFtcImx0XCIsIFwiPFwiXSxcclxuICAgICAgICAgICAgW1wiYW1wXCIsIFwiJlwiXVxyXG4gICAgICAgICAgXS5tYXAoZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtuZXcgUmVnRXhwKFwiJlwiICsgeFswXSArIFwiO1wiLCBcImdcIiksIHhbMV1dO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBvID0gc3RyXHJcbiAgICAgICAgICAudHJpbSgpXHJcbiAgICAgICAgICAucmVwbGFjZSgvXFxzKy9nLCBcIiBcIilcclxuICAgICAgICAgIC5yZXBsYWNlKC88XFxzKltiQl1bclJdXFxzKlxcLz8+L2csIFwiXFxuXCIpXHJcbiAgICAgICAgICAucmVwbGFjZSgvPFtePl0qPi9nLCBcIlwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgKytpKVxyXG4gICAgICAgICAgbyA9IG8ucmVwbGFjZShlbnRpdGllc1tpXVswXSwgZW50aXRpZXNbaV1bMV0pO1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKiBDb252ZXJ0IGNvbXB1dGVkIGNvbG9ycyB0byBoZXggQVJHQlxyXG4gICAgICogQHBhcmFtIGNvbXB1dGVkQ29sb3IgQ29tcHV0ZWQgY29sb3Igc3RyaW5nIGZyb20gZ2V0UHJvcGVydHlWYWx1ZSgpXHJcbiAgICAgKi9cclxuICAgIGdldEhleEFyZ2JDb2xvcihjb21wdXRlZENvbG9yOiBzdHJpbmcpIHtcclxuICAgICAgICAvL2lmIFJHQiB0aGVuIGNvbnZlcnQgdG8gUkdCQVxyXG4gICAgICAgIGxldCBjb21wdXRlZENvbG9yU3RyID0gY29tcHV0ZWRDb2xvcjtcclxuICAgICAgICBpZiAoY29tcHV0ZWRDb2xvclN0ci5pbmRleE9mKCdhJykgPT0gLTEpIHtcclxuICAgICAgICAgIGNvbXB1dGVkQ29sb3JTdHIgPSBjb21wdXRlZENvbG9yU3RyLnJlcGxhY2UoJyknLCAnLCAxKScpLnJlcGxhY2UoJ3JnYicsICdyZ2JhJyk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgbGV0IHJnYmFWYWx1ZXMgPSBjb21wdXRlZENvbG9yU3RyLnNwbGl0KFwiKFwiKVsxXS5zcGxpdChcIilcIilbMF0uc3BsaXQoXCIsXCIpO1xyXG4gICAgXHJcbiAgICAgICAgbGV0IHIgPSAoK3JnYmFWYWx1ZXNbMF0pLnRvU3RyaW5nKDE2KSxcclxuICAgICAgICAgIGcgPSAoK3JnYmFWYWx1ZXNbMV0pLnRvU3RyaW5nKDE2KSxcclxuICAgICAgICAgIGIgPSAoK3JnYmFWYWx1ZXNbMl0pLnRvU3RyaW5nKDE2KSxcclxuICAgICAgICAgIGEgPSBNYXRoLnJvdW5kKCtyZ2JhVmFsdWVzWzNdICogMjU1KS50b1N0cmluZygxNik7XHJcbiAgICBcclxuICAgICAgICBpZiAoYSA9PSAnMCcpIHsgcmV0dXJuIFwiXCIgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKHIubGVuZ3RoID09IDEpXHJcbiAgICAgICAgICByID0gXCIwXCIgKyByO1xyXG4gICAgICAgIGlmIChnLmxlbmd0aCA9PSAxKVxyXG4gICAgICAgICAgZyA9IFwiMFwiICsgZztcclxuICAgICAgICBpZiAoYi5sZW5ndGggPT0gMSlcclxuICAgICAgICAgIGIgPSBcIjBcIiArIGI7XHJcbiAgICAgICAgLy8gaWYgKGEubGVuZ3RoID09IDEpXHJcbiAgICAgICAgLy8gICBhID0gXCIwXCIgKyBhO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIFwiRlwiICsgci50b1VwcGVyQ2FzZSgpICsgZy50b1VwcGVyQ2FzZSgpICsgYi50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgKiBQcmVwYXJlcyB0aGUgc3R5bGUgb2JqZWN0IGZvciBhIGNlbGwgdXNpbmcgdGhlIGRhdGEgYXR0cmlidXRlc1xyXG4gICAgICovXHJcbiAgICBnZXRTdHlsZXNEYXRhQXR0cih0ZCkge1xyXG4gICAgICAgIGxldCBjc3NDb21wdXRlZFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRkLCBudWxsKTtcclxuICAgICAgICAvL0ZvbnQgYXR0cnNcclxuICAgICAgICBsZXQgZm9udDogYW55ID0ge307XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZi1uYW1lXCIpKVxyXG4gICAgICAgICAgZm9udC5uYW1lID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1mLW5hbWVcIik7XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZi1zelwiKSkgZm9udC5zaXplID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1mLXN6XCIpO1xyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWYtY29sb3JcIikpIHtcclxuICAgICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWYtY29sb3JcIikgIT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgZm9udC5jb2xvciA9IHsgYXJnYjogdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1mLWNvbG9yXCIpIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgLy9TZXQgY3NzIGNvbG9yIHN0eWxlIGJ5IGRlZmF1bHRcclxuICAgICAgICAgIGxldCBjb21wdXRlZENvbG9yID0gY3NzQ29tcHV0ZWRTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZShcImNvbG9yXCIpO1xyXG4gICAgICAgICAgbGV0IGNvbnZlcnRlZENvbG9yID0gdGhpcy5nZXRIZXhBcmdiQ29sb3IoY29tcHV0ZWRDb2xvcilcclxuICAgICAgICAgIGlmIChjb252ZXJ0ZWRDb2xvciAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGZvbnQuY29sb3IgPSB7IGFyZ2I6IGNvbnZlcnRlZENvbG9yIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWYtYm9sZFwiKSA9PT0gXCJ0cnVlXCIpIGZvbnQuYm9sZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZi1pdGFsaWNcIikgPT09IFwidHJ1ZVwiKSBmb250Lml0YWxpYyA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZi11bmRlcmxpbmVcIikgPT09IFwidHJ1ZVwiKSBmb250LnVuZGVybGluZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZi1zdHJpa2VcIikgPT09IFwidHJ1ZVwiKSBmb250LnN0cmlrZSA9IHRydWU7XHJcbiAgICBcclxuICAgICAgICAvLyBBbGlnbm1lbnQgYXR0cnNcclxuICAgICAgICBsZXQgYWxpZ25tZW50OiBhbnkgPSB7fTtcclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1hLWhcIikpXHJcbiAgICAgICAgICBhbGlnbm1lbnQuaG9yaXpvbnRhbCA9IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYS1oXCIpO1xyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWEtdlwiKSkge1xyXG4gICAgICAgICAgYWxpZ25tZW50LnZlcnRpY2FsID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1hLXZcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgLy8gQnkgZGVmYXVsdFxyXG4gICAgICAgICAgYWxpZ25tZW50LnZlcnRpY2FsID0gXCJtaWRkbGVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYS13cmFwXCIpID09PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgIGFsaWdubWVudC53cmFwVGV4dCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIC8vIEJ5IGRlZmF1bHRcclxuICAgICAgICAgIGFsaWdubWVudC53cmFwVGV4dCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWEtdGV4dC1yb3RhdGlvblwiKSlcclxuICAgICAgICAgIGFsaWdubWVudC50ZXh0Um90YXRpb24gPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWEtdGV4dC1yb3RhdGlvblwiKTtcclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1hLWluZGVudFwiKSlcclxuICAgICAgICAgIGFsaWdubWVudC5pbmRlbnQgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWEtaW5kZW50XCIpO1xyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWEtcnRsXCIpID09PSBcInRydWVcIilcclxuICAgICAgICAgIGFsaWdubWVudC5yZWFkaW5nT3JkZXIgPSBcInJ0bFwiO1xyXG4gICAgXHJcbiAgICAgICAgLy8gQm9yZGVyIGF0dHJzXHJcbiAgICAgICAgbGV0IGJvcmRlcjogYW55ID0ge1xyXG4gICAgICAgICAgdG9wOiB7fSxcclxuICAgICAgICAgIGxlZnQ6IHt9LFxyXG4gICAgICAgICAgYm90dG9tOiB7fSxcclxuICAgICAgICAgIHJpZ2h0OiB7fVxyXG4gICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLWEtc1wiKSkge1xyXG4gICAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi1hLXNcIikgIT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgbGV0IHN0eWxlID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLWEtc1wiKTtcclxuICAgICAgICAgICAgYm9yZGVyLnRvcC5zdHlsZSA9IHN0eWxlO1xyXG4gICAgICAgICAgICBib3JkZXIubGVmdC5zdHlsZSA9IHN0eWxlO1xyXG4gICAgICAgICAgICBib3JkZXIuYm90dG9tLnN0eWxlID0gc3R5bGU7XHJcbiAgICAgICAgICAgIGJvcmRlci5yaWdodC5zdHlsZSA9IHN0eWxlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIC8vIEJ5IGRlZmF1bHRcclxuICAgICAgICAgIGJvcmRlci50b3Auc3R5bGUgPSBcInRoaW5cIjtcclxuICAgICAgICAgIGJvcmRlci5sZWZ0LnN0eWxlID0gXCJ0aGluXCI7XHJcbiAgICAgICAgICBib3JkZXIuYm90dG9tLnN0eWxlID0gXCJ0aGluXCI7XHJcbiAgICAgICAgICBib3JkZXIucmlnaHQuc3R5bGUgPSBcInRoaW5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi1hLWNcIikpIHtcclxuICAgICAgICAgIGxldCBjb2xvciA9IHsgYXJnYjogdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLWEtY1wiKSB9O1xyXG4gICAgICAgICAgYm9yZGVyLnRvcC5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgICAgYm9yZGVyLmxlZnQuY29sb3IgPSBjb2xvcjtcclxuICAgICAgICAgIGJvcmRlci5ib3R0b20uY29sb3IgPSBjb2xvcjtcclxuICAgICAgICAgIGJvcmRlci5yaWdodC5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLXQtc1wiKSkge1xyXG4gICAgICAgICAgYm9yZGVyLnRvcC5zdHlsZSA9IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi10LXNcIik7XHJcbiAgICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLXQtY1wiKSlcclxuICAgICAgICAgICAgYm9yZGVyLnRvcC5jb2xvciA9IHsgYXJnYjogdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLXQtY1wiKSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLWwtc1wiKSkge1xyXG4gICAgICAgICAgYm9yZGVyLmxlZnQuc3R5bGUgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItbC1zXCIpO1xyXG4gICAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi1sLWNcIikpXHJcbiAgICAgICAgICAgIGJvcmRlci5sZWZ0LmNvbG9yID0geyBhcmdiOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItdC1jXCIpIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItYi1zXCIpKSB7XHJcbiAgICAgICAgICBib3JkZXIuYm90dG9tLnN0eWxlID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLWItc1wiKTtcclxuICAgICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItYi1jXCIpKVxyXG4gICAgICAgICAgICBib3JkZXIuYm90dG9tLmNvbG9yID0geyBhcmdiOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItdC1jXCIpIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItci1zXCIpKSB7XHJcbiAgICAgICAgICBib3JkZXIucmlnaHQuc3R5bGUgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItci1zXCIpO1xyXG4gICAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi1yLWNcIikpXHJcbiAgICAgICAgICAgIGJvcmRlci5yaWdodC5jb2xvciA9IHsgYXJnYjogdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLXQtY1wiKSB9O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8vRmlsbFxyXG4gICAgICAgIGxldCBmaWxsO1xyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpbGwtY29sb3JcIikpIHtcclxuICAgICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpbGwtY29sb3JcIikgIT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgZmlsbCA9IHtcclxuICAgICAgICAgICAgICB0eXBlOiBcInBhdHRlcm5cIixcclxuICAgICAgICAgICAgICBwYXR0ZXJuOiBcInNvbGlkXCIsXHJcbiAgICAgICAgICAgICAgZmdDb2xvcjogeyBhcmdiOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZpbGwtY29sb3JcIikgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIC8vU2V0IGNzcyBjb2xvciBzdHlsZSBieSBkZWZhdWx0XHJcbiAgICAgICAgICBsZXQgY29tcHV0ZWRCYWNrZ3JvdW5kQ29sb3IgPSBjc3NDb21wdXRlZFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFwiYmFja2dyb3VuZC1jb2xvclwiKTtcclxuICAgICAgICAgIGxldCBjb252ZXJ0ZWRCYWNrZ3JvdW5kQ29sb3IgPSB0aGlzLmdldEhleEFyZ2JDb2xvcihjb21wdXRlZEJhY2tncm91bmRDb2xvcilcclxuICAgICAgICAgIGlmIChjb252ZXJ0ZWRCYWNrZ3JvdW5kQ29sb3IgIT0gXCJcIikge1xyXG4gICAgICAgICAgICBmaWxsID0ge1xyXG4gICAgICAgICAgICAgIHR5cGU6IFwicGF0dGVyblwiLFxyXG4gICAgICAgICAgICAgIHBhdHRlcm46IFwic29saWRcIixcclxuICAgICAgICAgICAgICBmZ0NvbG9yOiB7IGFyZ2I6IGNvbnZlcnRlZEJhY2tncm91bmRDb2xvciB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy9udW1iZXIgZm9ybWF0XHJcbiAgICAgICAgbGV0IG51bUZtdDtcclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1udW0tZm10XCIpKVxyXG4gICAgICAgICAgbnVtRm10ID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1udW0tZm10XCIpO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGZvbnQsXHJcbiAgICAgICAgICBhbGlnbm1lbnQsXHJcbiAgICAgICAgICBib3JkZXIsXHJcbiAgICAgICAgICBmaWxsLFxyXG4gICAgICAgICAgbnVtRm10XHJcbiAgICAgICAgfTtcclxuICAgICAgfTtcclxufVxyXG4iXX0=