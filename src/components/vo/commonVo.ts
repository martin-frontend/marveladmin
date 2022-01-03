import { exportJson2Excel } from "@/core/global/Excel";

export module BaseInfo {
    export enum DateRangeKey {
        dateFrom = "created_at-{>=}",
        dateTo = "created_at-{<=}"
    }
    export interface IColumn {
        name: string,
        options: { [index: string]: string }
    }
    export class ExportExcel {
        private _fileName: string = "";
        private _headerList: string[] = [];
        private _keyList: string[] = [];
        private _data: any[] = [];
        private _columnInfo: { [key: string]: BaseInfo.IColumn } = {};
        /**
 * @constructor
 * @type {string} fileName 挡案名称
 * @type {string[]} keyList 栏位顺序
 * @type { [key: string]: BaseInfo.IColumn } columnInfo 栏位资讯
 * @type {any[]} data 栏位资料
 * @type {string[]} convertKeys 特定栏位转换值
 * @type {string[]} excludeKeys 排除特定栏位
 */
        constructor(fileName: string, keyList: string[], columnInfo: { [key: string]: BaseInfo.IColumn }, data: any[], convertKeys: string[], excludeKeys: string[] = []) {
            this._fileName = fileName;
            this._columnInfo = columnInfo;
            this._keyList = keyList;
            //有特定欄位順序
            if (this._keyList.length > 0) {
                for (let key of this._keyList) {
                    if (!excludeKeys.includes(key)) {
                        this._headerList.push(this._columnInfo[key].name);
                    }
                }
            }
            else {
                Object.keys(this._columnInfo).forEach((element) => {
                    this._headerList.push(this._columnInfo[element].name);
                });
            }
            this._data = this.valueToData(data, convertKeys);
            exportJson2Excel(this._headerList, this._data, this._fileName, undefined, undefined);
        }

        get fileName() {
            return this._fileName;
        }
        get header() {
            return this._headerList;
        }
        get keyList() {
            return this._keyList;
        }

        /**
* @param {string[]} keys 将特定栏位的值转为对应资料
*/
        public valueToData(data: any[], keys: string[]) {
            return data.map((data: any) =>
                this._keyList.map((key: string) => {
                    if (keys.includes(key)) {
                        return this._columnInfo[key].options[data[key]];
                    }
                    return data[key];
                })
            );
        }
    }
}