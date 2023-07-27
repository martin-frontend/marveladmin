import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import GlobalEventType from "@/core/global/GlobalEventType";
import { HttpType } from "@/views/plat_coin_tasks/setting";
import IPlatCoinTasksProxy from "./IPlatCoinTasksProxy";

export default class PlatCoinTasksProxy extends AbstractProxy implements IPlatCoinTasksProxy {
    static NAME = "PlatCoinTasksProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_coin_tasks_table_columns);
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
            activity_id: { name: "活动ID/批次", options: {} },
            activity_name: { name: "活动名称", options: {} },
            bonus_multiple: { name: "流水倍数", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            current_coin_amount: { name: "当前数量", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            end_time: { name: "结束时间", options: {} },
            id: { name: "ID", options: {} },
            transfer_amount_rate: { name: "最大转换数量", options: {} },
            nick_name: { name: "用户昵称", options: {} },
            plat_id: { name: "平台ID", options: {} },
            start_time: { name: "开始时间", options: {} },
            status: { name: "状态", options: {} },
            task_coin_amount: { name: "任务数量", options: {} },
            task_coin_name_unique: { name: "任务币种", options: {} },
            task_config: { name: "活动币任务", options: {} },
            type: { name: "类型", options: {} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            user_id: { name: "平台用户ID", options: {} },
            water_2: { name: "棋牌流水", options: {} },
            water_4: { name: "彩票流水", options: {} },
            water_8: { name: "捕鱼流水", options: {} },
            water_16: { name: "电子流水", options: {} },
            water_32: { name: "真人流水", options: {} },
            water_64: { name: "体育流水", options: {} },
            water_128: { name: "电竞流水", options: {} },
            water_need_2: { name: "棋牌所需流水", options: {} },
            water_need_4: { name: "彩票所需流水", options: {} },
            water_need_8: { name: "捕鱼所需流水", options: {} },
            water_need_16: { name: "电子所需流水", options: {} },
            water_need_32: { name: "真人所需流水", options: {} },
            water_need_64: { name: "体育所需流水", options: {} },
            water_need_128: { name: "电竞所需流水", options: {} },
            vendor_id: { name: "厂商ID", options: {} },
            vendor_ids: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        status: "",
        activity_id: "",
        activity_name: "",
        user_id: "",
        task_coin_name_unique: "",
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: null,
            plat_id: "",
            activity_name: "",
            user_ids: "", //发送用户
            task_coin_name_unique: "",
            task_coin_amount: "",
            bonus_multiple: "",
            task_days: "",
            transfer_amount_rate: "",
            task_water_rate_2: "",
            task_water_rate_4: "",
            task_water_rate_8: "",
            task_water_rate_16: "",
            task_water_rate_32: "",
            task_water_rate_64: "",
            task_water_rate_128: "",
            task_config: <any>{},
            vendorArr: <any>[
                //{ name: "mmm", water: 11}
            ],
        },
        formSource: null, // 表单的原始数据
        excelColumnInfo: {
            userid: { name: "userid", options: {} },
        },
    };

    vendorDialogData = {
        bShow: false,
        form: {
            name: "",
            water: "",
            vendor_id: "",
        },
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        if (plat_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
            }

            if (this.listQuery.plat_id) {
                // 任务币种
                if (this.tableData.columns.task_coin_name_unique.options[this.listQuery.plat_id]) {
                    this.tableData.columns.task_coin_name_unique_options = this.tableData.columns.task_coin_name_unique.options[
                        this.listQuery.plat_id
                    ];
                } else {
                    this.tableData.columns.task_coin_name_unique_options = {};
                }
                // 活动ID/批次
                if (this.tableData.columns.activity_id.options[this.listQuery.plat_id]) {
                    this.tableData.columns.activity_id_options = this.tableData.columns.activity_id.options[
                        this.listQuery.plat_id
                    ];
                } else {
                    this.tableData.columns.activity_id_options = {};
                }
            }
            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        this.tableData.list.forEach((element: any) => {
            element.task_config = JSON.parse(element.task_config);
        });
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
            status: "",
            activity_id: "",
            activity_name: "",
            user_id: "",
            task_coin_name_unique: "",
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            this.dialogData.formSource = data;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        } else {
            this.resetDialogForm();
            this.dialogData.form.plat_id = this.listQuery.plat_id;
            this.dialogData.formSource = null;
        }
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.dialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        Object.assign(this.dialogData.form, {
            plat_id: "",
            activity_id: "",
            activity_name: "",
            user_ids: "", //发送用户
            task_coin_name_unique: "",
            task_coin_amount: "",
            bonus_multiple: "",
            transfer_amount_rate: "",
            task_days: "",
            task_water_rate_2: "",
            task_water_rate_4: "",
            task_water_rate_8: "",
            task_water_rate_16: "",
            task_water_rate_32: "",
            task_water_rate_64: "",
            task_water_rate_128: "",
            task_config: <any>{},
        });
    }

    showVendorDialog() {
        this.vendorDialogData.bShow = true;
        this.resetVendorDialogForm();
    }

    resetVendorDialogForm() {
        Object.assign(this.vendorDialogData.form, {
            name: "",
            water: "",
            vendor_id: "",
        });
    }

    onAddVendor() {
        this.dialogData.form.vendorArr.push({ ...this.vendorDialogData.form });
        this.vendorDialogData.bShow = false;
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_coin_tasks_index, objectRemoveNull(this.listQuery));
    }

    /**添加数据 */
    onAdd() {
        const {
            plat_id,
            activity_name,
            user_ids,
            task_coin_name_unique,
            task_coin_amount,
            bonus_multiple,
            task_days,
            transfer_amount_rate,
            task_water_rate_2,
            task_water_rate_4,
            task_water_rate_8,
            task_water_rate_16,
            task_water_rate_32,
            task_water_rate_64,
            task_water_rate_128,
        } = this.dialogData.form;
        const formCopy: any = {
            plat_id,
            activity_name,
            user_ids,
            task_coin_name_unique,
            task_coin_amount,
            bonus_multiple,
            task_days,
        };
        formCopy.task_config = {
            task_days,
            transfer_amount_rate,
            task_water_rate_2,
            task_water_rate_4,
            task_water_rate_8,
            task_water_rate_16,
            task_water_rate_32,
            task_water_rate_64,
            task_water_rate_128,
        };

        const obj = <any>{};
        for (let index = 0; index < this.dialogData.form.vendorArr.length; index++) {
            const element = this.dialogData.form.vendorArr[index];
            obj[element.vendor_id] = element.water;
        }
        formCopy.task_config.task_water_vendor = obj;
        formCopy.task_config = JSON.stringify(formCopy.task_config);
        formCopy.user_ids = JSON.stringify(formCopy.user_ids.split(","));
        this.sendNotification(HttpType.admin_plat_coin_tasks_store, objectRemoveNull(formCopy));
    }

    /**更新数据 */
    onUpdate() {}

    /**删除数据 */
    onDelete(id: any) {}

    /**更新数据 */
    onCancel(id: any) {
        const formCopy: any = {};
        formCopy.id = id;
        formCopy.status = 6;
        this.sendNotification(HttpType.admin_plat_coin_tasks_update, formCopy);
    }

    /**显示用户详情 */
    showUserDetail(user_id: number) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    get vendor_options() {
        const newlist = <any>[];
        const keys = Object.keys(this.tableData.columns.vendor_ids.options[this.listQuery.plat_id]);

        for (let index = 0; index < keys.length; index++) {
            const element = keys[index];

            let isHave = false;
            for (let n = 0; n < this.dialogData.form.vendorArr.length; n++) {
                const element_cur = this.dialogData.form.vendorArr[n];
                if (element_cur.vendor_id == element) {
                    isHave = true;
                    break;
                }
            }
            if (!isHave) {
                newlist.push({
                    name: this.tableData.columns.vendor_ids.options[this.listQuery.plat_id][element],
                    value: element,
                });
            }
        }

        return newlist;
    }
}