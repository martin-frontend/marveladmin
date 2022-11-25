import AbstractProxy from "@/core/abstract/AbstractProxy";
import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { getPageSetting } from "@/views/_user_detail/PageSetting";
import { HttpType } from "@/views/_user_detail/setting";
import ITabWaterRateProxy from "./ITabWaterRateProxy";

export default class TabWaterRateProxy extends AbstractProxy implements ITabWaterRateProxy {
    static NAME = "TabWaterRateProxy";
    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_user_table_columns);
    }

    /**离开页面时调用 */
    leave() {}

    /**表格相关数据 */
    tableData = {
        columns: {
            vendor_type: { name: "", options: {} },
            water_config: { name: "", options: {} },
            vendor_type_switch: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 10 },
        showSwtich: false,
    };

    water_config = <any>{};

    api_admin_plat_user_show() {
        this.sendNotification(HttpType.admin_plat_user_show, { user_id: getPageSetting().user_id });
    }

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        this.api_admin_plat_user_show();
    }

    /**表格数据 */
    setTableData(data: any) {
        this.water_config = JSON.parse(JSON.stringify(data.water_config));

        let list = <any>[];
        Object.keys(data.water_config).forEach(element => {
            list.push({
                type: element,
                water_rate: data.water_config[element],
                vendor_type_switch: data.vendor_type_switch[element],
            });
        });

        this.tableData.showSwtich = Object.keys(data.vendor_type_switch).length > 0;

        this.tableData.list.length = 0;
        this.tableData.list.push(...list);
    }

    /**更新流水配置 */
    onUpdateWaterRate() {
        this.sendNotification(HttpType.admin_plat_user_update, {
            user_id: getPageSetting().user_id,
            water_config: JSON.stringify(this.water_config),
        });
    }

    onSwitch() {
        const obj = <any>{};
        // @ts-ignore
        this.tableData.list.forEach(({ type, vendor_type_switch }) => {
            obj[type] = vendor_type_switch;
        });

        this.sendNotification(HttpType.admin_plat_user_update, {
            user_id: getPageSetting().user_id,
            vendor_type_switch: JSON.stringify(obj),
        });
    }
}
