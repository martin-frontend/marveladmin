import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/gold_water/setting";
import { MessageBox } from "element-ui";
import IGoldWaterProxy from "./IGoldWaterProxy";
import GlobalEventType from "@/core/global/GlobalEventType";
import i18n from "@/lang";

export default class GoldWaterProxy extends AbstractProxy implements IGoldWaterProxy {
    static NAME = "GoldWaterProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_gold_water_table_columns);
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
            created_at: { name: "创建时间", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            gold: { name: "金币数量", options: {} },
            id: { name: "主键", options: {} },
            nick_name: { name: "用户昵称", options: {} },
            pass_type: { name: "流水通过类型", options: {} },
            plat_id: { name: "平台ID", options: {} },
            status: { name: "流水状态", options: {} },
            type: { name: "金币类型", options: {} },
            updated_at: { name: "更新时间", options: {} },
            updated_by: { name: "修改人", options: {} },
            user_id: { name: "用户ID", options: {} },
            username: { name: "用户帐号", options: {} },
            water: { name: "打码流水", options: {} },
            water_limit: { name: "审核流水", options: {} },
            water_multiple: { name: "流水倍数", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        user_id: "",
        username: "",
        nick_name: "",
        status: "",
    };

    /**设置通过 ID */
    approvedId = "";

    /**打开用户详情 ID */
    userDetailId = "";

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const platIdOptionsKeys = Object.keys(this.tableData.columns.plat_id.options);
        if (platIdOptionsKeys.length > 0) {
            if (!platIdOptionsKeys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = platIdOptionsKeys[0];
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

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            user_id: "",
            username: "",
            nick_name: "",
            status: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_gold_water_index, objectRemoveNull(this.listQuery));
    }

    /**更新数据 */
    onUpdate() {
        MessageBox.confirm(<string>LangUtil("是否通过此兑换兑换流水审核"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_gold_water_approved, { id: this.approvedId });
            })
            .catch(() => {});
    }

    /**打开用户详情 */
    onShowUserDetail() {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, this.userDetailId);
    }
}
