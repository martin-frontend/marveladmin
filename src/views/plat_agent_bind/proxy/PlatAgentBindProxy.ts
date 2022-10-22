import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, jsonStringify, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/plat_agent_bind/setting";
import { MessageBox } from "element-ui";
import IPlatAgentBindProxy from "./IPlatAgentBindProxy";
import GlobalEventType from "@/core/global/GlobalEventType";

export type BooleanOrNumber = 'boolean' | 'number';
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
            bonus_ratio: { name: '分红统计比例' },
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
            channel_id_option: {},
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
        formSource: <any>{},
        user_id: <any>null,
        form: <any>{
            bonus_ratio: 0,
            bonus_pool_ratio: 0,
            exchange_fee_ratio: 0,
            recharge_fee_ratio: 0,
            vendor_fee_ratio: 0,
            is_show: 0,
            bonus_config: {
                activity_bonus: 0,
                backwater_2: 0,
                backwater_4: 0,
                backwater_8: 0,
                backwater_16: 0,
                backwater_32: 0,
                backwater_64: 0,
                backwater_128: 0,
                bonus_pool_2: 0,
                bonus_pool_4: 0,
                bonus_pool_8: 0,
                bonus_pool_16: 0,
                bonus_pool_32: 0,
                bonus_pool_64: 0,
                bonus_pool_128: 0,
                commission_2: 0,
                commission_4: 0,
                commission_8: 0,
                commission_16: 0,
                commission_32: 0,
                commission_64: 0,
                commission_128: 0,
                exchange_fee: 0,
                recharge_fee: 0,
                vendor_fee_2: 0,
                vendor_fee_4: 0,
                vendor_fee_8: 0,
                vendor_fee_16: 0,
                vendor_fee_32: 0,
                vendor_fee_64: 0,
                vendor_fee_128: 0,
                win_loss_2: 0,
                win_loss_4: 0,
                win_loss_8: 0,
                win_loss_16: 0,
                win_loss_32: 0,
                win_loss_64: 0,
                win_loss_128: 0,
            }
        },
        tableData: {
            columns: <any>{
                activity_bonus: { name: "活动红利", options: [] },
                backwater_2: { name: "棋牌挖矿", options: [] },
                backwater_4: { name: "彩票挖矿", options: [] },
                backwater_8: { name: "捕鱼挖矿", options: [] },
                backwater_16: { name: "电子挖矿", options: [] },
                backwater_32: { name: "真人挖矿", options: [] },
                backwater_64: { name: "体育电竞挖矿", options: [] },
                backwater_128: { name: "链游挖矿", options: [] },
                bonus_config: { name: "配置", options: [] },
                bonus_pool_2: { name: "棋牌分红奖池", options: [] },
                bonus_pool_4: { name: "彩票分红奖池", options: [] },
                bonus_pool_8: { name: "捕鱼分红奖池", options: [] },
                bonus_pool_16: { name: "电子分红奖池", options: [] },
                bonus_pool_32: { name: "真人分红奖池", options: [] },
                bonus_pool_64: { name: "体育电竞分红奖池", options: [] },
                bonus_pool_128: { name: "链游分红奖池", options: [] },
                bonus_pool_ratio: { name: "奖池分红比例", options: [] },
                bonus_ratio: { name: "分红统计比例", options: [] },
                commission_2: { name: "棋牌返佣", options: [] },
                commission_4: { name: "彩票返佣", options: [] },
                commission_8: { name: "捕鱼返佣", options: [] },
                commission_16: { name: "电子返佣", options: [] },
                commission_32: { name: "真人返佣", options: [] },
                commission_64: { name: "体育电竞返佣", options: [] },
                commission_128: { name: "链游返佣", options: [] },
                created_at: { name: "创建时间", options: [] },
                created_by: { name: "创建人", options: [] },
                exchange_fee: { name: "提现手续费", options: [] },
                exchange_fee_ratio: { name: "提现手续费比例", options: [] },
                invite_bonus_ratio: { name: "上级代理分红统计比例" },
                invite_nick_name: { name: "上级代理昵称" },
                invite_user_id: { name: "上级编号" },
                is_show: { name: "统计开关", options: [] },
                nick_name: { name: "昵称" },
                recharge_fee: { name: "充值手续费", options: [] },
                recharge_fee_ratio: { name: "充值手续费比例", options: [] },
                updated_at: { name: "修改时间", options: [] },
                updated_by: { name: "更新人", options: [] },
                user_id: { name: "用户ID", options: [] },
                vendor_fee_2: { name: "棋牌厂商费用", options: [] },
                vendor_fee_4: { name: "彩票厂商费用", options: [] },
                vendor_fee_8: { name: "捕鱼厂商费用", options: [] },
                vendor_fee_16: { name: "电子厂商费用", options: [] },
                vendor_fee_32: { name: "真人厂商费用", options: [] },
                vendor_fee_64: { name: "体育电竞厂商费用", options: [] },
                vendor_fee_128: { name: "链游厂商费用", options: [] },
                vendor_fee_ratio: { name: "产商游戏费用比例", options: [] },
                win_loss_2: { name: "棋牌输赢", options: [] },
                win_loss_4: { name: "彩票输赢", options: [] },
                win_loss_8: { name: "捕鱼输赢", options: [] },
                win_loss_16: { name: "电子输赢", options: [] },
                win_loss_32: { name: "真人输赢", options: [] },
                win_loss_64: { name: "体育电竞输赢", options: [] },
                win_loss_128: { name: "链游输赢", options: [] },
            }
        },
        isCanEditConfig: 0, //1-可编辑 0-不可编辑
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
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            // channel_id_options_keys.forEach((key: any) => {
            //     this.tableData.columns.channel_id.options[key] = key;
            // });
            if (this.listQuery.plat_id) {
                this.tableData.columns.channel_id_options = this.tableData.columns.channel_id.options[this.listQuery.plat_id]
            }
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
        this.bonusConfigDialogData.bShow = false;
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
        this.bonusConfigDialogData.user_id = user_id,
            this.sendNotification(HttpType.admin_plat_agent_bonus_config_show, { user_id });
    }

    /**设置代理分红配置表头数据 */
    setBonusConfigTableColumns(data: any) {
        Object.assign(this.bonusConfigDialogData.tableData.columns, data);
    }

    /**设置代理分红配置表格数据 */
    setBonusConfigTableData(data: any) {
        Object.assign(this.bonusConfigDialogData.form, data);
        Object.assign(this.bonusConfigDialogData.form.bonus_config, this.convertBonusConfigValue(data.bonus_config, 'boolean'));
        this.bonusConfigDialogData.formSource = JSON.parse(JSON.stringify(this.bonusConfigDialogData.form));
        this.bonusConfigDialogData.isCanEditConfig = data.can_edit_config;
    }

    /**更新代理分红配置数据 */
    updateBonusConfig() {
        const formCopy: any = formCompared(
            this.bonusConfigDialogData.form,
            this.bonusConfigDialogData.formSource
        );

        const formConfigCopy: any = formCompared(
            this.bonusConfigDialogData.form.bonus_config,
            this.bonusConfigDialogData.formSource.bonus_config
        );

        if (Object.keys(formConfigCopy).length > 0) {
            const newConfig = this.convertBonusConfigValue(formConfigCopy, 'number');
            formCopy.bonus_config = jsonStringify(newConfig);
        } else {
            delete formCopy.bonus_config;
        }

        const { user_id } = this.bonusConfigDialogData;
        this.sendNotification(HttpType.admin_plat_agent_bonus_config_update, { ...formCopy, user_id });
    }

    convertBonusConfigValue(config: any, converToNumberOrBoolean: BooleanOrNumber) {
        const keysArr = Object.keys(config);
        const converFunction = converToNumberOrBoolean === 'number' ? this.convertBooleanToNumber : this.convertNumberToBoolean;
        if (keysArr.length > 0) {
            const newObject = <any>{};
            keysArr.forEach((key) => {
                newObject[key] = converFunction(config[key]);
            })
            return newObject
        }
        return config;
    }

    convertBooleanToNumber(data: any) {
        return data ? 1 : 0;
    }

    convertNumberToBoolean(data: any) {
        return Number(data) === 0 ? false : true;
    }

    changePlat() {
        console.log(this.listQuery.plat_id);
    }
}
