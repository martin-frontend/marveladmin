import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import { getPageSetting } from "@/views/_user_detail/PageSetting";
import { HttpType } from "@/views/_user_detail/setting";
import ITabCommissionProxy from "./ITabCommissionProxy";
import i18n from "@/lang";

export default class TabCommissionProxy extends AbstractProxy implements ITabCommissionProxy {
    static NAME = "TabCommissionProxy";
    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_user_commission_table_columns);
        this.listQuery.user_id = getPageSetting().user_id;
    }

    /**离开页面时调用 */
    leave() {}

    /**表格相关数据 */
    tableData = {
        columns: {
            commission: {
                commission_history_num: "",
                commission_received_num: "",
                date: { name: "" },
                direct_water: { name: "" },
                group_water: { name: "" },
                keep_time: { name: "" },
                total_commission: { name: "" },
                total_water: { name: "" },
            },
            commission_detail: {
                commission_awaiting_num: { name: "" },
                commission_info: {
                    agent_commission: { name: "" },
                    commission_num: { name: "" },
                    direct_commission: { name: "" },
                    direct_water: { name: "" },
                    group_water: { name: "" },
                    is_promotion_floor: { name: "" },
                    self_water: { name: "" },
                    total_commission: { name: "" },
                    total_water: { name: "" },
                    vendor_type: {
                        name: "",
                        options: <any>{},
                    },
                },
                commission_received_num: { name: "" },
                date: { name: "" },
                directly_users: { name: "" },
                group_users: { name: "" },
                invite_user_id: { name: "" },
                today_directly_users: { name: "" },
                today_group_users: { name: "" },
                total_agent_commission: { name: "" },
                total_commission: { name: "" },
                total_direct_commission: { name: "" },
                statistics_data: {
                    agent_commission_summary: { name: "" },
                    direct_water_summary: { name: "" },
                    group_water_summary: { name: "" },
                    self_water_summary: { name: "" },
                    total_agent_commission: { name: "" },
                    total_agent_commission_summary: { name: "" },
                    total_commission: { name: "" },
                    total_direct_commission: { name: "" },
                    total_water_summary: { name: "" },
                },
            },
            directs_water: {
                group_users: { name: "" },
                new_group_users: { name: "" },
                nick_name: { name: "" },
                order_by: { name: "", type: {}, rule: {} },
                user_id: { name: "" },
                water_info: {
                    commission_num: { name: "" },
                    group_water: { name: "" },
                    is_promotion_floor: { name: "" },
                    self_water: { name: "" },
                    vendor_type: {
                        name: "",
                        options: {},
                    },
                },
            },
        },
        list: <any>[],
        commission_history_num: "0.000",
        commission_received_num: "0.000",
        summary: {},
    };

    // 返佣详情
    dialogData = {
        bShow: false,
        //业积详情
        detailData: {
            listQuery: {
                user_id: 0,
                date: "",
            },
            tableData: {
                ommission_awaiting_num: "",
                commission_info: <any>{},
                commission_received_num: "",
                date: "",
                directly_users: 0,
                group_users: 0,
                invite_user_id: 0,
                promotion_status: 0,
                promotion_tutorial_url: "",
                promotion_url: "",
                statistics_data: {
                    agent_commission_summary: "",
                    direct_water_summary: "",
                    group_water_summary: "",
                    self_water_summary: "",
                    total_agent_commission: "",
                    total_agent_commission_summary: "",
                    total_commission: "",
                    total_direct_commission: "",
                    total_water_summary: "",
                },
                today_directly_users: 0,
                today_group_users: 0,
            },
            infoList: <any>[],
        },

        // 直属详情
        directData: {
            listQuery: {
                user_id: 0,
                date: "",
                order_by_vendor_type: "",
                order_by_type: "",
                order_by_rule: "",
                page_count: 1,
                page_size: 10,
            },
            tableData: {
                list: <any>[],
                order_by: {
                    order_by_rule: "",
                    order_by_type: "",
                    order_by_vendor_type: "",
                },
                pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
            },
        },
    };

    /**查询条件 */
    listQuery = {
        user_id: 0,
        start_date: dateFormat(getTodayOffset(-6), "yyyy-MM-dd"),
        end_date: dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd"),
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
    }

    /**表格数据 */
    setTableData(data: any) {
        const total: any = {
            // 这里的合计不能翻 需要拿来判断
            date: "合计",
            direct_water: data.summary.direct_water,
            group_water: data.summary.group_water,
            total_commission: data.summary.total_commission,
            total_water: data.summary.total_water,
        };
        Object.assign(this.tableData, JSON.parse(JSON.stringify(data)));
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        this.tableData.list.unshift(total);
    }
    /**顯示表单弹窗 */
    showDetail(data: any) {
        const query = {
            date: data.date,
            user_id: this.listQuery.user_id,
        };
        this.dialogData.bShow = true;
        Object.assign(this.dialogData.detailData.listQuery, query);
        Object.assign(this.dialogData.directData.listQuery, query);

        this.getDetail();
    }
    /**取得业积详情 */
    getDetail() {
        this.sendNotification(
            HttpType.admin_plat_user_commission_show,
            objectRemoveNull(this.dialogData.detailData.listQuery)
        );
    }
    /**取得直属详情 */
    getDirectWater() {
        this.sendNotification(
            HttpType.admin_plat_user_commission_show_directs_water,
            objectRemoveNull(this.dialogData.directData.listQuery)
        );
    }
    /**设置业积详情数据 */
    setDetail(data: any) {
        this.dialogData.detailData.tableData = JSON.parse(JSON.stringify(data));
        this.dialogData.detailData.infoList.length = 0;
        Object.keys(this.tableData.columns.commission_detail.commission_info.vendor_type.options).forEach(element => {
            this.dialogData.detailData.infoList.push({
                key: element,
                title: this.tableData.columns.commission_detail.commission_info.vendor_type.options[element],
                total_water: this.dialogData.detailData.tableData.commission_info[element].total_water,
                self_water: this.dialogData.detailData.tableData.commission_info[element].self_water,
                direct_water: this.dialogData.detailData.tableData.commission_info[element].direct_water,
                group_water: this.dialogData.detailData.tableData.commission_info[element].group_water,
                commission_num: this.dialogData.detailData.tableData.commission_info[element].commission_num,
                total_commission: this.dialogData.detailData.tableData.commission_info[element].total_commission,
                is_promotion_floor: this.dialogData.detailData.tableData.commission_info[element].is_promotion_floor,
            });
        });
        this.dialogData.detailData.infoList.push({
            title: <string>LangUtil("合计"),
            total_water: this.dialogData.detailData.tableData.statistics_data.total_water_summary,
            self_water: this.dialogData.detailData.tableData.statistics_data.self_water_summary,
            direct_water: this.dialogData.detailData.tableData.statistics_data.direct_water_summary,
            group_water: this.dialogData.detailData.tableData.statistics_data.group_water_summary,
            commission_num: "",
            total_commission: this.dialogData.detailData.tableData.statistics_data.agent_commission_summary,
            is_promotion_floor: "",
        });
    }
    /**设置直属详情数据 */
    setDirectWater(data: any) {
        this.dialogData.directData.tableData.list.length = 0;
        this.dialogData.directData.tableData.list.push(...data.list);
        Object.assign(this.dialogData.directData.tableData.pageInfo, data.pageInfo);
    }
    /**重置查询数据 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            start_date: dateFormat(getTodayOffset(-6), "yyyy-MM-dd"),
            end_date: dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd"),
        });
    }
    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_user_commission_index, objectRemoveNull(this.listQuery));
    }
}
