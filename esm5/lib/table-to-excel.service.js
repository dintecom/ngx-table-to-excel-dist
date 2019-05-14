/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { DomParserService } from "./dom-parser.service";
import saveAs from 'file-saver';
import ExcelJS from 'exceljs/dist/es5/exceljs.browser';
import * as i0 from "@angular/core";
import * as i1 from "./dom-parser.service";
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    TableToExcelService.ctorParameters = function () { return [
        { type: DomParserService }
    ]; };
    /** @nocollapse */ TableToExcelService.ngInjectableDef = i0.defineInjectable({ factory: function TableToExcelService_Factory() { return new TableToExcelService(i0.inject(i1.DomParserService)); }, token: TableToExcelService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdG8tZXhjZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10YWJsZS10by1leGNlbC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS10by1leGNlbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sTUFBTSxNQUFNLFlBQVksQ0FBQztBQUNoQyxPQUFPLE9BQU8sTUFBTSxrQ0FBa0MsQ0FBQzs7O0FBRXZEO0lBS0UsNkJBQTZCLE1BQXdCO1FBQXhCLFdBQU0sR0FBTixNQUFNLENBQWtCO0lBQUcsQ0FBQzs7OztJQUV6RCwwQ0FBWTs7O0lBQVo7O1lBQ00sRUFBRSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUMvQixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFBQSxDQUFDOzs7Ozs7SUFFRix1Q0FBUzs7Ozs7SUFBVCxVQUFVLEVBQUUsRUFBRSxTQUFTOztZQUNqQixFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDbkMsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQUEsQ0FBQzs7Ozs7O0lBRUYsa0NBQUk7Ozs7O0lBQUosVUFBSyxFQUFFLEVBQUUsUUFBUTtRQUNmLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSTs7OztRQUFDLFVBQVMsTUFBTTtZQUN4QyxNQUFNLENBQ0osSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxDQUFDLEVBQ3hELFFBQVEsQ0FDVCxDQUFDO1FBQ0osQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBQUEsQ0FBQzs7Ozs7OztJQUVGLDBDQUFZOzs7Ozs7SUFBWixVQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSTs7WUFDdEIsRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzVDLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUFBLENBQUM7Ozs7OztJQUVGLHlDQUFXOzs7OztJQUFYLFVBQVksS0FBSyxFQUFFLElBQUk7O1lBQ2pCLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQzVCLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQUEsQ0FBQzs7Ozs7O0lBRUYscUNBQU87Ozs7O0lBQVAsVUFBUSxLQUFLLEVBQUUsSUFBYztRQUFkLHFCQUFBLEVBQUEsU0FBYzs7WUFDdkIsV0FBVyxHQUFHO1lBQ2hCLElBQUksRUFBRSxhQUFhO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsU0FBUzthQUNoQjtTQUNGO1FBQ0QsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7WUFDeEMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUFBLENBQUM7O2dCQWpESCxVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQU5RLGdCQUFnQjs7OzhCQUR6QjtDQXVEQyxBQWxERCxJQWtEQztTQS9DWSxtQkFBbUI7Ozs7OztJQUVsQixxQ0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21QYXJzZXJTZXJ2aWNlIH0gZnJvbSBcIi4vZG9tLXBhcnNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgc2F2ZUFzIGZyb20gJ2ZpbGUtc2F2ZXInO1xuaW1wb3J0IEV4Y2VsSlMgZnJvbSAnZXhjZWxqcy9kaXN0L2VzNS9leGNlbGpzLmJyb3dzZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUYWJsZVRvRXhjZWxTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHBhcnNlcjogRG9tUGFyc2VyU2VydmljZSkge31cblxuICBpbml0V29ya0Jvb2soKSB7XG4gICAgbGV0IHdiID0gbmV3IEV4Y2VsSlMuV29ya2Jvb2soKTtcbiAgICByZXR1cm4gd2I7XG4gIH07XG5cbiAgaW5pdFNoZWV0KHdiLCBzaGVldE5hbWUpIHtcbiAgICBsZXQgd3MgPSB3Yi5hZGRXb3Jrc2hlZXQoc2hlZXROYW1lKTtcbiAgICByZXR1cm4gd3M7XG4gIH07XG5cbiAgc2F2ZSh3YiwgZmlsZU5hbWUpIHtcbiAgICB3Yi54bHN4LndyaXRlQnVmZmVyKCkudGhlbihmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgIHNhdmVBcyhcbiAgICAgICAgbmV3IEJsb2IoW2J1ZmZlcl0sIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIiB9KSxcbiAgICAgICAgZmlsZU5hbWVcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgdGFibGVUb1NoZWV0KHdiLCB0YWJsZSwgb3B0cykge1xuICAgIGxldCB3cyA9IHRoaXMuaW5pdFNoZWV0KHdiLCBvcHRzLnNoZWV0Lm5hbWUpO1xuICAgIHdzID0gdGhpcy5wYXJzZXIucGFyc2VEb21Ub1RhYmxlKHdzLCB0YWJsZSwgb3B0cyk7XG4gICAgcmV0dXJuIHdiO1xuICB9O1xuXG4gIHRhYmxlVG9Cb29rKHRhYmxlLCBvcHRzKSB7XG4gICAgbGV0IHdiID0gdGhpcy5pbml0V29ya0Jvb2soKTtcbiAgICB3YiA9IHRoaXMudGFibGVUb1NoZWV0KHdiLCB0YWJsZSwgb3B0cyk7XG4gICAgcmV0dXJuIHdiO1xuICB9O1xuXG4gIGNvbnZlcnQodGFibGUsIG9wdHM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGRlZmF1bHRPcHRzID0ge1xuICAgICAgbmFtZTogXCJleHBvcnQueGxzeFwiLFxuICAgICAgYXV0b1N0eWxlOiBmYWxzZSxcbiAgICAgIHNoZWV0OiB7XG4gICAgICAgIG5hbWU6IFwiU2hlZXQgMVwiXG4gICAgICB9XG4gICAgfTtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdHMsIG9wdHMpO1xuICAgIGxldCB3YiA9IHRoaXMudGFibGVUb0Jvb2sodGFibGUsIG9wdHMpO1xuICAgIHRoaXMuc2F2ZSh3Yiwgb3B0cy5uYW1lKTtcbiAgfTtcbn1cbiJdfQ==