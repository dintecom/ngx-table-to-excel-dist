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
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
TableToExcelService.ctorParameters = () => [
    { type: DomParserService }
];
/** @nocollapse */ TableToExcelService.ngInjectableDef = i0.defineInjectable({ factory: function TableToExcelService_Factory() { return new TableToExcelService(i0.inject(i1.DomParserService)); }, token: TableToExcelService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdG8tZXhjZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10YWJsZS10by1leGNlbC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS10by1leGNlbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sTUFBTSxNQUFNLFlBQVksQ0FBQztBQUNoQyxPQUFPLE9BQU8sTUFBTSxrQ0FBa0MsQ0FBQzs7O0FBS3ZELE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUFFOUIsWUFBNkIsTUFBd0I7UUFBeEIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7SUFBRyxDQUFDOzs7O0lBRXpELFlBQVk7O1lBQ04sRUFBRSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUMvQixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFBQSxDQUFDOzs7Ozs7SUFFRixTQUFTLENBQUMsRUFBRSxFQUFFLFNBQVM7O1lBQ2pCLEVBQUUsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztRQUNuQyxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFBQSxDQUFDOzs7Ozs7SUFFRixJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVE7UUFDZixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUk7Ozs7UUFBQyxVQUFTLE1BQU07WUFDeEMsTUFBTSxDQUNKLElBQUksSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxFQUN4RCxRQUFRLENBQ1QsQ0FBQztRQUNKLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQUFBLENBQUM7Ozs7Ozs7SUFFRixZQUFZLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJOztZQUN0QixFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDNUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQUEsQ0FBQzs7Ozs7O0lBRUYsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJOztZQUNqQixFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUM1QixFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUFBLENBQUM7Ozs7OztJQUVGLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBWSxFQUFFOztZQUN2QixXQUFXLEdBQUc7WUFDaEIsSUFBSSxFQUFFLGFBQWE7WUFDbkIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsS0FBSyxFQUFFO2dCQUNMLElBQUksRUFBRSxTQUFTO2FBQ2hCO1NBQ0Y7UUFDRCxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDOztZQUN4QyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQUEsQ0FBQzs7O1lBakRILFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQU5RLGdCQUFnQjs7Ozs7Ozs7SUFTWCxxQ0FBeUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21QYXJzZXJTZXJ2aWNlIH0gZnJvbSBcIi4vZG9tLXBhcnNlci5zZXJ2aWNlXCI7XG5pbXBvcnQgc2F2ZUFzIGZyb20gJ2ZpbGUtc2F2ZXInO1xuaW1wb3J0IEV4Y2VsSlMgZnJvbSAnZXhjZWxqcy9kaXN0L2VzNS9leGNlbGpzLmJyb3dzZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUYWJsZVRvRXhjZWxTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHBhcnNlcjogRG9tUGFyc2VyU2VydmljZSkge31cblxuICBpbml0V29ya0Jvb2soKSB7XG4gICAgbGV0IHdiID0gbmV3IEV4Y2VsSlMuV29ya2Jvb2soKTtcbiAgICByZXR1cm4gd2I7XG4gIH07XG5cbiAgaW5pdFNoZWV0KHdiLCBzaGVldE5hbWUpIHtcbiAgICBsZXQgd3MgPSB3Yi5hZGRXb3Jrc2hlZXQoc2hlZXROYW1lKTtcbiAgICByZXR1cm4gd3M7XG4gIH07XG5cbiAgc2F2ZSh3YiwgZmlsZU5hbWUpIHtcbiAgICB3Yi54bHN4LndyaXRlQnVmZmVyKCkudGhlbihmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgIHNhdmVBcyhcbiAgICAgICAgbmV3IEJsb2IoW2J1ZmZlcl0sIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIiB9KSxcbiAgICAgICAgZmlsZU5hbWVcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgdGFibGVUb1NoZWV0KHdiLCB0YWJsZSwgb3B0cykge1xuICAgIGxldCB3cyA9IHRoaXMuaW5pdFNoZWV0KHdiLCBvcHRzLnNoZWV0Lm5hbWUpO1xuICAgIHdzID0gdGhpcy5wYXJzZXIucGFyc2VEb21Ub1RhYmxlKHdzLCB0YWJsZSwgb3B0cyk7XG4gICAgcmV0dXJuIHdiO1xuICB9O1xuXG4gIHRhYmxlVG9Cb29rKHRhYmxlLCBvcHRzKSB7XG4gICAgbGV0IHdiID0gdGhpcy5pbml0V29ya0Jvb2soKTtcbiAgICB3YiA9IHRoaXMudGFibGVUb1NoZWV0KHdiLCB0YWJsZSwgb3B0cyk7XG4gICAgcmV0dXJuIHdiO1xuICB9O1xuXG4gIGNvbnZlcnQodGFibGUsIG9wdHM6IGFueSA9IHt9KSB7XG4gICAgbGV0IGRlZmF1bHRPcHRzID0ge1xuICAgICAgbmFtZTogXCJleHBvcnQueGxzeFwiLFxuICAgICAgYXV0b1N0eWxlOiBmYWxzZSxcbiAgICAgIHNoZWV0OiB7XG4gICAgICAgIG5hbWU6IFwiU2hlZXQgMVwiXG4gICAgICB9XG4gICAgfTtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdHMsIG9wdHMpO1xuICAgIGxldCB3YiA9IHRoaXMudGFibGVUb0Jvb2sodGFibGUsIG9wdHMpO1xuICAgIHRoaXMuc2F2ZSh3Yiwgb3B0cy5uYW1lKTtcbiAgfTtcbn1cbiJdfQ==