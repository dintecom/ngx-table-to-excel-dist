/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class DomParserService {
    /**
     * Parse HTML table to excel worksheet
     * @param {?} ws The worksheet object
     * @param {?} htmlElement
     * @param {?} opts
     * @return {?}
     */
    parseDomToTable(ws, htmlElement, opts) {
        /** @type {?} */
        let _r;
        /** @type {?} */
        let _c;
        /** @type {?} */
        let cs;
        /** @type {?} */
        let rs;
        /** @type {?} */
        let r;
        /** @type {?} */
        let c;
        /** @type {?} */
        let tableObject = htmlElement.tagName === "TABLE";
        if (tableObject) {
            /** @type {?} */
            let rows = [...htmlElement.getElementsByTagName("tr")];
            /** @type {?} */
            let widths = htmlElement.getAttribute("data-cols-width");
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
            let merges = [];
            /** @type {?} */
            let wsRowCount = ws.rowCount;
            for (_r = 0; _r < rows.length; ++_r) {
                /** @type {?} */
                let row = rows[_r];
                r = wsRowCount + _r + 1; // Actual excel row number
                c = 1; // Actual excel col number
                if (row.getAttribute("data-exclude") === "true") {
                    rows.splice(_r, 1);
                    _r--;
                    continue;
                }
                if (row.getAttribute("data-height")) {
                    /** @type {?} */
                    let exRow = ws.getRow(r);
                    exRow.height = parseFloat(row.getAttribute("data-height"));
                }
                /** @type {?} */
                let tds = [...row.children];
                for (_c = 0; _c < tds.length; ++_c) {
                    /** @type {?} */
                    let td = tds[_c];
                    if (td.getAttribute("data-exclude") === "true") {
                        tds.splice(_c, 1);
                        _c--;
                        continue;
                    }
                    for (let _m = 0; _m < merges.length; ++_m) {
                        /** @type {?} */
                        var m = merges[_m];
                        if (m.s.c == c && m.s.r <= r && r <= m.e.r) {
                            c = m.e.c + 1;
                            _m = -1;
                        }
                    }
                    /** @type {?} */
                    let exCell = ws.getCell(this.getColumnAddress(c, r));
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
                        let styles = this.getStylesDataAttr(td);
                        exCell.font = styles.font || null;
                        exCell.alignment = styles.alignment || null;
                        exCell.border = styles.border || null;
                        exCell.fill = styles.fill || null;
                        exCell.numFmt = styles.numFmt || null;
                        //Auto-detecting currency
                        if (exCell.numFmt == null && typeof exCell.value == "string") {
                            /** @type {?} */
                            let cellValueWithoutSpaces = exCell.value.replace(/ /g, '').replace(/\,/g, '');
                            /** @type {?} */
                            const regex = /^(\+|\-)?\$[0-9]+(\.[0-9]{1,2})?$/;
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
                (width, _i) => {
                    ws.columns[_i].width = width;
                }));
            }
            this.applyMerges(ws, merges);
            return ws;
        }
        else {
            /** @type {?} */
            let widths = htmlElement.getAttribute("data-cols-width");
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
            let merges = [];
            _r = 0;
            /** @type {?} */
            let row = htmlElement;
            r = ws.rowCount + _r + 1; // Actual excel row number
            c = 1; // Actual excel col number
            if (row.getAttribute("data-exclude") === "true") {
                return ws;
            }
            if (row.getAttribute("data-height")) {
                /** @type {?} */
                let exRow = ws.getRow(r);
                exRow.height = parseFloat(row.getAttribute("data-height"));
            }
            for (let _m = 0; _m < merges.length; ++_m) {
                /** @type {?} */
                var m = merges[_m];
                if (m.s.c == c && m.s.r <= r && r <= m.e.r) {
                    c = m.e.c + 1;
                    _m = -1;
                }
            }
            /** @type {?} */
            let exCell = ws.getCell(this.getColumnAddress(c, r));
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
                let styles = this.getStylesDataAttr(row);
                exCell.font = styles.font || null;
                exCell.alignment = styles.alignment || null;
                exCell.border = styles.border || null;
                exCell.fill = styles.fill || null;
                exCell.numFmt = styles.numFmt || null;
                //Auto-detecting currency
                if (exCell.numFmt == null && typeof exCell.value == "string") {
                    /** @type {?} */
                    let cellValueWithoutSpaces = exCell.value.replace(/ /g, '').replace(/\,/g, '');
                    /** @type {?} */
                    const regex = /^(\+|\-)?\$[0-9]+(\.[0-9]{1,2})?$/;
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
                (width, _i) => {
                    ws.columns[_i].width = width;
                }));
            this.applyMerges(ws, merges);
            return ws;
        }
    }
    ;
    /**
     * To apply merges on the sheet
     * @param {?} ws The worksheet object
     * @param {?} merges array of merges
     * @return {?}
     */
    applyMerges(ws, merges) {
        merges.forEach((/**
         * @param {?} m
         * @return {?}
         */
        m => {
            ws.mergeCells(this.getExcelColumnName(m.s.c) +
                m.s.r +
                ":" +
                this.getExcelColumnName(m.e.c) +
                m.e.r);
        }));
    }
    ;
    /**
     * Takes a positive integer and returns the corresponding column name.
     * @param {?} num The positive integer to convert to a column name.
     * @return {?} The column name.
     */
    getExcelColumnName(num) {
        for (var ret = "", a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
            ret = String.fromCharCode(Math.trunc((num % b) / a) + 65) + ret;
        }
        return ret;
    }
    ;
    /**
     * @param {?} col
     * @param {?} row
     * @return {?}
     */
    getColumnAddress(col, row) {
        return this.getExcelColumnName(col) + row;
    }
    ;
    /**
     * Checks the data type specified and converts the value to it.
     * @param {?} td
     * @param {?} tableObject
     * @return {?}
     */
    getValue(td, tableObject) {
        /** @type {?} */
        let dataType = td.getAttribute("data-t");
        /** @type {?} */
        let rawVal = tableObject ? this.htmldecode(td.innerHTML) : td.innerText;
        if (dataType) {
            /** @type {?} */
            let val;
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
    }
    ;
    /**
     * Convert HTML to plain text
     * @param {?} str
     * @return {?}
     */
    htmldecode(str) {
        /** @type {?} */
        let entities = [
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
        let o = str
            .trim()
            .replace(/\s+/g, " ")
            .replace(/<\s*[bB][rR]\s*\/?>/g, "\n")
            .replace(/<[^>]*>/g, "");
        for (let i = 0; i < entities.length; ++i)
            o = o.replace(entities[i][0], entities[i][1]);
        return o;
    }
    ;
    /**
     * Convert computed colors to hex ARGB
     * @param {?} computedColor Computed color string from getPropertyValue()
     * @return {?}
     */
    getHexArgbColor(computedColor) {
        //if RGB then convert to RGBA
        /** @type {?} */
        let computedColorStr = computedColor;
        if (computedColorStr.indexOf('a') == -1) {
            computedColorStr = computedColorStr.replace(')', ', 1)').replace('rgb', 'rgba');
        }
        /** @type {?} */
        let rgbaValues = computedColorStr.split("(")[1].split(")")[0].split(",");
        /** @type {?} */
        let r = (+rgbaValues[0]).toString(16);
        /** @type {?} */
        let g = (+rgbaValues[1]).toString(16);
        /** @type {?} */
        let b = (+rgbaValues[2]).toString(16);
        /** @type {?} */
        let a = Math.round(+rgbaValues[3] * 255).toString(16);
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
    }
    ;
    /**
     * Prepares the style object for a cell using the data attributes
     * @param {?} td
     * @return {?}
     */
    getStylesDataAttr(td) {
        /** @type {?} */
        let cssComputedStyles = window.getComputedStyle(td, null);
        //Font attrs
        /** @type {?} */
        let font = {};
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
            let computedColor = cssComputedStyles.getPropertyValue("color");
            /** @type {?} */
            let convertedColor = this.getHexArgbColor(computedColor);
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
        let alignment = {};
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
        let border = {
            top: {},
            left: {},
            bottom: {},
            right: {}
        };
        if (td.getAttribute("data-b-a-s")) {
            if (td.getAttribute("data-b-a-s") != "none") {
                /** @type {?} */
                let style = td.getAttribute("data-b-a-s");
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
            let color = { argb: td.getAttribute("data-b-a-c") };
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
        let fill;
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
            let computedBackgroundColor = cssComputedStyles.getPropertyValue("background-color");
            /** @type {?} */
            let convertedBackgroundColor = this.getHexArgbColor(computedBackgroundColor);
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
        let numFmt;
        if (td.getAttribute("data-num-fmt"))
            numFmt = td.getAttribute("data-num-fmt");
        return {
            font,
            alignment,
            border,
            fill,
            numFmt
        };
    }
    ;
}
DomParserService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ DomParserService.ngInjectableDef = i0.defineInjectable({ factory: function DomParserService_Factory() { return new DomParserService(); }, token: DomParserService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLXBhcnNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRhYmxlLXRvLWV4Y2VsLyIsInNvdXJjZXMiOlsibGliL2RvbS1wYXJzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLGdCQUFnQjs7Ozs7Ozs7SUFNekIsZUFBZSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSTs7WUFDN0IsRUFBRTs7WUFBRSxFQUFFOztZQUFFLEVBQUU7O1lBQUUsRUFBRTs7WUFBRSxDQUFDOztZQUFFLENBQUM7O1lBQ3BCLFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxLQUFLLE9BQU87UUFDakQsSUFBSSxXQUFXLEVBQUU7O2dCQUNYLElBQUksR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDOztnQkFDbEQsTUFBTSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUM7WUFDeEQsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRzs7OztnQkFBQyxVQUFVLElBQUk7b0JBQzNDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixDQUFDLEVBQUMsQ0FBQzthQUNKOztnQkFDRyxNQUFNLEdBQUcsRUFBRTs7Z0JBQ1gsVUFBVSxHQUFHLEVBQUUsQ0FBQyxRQUFRO1lBQzVCLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRTs7b0JBQy9CLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNsQixDQUFDLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQywwQkFBMEI7Z0JBQ25E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QUFJLEVBQUUsd0JBQXdCLEVBQUU7aUJBQzVDLENBQUM7YUFDSDtTQUNGOzs7WUFHRyxNQUFNO1FBQ1YsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQztZQUNqQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUzQyxPQUFPO1lBQ0wsSUFBSTtZQUNKLFNBQVM7WUFDVCxNQUFNO1lBQ04sSUFBSTtZQUNKLE1BQU07U0FDUCxDQUFDO0lBQ0osQ0FBQztJQUFBLENBQUM7OztZQTlhUCxVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERvbVBhcnNlclNlcnZpY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJzZSBIVE1MIHRhYmxlIHRvIGV4Y2VsIHdvcmtzaGVldFxyXG4gICAgICogQHBhcmFtIHdzIFRoZSB3b3Jrc2hlZXQgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gdGFibGUgVGhlIHRhYmxlIHRvIGJlIGNvbnZlcnRlZCB0byBleGNlbCBzaGVldFxyXG4gICAgICovXHJcbiAgICBwYXJzZURvbVRvVGFibGUod3MsIGh0bWxFbGVtZW50LCBvcHRzKSB7XHJcbiAgICAgICAgbGV0IF9yLCBfYywgY3MsIHJzLCByLCBjO1xyXG4gICAgICAgIGxldCB0YWJsZU9iamVjdCA9IGh0bWxFbGVtZW50LnRhZ05hbWUgPT09IFwiVEFCTEVcIjtcclxuICAgICAgICBpZiAodGFibGVPYmplY3QpIHtcclxuICAgICAgICAgIGxldCByb3dzID0gWy4uLmh0bWxFbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidHJcIildO1xyXG4gICAgICAgICAgbGV0IHdpZHRocyA9IGh0bWxFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29scy13aWR0aFwiKTtcclxuICAgICAgICAgIGlmICh3aWR0aHMpIHtcclxuICAgICAgICAgICAgd2lkdGhzID0gd2lkdGhzLnNwbGl0KFwiLFwiKS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoaXRlbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbGV0IG1lcmdlcyA9IFtdO1xyXG4gICAgICAgICAgbGV0IHdzUm93Q291bnQgPSB3cy5yb3dDb3VudDtcclxuICAgICAgICAgIGZvciAoX3IgPSAwOyBfciA8IHJvd3MubGVuZ3RoOyArK19yKSB7XHJcbiAgICAgICAgICAgIGxldCByb3cgPSByb3dzW19yXTtcclxuICAgICAgICAgICAgciA9IHdzUm93Q291bnQgKyBfciArIDE7IC8vIEFjdHVhbCBleGNlbCByb3cgbnVtYmVyXHJcbiAgICAgICAgICAgIGMgPSAxOyAvLyBBY3R1YWwgZXhjZWwgY29sIG51bWJlclxyXG4gICAgICAgICAgICBpZiAocm93LmdldEF0dHJpYnV0ZShcImRhdGEtZXhjbHVkZVwiKSA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICByb3dzLnNwbGljZShfciwgMSk7XHJcbiAgICAgICAgICAgICAgX3ItLTtcclxuICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocm93LmdldEF0dHJpYnV0ZShcImRhdGEtaGVpZ2h0XCIpKSB7XHJcbiAgICAgICAgICAgICAgbGV0IGV4Um93ID0gd3MuZ2V0Um93KHIpO1xyXG4gICAgICAgICAgICAgIGV4Um93LmhlaWdodCA9IHBhcnNlRmxvYXQocm93LmdldEF0dHJpYnV0ZShcImRhdGEtaGVpZ2h0XCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIGxldCB0ZHMgPSBbLi4ucm93LmNoaWxkcmVuXTtcclxuICAgICAgICAgICAgZm9yIChfYyA9IDA7IF9jIDwgdGRzLmxlbmd0aDsgKytfYykge1xyXG4gICAgICAgICAgICAgIGxldCB0ZCA9IHRkc1tfY107XHJcbiAgICAgICAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZXhjbHVkZVwiKSA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgIHRkcy5zcGxpY2UoX2MsIDEpO1xyXG4gICAgICAgICAgICAgICAgX2MtLTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBmb3IgKGxldCBfbSA9IDA7IF9tIDwgbWVyZ2VzLmxlbmd0aDsgKytfbSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG0gPSBtZXJnZXNbX21dO1xyXG4gICAgICAgICAgICAgICAgaWYgKG0ucy5jID09IGMgJiYgbS5zLnIgPD0gciAmJiByIDw9IG0uZS5yKSB7XHJcbiAgICAgICAgICAgICAgICAgIGMgPSBtLmUuYyArIDE7XHJcbiAgICAgICAgICAgICAgICAgIF9tID0gLTE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGxldCBleENlbGwgPSB3cy5nZXRDZWxsKHRoaXMuZ2V0Q29sdW1uQWRkcmVzcyhjLCByKSk7XHJcbiAgICAgICAgICAgICAgLy8gY2FsY3VsYXRlIG1lcmdlc1xyXG4gICAgICAgICAgICAgIGNzID0gcGFyc2VJbnQodGQuZ2V0QXR0cmlidXRlKFwiY29sc3BhblwiKSkgfHwgMTtcclxuICAgICAgICAgICAgICBycyA9IHBhcnNlSW50KHRkLmdldEF0dHJpYnV0ZShcInJvd3NwYW5cIikpIHx8IDE7XHJcbiAgICAgICAgICAgICAgaWYgKGNzID4gMSB8fCBycyA+IDEpIHtcclxuICAgICAgICAgICAgICAgIG1lcmdlcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgczogeyBjOiBjLCByOiByIH0sXHJcbiAgICAgICAgICAgICAgICAgIGU6IHsgYzogYyArIGNzIC0gMSwgcjogciArIHJzIC0gMSB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgYyArPSBjcztcclxuICAgICAgICAgICAgICBleENlbGwudmFsdWUgPSB0aGlzLmdldFZhbHVlKHRkLCB0YWJsZU9iamVjdCk7XHJcbiAgICAgICAgICAgICAgaWYgKCFvcHRzLmF1dG9TdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlcyA9IHRoaXMuZ2V0U3R5bGVzRGF0YUF0dHIodGQpO1xyXG4gICAgICAgICAgICAgICAgZXhDZWxsLmZvbnQgPSBzdHlsZXMuZm9udCB8fCBudWxsO1xyXG4gICAgICAgICAgICAgICAgZXhDZWxsLmFsaWdubWVudCA9IHN0eWxlcy5hbGlnbm1lbnQgfHwgbnVsbDtcclxuICAgICAgICAgICAgICAgIGV4Q2VsbC5ib3JkZXIgPSBzdHlsZXMuYm9yZGVyIHx8IG51bGw7XHJcbiAgICAgICAgICAgICAgICBleENlbGwuZmlsbCA9IHN0eWxlcy5maWxsIHx8IG51bGw7XHJcbiAgICAgICAgICAgICAgICBleENlbGwubnVtRm10ID0gc3R5bGVzLm51bUZtdCB8fCBudWxsO1xyXG4gICAgICAgICAgICAgICAgLy9BdXRvLWRldGVjdGluZyBjdXJyZW5jeVxyXG4gICAgICAgICAgICAgICAgaWYgKGV4Q2VsbC5udW1GbXQgPT0gbnVsbCAmJiB0eXBlb2YgZXhDZWxsLnZhbHVlID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgbGV0IGNlbGxWYWx1ZVdpdGhvdXRTcGFjZXMgPSBleENlbGwudmFsdWUucmVwbGFjZSgvIC9nLCAnJykucmVwbGFjZSgvXFwsL2csICcnKTtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgcmVnZXggPSAvXihcXCt8XFwtKT9cXCRbMC05XSsoXFwuWzAtOV17MSwyfSk/JC87XHJcbiAgICAgICAgICAgICAgICAgIGlmIChyZWdleC50ZXN0KGNlbGxWYWx1ZVdpdGhvdXRTcGFjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhDZWxsLnZhbHVlID0gZXhDZWxsLnZhbHVlLnJlcGxhY2UoL1teMC05XFwrXFwtXFwuXS9nLCBcIlwiKVxyXG4gICAgICAgICAgICAgICAgICAgIGV4Q2VsbC52YWx1ZSA9IE51bWJlcihleENlbGwudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV4Q2VsbC5udW1GbXQgPSBcIiQjLCMjMC4wMFwiO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvL1NldHRpbmcgY29sdW1uIHdpZHRoXHJcbiAgICAgICAgICBpZiAod2lkdGhzKSB7XHJcbiAgICAgICAgICAgIHdpZHRocy5mb3JFYWNoKCh3aWR0aCwgX2kpID0+IHtcclxuICAgICAgICAgICAgICB3cy5jb2x1bW5zW19pXS53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuYXBwbHlNZXJnZXMod3MsIG1lcmdlcyk7XHJcbiAgICAgICAgICByZXR1cm4gd3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgbGV0IHdpZHRocyA9IGh0bWxFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtY29scy13aWR0aFwiKTtcclxuICAgICAgICAgIGlmICh3aWR0aHMpIHtcclxuICAgICAgICAgICAgd2lkdGhzID0gd2lkdGhzLnNwbGl0KFwiLFwiKS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoaXRlbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgbGV0IG1lcmdlcyA9IFtdO1xyXG4gICAgICAgICAgX3IgPSAwO1xyXG4gICAgICAgICAgbGV0IHJvdyA9IGh0bWxFbGVtZW50O1xyXG4gICAgICAgICAgciA9IHdzLnJvd0NvdW50ICsgX3IgKyAxOyAvLyBBY3R1YWwgZXhjZWwgcm93IG51bWJlclxyXG4gICAgICAgICAgYyA9IDE7IC8vIEFjdHVhbCBleGNlbCBjb2wgbnVtYmVyXHJcbiAgICAgICAgICBpZiAocm93LmdldEF0dHJpYnV0ZShcImRhdGEtZXhjbHVkZVwiKSA9PT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHJvdy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhlaWdodFwiKSkge1xyXG4gICAgICAgICAgICBsZXQgZXhSb3cgPSB3cy5nZXRSb3cocik7XHJcbiAgICAgICAgICAgIGV4Um93LmhlaWdodCA9IHBhcnNlRmxvYXQocm93LmdldEF0dHJpYnV0ZShcImRhdGEtaGVpZ2h0XCIpKTtcclxuICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgZm9yIChsZXQgX20gPSAwOyBfbSA8IG1lcmdlcy5sZW5ndGg7ICsrX20pIHtcclxuICAgICAgICAgICAgdmFyIG0gPSBtZXJnZXNbX21dO1xyXG4gICAgICAgICAgICBpZiAobS5zLmMgPT0gYyAmJiBtLnMuciA8PSByICYmIHIgPD0gbS5lLnIpIHtcclxuICAgICAgICAgICAgICBjID0gbS5lLmMgKyAxO1xyXG4gICAgICAgICAgICAgIF9tID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxldCBleENlbGwgPSB3cy5nZXRDZWxsKHRoaXMuZ2V0Q29sdW1uQWRkcmVzcyhjLCByKSk7XHJcbiAgICAgICAgICAvLyBjYWxjdWxhdGUgbWVyZ2VzXHJcbiAgICAgICAgICBjcyA9IHBhcnNlSW50KHJvdy5nZXRBdHRyaWJ1dGUoXCJjb2xzcGFuXCIpKSB8fCAxO1xyXG4gICAgICAgICAgcnMgPSBwYXJzZUludChyb3cuZ2V0QXR0cmlidXRlKFwicm93c3BhblwiKSkgfHwgMTtcclxuICAgICAgICAgIGlmIChjcyA+IDEgfHwgcnMgPiAxKSB7XHJcbiAgICAgICAgICAgIG1lcmdlcy5wdXNoKHtcclxuICAgICAgICAgICAgICBzOiB7IGM6IGMsIHI6IHIgfSxcclxuICAgICAgICAgICAgICBlOiB7IGM6IGMgKyBjcyAtIDEsIHI6IHIgKyBycyAtIDEgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGMgKz0gY3M7XHJcbiAgICAgICAgICBleENlbGwudmFsdWUgPSB0aGlzLmdldFZhbHVlKHJvdywgdGFibGVPYmplY3QpO1xyXG4gICAgICAgICAgaWYgKCFvcHRzLmF1dG9TdHlsZSkge1xyXG4gICAgICAgICAgICBsZXQgc3R5bGVzID0gdGhpcy5nZXRTdHlsZXNEYXRhQXR0cihyb3cpO1xyXG4gICAgICAgICAgICBleENlbGwuZm9udCA9IHN0eWxlcy5mb250IHx8IG51bGw7XHJcbiAgICAgICAgICAgIGV4Q2VsbC5hbGlnbm1lbnQgPSBzdHlsZXMuYWxpZ25tZW50IHx8IG51bGw7XHJcbiAgICAgICAgICAgIGV4Q2VsbC5ib3JkZXIgPSBzdHlsZXMuYm9yZGVyIHx8IG51bGw7XHJcbiAgICAgICAgICAgIGV4Q2VsbC5maWxsID0gc3R5bGVzLmZpbGwgfHwgbnVsbDtcclxuICAgICAgICAgICAgZXhDZWxsLm51bUZtdCA9IHN0eWxlcy5udW1GbXQgfHwgbnVsbDtcclxuICAgICAgICAgICAgLy9BdXRvLWRldGVjdGluZyBjdXJyZW5jeVxyXG4gICAgICAgICAgICBpZiAoZXhDZWxsLm51bUZtdCA9PSBudWxsICYmIHR5cGVvZiBleENlbGwudmFsdWUgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgIGxldCBjZWxsVmFsdWVXaXRob3V0U3BhY2VzID0gZXhDZWxsLnZhbHVlLnJlcGxhY2UoLyAvZywgJycpLnJlcGxhY2UoL1xcLC9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgY29uc3QgcmVnZXggPSAvXihcXCt8XFwtKT9cXCRbMC05XSsoXFwuWzAtOV17MSwyfSk/JC87XHJcbiAgICAgICAgICAgICAgaWYgKHJlZ2V4LnRlc3QoY2VsbFZhbHVlV2l0aG91dFNwYWNlcykpIHtcclxuICAgICAgICAgICAgICAgIGV4Q2VsbC52YWx1ZSA9IGV4Q2VsbC52YWx1ZS5yZXBsYWNlKC9bXjAtOVxcK1xcLVxcLl0vZywgXCJcIilcclxuICAgICAgICAgICAgICAgIGV4Q2VsbC52YWx1ZSA9IE51bWJlcihleENlbGwudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgZXhDZWxsLm51bUZtdCA9IFwiJCMsIyMwLjAwXCI7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvL1NldHRpbmcgY29sdW1uIHdpZHRoXHJcbiAgICAgICAgICBpZiAod2lkdGhzKVxyXG4gICAgICAgICAgICB3aWR0aHMuZm9yRWFjaCgod2lkdGgsIF9pKSA9PiB7XHJcbiAgICAgICAgICAgICAgd3MuY29sdW1uc1tfaV0ud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLmFwcGx5TWVyZ2VzKHdzLCBtZXJnZXMpO1xyXG4gICAgICAgICAgcmV0dXJuIHdzO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICogVG8gYXBwbHkgbWVyZ2VzIG9uIHRoZSBzaGVldFxyXG4gICAgICogQHBhcmFtIHdzIFRoZSB3b3Jrc2hlZXQgb2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gbWVyZ2VzIGFycmF5IG9mIG1lcmdlc1xyXG4gICAgICovXHJcbiAgICBhcHBseU1lcmdlcyh3cywgbWVyZ2VzKSB7XHJcbiAgICAgICAgbWVyZ2VzLmZvckVhY2gobSA9PiB7XHJcbiAgICAgICAgICB3cy5tZXJnZUNlbGxzKFxyXG4gICAgICAgICAgICB0aGlzLmdldEV4Y2VsQ29sdW1uTmFtZShtLnMuYykgK1xyXG4gICAgICAgICAgICBtLnMuciArXHJcbiAgICAgICAgICAgIFwiOlwiICtcclxuICAgICAgICAgICAgdGhpcy5nZXRFeGNlbENvbHVtbk5hbWUobS5lLmMpICtcclxuICAgICAgICAgICAgbS5lLnJcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvKipcclxuICAgICAqIFRha2VzIGEgcG9zaXRpdmUgaW50ZWdlciBhbmQgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyBjb2x1bW4gbmFtZS5cclxuICAgICAqIEBwYXJhbSBudW0gVGhlIHBvc2l0aXZlIGludGVnZXIgdG8gY29udmVydCB0byBhIGNvbHVtbiBuYW1lLlxyXG4gICAgICogQHJldHVybiBUaGUgY29sdW1uIG5hbWUuXHJcbiAgICAgKi9cclxuICAgIGdldEV4Y2VsQ29sdW1uTmFtZShudW06IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgZm9yICh2YXIgcmV0ID0gXCJcIiwgYSA9IDEsIGIgPSAyNjsgKG51bSAtPSBhKSA+PSAwOyBhID0gYiwgYiAqPSAyNikge1xyXG4gICAgICAgICAgcmV0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLnRydW5jKChudW0gJSBiKSAvIGEpICsgNjUpICsgcmV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICB9O1xyXG4gICAgXHJcbiAgICAgIGdldENvbHVtbkFkZHJlc3MoY29sLCByb3cpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFeGNlbENvbHVtbk5hbWUoY29sKSArIHJvdztcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIHRoZSBkYXRhIHR5cGUgc3BlY2lmaWVkIGFuZCBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gaXQuXHJcbiAgICAgKi9cclxuICAgIGdldFZhbHVlKHRkLCB0YWJsZU9iamVjdCkge1xyXG4gICAgICAgIGxldCBkYXRhVHlwZSA9IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtdFwiKTtcclxuICAgICAgICBsZXQgcmF3VmFsID0gdGFibGVPYmplY3QgPyB0aGlzLmh0bWxkZWNvZGUodGQuaW5uZXJIVE1MKSA6IHRkLmlubmVyVGV4dDtcclxuICAgICAgICBpZiAoZGF0YVR5cGUpIHtcclxuICAgICAgICAgIGxldCB2YWw7XHJcbiAgICAgICAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJuXCI6IC8vbnVtYmVyXHJcbiAgICAgICAgICAgICAgcmF3VmFsID0gcmF3VmFsLnJlcGxhY2UoL1teMC05XFwrXFwtXFwuXS9nLCBcIlwiKVxyXG4gICAgICAgICAgICAgIHZhbCA9IE51bWJlcihyYXdWYWwpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZFwiOiAvL2RhdGVcclxuICAgICAgICAgICAgICB2YWwgPSBuZXcgRGF0ZShyYXdWYWwpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYlwiOiAvL2Jvb2xlYW5cclxuICAgICAgICAgICAgICB2YWwgPVxyXG4gICAgICAgICAgICAgICAgcmF3VmFsLnRvTG93ZXJDYXNlKCkgPT09IFwidHJ1ZVwiXHJcbiAgICAgICAgICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICA6IHJhd1ZhbC50b0xvd2VyQ2FzZSgpID09PSBcImZhbHNlXCJcclxuICAgICAgICAgICAgICAgICAgICA/IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgOiBCb29sZWFuKHBhcnNlSW50KHJhd1ZhbCkpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIHZhbCA9IHJhd1ZhbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWh5cGVybGlua1wiKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdGV4dDogcmF3VmFsLFxyXG4gICAgICAgICAgICBoeXBlcmxpbms6IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtaHlwZXJsaW5rXCIpXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1lcnJvclwiKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHsgZXJyb3I6IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZXJyb3JcIikgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJhd1ZhbDtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICogQ29udmVydCBIVE1MIHRvIHBsYWluIHRleHRcclxuICAgICAqL1xyXG4gICAgaHRtbGRlY29kZShzdHIpIHtcclxuICAgICAgICBsZXQgZW50aXRpZXMgPSBbXHJcbiAgICAgICAgICAgIFtcIm5ic3BcIiwgXCIgXCJdLFxyXG4gICAgICAgICAgICBbXCJtaWRkb3RcIiwgXCLCt1wiXSxcclxuICAgICAgICAgICAgW1wicXVvdFwiLCAnXCInXSxcclxuICAgICAgICAgICAgW1wiYXBvc1wiLCBcIidcIl0sXHJcbiAgICAgICAgICAgIFtcImd0XCIsIFwiPlwiXSxcclxuICAgICAgICAgICAgW1wibHRcIiwgXCI8XCJdLFxyXG4gICAgICAgICAgICBbXCJhbXBcIiwgXCImXCJdXHJcbiAgICAgICAgICBdLm1hcChmdW5jdGlvbiAoeCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW25ldyBSZWdFeHAoXCImXCIgKyB4WzBdICsgXCI7XCIsIFwiZ1wiKSwgeFsxXV07XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IG8gPSBzdHJcclxuICAgICAgICAgIC50cmltKClcclxuICAgICAgICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKVxyXG4gICAgICAgICAgLnJlcGxhY2UoLzxcXHMqW2JCXVtyUl1cXHMqXFwvPz4vZywgXCJcXG5cIilcclxuICAgICAgICAgIC5yZXBsYWNlKC88W14+XSo+L2csIFwiXCIpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW50aXRpZXMubGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICBvID0gby5yZXBsYWNlKGVudGl0aWVzW2ldWzBdLCBlbnRpdGllc1tpXVsxXSk7XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvKipcclxuICAgICAqIENvbnZlcnQgY29tcHV0ZWQgY29sb3JzIHRvIGhleCBBUkdCXHJcbiAgICAgKiBAcGFyYW0gY29tcHV0ZWRDb2xvciBDb21wdXRlZCBjb2xvciBzdHJpbmcgZnJvbSBnZXRQcm9wZXJ0eVZhbHVlKClcclxuICAgICAqL1xyXG4gICAgZ2V0SGV4QXJnYkNvbG9yKGNvbXB1dGVkQ29sb3I6IHN0cmluZykge1xyXG4gICAgICAgIC8vaWYgUkdCIHRoZW4gY29udmVydCB0byBSR0JBXHJcbiAgICAgICAgbGV0IGNvbXB1dGVkQ29sb3JTdHIgPSBjb21wdXRlZENvbG9yO1xyXG4gICAgICAgIGlmIChjb21wdXRlZENvbG9yU3RyLmluZGV4T2YoJ2EnKSA9PSAtMSkge1xyXG4gICAgICAgICAgY29tcHV0ZWRDb2xvclN0ciA9IGNvbXB1dGVkQ29sb3JTdHIucmVwbGFjZSgnKScsICcsIDEpJykucmVwbGFjZSgncmdiJywgJ3JnYmEnKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBsZXQgcmdiYVZhbHVlcyA9IGNvbXB1dGVkQ29sb3JTdHIuc3BsaXQoXCIoXCIpWzFdLnNwbGl0KFwiKVwiKVswXS5zcGxpdChcIixcIik7XHJcbiAgICBcclxuICAgICAgICBsZXQgciA9ICgrcmdiYVZhbHVlc1swXSkudG9TdHJpbmcoMTYpLFxyXG4gICAgICAgICAgZyA9ICgrcmdiYVZhbHVlc1sxXSkudG9TdHJpbmcoMTYpLFxyXG4gICAgICAgICAgYiA9ICgrcmdiYVZhbHVlc1syXSkudG9TdHJpbmcoMTYpLFxyXG4gICAgICAgICAgYSA9IE1hdGgucm91bmQoK3JnYmFWYWx1ZXNbM10gKiAyNTUpLnRvU3RyaW5nKDE2KTtcclxuICAgIFxyXG4gICAgICAgIGlmIChhID09ICcwJykgeyByZXR1cm4gXCJcIiB9XHJcbiAgICBcclxuICAgICAgICBpZiAoci5sZW5ndGggPT0gMSlcclxuICAgICAgICAgIHIgPSBcIjBcIiArIHI7XHJcbiAgICAgICAgaWYgKGcubGVuZ3RoID09IDEpXHJcbiAgICAgICAgICBnID0gXCIwXCIgKyBnO1xyXG4gICAgICAgIGlmIChiLmxlbmd0aCA9PSAxKVxyXG4gICAgICAgICAgYiA9IFwiMFwiICsgYjtcclxuICAgICAgICAvLyBpZiAoYS5sZW5ndGggPT0gMSlcclxuICAgICAgICAvLyAgIGEgPSBcIjBcIiArIGE7XHJcbiAgICBcclxuICAgICAgICByZXR1cm4gXCJGXCIgKyByLnRvVXBwZXJDYXNlKCkgKyBnLnRvVXBwZXJDYXNlKCkgKyBiLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvKipcclxuICAgICAqIFByZXBhcmVzIHRoZSBzdHlsZSBvYmplY3QgZm9yIGEgY2VsbCB1c2luZyB0aGUgZGF0YSBhdHRyaWJ1dGVzXHJcbiAgICAgKi9cclxuICAgIGdldFN0eWxlc0RhdGFBdHRyKHRkKSB7XHJcbiAgICAgICAgbGV0IGNzc0NvbXB1dGVkU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGQsIG51bGwpO1xyXG4gICAgICAgIC8vRm9udCBhdHRyc1xyXG4gICAgICAgIGxldCBmb250OiBhbnkgPSB7fTtcclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1mLW5hbWVcIikpXHJcbiAgICAgICAgICBmb250Lm5hbWUgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWYtbmFtZVwiKTtcclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1mLXN6XCIpKSBmb250LnNpemUgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWYtc3pcIik7XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZi1jb2xvclwiKSkge1xyXG4gICAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZi1jb2xvclwiKSAhPSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICBmb250LmNvbG9yID0geyBhcmdiOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWYtY29sb3JcIikgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAvL1NldCBjc3MgY29sb3Igc3R5bGUgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgbGV0IGNvbXB1dGVkQ29sb3IgPSBjc3NDb21wdXRlZFN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKFwiY29sb3JcIik7XHJcbiAgICAgICAgICBsZXQgY29udmVydGVkQ29sb3IgPSB0aGlzLmdldEhleEFyZ2JDb2xvcihjb21wdXRlZENvbG9yKVxyXG4gICAgICAgICAgaWYgKGNvbnZlcnRlZENvbG9yICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgZm9udC5jb2xvciA9IHsgYXJnYjogY29udmVydGVkQ29sb3IgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZi1ib2xkXCIpID09PSBcInRydWVcIikgZm9udC5ib2xkID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1mLWl0YWxpY1wiKSA9PT0gXCJ0cnVlXCIpIGZvbnQuaXRhbGljID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1mLXVuZGVybGluZVwiKSA9PT0gXCJ0cnVlXCIpIGZvbnQudW5kZXJsaW5lID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1mLXN0cmlrZVwiKSA9PT0gXCJ0cnVlXCIpIGZvbnQuc3RyaWtlID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgICAgIC8vIEFsaWdubWVudCBhdHRyc1xyXG4gICAgICAgIGxldCBhbGlnbm1lbnQ6IGFueSA9IHt9O1xyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWEtaFwiKSlcclxuICAgICAgICAgIGFsaWdubWVudC5ob3Jpem9udGFsID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1hLWhcIik7XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYS12XCIpKSB7XHJcbiAgICAgICAgICBhbGlnbm1lbnQudmVydGljYWwgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWEtdlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAvLyBCeSBkZWZhdWx0XHJcbiAgICAgICAgICBhbGlnbm1lbnQudmVydGljYWwgPSBcIm1pZGRsZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1hLXdyYXBcIikgPT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgYWxpZ25tZW50LndyYXBUZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgLy8gQnkgZGVmYXVsdFxyXG4gICAgICAgICAgYWxpZ25tZW50LndyYXBUZXh0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYS10ZXh0LXJvdGF0aW9uXCIpKVxyXG4gICAgICAgICAgYWxpZ25tZW50LnRleHRSb3RhdGlvbiA9IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYS10ZXh0LXJvdGF0aW9uXCIpO1xyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWEtaW5kZW50XCIpKVxyXG4gICAgICAgICAgYWxpZ25tZW50LmluZGVudCA9IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYS1pbmRlbnRcIik7XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYS1ydGxcIikgPT09IFwidHJ1ZVwiKVxyXG4gICAgICAgICAgYWxpZ25tZW50LnJlYWRpbmdPcmRlciA9IFwicnRsXCI7XHJcbiAgICBcclxuICAgICAgICAvLyBCb3JkZXIgYXR0cnNcclxuICAgICAgICBsZXQgYm9yZGVyOiBhbnkgPSB7XHJcbiAgICAgICAgICB0b3A6IHt9LFxyXG4gICAgICAgICAgbGVmdDoge30sXHJcbiAgICAgICAgICBib3R0b206IHt9LFxyXG4gICAgICAgICAgcmlnaHQ6IHt9XHJcbiAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItYS1zXCIpKSB7XHJcbiAgICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLWEtc1wiKSAhPSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItYS1zXCIpO1xyXG4gICAgICAgICAgICBib3JkZXIudG9wLnN0eWxlID0gc3R5bGU7XHJcbiAgICAgICAgICAgIGJvcmRlci5sZWZ0LnN0eWxlID0gc3R5bGU7XHJcbiAgICAgICAgICAgIGJvcmRlci5ib3R0b20uc3R5bGUgPSBzdHlsZTtcclxuICAgICAgICAgICAgYm9yZGVyLnJpZ2h0LnN0eWxlID0gc3R5bGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgLy8gQnkgZGVmYXVsdFxyXG4gICAgICAgICAgYm9yZGVyLnRvcC5zdHlsZSA9IFwidGhpblwiO1xyXG4gICAgICAgICAgYm9yZGVyLmxlZnQuc3R5bGUgPSBcInRoaW5cIjtcclxuICAgICAgICAgIGJvcmRlci5ib3R0b20uc3R5bGUgPSBcInRoaW5cIjtcclxuICAgICAgICAgIGJvcmRlci5yaWdodC5zdHlsZSA9IFwidGhpblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLWEtY1wiKSkge1xyXG4gICAgICAgICAgbGV0IGNvbG9yID0geyBhcmdiOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItYS1jXCIpIH07XHJcbiAgICAgICAgICBib3JkZXIudG9wLmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgICBib3JkZXIubGVmdC5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgICAgYm9yZGVyLmJvdHRvbS5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgICAgYm9yZGVyLnJpZ2h0LmNvbG9yID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItdC1zXCIpKSB7XHJcbiAgICAgICAgICBib3JkZXIudG9wLnN0eWxlID0gdGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLXQtc1wiKTtcclxuICAgICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItdC1jXCIpKVxyXG4gICAgICAgICAgICBib3JkZXIudG9wLmNvbG9yID0geyBhcmdiOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItdC1jXCIpIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItbC1zXCIpKSB7XHJcbiAgICAgICAgICBib3JkZXIubGVmdC5zdHlsZSA9IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi1sLXNcIik7XHJcbiAgICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLWwtY1wiKSlcclxuICAgICAgICAgICAgYm9yZGVyLmxlZnQuY29sb3IgPSB7IGFyZ2I6IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi10LWNcIikgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi1iLXNcIikpIHtcclxuICAgICAgICAgIGJvcmRlci5ib3R0b20uc3R5bGUgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItYi1zXCIpO1xyXG4gICAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi1iLWNcIikpXHJcbiAgICAgICAgICAgIGJvcmRlci5ib3R0b20uY29sb3IgPSB7IGFyZ2I6IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi10LWNcIikgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi1yLXNcIikpIHtcclxuICAgICAgICAgIGJvcmRlci5yaWdodC5zdHlsZSA9IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtYi1yLXNcIik7XHJcbiAgICAgICAgICBpZiAodGQuZ2V0QXR0cmlidXRlKFwiZGF0YS1iLXItY1wiKSlcclxuICAgICAgICAgICAgYm9yZGVyLnJpZ2h0LmNvbG9yID0geyBhcmdiOiB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWItdC1jXCIpIH07XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy9GaWxsXHJcbiAgICAgICAgbGV0IGZpbGw7XHJcbiAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZmlsbC1jb2xvclwiKSkge1xyXG4gICAgICAgICAgaWYgKHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZmlsbC1jb2xvclwiKSAhPSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICBmaWxsID0ge1xyXG4gICAgICAgICAgICAgIHR5cGU6IFwicGF0dGVyblwiLFxyXG4gICAgICAgICAgICAgIHBhdHRlcm46IFwic29saWRcIixcclxuICAgICAgICAgICAgICBmZ0NvbG9yOiB7IGFyZ2I6IHRkLmdldEF0dHJpYnV0ZShcImRhdGEtZmlsbC1jb2xvclwiKSB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgLy9TZXQgY3NzIGNvbG9yIHN0eWxlIGJ5IGRlZmF1bHRcclxuICAgICAgICAgIGxldCBjb21wdXRlZEJhY2tncm91bmRDb2xvciA9IGNzc0NvbXB1dGVkU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoXCJiYWNrZ3JvdW5kLWNvbG9yXCIpO1xyXG4gICAgICAgICAgbGV0IGNvbnZlcnRlZEJhY2tncm91bmRDb2xvciA9IHRoaXMuZ2V0SGV4QXJnYkNvbG9yKGNvbXB1dGVkQmFja2dyb3VuZENvbG9yKVxyXG4gICAgICAgICAgaWYgKGNvbnZlcnRlZEJhY2tncm91bmRDb2xvciAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGZpbGwgPSB7XHJcbiAgICAgICAgICAgICAgdHlwZTogXCJwYXR0ZXJuXCIsXHJcbiAgICAgICAgICAgICAgcGF0dGVybjogXCJzb2xpZFwiLFxyXG4gICAgICAgICAgICAgIGZnQ29sb3I6IHsgYXJnYjogY29udmVydGVkQmFja2dyb3VuZENvbG9yIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL251bWJlciBmb3JtYXRcclxuICAgICAgICBsZXQgbnVtRm10O1xyXG4gICAgICAgIGlmICh0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW51bS1mbXRcIikpXHJcbiAgICAgICAgICBudW1GbXQgPSB0ZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW51bS1mbXRcIik7XHJcbiAgICBcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZm9udCxcclxuICAgICAgICAgIGFsaWdubWVudCxcclxuICAgICAgICAgIGJvcmRlcixcclxuICAgICAgICAgIGZpbGwsXHJcbiAgICAgICAgICBudW1GbXRcclxuICAgICAgICB9O1xyXG4gICAgICB9O1xyXG59XHJcbiJdfQ==