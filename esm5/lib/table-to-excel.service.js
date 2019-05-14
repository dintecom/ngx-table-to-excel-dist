/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DomParserService } from "./dom-parser.service";
import saveAs from 'file-saver';
import ExcelJS from 'exceljs/dist/es5/exceljs.browser';
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
    ;
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
    ;
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
    ;
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
    ;
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
    ;
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
    ;
    TableToExcelService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    TableToExcelService.ctorParameters = function () { return [
        { type: DomParserService }
    ]; };
    return TableToExcelService;
}());
export { TableToExcelService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdG8tZXhjZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10YWJsZS10by1leGNlbC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS10by1leGNlbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sTUFBTSxNQUFNLFlBQVksQ0FBQztBQUNoQyxPQUFPLE9BQU8sTUFBTSxrQ0FBa0MsQ0FBQztBQUV2RDtJQUdFLDZCQUE2QixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFHLENBQUM7Ozs7SUFFekQsMENBQVk7OztJQUFaOztZQUNNLEVBQUUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUU7UUFDL0IsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQUEsQ0FBQzs7Ozs7O0lBRUYsdUNBQVM7Ozs7O0lBQVQsVUFBVSxFQUFFLEVBQUUsU0FBUzs7WUFDakIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1FBQ25DLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUFBLENBQUM7Ozs7OztJQUVGLGtDQUFJOzs7OztJQUFKLFVBQUssRUFBRSxFQUFFLFFBQVE7UUFDZixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUk7Ozs7UUFBQyxVQUFTLE1BQU07WUFDeEMsTUFBTSxDQUNKLElBQUksSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxFQUN4RCxRQUFRLENBQ1QsQ0FBQztRQUNKLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQUFBLENBQUM7Ozs7Ozs7SUFFRiwwQ0FBWTs7Ozs7O0lBQVosVUFBYSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUk7O1lBQ3RCLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM1QyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFBQSxDQUFDOzs7Ozs7SUFFRix5Q0FBVzs7Ozs7SUFBWCxVQUFZLEtBQUssRUFBRSxJQUFJOztZQUNqQixFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUM1QixFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUFBLENBQUM7Ozs7OztJQUVGLHFDQUFPOzs7OztJQUFQLFVBQVEsS0FBSyxFQUFFLElBQWM7UUFBZCxxQkFBQSxFQUFBLFNBQWM7O1lBQ3ZCLFdBQVcsR0FBRztZQUNoQixJQUFJLEVBQUUsYUFBYTtZQUNuQixTQUFTLEVBQUUsS0FBSztZQUNoQixLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFNBQVM7YUFDaEI7U0FDRjtRQUNELElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7O1lBQ3hDLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFBQSxDQUFDOztnQkEvQ0gsVUFBVTs7OztnQkFKRixnQkFBZ0I7O0lBb0R6QiwwQkFBQztDQUFBLEFBaERELElBZ0RDO1NBL0NZLG1CQUFtQjs7Ozs7O0lBRWxCLHFDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVBhcnNlclNlcnZpY2UgfSBmcm9tIFwiLi9kb20tcGFyc2VyLnNlcnZpY2VcIjtcbmltcG9ydCBzYXZlQXMgZnJvbSAnZmlsZS1zYXZlcic7XG5pbXBvcnQgRXhjZWxKUyBmcm9tICdleGNlbGpzL2Rpc3QvZXM1L2V4Y2VsanMuYnJvd3Nlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJsZVRvRXhjZWxTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHBhcnNlcjogRG9tUGFyc2VyU2VydmljZSkge31cblxuICBpbml0V29ya0Jvb2soKSB7XG4gICAgbGV0IHdiID0gbmV3IEV4Y2VsSlMuV29ya2Jvb2soKTtcbiAgICByZXR1cm4gd2I7XG4gIH07XG5cbiAgaW5pdFNoZWV0KHdiLCBzaGVldE5hbWUpIHtcbiAgICBsZXQgd3MgPSB3Yi5hZGRXb3Jrc2hlZXQoc2hlZXROYW1lKTtcbiAgICByZXR1cm4gd3M7XG4gIH07XG5cbiAgc2F2ZSh3YiwgZmlsZU5hbWUpIHtcbiAgICB3Yi54bHN4LndyaXRlQnVmZmVyKCkudGhlbihmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgIHNhdmVBcyhcbiAgICAgICAgbmV3IEJsb2IoW2J1ZmZlcl0sIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIiB9KSxcbiAgICAgICAgZmlsZU5hbWVcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgdGFibGVUb1NoZWV0KHdiLCB0YWJsZSwgb3B0cykge1xuICAgIGxldCB3cyA9IHRoaXMuaW5pdFNoZWV0KHdiLCBvcHRzLnNoZWV0Lm5hbWUpO1xuICAgIHdzID0gdGhpcy5wYXJzZXIucGFyc2VEb21Ub1RhYmxlKHdzLCB0YWJsZSwgb3B0cyk7XG4gICAgcmV0dXJuIHdiO1xuICB9O1xuXG4gIHRhYmxlVG9Cb29rKHRhYmxlLCBvcHRzKSB7XG4gICAgbGV0IHdiID0gdGhpcy5pbml0V29ya0Jvb2soKTtcbiAgICB3YiA9IHRoaXMudGFibGVUb1NoZWV0KHdiLCB0YWJsZSwgb3B0cyk7XG4gICAgcmV0dXJuIHdiO1xuICB9O1xuXG4gIGNvbnZlcnQodGFibGUsIG9wdHM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGRlZmF1bHRPcHRzID0ge1xuICAgICAgbmFtZTogXCJleHBvcnQueGxzeFwiLFxuICAgICAgYXV0b1N0eWxlOiBmYWxzZSxcbiAgICAgIHNoZWV0OiB7XG4gICAgICAgIG5hbWU6IFwiU2hlZXQgMVwiXG4gICAgICB9XG4gICAgfTtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdHMsIG9wdHMpO1xuICAgIGxldCB3YiA9IHRoaXMudGFibGVUb0Jvb2sodGFibGUsIG9wdHMpO1xuICAgIHRoaXMuc2F2ZSh3Yiwgb3B0cy5uYW1lKTtcbiAgfTtcbn1cbiJdfQ==