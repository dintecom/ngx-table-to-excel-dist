/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DomParserService } from "./dom-parser.service";
import saveAs from 'file-saver';
import ExcelJS from 'exceljs/dist/es5/exceljs.browser';
export class TableToExcelService {
    /**
     * @param {?} parser
     */
    constructor(parser) {
        this.parser = parser;
    }
    /**
     * @return {?}
     */
    initWorkBook() {
        /** @type {?} */
        let wb = new ExcelJS.Workbook();
        return wb;
    }
    ;
    /**
     * @param {?} wb
     * @param {?} sheetName
     * @return {?}
     */
    initSheet(wb, sheetName) {
        /** @type {?} */
        let ws = wb.addWorksheet(sheetName);
        return ws;
    }
    ;
    /**
     * @param {?} wb
     * @param {?} fileName
     * @return {?}
     */
    save(wb, fileName) {
        wb.xlsx.writeBuffer().then((/**
         * @param {?} buffer
         * @return {?}
         */
        function (buffer) {
            saveAs(new Blob([buffer], { type: "application/octet-stream" }), fileName);
        }));
    }
    ;
    /**
     * @param {?} wb
     * @param {?} table
     * @param {?} opts
     * @return {?}
     */
    tableToSheet(wb, table, opts) {
        /** @type {?} */
        let ws = this.initSheet(wb, opts.sheet.name);
        ws = this.parser.parseDomToTable(ws, table, opts);
        return wb;
    }
    ;
    /**
     * @param {?} table
     * @param {?} opts
     * @return {?}
     */
    tableToBook(table, opts) {
        /** @type {?} */
        let wb = this.initWorkBook();
        wb = this.tableToSheet(wb, table, opts);
        return wb;
    }
    ;
    /**
     * @param {?} table
     * @param {?=} opts
     * @return {?}
     */
    convert(table, opts = {}) {
        /** @type {?} */
        let defaultOpts = {
            name: "export.xlsx",
            autoStyle: false,
            sheet: {
                name: "Sheet 1"
            }
        };
        opts = Object.assign({}, defaultOpts, opts);
        /** @type {?} */
        let wb = this.tableToBook(table, opts);
        this.save(wb, opts.name);
    }
    ;
}
TableToExcelService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TableToExcelService.ctorParameters = () => [
    { type: DomParserService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    TableToExcelService.prototype.parser;
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdG8tZXhjZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10YWJsZS10by1leGNlbC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS10by1leGNlbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sTUFBTSxNQUFNLFlBQVksQ0FBQztBQUNoQyxPQUFPLE9BQU8sTUFBTSxrQ0FBa0MsQ0FBQztBQUd2RCxNQUFNLE9BQU8sbUJBQW1COzs7O0lBRTlCLFlBQTZCLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQzs7OztJQUV6RCxZQUFZOztZQUNOLEVBQUUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7UUFDL0IsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQUEsQ0FBQzs7Ozs7O0lBRUYsU0FBUyxDQUFDLEVBQUUsRUFBRSxTQUFTOztZQUNqQixFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDbkMsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQUEsQ0FBQzs7Ozs7O0lBRUYsSUFBSSxDQUFDLEVBQUUsRUFBRSxRQUFRO1FBQ2YsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJOzs7O1FBQUMsVUFBUyxNQUFNO1lBQ3hDLE1BQU0sQ0FDSixJQUFJLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLENBQUMsRUFDeEQsUUFBUSxDQUNULENBQUM7UUFDSixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFBQSxDQUFDOzs7Ozs7O0lBRUYsWUFBWSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSTs7WUFDdEIsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzVDLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUFBLENBQUM7Ozs7OztJQUVGLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSTs7WUFDakIsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7UUFDNUIsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFBQSxDQUFDOzs7Ozs7SUFFRixPQUFPLENBQUMsS0FBSyxFQUFFLE9BQVksRUFBRTs7WUFDdkIsV0FBVyxHQUFHO1lBQ2hCLElBQUksRUFBRSxhQUFhO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsU0FBUzthQUNoQjtTQUNGO1FBQ0QsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7WUFDeEMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUFBLENBQUM7OztZQS9DSCxVQUFVOzs7O1lBSkYsZ0JBQWdCOzs7Ozs7O0lBT1gscUNBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tUGFyc2VyU2VydmljZSB9IGZyb20gXCIuL2RvbS1wYXJzZXIuc2VydmljZVwiO1xuaW1wb3J0IHNhdmVBcyBmcm9tICdmaWxlLXNhdmVyJztcbmltcG9ydCBFeGNlbEpTIGZyb20gJ2V4Y2VsanMvZGlzdC9lczUvZXhjZWxqcy5icm93c2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRhYmxlVG9FeGNlbFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgcGFyc2VyOiBEb21QYXJzZXJTZXJ2aWNlKSB7fVxuXG4gIGluaXRXb3JrQm9vaygpIHtcbiAgICBsZXQgd2IgPSBuZXcgRXhjZWxKUy5Xb3JrYm9vaygpO1xuICAgIHJldHVybiB3YjtcbiAgfTtcblxuICBpbml0U2hlZXQod2IsIHNoZWV0TmFtZSkge1xuICAgIGxldCB3cyA9IHdiLmFkZFdvcmtzaGVldChzaGVldE5hbWUpO1xuICAgIHJldHVybiB3cztcbiAgfTtcblxuICBzYXZlKHdiLCBmaWxlTmFtZSkge1xuICAgIHdiLnhsc3gud3JpdGVCdWZmZXIoKS50aGVuKGZ1bmN0aW9uKGJ1ZmZlcikge1xuICAgICAgc2F2ZUFzKFxuICAgICAgICBuZXcgQmxvYihbYnVmZmVyXSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiIH0pLFxuICAgICAgICBmaWxlTmFtZVxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICB0YWJsZVRvU2hlZXQod2IsIHRhYmxlLCBvcHRzKSB7XG4gICAgbGV0IHdzID0gdGhpcy5pbml0U2hlZXQod2IsIG9wdHMuc2hlZXQubmFtZSk7XG4gICAgd3MgPSB0aGlzLnBhcnNlci5wYXJzZURvbVRvVGFibGUod3MsIHRhYmxlLCBvcHRzKTtcbiAgICByZXR1cm4gd2I7XG4gIH07XG5cbiAgdGFibGVUb0Jvb2sodGFibGUsIG9wdHMpIHtcbiAgICBsZXQgd2IgPSB0aGlzLmluaXRXb3JrQm9vaygpO1xuICAgIHdiID0gdGhpcy50YWJsZVRvU2hlZXQod2IsIHRhYmxlLCBvcHRzKTtcbiAgICByZXR1cm4gd2I7XG4gIH07XG5cbiAgY29udmVydCh0YWJsZSwgb3B0czogYW55ID0ge30pIHtcbiAgICBsZXQgZGVmYXVsdE9wdHMgPSB7XG4gICAgICBuYW1lOiBcImV4cG9ydC54bHN4XCIsXG4gICAgICBhdXRvU3R5bGU6IGZhbHNlLFxuICAgICAgc2hlZXQ6IHtcbiAgICAgICAgbmFtZTogXCJTaGVldCAxXCJcbiAgICAgIH1cbiAgICB9O1xuICAgIG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0cywgb3B0cyk7XG4gICAgbGV0IHdiID0gdGhpcy50YWJsZVRvQm9vayh0YWJsZSwgb3B0cyk7XG4gICAgdGhpcy5zYXZlKHdiLCBvcHRzLm5hbWUpO1xuICB9O1xufVxuIl19