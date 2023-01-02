import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { dateFormat, formCompared, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_agent_manage_bind/setting";
import { MessageBox } from "element-ui";
import IPlatAgentManageBindProxy from "./IPlatAgentManageBindProxy";

export default class PlatAgentManageBindProxy extends AbstractProxy implements IPlatAgentManageBindProxy {
    static NAME = "PlatAgentManageBindProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_agent_manage_bind_table_columns);
    }

    /**离开页面时调用 */
    leave() {
        this.tableData.list = [];
        Object.assign(this.tableData.pageInfo, {
            pageTotal: 0,
            pageCurrent: 0,
            pageCount: 1,
        });
    }

    /**表格相关数据 */
    tableData = {
        columns: <any>{
            // TODO
            agent_user_id: { name: "代理ID", options: {} },
            binded_at: { name: "绑定时间", options: {} },
            bonus_ratio: { name: "分红统计比例" },
            channel_id: <any>{ name: "所属渠道", options: {} },
            commission_awaiting_num: { name: "当前可领取佣金", options: {} },
            commission_received_num: { name: "已领取佣金总额", options: {} },
            directly_users: { name: "直属代理人数", options: {} },
            total_group_all_users: { name: "团队人数", options: {} },
            invite_user_id: { name: "绑定上级ID", options: {} },
            nick_name: { name: "用户昵称", options: {} },
            parent_nick_name: { name: "绑定上级昵称", options: {} },
            plat_id: { name: "所属平台", options: {} },
            promotion_floor: { name: "保底设定", options: {} },
            user_id: { name: "用户ID", options: {} },
            vendor_type_0: { name: "所有-每万返佣保底", options: {} },
            vendor_type_2: { name: "棋牌-每万返佣保底", options: {} },
            vendor_type_4: { name: "彩票-每万返佣保底", options: {} },
            vendor_type_8: { name: "捕鱼-每万返佣保底", options: {} },
            vendor_type_16: { name: "电子-每万返佣保底", options: {} },
            vendor_type_32: { name: "真人-每万返佣保底", options: {} },
            vendor_type_64: { name: "体育-每万返佣保底", options: {} },
            vendor_type_128: { name: "电竞-每万返佣保底", options: {} },
            version: { name: "推广配置版本", options: {} },
            is_agent_bonus: { name: "", options: {} },
            agent_bonus_rate: { name: "", options: {} },
            channel_id_option: {},
            username: { name: "", options: {} },
            bind_depth: { name: "", options: {} },
            group_all_recharge: { name: "", options: {} },
            group_all_exchange: { name: "", options: {} },
            group_all_total_water: { name: "", options: {} },
            directly_total_water: { name: "", options: {} },
            commission_total: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        extra_info: {
            show_is_agent_bonus: false,
        },
    };
    /**查询条件 */
    listQuery = {
        agent_user_id: "",
        page_count: 1,
        page_size: 20,
        plat_id: "",
        binded_start: "",
        binded_end: "",
        channel_id: "",
        nick_name: "",
        user_id: "",
        invite_user_id: "",
        max_promotion_floor: "",
        min_promotion_floor: "",
        username: "",
        settlement_date_start: dateFormat(getTodayOffset(-7), "yyyy-MM-dd"),
        settlement_date_end: dateFormat(getTodayOffset(-1), "yyyy-MM-dd"),
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null
            // TODO
        },
        formSource: null, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        const channel_id_options_keys = Object.keys(this.tableData.columns.channel_id.options);
        if (plat_id_options_keys.length > 0 && channel_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            if (this.listQuery.plat_id) {
                this.tableData.columns.channel_id_options = this.tableData.columns.channel_id.options[
                    this.listQuery.plat_id
                ];
                const channel_id_keys = Object.keys(this.tableData.columns.channel_id_options);
                channel_id_keys.forEach((key: any) => {
                    this.tableData.columns.channel_id_options[key] = key;
                });
            }
            this.onQuery();
        }
    }
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
            agent_user_id: "",
            page_count: 1,
            page_size: 20,
            binded_start: "",
            binded_end: "",
            channel_id: "",
            nick_name: "",
            user_id: "",
            invite_user_id: "",
            promotion_floor: "",
            max_promotion_floor: "",
            min_promotion_floor: "",
            username: "",
            settlement_date_start: dateFormat(getTodayOffset(-7), "yyyy-MM-dd"),
            settlement_date_end: dateFormat(getTodayOffset(-1), "yyyy-MM-dd"),
        });
    }

    /**日期快捷 */
    pickerOptions = {
        shortcuts: [
            {
                text: LangUtil("昨日"),
                onClick(picker: any) {
                    const start = getTodayOffset(-1);
                    const end = getTodayOffset(0, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近一周"),
                onClick(picker: any) {
                    const start = getTodayOffset(-7);
                    const end = getTodayOffset(-1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近一个月"),
                onClick(picker: any) {
                    const start = getTodayOffset(-31);
                    const end = getTodayOffset(-1);
                    picker.$emit("pick", [start, end]);
                },
            },
        ],
    };

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }
    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            // TODO
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_agent_manage_bind_index, objectRemoveNull(this.listQuery));
    }

    /**打开用户详情 */
    onShowUserDetail(user_id: any) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }
}
