import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { UserType } from "@/core/enum/UserType";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import SelfModel from "@/core/model/SelfModel";
import { UserInfoVO } from "@/core/vo/UserInfoVO";
import { HttpType } from "@/views/vip_recharge/setting";
import { MessageBox } from "element-ui";
import IVipRechargeProxy from "./IVipRechargeProxy";
import i18n from "@/lang";

export default class VipRechargeProxy extends AbstractProxy implements IVipRechargeProxy {
    static NAME = "VipRechargeProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_plat_user_table_columns);
        this.sendNotification(HttpType.admin_vip_recharge_table_columns);
    }

    /**离开页面时调用 */
    leave() { }

    /**表格相关数据 */
    tableData = {
        columns: {
            plat_id: { name: "", options: {} },
            user_id: { name: "", options: {} },
            username: { name: "", options: {} },
            nick_name: { name: "", options: {} },
        },
        plat_columns: {
            plat_id: { name: "", options: {} },
            coin_name_unique: { name: "", options: {} },
            coin_name_unique_option: {},
            bonus_multiple: { name: "", options: {} },
        },
    };

    /**查询条件 */
    listQuery = {
        plat_id: "",
        coin_name_unique: "",
    };

    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        form: {
            plat_id: "",
            user_id: "",
            username: "",
            nick_name: "",
        },
        formSource: null, // 表单的原始数据
    };
    /**页面数据 */
    bodyData = {
        gold: "",
        form: {
            user_id: "",
            amount: "",
            coin_name_unique: "",
            remark: "",
            bonus_multiple: 0,
        },
        isRechargeSuccess: +new Date(),
    };
    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
    }
    /**设置表头数据 */
    setPlatTableColumns(data: any) {
        Object.assign(this.tableData.plat_columns, data);
        const plat_id_options_keys = Object.keys(this.tableData.plat_columns.plat_id.options);
        const coin_name_unique_options_keys = Object.keys(this.tableData.plat_columns.coin_name_unique.options);
        if (plat_id_options_keys.length > 0 && coin_name_unique_options_keys.length > 0) {
            if (!plat_id_options_keys.includes(this.listQuery.plat_id)) {
                //设定选取平台第一个
                this.listQuery.plat_id = plat_id_options_keys[0];
            }
            if (this.listQuery.plat_id) {
                //@ts-ignore
                this.tableData.plat_columns.coin_name_unique_option = this.tableData.plat_columns.coin_name_unique.options[
                    this.listQuery.plat_id
                ];
                const coin_name_unique_options_keys = Object.keys(this.tableData.plat_columns.coin_name_unique_option);
                this.listQuery.coin_name_unique = coin_name_unique_options_keys[0];
                this.getCoinGold();
            }
        }
    }
    /**详细数据 */
    setDetail(data: any) {
        this.dialogData.bShow = true;
        this.dialogData.formSource = data;
        Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));
    }

    /**查询玩家 */
    onQueryUser() {
        this.sendNotification(HttpType.admin_plat_user_show, { user_id: this.bodyData.form.user_id });
    }
    /**提交充值 */
    onTopup() {
        const { coin_name_unique } = this.listQuery;
        this.bodyData.form.coin_name_unique = coin_name_unique;
        this.sendNotification(HttpType.admin_vip_recharge_recharge, objectRemoveNull(this.bodyData.form));
    }
    /**重置页面表单 */
    resetForm() {
        Object.assign(this.bodyData.form, {
            user_id: "",
            amount: "",
            remark: "",
            bonus_multiple: "",
        });
        Object.assign(this.listQuery, {
            plat_id: "",
            coin_name_unique: "",
        });
    }
    /**取得玩家金币 */
    getCoinGold() {
        this.sendNotification(HttpType.admin_coin_wallet_wallet, { coin_name_unique: this.listQuery.coin_name_unique });
    }
    /**取得玩家资讯 */
    setUserInfo() {
        const selfModel: SelfModel = <any>this.facade.retrieveProxy(SelfModel.NAME);
        const userInfo: UserInfoVO = selfModel.userInfo;
        switch (userInfo.type) {
            case UserType.CHANNEL:
                this.bodyData.gold = "0";
                break;
            case UserType.COIN:
            case UserType.COINUSEREXCHANGE:
                this.getCoinGold();
                break;
            default:
                this.bodyData.gold = <string>LangUtil("无限制");
        }
    }
}
