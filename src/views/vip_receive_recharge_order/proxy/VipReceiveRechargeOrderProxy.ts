import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/vip_receive_recharge_order/setting";
import { MessageBox } from "element-ui";
import IVipReceiveRechargeOrderProxy from "./IVipReceiveRechargeOrderProxy";
import GlobalEventType from "@/core/global/GlobalEventType";
import router from "@/router";
import { BaseInfo } from "@/components/vo/commonVo";

export default class VipReceiveRechargeOrderProxy extends AbstractProxy implements IVipReceiveRechargeOrderProxy {
    static NAME = "VipReceiveRechargeOrderProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_vip_receive_recharge_order_table_columns);
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
        columns: {
            actual_gold: { name: "实际到帐金额", options: {} },
            channel_id: { name: "渠道ID", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            created_id: { name: "创建人ID", options: {} },
            created_type: { name: "创建人类型", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            from_ip: { name: "来源ip", options: {} },
            gold: { name: "订单充值金额", options: {} },
            id: { name: "VIP订单ID", options: {} },
            nick_name: { name: "昵称", options: {} },
            order_no: { name: "VIP充值订单号", options: {} },
            ori_order_no: { name: "原始订单号", options: {} },
            pay_time: { name: "支付时间", options: {} },
            plat_id: { name: "平台ID", options: {} },
            remark: { name: "备注", options: {} },
            status: { name: "状态:1-确认玩家已付款", options: {} },
            type: { name: "充值方式 1-VIP充值", options: {} },
            user_id: { name: "用户ID", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        isExportExcel: false, //是否导出excel
        excelPageSize: 1000000, //excel 资料长度
        success_total_gold: "", //充值成功金额
        success_total_num: 0, //充值成功订单数
        total_gold: "", //充值总金额
        total_num: 0, //充值订单数
        total_user_num: 0, //充值人数
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        "created_at-{>=}": "",
        "created_at-{<}": "",
        user_id: "",
        order_no: "",
        created_by: "",
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const PLAT_ID_OPTIONS_KEY = Object.keys(this.tableData.columns["plat_id"].options);
        if (PLAT_ID_OPTIONS_KEY.length > 0) {
            if (!PLAT_ID_OPTIONS_KEY.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = PLAT_ID_OPTIONS_KEY[0];
            }
            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        this.tableData.success_total_gold = data.success_total_gold;
        this.tableData.success_total_num = data.success_total_num;
        this.tableData.total_gold = data.total_gold;
        this.tableData.total_num = data.total_num;
        this.tableData.total_user_num = data.total_user_num;
        Object.assign(this.tableData.pageInfo, data.pageInfo);
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            "created_at-{>=}": "",
            "created_at-{<}": "",
            user_id: "",
            order_no: "",
            created_by: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_vip_receive_recharge_order_index, objectRemoveNull(this.listQuery));
    }

    // 打开用户详情页
    onShowUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    /**取得excel 挡案名称 */
    getExcelOutputName() {
        //@ts-ignore
        const plat_name = this.tableData.columns.plat_id.options[this.listQuery.plat_id];
        let name = `${router.currentRoute.name}-${plat_name}`;
        if (this.listQuery["created_at-{<}"] && this.listQuery["created_at-{<}"] != "") {
            name += `-${this.listQuery["created_at-{>=}"]}～${this.listQuery["created_at-{<}"]}`;
        }
        return name;
    }

    /**取得所有资料 */
    onQueryAll() {
        this.tableData.isExportExcel = true;
        let queryCopy: any = JSON.parse(JSON.stringify(this.listQuery));
        queryCopy.page_size = this.tableData.excelPageSize;
        queryCopy.page_count = 1;
        if (queryCopy.plat_id == "0") queryCopy.plat_id = null;
        this.facade.sendNotification(HttpType.admin_vip_receive_recharge_order_index, objectRemoveNull(queryCopy));
    }

    /**导出excel */
    exportExcel(data: any) {
        this.tableData.isExportExcel = false;
        new BaseInfo.ExportExcel(
            this.getExcelOutputName(),
            Object.keys(this.tableData.columns),
            this.tableData.columns,
            data.list,
            ["status", "type", "plat_id", "created_type"],
            []
        );
    }
}
