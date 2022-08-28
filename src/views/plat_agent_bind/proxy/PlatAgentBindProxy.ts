import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_agent_bind/setting";
import { MessageBox } from "element-ui";
import IPlatAgentBindProxy from "./IPlatAgentBindProxy";
import GlobalEventType from "@/core/global/GlobalEventType";

export default class PlatAgentBindProxy extends AbstractProxy implements IPlatAgentBindProxy {
    static NAME = "PlatAgentBindProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_agent_bind_table_columns);
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
            binded_at: { name: "绑定时间", options: {} },
            bonus_ratio: {name: '分红统计比例'},
            channel_id: <any>{ name: "所属渠道", options: {} },
            commission_awaiting_num: { name: "当前可领取佣金", options: {} },
            commission_received_num: { name: "已领取佣金总额", options: {} },
            directly_users: { name: "直属代理人数", options: {} },
            group_users: { name: "团队人数", options: {} },
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
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
        extra_info: {
            show_is_agent_bonus: false,
        },
    };

    /**查询条件 */
    listQuery = {
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
    };

    /**保底 弹窗相关数据 */
    promotionFloorDialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: <any>{
            vendor_type_0: 0,
            vendor_type_2: 0,
            vendor_type_4: 0,
            vendor_type_8: 0,
            vendor_type_16: 0,
            vendor_type_32: 0,
            vendor_type_64: 0,
            vendor_type_128: 0,
        },
        promotionFloor: <any>{},
        user_id: "",
        range: <any>{
            0: {
                max: 0,
                min: 0,
            },
            2: {
                max: 0,
                min: 0,
            },
            4: {
                max: 0,
                min: 0,
            },
            8: {
                max: 0,
                min: 0,
            },
            16: {
                max: 0,
                min: 0,
            },
            32: {
                max: 0,
                min: 0,
            },
            64: {
                max: 0,
                min: 0,
            },
            128: {
                max: 0,
                min: 0,
            },
        },
        formSource: null, // 表单的原始数据
    };

    /**总代分红相关数据 */
    agentBonusDialogData = {
        bShow: false,
        form: {
            user_id: "",
            is_agent_bonus: 98,
            agent_bonus_rate: 0,
        },
    };

    /**代理分红配置相关数据 */
    bonusConfigDialogData = {
        bShow: false,
        form: <any>{},
        tableData: {
            columns: <any>{
                activity_bonus: {name: "活动红利", options:[]},
                backwater_2: {name: "棋牌挖矿", options:[]},
                backwater_4: {name: "彩票挖矿", options:[]},
                backwater_8: {name: "捕鱼挖矿", options:[]},
                backwater_16: {name: "电子挖矿", options:[]},
                backwater_32: {name: "真人挖矿", options:[]},
                backwater_64: {name: "体育电竞挖矿", options:[]},
                backwater_128: {name: "链游挖矿", options:[]},
                bonus_config: {name: "配置", options: []},
                bonus_pool_2: {name: "棋牌分红奖池", options:[]},
                bonus_pool_4: {name: "彩票分红奖池", options:[]},
                bonus_pool_8: {name: "捕鱼分红奖池", options:[]},
                bonus_pool_16: {name: "电子分红奖池", options:[]},
                bonus_pool_32: {name: "真人分红奖池", options:[]},
                bonus_pool_64: {name: "体育电竞分红奖池", options:[]},
                bonus_pool_128: {name: "链游分红奖池", options:[]},
                bonus_pool_ratio: {name: "奖池分红比例", options: []},
                bonus_ratio: {name: "分红统计比例", options: []},
                commission_2: {name: "棋牌返佣", options:[]},
                commission_4: {name: "彩票返佣", options:[]},
                commission_8: {name: "捕鱼返佣", options:[]},
                commission_16: {name: "电子返佣", options:[]},
                commission_32: {name: "真人返佣", options:[]},
                commission_64: {name: "体育电竞返佣", options:[]},
                commission_128: {name: "链游返佣", options:[]},
                created_at: {name: "创建时间", options: []},
                created_by: {name: "创建人", options: []},
                exchange_fee: {name: "提现手续费", options:[]},
                exchange_fee_ratio: {name: "提现手续费比例", options: []},
                invite_bonus_ratio: {name: "上级代理分红统计比例"},
                invite_nick_name: {name: "上级代理昵称"},
                invite_user_id: {name: "上级编号"},
                is_show: {name: "统计开关", options:[]},
                nick_name: {name: "昵称"},
                recharge_fee: {name: "充值手续费", options:[]},
                recharge_fee_ratio: {name: "充值手续费比例", options: []},
                updated_at: {name: "修改时间", options: []},
                updated_by: {name: "更新人", options: []},
                user_id: {name: "用户ID", options: []},
                vendor_fee_2: {name: "棋牌厂商费用", options:[]},
                vendor_fee_4: {name: "彩票厂商费用", options:[]},
                vendor_fee_8: {name: "捕鱼厂商费用", options:[]},
                vendor_fee_16: {name: "电子厂商费用", options:[]},
                vendor_fee_32: {name: "真人厂商费用", options:[]},
                vendor_fee_64: {name: "体育电竞厂商费用", options:[]},
                vendor_fee_128: {name: "链游厂商费用", options:[]},
                vendor_fee_ratio: {name: "产商游戏费用比例", options: []},
                win_loss_2: {name: "棋牌输赢", options:[]},
                win_loss_4: {name: "彩票输赢", options:[]},
                win_loss_8: {name: "捕鱼输赢", options:[]},
                win_loss_16: {name: "电子输赢", options:[]},
                win_loss_32: {name: "真人输赢", options:[]},
                win_loss_64: {name: "体育电竞输赢", options:[]},
                win_loss_128: {name: "链游输赢", options:[]},
            }
        }
    };

    /**绑定 弹窗相关数据 */
    bindDialogData = {
        bShow: false,
        form: {
            invite_user_id: "",
            user_id: "",
            nick_name: "",
            invite: "",
        },
        user_id: "",
        formSource: {
            invite_user_id: "",
        }, // 表单的原始数据
    };

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.columns.plat_id.options);
        const channel_id_options_keys = Object.keys(this.tableData.columns.channel_id.options);
        if (plat_id_options_keys.length > 0 && channel_id_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = plat_id_options_keys[0];
            }

            channel_id_options_keys.forEach((key: any) => {
                this.tableData.columns.channel_id.options[key] = key;
            });

            this.onQuery();
        }
    }

    /**表格数据 */
    setTableData(data: any) {
        this.tableData.list.length = 0;
        this.tableData.list.push(...data.list);
        Object.assign(this.tableData.pageInfo, data.pageInfo);
        Object.assign(this.tableData.extra_info, data.extra_info);
    }

    /**详细数据 */
    setDetail(data: any) {
        this.promotionFloorDialogData.formSource = data;
        let floor = JSON.parse(JSON.stringify(data.promotion_floor));
        let result = <any>{};
        Object.keys(floor).forEach((key: any) => {
            result["vendor_type_" + key] = floor[key];
        });
        this.promotionFloorDialogData.formSource = JSON.parse(JSON.stringify(result));
        this.promotionFloorDialogData.form = JSON.parse(JSON.stringify(result));
    }

    /**重置查询条件 */
    resetListQuery() {
        Object.assign(this.listQuery, {
            // TODO
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
        });
    }

    /**隐藏弹窗 */
    hideDialog() {
        this.promotionFloorDialogData.bShow = false;
        this.bindDialogData.bShow = false;
    }

    /**重置弹窗表单 */
    resetDialogForm() {
        // 保底设定
        Object.assign(this.promotionFloorDialogData.form, {
            vendor_type_2: 0,
            vendor_type_4: 0,
            vendor_type_8: 0,
            vendor_type_16: 0,
            vendor_type_32: 0,
            vendor_type_64: 0,
            vendor_type_128: 0,
        });

        // 绑定
        Object.assign(this.bindDialogData.form, {
            invite_user_id: "",
            user_id: "",
            nick_name: "",
            invite: "",
        });
    }

    /**查询 */
    onQuery() {
        this.sendNotification(HttpType.admin_plat_agent_bind_index, objectRemoveNull(this.listQuery));
    }

    /**更新代理保底数据 */
    onFloorUpdate() {
        const formCopy: any = formCompared(
            this.promotionFloorDialogData.form,
            this.promotionFloorDialogData.formSource
        );
        // 删除多余无法去除的参数
        // TODO
        // 如果没有修改，就直接关闭弹窗
        if (Object.keys(formCopy).length == 0) {
            this.promotionFloorDialogData.bShow = false;
            return false;
        }
        formCopy.user_id = this.promotionFloorDialogData.user_id;
        this.sendNotification(HttpType.admin_plat_agent_bind_update, formCopy);
    }

    /**保底设定 弹窗 */
    showSettingDialog(data?: any) {
        this.resetDialogForm();
        this.promotionFloorDialogData.bShow = true;
        //保底金额上限
        this.sendNotification(HttpType.admin_plat_agent_bind_show_floor_range, {
            user_id: this.promotionFloorDialogData.user_id,
        });
        this.sendNotification(HttpType.admin_plat_agent_bind_show, { user_id: this.promotionFloorDialogData.user_id });
    }

    /**保底设定范围 */
    setFloorRange(data: any) {
        this.promotionFloorDialogData.range = data;
    }

    /**绑定 弹窗 */
    showBindDialog(row: any) {
        this.resetDialogForm();
        this.bindDialogData.form.user_id = row.user_id;
        this.bindDialogData.form.nick_name = row.nick_name;
        this.bindDialogData.form.invite = row.invite_user_id;
        this.bindDialogData.formSource.invite_user_id = row.invite_user_id;
        this.bindDialogData.bShow = true;
    }

    /**绑定 */
    onBind() {
        // 如果没有修改，就直接关闭弹窗
        if (this.bindDialogData.form.invite_user_id == this.bindDialogData.formSource.invite_user_id) {
            this.bindDialogData.bShow = false;
            return false;
        }
        const data = {
            user_id: this.bindDialogData.form.user_id,
            invite_user_id: this.bindDialogData.form.invite_user_id,
        };
        this.sendNotification(HttpType.admin_plat_user_change_bind, data);
    }

    /**打开用户详情 */
    onShowUserDetail(user_id: any) {
        this.sendNotification(GlobalEventType.SHOW_USER_DETAIL, user_id);
    }

    /**总代分红设置 */
    updateAgentBonus() {
        this.sendNotification(HttpType.admin_plat_agent_bind_update, this.agentBonusDialogData.form);
    }

    hideAgentBonus() {
        this.agentBonusDialogData.bShow = false;
    }

    api_admin_plat_agent_bonus_config_table_columns() {
        this.sendNotification(HttpType.admin_plat_agent_bonus_config_table_columns);
    }

    api_admin_plat_agent_bonus_config_show(user_id: number) {
        this.sendNotification(HttpType.admin_plat_agent_bonus_config_show, { user_id });
    }

    /**设置代理分红配置表头数据 */
    setBonusConfigTableColumns(data: any) {
        Object.assign(this.bonusConfigDialogData.tableData.columns, data);
    }

    /**设置代理分红配置表格数据 */
    setBonusConfigTableData(data: any) {
        Object.assign(this.bonusConfigDialogData.form, data);
    }
}
