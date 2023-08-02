import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/statistic_plat_days_date/setting";
import { MessageBox } from "element-ui";
import IStatisticPlatDaysDateProxy from "./IStatisticPlatDaysDateProxy";
import LangUtil from "@/core/global/LangUtil";

export default class StatisticPlatDaysDateProxy extends AbstractProxy implements IStatisticPlatDaysDateProxy {
    static NAME = "StatisticPlatDaysDateProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_statistic_plat_days_table_columns);
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
            active_user: { name: "活跃用户", options: {}, display: true },
            backwater_gold: { name: "实时返水", options: {}, tips: "玩家在实时返水中获得的金额", display: true },
            channel_id: { name: "所属渠道", options: {}, display: true },
            commission_gold: { name: "推广返佣", options: {}, tips: "玩家在推广赚钱中获得的返佣金额", display: true },
            created_date: { name: "日期", options: {}, display: true },
            data_belong: { name: "数据归属标记", options: {}, display: true },
            exchange: { name: "兑换金额", options: {}, display: true },
            exchange_user: { name: "总兑换人数", options: {}, display: true },
            gift_gold: { name: "平台赠送", options: {}, tips: "玩家在活动、平台赠送中获得的金额", display: true },
            id: { name: "平台统计ID", options: {}, display: true },
            new_exchange_user: { name: "新增兑换人数", options: {}, display: true },
            new_recharge_user: { name: "新增充值人数", options: {}, display: true },
            new_register: { name: "新增注册", options: {}, display: true },
            plat_id: { name: "所属平台", options: {}, display: true },
            recharge: { name: "充值金额", options: {}, display: true },
            recharge_user: { name: "充值人数", options: {}, display: true },
            repeat_recharge_user: { name: "重复充值人数", options: {} },
            water: { name: "游戏流水", options: {}, display: true },
            win_loss: { name: "游戏输赢", options: {}, display: true },
            new_user: { name: "新增登入" },
            agent_bonus_gold: { name: "", options: {} },
            new_register_device: { name: "新增注册设备", options: {} },
            effective_new_rate: { name: "有效新增率", options: {} },
            new_user_recharge: { name: "新用户充值金额", options: {} },
            old_user_recharge: { name: "老用户充值金额", options: {} },
            new_recharge_rate: { name: "新增充值率", options: {} },
            new_register_water: { name: "新用户游戏流水", options: {} },
            active_user_week: { name: "周活跃用户", options: {} },
            active_user_month: { name: "月活跃用户", options: {} },
            active_recharge_user: { name: "活跃充值人数", options: {} },
            active_user_recharge: { name: "活跃充值金额", options: {} },
            recharge_seep_rate: { name: "充值渗透率", options: {} },
            arpu_rate: { name: "arpu_rate", options: {} },
            arppu_rate: { name: "arppu_rate", options: {} },
        },
        list: <any>[],
        columnKeys: <any>[],
        hideColumns: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        updateNum: 0,
    };
    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        channel_id: "",
        //start_date: this.defaultDate,
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: [
            {
                category: "player",
                title: LangUtil("玩家数据"),
                options: {
                    new_register: {
                        name: this.tableData.columns.new_register.name,
                        checked: true,
                    },
                    active_user: {
                        name: this.tableData.columns.active_user.name,
                        checked: true,
                    },
                    gift_gold: {
                        name: this.tableData.columns.gift_gold.name,
                        checked: true,
                    },
                    backwater_gold: {
                        name: this.tableData.columns.backwater_gold.name,
                        checked: true,
                    },
                    commission_gold: {
                        name: this.tableData.columns.commission_gold.name,
                        checked: true,
                    },
                },
            },
            {
                category: "recharge",
                title: LangUtil("充值兑换数据"),
                options: {
                    recharge: {
                        name: this.tableData.columns.recharge.name,
                        checked: true,
                    },
                    recharge_user: {
                        name: this.tableData.columns.recharge_user.name,
                        checked: true,
                    },
                    new_recharge_user: {
                        name: this.tableData.columns.new_recharge_user.name,
                        checked: true,
                    },
                    exchange: {
                        name: this.tableData.columns.exchange.name,
                        checked: true,
                    },
                    exchange_user: {
                        name: this.tableData.columns.exchange_user.name,
                        checked: true,
                    },
                    new_exchange_user: {
                        name: this.tableData.columns.new_exchange_user.name,
                        checked: true,
                    },
                },
            },
            {
                category: "game",
                title: LangUtil("游戏数据"),
                options: {
                    win_loss: {
                        name: this.tableData.columns.win_loss.name,
                        checked: true,
                    },
                    water: {
                        name: this.tableData.columns.water.name,
                        checked: true,
                    },
                },
            },
        ],
        formSource: null, // 表单的原始数据
    };

    get defaultDate() {
        let d1 = new Date();
        d1.setTime(d1.getTime() - 24 * 60 * 60 * 1000);
        return d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate();
    }
    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        
        let plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);

        //将平台中的  0 的系统 删除掉
        const newOptions = <any>{};
        for (let index = 0; index < plat_id_options_keys.length; index++) {
            const element = plat_id_options_keys[index];
            if (element == 0 || element == "0")
            {
                continue;
            }
            newOptions[element] = this.tableData.columns.plat_id.options[element];
        }
        this.tableData.columns.plat_id.options =  newOptions;
        plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);

        this.tableData.columnKeys = Object.keys(this.tableData.columns);
        if (plat_id_options_keys.length > 0 && this.tableData.columnKeys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }

            // 预设栏位都显示
            this.tableData.columnKeys.forEach((key: any) => {
                this.tableData.columns[key]["display"] = true;
            });

            this.onQuery();
        }
    }
    /**合计 相关数据 */
    summaryData = {
        plat_id: "",
        active_user: "",
        recharge_user: "",
        exchange_user: "",
        exchange: "",
        new_exchange_user: "",
        new_recharge_user: "",
        new_register: "",
        recharge: "",
        water: "",
        win_loss: "",
        gift_gold: "",
        backwater_gold: "",
        commission_gold: "",
        new_user: "",
        agent_bonus_gold: "",
        repeat_recharge_user: "",
        new_register_device: "",
        effective_new_rate: "",
        new_user_recharge: "",
        old_user_recharge: "",
        new_recharge_rate: "",
        new_register_water: "",
        active_user_week: "",
        active_user_month: "",
        active_recharge_user: "",
        active_user_recharge: "",
        recharge_seep_rate: "",
        arpu_rate: "",
        arppu_rate: "",
    };
    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        this.summaryData["plat_id"] = <any>LangUtil("合计");
        this.summaryData["active_user"] = data.summary.active_user;
        this.summaryData["recharge_user"] = data.summary.recharge_user;
        this.summaryData["exchange_user"] = data.summary.exchange_user;
        this.summaryData["exchange"] = data.summary.exchange;
        this.summaryData["new_exchange_user"] =
            data.summary.new_exchange_user === 0 ? "0" : data.summary.new_exchange_user;
        this.summaryData["new_recharge_user"] =
            data.summary.new_recharge_user === 0 ? "0" : data.summary.new_recharge_user;
        this.summaryData["new_register"] = data.summary.new_register;
        this.summaryData["new_user"] = data.summary.new_user;
        this.summaryData["recharge"] = data.summary.recharge;
        this.summaryData["water"] = data.summary.water;
        this.summaryData["win_loss"] = data.summary.win_loss;
        this.summaryData["gift_gold"] = data.summary.gift_gold;
        this.summaryData["backwater_gold"] = data.summary.backwater_gold;
        this.summaryData["commission_gold"] = data.summary.commission_gold;
        this.summaryData["agent_bonus_gold"] = data.summary.agent_bonus_gold;
        this.summaryData["repeat_recharge_user"] = data.summary.repeat_recharge_user;
        this.summaryData["new_register_device"] = data.summary.new_register_device;
        this.summaryData["effective_new_rate"] = data.summary.effective_new_rate;
        this.summaryData["new_user_recharge"] = data.summary.new_user_recharge;
        this.summaryData["old_user_recharge"] = data.summary.old_user_recharge;
        this.summaryData["new_recharge_rate"] = data.summary.new_recharge_rate;
        this.summaryData["new_register_water"] = data.summary.new_register_water;
        this.summaryData["active_user_week"] = data.summary.active_user_week;
        this.summaryData["active_user_month"] = data.summary.active_user_month;
        this.summaryData["active_recharge_user"] = data.summary.active_recharge_user;
        this.summaryData["active_user_recharge"] = data.summary.active_user_recharge;
        this.summaryData["recharge_seep_rate"] = data.summary.recharge_seep_rate;
        this.summaryData["arpu_rate"] = data.summary.arpu_rate;
        this.summaryData["arppu_rate"] = data.summary.arppu_rate;
        // 把summaryData 插入第一笔
        this.tableData.list.splice(0, 0, this.summaryData);
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
            page_count: 1,
            page_size: 20,
            plat_id: "",
            channel_id: "",
            //start_date: this.defaultDate,
        });
    }

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.dialogData.bShow = true;
        // this.dialogData.status = status;
        // if (status == DialogStatus.update) {
        //     this.dialogData.formSource = data;
        //     Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
        //     this.sendNotification(HttpType.undefined, { id: data.id });
        // } else {
        //     this.resetDialogForm();
        //     this.dialogData.formSource = null;
        // }
    }
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
        this.sendNotification(HttpType.admin_statistic_plat_days_statistic_by_date, objectRemoveNull(this.listQuery));
    }
    /**添加数据 */
    onAdd() {
        const formCopy: any = {
            // TODO
        };
        // this.sendNotification(HttpType.undefined, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate() {
        const formCopy: any = formCompared(this.dialogData.form, this.dialogData.formSource);
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        // if(Object.keys(formCopy).length == 0){
        //     this.dialogData.bShow = false;
        //     return ;
        // }
        // 添加必填参数
        // TODO
        // 发送消息
        //this.sendNotification(HttpType.undefined, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm("您是否删除该记录", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
                //this.sendNotification(HttpType.undefined, { id, is_delete: 1 });
                console.log("---");
            })
            .catch(() => {});
    }
}
