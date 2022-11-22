import LangUtil from "@/core/global/LangUtil";
import AbstractProxy from "@/core/abstract/AbstractProxy";
import { DialogStatus } from "@/core/global/Constant";
import { formCompared, objectRemoveNull } from "@/core/global/Functions";
import { HttpType } from "@/views/coin_receive_payment_channel/setting";
import { MessageBox } from "element-ui";
import ICoinReceivePaymentChannelProxy from "./ICoinReceivePaymentChannelProxy";
import i18n from "@/lang";
export default class CoinReceivePaymentChannelProxy extends AbstractProxy implements ICoinReceivePaymentChannelProxy {
    static NAME = "CoinReceivePaymentChannelProxy";

    /**进入页面时调用 */
    enter() {
        this.sendNotification(HttpType.admin_coin_receive_payment_channel_table_columns);
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

    receiveNoticeStr = <string>(
        LangUtil(
            "以上收款信息仅限本次支付使用，收款信息不定期更换，每次付款前请依照本页所显示的收款信息付款，如入款到已经过期账户导致无法查收，本平台概不负责。"
        )
    );

    goldNotice = <string>LangUtil("展示充值金额时，是否随机增加随机数，方便区分充值订单");

    /**表格相关数据 */
    tableData = {
        columns: {
            coin_wallet_ids: { name: "关联币商", options: {} },
            created_at: { name: "创建时间", options: {} },
            created_by: { name: "创建人", options: {} },
            data_belong: { name: "数据归属标记", options: {} },
            day_gold: { name: "今日总额", options: {} },
            day_limit_gold: { name: "每日限制", options: {} },
            day_receive_times: { name: "今日收款次数", options: {} },
            fixed_gold_list: { name: "固定充值金额列表", options: {} },
            gold_random: { name: "固定金额是否随机", options: {} },
            id: { name: "币商充值渠道ID", options: {} },
            index_no: { name: "排序序号", options: {} },
            is_delete: { name: "是否删除", options: {} },
            is_fixed_gold: { name: "是否固定充值金额", options: {} },
            max_gold: { name: "最大充值金额", options: {} },
            min_gold: { name: "最小充值金额", options: {} },
            notice: { name: "提示信息", options: {} },
            payment_method: { name: "币商账号信息", options: {} },
            plat_id: { name: "平台ID", options: {} },
            qr_code: { name: "币商账号二维码", options: {} },
            receive_name: { name: "收款人姓名", options: {} },
            receive_notice: { name: "收款提示", options: {} },
            status: { name: "状态", options: {} },
            subtitle: { name: "说明", options: {} },
            title: { name: "标签", options: {} },
            total_gold: { name: "已收总额", options: {} },
            total_limit_gold: { name: "总额限制", options: {} },
            total_receive_times: { name: "累计收款次数", options: {} },
            type: { name: "充值方式", options: <any>{} },
            updated_at: { name: "修改时间", options: {} },
            updated_by: { name: "更新人", options: {} },
            user_total_recharge: { name: "", options: {} },
        },
        list: <any>[],
        pageInfo: { pageTotal: 0, pageCurrent: 0, pageCount: 1, pageSize: 20 },
    };

    /**tabs 切换用, 预设1 银行卡*/
    tabsName = "1";

    /**银行列表 */
    bankList = {};

    /**图片上传 */
    uploadData = {
        type: 2,
        file: "",
        fileList: <any>[],
    };

    /**查询条件 */
    listQuery = {
        page_count: 1,
        page_size: 20,
        plat_id: "",
        receive_name: "",
        type: this.tabsName,
        status: "",
        coin_wallet_ids: "",
    };
    /**弹窗相关数据 */
    dialogData = {
        bShow: false,
        status: DialogStatus.create,
        form: {
            id: "",
            plat_id: "",
            title: "",
            notice: "",
            min_gold: "",
            max_gold: "",
            is_fixed_gold: "1",
            gold_random: "0",
            fixed_gold_list: [],
            gold_list_1: "",
            gold_list_2: "",
            gold_list_3: "",
            gold_list_4: "",
            gold_list_5: "",
            gold_list_6: "",
            gold_list_7: "",
            gold_list_8: "",
            total_limit_gold: "",
            day_limit_gold: "",
            type: "1",
            receive_name: "",
            bank: "",
            account_bank: "",
            account: "",
            qr_code: "",
            status: "1",
            account_name: "",
            bank_ch: "",
            receive_notice: this.receiveNoticeStr,
            coin_wallet_ids: [],
            user_total_recharge: "0",
            qr_code_url: null,
        },
        formSource: null, // 表单的原始数据
    };

    /**table 操作用数据 */
    tableUpdateData = {
        opt: "",
        status: "",
        id: "",
    };

    /**dialog plat id 需要去掉所有平台选项 */
    dialogPlatIdOptions = [];

    resetListQuery() {
        this.listQuery.receive_name = "";
        this.listQuery.status = "";
        this.listQuery.coin_wallet_ids = "";
    }

    /**设置表头数据 */
    setTableColumns(data: any) {
        Object.assign(this.tableData.columns, data);
        const PLAT_ID_OPTIONS_KEYS = Object.keys(this.tableData.columns["plat_id"].options);
        if (PLAT_ID_OPTIONS_KEYS.length > 0) {
            if (!PLAT_ID_OPTIONS_KEYS.includes(this.listQuery.plat_id)) {
                this.listQuery.plat_id = PLAT_ID_OPTIONS_KEYS[0];
                this.dialogData.form.plat_id = PLAT_ID_OPTIONS_KEYS[1];
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

    /**显示弹窗 */
    showDialog(status: string, data?: any) {
        this.onGetBankList();
        this.dialogData.bShow = true;
        this.dialogData.status = status;
        if (status == DialogStatus.update) {
            let obj = JSON.parse(JSON.stringify(data));
            obj.coin_wallet_ids = JSON.stringify(obj.coin_wallet_ids);
            obj.fixed_gold_list = JSON.stringify(obj.fixed_gold_list);
            obj.type = obj.type.toString();
            this.dialogData.formSource = obj;
            Object.assign(this.dialogData.form, JSON.parse(JSON.stringify(data)));

            this.dialogData.form.plat_id = String(this.dialogData.form.plat_id);
            this.dialogData.form.gold_random = String(this.dialogData.form.gold_random);
            this.dialogData.form.is_fixed_gold = String(this.dialogData.form.is_fixed_gold);
            this.dialogData.form.status = String(this.dialogData.form.status);
            this.dialogData.form.type = String(this.dialogData.form.type);
            this.dialogData.form.bank = String(this.dialogData.form.bank);
            this.dialogData.form.status = String(data.status);

            this.dialogData.form.gold_list_1 = this.dialogData.form.fixed_gold_list[0];
            this.dialogData.form.gold_list_2 = this.dialogData.form.fixed_gold_list[1];
            this.dialogData.form.gold_list_3 = this.dialogData.form.fixed_gold_list[2];
            this.dialogData.form.gold_list_4 = this.dialogData.form.fixed_gold_list[3];
            this.dialogData.form.gold_list_5 = this.dialogData.form.fixed_gold_list[4];
            this.dialogData.form.gold_list_6 = this.dialogData.form.fixed_gold_list[5];
            this.dialogData.form.gold_list_7 = this.dialogData.form.fixed_gold_list[6];
            this.dialogData.form.gold_list_8 = this.dialogData.form.fixed_gold_list[7];
            this.dialogData.form.type = this.tableData.columns.type.options[data.type];

            this.dialogData.form.receive_name = data.receive_name;
            this.dialogData.form.bank = data.payment_method.bank;
            this.dialogData.form.account_bank = data.payment_method.account_bank;
            this.dialogData.form.account = data.payment_method.account;
            this.dialogData.form.qr_code = data.qr_code;
            this.dialogData.form.qr_code_url = data.qr_code_url;

            this.dialogData.form.account_name = data.payment_method.account_name;
            this.dialogData.form.bank_ch = data.payment_method.bank_ch;
            this.dialogData.form.receive_notice = data.receive_notice || this.receiveNoticeStr;
            this.dialogData.form.coin_wallet_ids = data.coin_wallet_ids;

            this.uploadData.fileList[0] = data.qr_code;

            console.log("this.dialogData.form", this.dialogData.form);
        } else {
            this.resetDialogForm();
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
            id: "",
            plat_id: "",
            title: "",
            notice: "",
            min_gold: "",
            max_gold: "",
            is_fixed_gold: "1",
            gold_random: "0",
            fixed_gold_list: [],
            gold_list_1: "",
            gold_list_2: "",
            gold_list_3: "",
            gold_list_4: "",
            gold_list_5: "",
            gold_list_6: "",
            gold_list_7: "",
            gold_list_8: "",
            total_limit_gold: "",
            day_limit_gold: "",
            type: "1",
            receive_name: "",
            bank: "",
            account_bank: "",
            account: "",
            qr_code: "",
            status: "1",
            account_name: "",
            bank_ch: "",
            receive_notice: this.receiveNoticeStr,
            coin_wallet_ids: [],
            user_total_recharge: "0",
        });
        this.dialogInfo();
    }

    /**查询 */
    onQuery() {
        const copyQuery = JSON.parse(JSON.stringify(this.listQuery));
        if (copyQuery.coin_wallet_ids) {
            const coin_wallet_ids_keys = Object.keys(this.tableData.columns.coin_wallet_ids.options);
            let isGet: any = false;
            let walletId = -1;
            coin_wallet_ids_keys.forEach((platId: any, idx: any, arr: any) => {
                if (isGet) arr.splice(idx);
                //@ts-ignore
                const keys = Object.keys(this.tableData.columns.coin_wallet_ids.options[platId]);
                keys.forEach((id: any, index: any, array: any) => {
                    //@ts-ignore
                    if (copyQuery.coin_wallet_ids === this.tableData.columns.coin_wallet_ids.options[platId][id]) {
                        walletId = id;
                        console.warn("get", copyQuery.coin_wallet_ids);
                        isGet = true;
                        array.splice(index);
                    }
                });
            });
            copyQuery.coin_wallet_ids = walletId;
        }
        this.sendNotification(HttpType.admin_coin_receive_payment_channel_index, objectRemoveNull(copyQuery));
    }
    /**添加数据 */
    onAdd() {
        const formCopy: any = Object.assign({}, this.dialogData.form);
        formCopy.qr_code = this.uploadData.fileList;
        Object.keys(this.tableData.columns.type.options).forEach((key: any) => {
            if (formCopy.type === this.tableData.columns.type.options[key]) {
                formCopy.type = key;
            }
        });

        for (let index = 1; index <= 8; index++) {
            if (formCopy["gold_list_" + index]) {
                formCopy.fixed_gold_list.push(formCopy["gold_list_" + index]);
                formCopy["gold_list_" + index] = "";
            }
        }
        formCopy.fixed_gold_list = JSON.stringify(formCopy.fixed_gold_list);
        formCopy.subtitle = formCopy.title;
        formCopy.account_name = formCopy.receive_name;
        formCopy.coin_wallet_ids = JSON.stringify(formCopy.coin_wallet_ids);

        this.sendNotification(HttpType.admin_coin_receive_payment_channel_store, objectRemoveNull(formCopy));
    }
    /**更新数据 */
    onUpdate(isTableUpload: boolean = false) {
        let formCopy: any = {};
        if (isTableUpload) {
            formCopy = objectRemoveNull(this.tableUpdateData);
        } else {
            formCopy = JSON.parse(JSON.stringify(this.dialogData.form));
            Object.keys(this.tableData.columns.type.options).forEach((key: any) => {
                if (formCopy.type === this.tableData.columns.type.options[key]) {
                    formCopy.type = key;
                }
            });

            formCopy.qr_code = this.uploadData.fileList[0];
            formCopy.fixed_gold_list = [];
            formCopy.account_name = formCopy.receive_name;
            formCopy.subtitle = formCopy.title;

            for (let index = 1; index <= 8; index++) {
                if (formCopy["gold_list_" + index]) {
                    formCopy.fixed_gold_list.push(formCopy["gold_list_" + index]);
                    formCopy["gold_list_" + index] = "";
                }
            }
            formCopy.fixed_gold_list = JSON.stringify(formCopy.fixed_gold_list);
            formCopy.coin_wallet_ids = JSON.stringify(formCopy.coin_wallet_ids);

            formCopy.account = null;
            formCopy.account_bank = null;
            formCopy.account_name = null;
            formCopy.bank = null;
            formCopy.bank_ch = null;
            formCopy = formCompared(objectRemoveNull(formCopy), this.dialogData.formSource);
            if (Object.keys(formCopy).length == 0) {
                this.dialogData.bShow = false;
                return false;
            }
            formCopy.id = this.dialogData.form.id;
        }
        this.sendNotification(HttpType.admin_coin_receive_payment_channel_update, formCopy);
    }
    /**删除数据 */
    onDelete(id: any) {
        MessageBox.confirm(<string>LangUtil("您是否删除该记录"), <string>LangUtil("提示"), {
            confirmButtonText: <string>LangUtil("确定"),
            cancelButtonText: <string>LangUtil("取消"),
            type: "warning",
        })
            .then(() => {
                this.sendNotification(HttpType.admin_coin_receive_payment_channel_update, { id, is_delete: 1 });
            })
            .catch(() => {});
    }

    /**tabs 切换 */
    onTypeChange(name: any) {
        this.tabsName = name;
        this.listQuery.type = this.tabsName;
        this.onQuery();
    }

    /**取银行列表 */
    onGetBankList() {
        this.sendNotification(HttpType.admin_common_bank_list);
    }
    /**写入银行列表 */
    setGetBankList(data: any) {
        Object.assign(this.bankList, data);
    }

    /**dialog 资料预先处理 */
    dialogInfo() {
        let result: any = JSON.parse(JSON.stringify(this.tableData.columns));
        delete result.plat_id.options[0];
        this.dialogPlatIdOptions = result.plat_id.options;
        this.dialogData.form.plat_id = String(Object.keys(result.plat_id.options)[0]);
    }

    /**图片上传 */
    imageUpload() {
        this.sendNotification(HttpType.admin_resource_upload, this.uploadData);
    }

    uploadSuccess(data: any) {
        let uploadImageUrl: any = JSON.parse(JSON.stringify(data.url));
        if (typeof uploadImageUrl === "string") {
            try {
                this.uploadData.fileList[0] = uploadImageUrl.split("uri=")[1];
            } catch (e) {
                console.error("image upload Error:", e);
            }
        }
    }
}
