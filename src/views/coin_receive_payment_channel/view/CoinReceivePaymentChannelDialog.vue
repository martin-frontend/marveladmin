<template>
    <el-dialog :title="textMap[status]" width="900px" :visible.sync="myProxy.dialogData.bShow">
        <el-scrollbar style="height: 700px">
            <el-form ref="form" :rules="rules[status]" :model="form" label-width="160px" v-loading="net_status.loading">
                <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                    <el-select filterable v-model="form.plat_id" :placeholder="$t('common.pleaseChoose')">
                        <el-option v-for="(item, key) of platIdOptions" :label="item" :value="key" :key="key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="tableColumns.title.name" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.notice.name" prop="notice">
                    <el-input v-model="form.notice"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.min_gold.name" prop="min_gold">
                    <el-input v-model="form.min_gold" oninput="value=value.replace(/[^\d]/g,'');"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.max_gold.name" prop="max_gold">
                    <el-input v-model="form.max_gold" oninput="value=value.replace(/[^\d]/g,'');"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.is_fixed_gold.name" prop="is_fixed_gold">
                    <el-radio v-model="form.is_fixed_gold" label="1">{{ $t("common.yes") }}</el-radio>
                    <el-radio v-model="form.is_fixed_gold" label="0">{{ $t("common.no") }}</el-radio>
                </el-form-item>
                <el-form-item :label="tableColumns.fixed_gold_list.name" prop="fixed_gold_list">
                    <div class="gold_list">
                        <div>
                            <el-input
                                v-model="form.gold_list_1"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="$t('common.money')+1"
                            ></el-input>
                            <el-input
                                v-model="form.gold_list_2"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="$t('common.money')+2"
                            ></el-input>
                            <el-input
                                v-model="form.gold_list_3"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="$t('common.money')+3"
                            ></el-input>
                            <el-input
                                v-model="form.gold_list_4"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="$t('common.money')+4"
                            ></el-input>
                        </div>
                        <div>
                            <el-input
                                v-model="form.gold_list_5"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="$t('common.money')+5"
                            ></el-input>
                            <el-input
                                v-model="form.gold_list_6"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="$t('common.money')+6"
                            ></el-input>
                            <el-input
                                v-model="form.gold_list_7"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="$t('common.money')+7"
                            ></el-input>
                            <el-input
                                v-model="form.gold_list_8"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="$t('common.money')+8"
                            ></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item :label="tableColumns.gold_random.name" prop="gold_random">
                    <el-radio v-model="form.gold_random" label="1">{{ $t("common.yes") }}</el-radio>
                    <el-radio v-model="form.gold_random" label="0">{{ $t("common.no") }}</el-radio>
                    <p class="notic">{{ goldNotice }}</p>
                </el-form-item>
                <el-form-item :label="tableColumns.total_limit_gold.name" prop="total_limit_gold">
                    <el-input v-model="form.total_limit_gold" oninput="value=value.replace(/[^\d]/g,'');"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.day_limit_gold.name" prop="day_limit_gold">
                    <el-input v-model="form.day_limit_gold"></el-input>
                </el-form-item>

                <el-form-item :label="tableColumns.user_total_recharge.name" prop="user_total_recharge">
                    <el-input v-model="form.user_total_recharge" max="1000000" min="0" type="number" onkeyup="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>

                <el-form-item :label="tableColumns.type.name" prop="type">
                    <div v-if="isStatusUpdate">
                        <el-input v-model="form.type" :disabled="isStatusUpdate !== null"></el-input>
                    </div>
                    <div v-else>
                        <el-select filterable v-model="form.type" :placeholder="$t('common.pleaseChoose')">
                            <el-option
                                v-for="(item, key) of tableColumns.type.options"
                                :label="item"
                                :value="key"
                                :key="key"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <!-- receive_notice -->
                <el-form-item :label="`${tableColumns.receive_notice.name}`+$t('common.info')">
                    <el-input
                        type="textarea"
                        :placeholder="$t('common.pleaseEnter')"
                        v-model="form.receive_notice"
                        maxlength="100"
                        show-word-limit
                    >
                    </el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.receive_name.name" prop="receive_name">
                    <el-input v-model="form.receive_name" :disabled="isStatusUpdate"></el-input>
                </el-form-item>
                <div v-if="form.type === '1' || form.type === '银行卡'">
                    <el-form-item :label="$t('coin_receive_payment_channel.accountBank')" prop="bank">
                        <el-select
                            filterable
                            v-model="form.bank"
                            :placeholder="$t('common.pleaseChoose')"
                            :disabled="isStatusUpdate"
                        >
                            <el-option v-for="(item, key) of bankList" :label="item" :value="key" :key="key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('coin_receive_payment_channel.accountOpeningBranch')" prop="account_bank">
                        <el-input v-model="form.account_bank" :disabled="isStatusUpdate"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('common.bankCard')" prop="account">
                        <el-input v-model="form.account" :disabled="isStatusUpdate"></el-input>
                    </el-form-item>
                </div>
                <el-form-item :label="$t('common.alipayNumber')" prop="account" v-if="form.type === '2' || form.type === '支付宝'">
                    <el-input v-model="form.account" :disabled="isStatusUpdate"></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.weChatAccount')" prop="account" v-if="form.type === '3' || form.type === '微信'">
                    <el-input v-model="form.account" :disabled="isStatusUpdate"></el-input>
                </el-form-item>

                <div v-if="form.type == '2' || form.type == '支付宝' || form.type == '3' || form.type == '微信'">
                    <el-form-item :label="$t('coin_receive_payment_channel.uploadQrcode')" prop="qr_code">
                        <div>
                            <el-upload
                                class="upload_group"
                                ref="upload"
                                :limit="1"
                                action="#"
                                :before-upload="checkImage"
                                accept="image/jpeg,image/png"
                                :on-remove="removeImage"
                                :on-change="fileChange"
                                :http-request="upload"
                            >
                                <el-button class="item upload_btn" type="primary" icon="el-icon-circle-plus-outline"
                                    >{{ $t("common.uploadImage") }}</el-button
                                >
                                <div slot="tip" class="el-upload__tip">{{ $t("coin_receive_payment_channel.uploadTip") }}</div>
                            </el-upload>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="form.qr_code_url">
                        <div><img :src="form.qr_code_url" alt="qrCode" width="200px" /></div>
                    </el-form-item>
                </div>

                <el-form-item :label="tableColumns['coin_wallet_ids'].name" prop="coin_wallet_ids">
                    <el-select
                        filterable
                        multiple
                        v-model="form.coin_wallet_ids"
                        :placeholder="$t('common.pleaseChoose')"
                        style="width:100%"
                    >
                        <el-option
                            v-for="(item, key) of tableColumns.coin_wallet_ids.options[form.plat_id]"
                            :label="item"
                            :value="Number(key)"
                            :key="key"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item :label="tableColumns['status'].name" prop="status">
                    <el-radio v-model="form.status" label="1">{{ $t("common.yes") }}</el-radio>
                    <el-radio v-model="form.status" label="98">{{ $t("common.no") }}</el-radio>
                </el-form-item>
            </el-form>
        </el-scrollbar>
        <div class="btn_group">
            <el-button type="danger" v-if="isStatusUpdate" @click="handleDelete()">{{ $t("common.delete") }}</el-button>
            <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{ $t("common.save") }}</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import CoinReceivePaymentChannelProxy from "@/views/coin_receive_payment_channel/proxy/CoinReceivePaymentChannelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { warn } from "node_modules/vue-class-component/lib/util";

@Component
export default class CoinReceivePaymentChannelDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: CoinReceivePaymentChannelProxy = this.getProxy(CoinReceivePaymentChannelProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;

    private form = this.myProxy.dialogData.form;

    private goldNotice = this.myProxy.goldNotice;

    private bankList = this.myProxy.bankList;

    private textMap = {
        update: this.$t("common.update"),
        create: this.$t("common.create"),
    };

    get platIdOptions() {
        return this.myProxy.dialogPlatIdOptions;
    }

    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        const commonRules = {
            plat_id: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "blur" }],
            title: [
                { required: true, message: this.$t("common.requiredInput"), trigger: "blur" },
                { max: 20, message: this.$t("coin_receive_payment_channel.ruleText1"), trigger: "blur" },
            ],
            min_gold: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            max_gold: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            is_fixed_gold: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "blur" }],
            fixed_gold_list: [{ required: true, validator: this.validateGoldList, trigger: "blur" }],
            type: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            receive_name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            bank: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            account_bank: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            account: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            qr_code: [{ required: true, validator: this.validateUpload, trigger: "blur" }],
            status: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
            user_total_recharge: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
        };
        return {
            create: commonRules,
            update: commonRules,
        };
    }

    private handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    private handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    private validateGoldList(rule: any, value: any, callback: any) {
        let d: any = this.form;
        let errorCode1: any = this.$t("coin_receive_payment_channel.errorCode1")
        let errorCode7: any = this.$t("coin_receive_payment_channel.errorCode7")
        let errorCode2: any = this.$t("coin_receive_payment_channel.errorCode2")
        let errorCode3: any = this.$t("coin_receive_payment_channel.errorCode3")
        if (
            !d.gold_list_1 &&
            !d.gold_list_2 &&
            !d.gold_list_3 &&
            !d.gold_list_4 &&
            !d.gold_list_5 &&
            !d.gold_list_6 &&
            !d.gold_list_7 &&
            !d.gold_list_8
        ) {
            callback(new Error(errorCode1));
        }

        // 验证金额不能小于 最小额度 且 不能大于最大额度
        let result: boolean = true;
        let flag: boolean = true;
        let max: any = Number(this.form.max_gold);
        let min: any = Number(this.form.min_gold);
        if (max === 0 || min === 0) {
            callback(new Error(errorCode7));
            flag = false;
            return false;
        }
        for (let i = 1; i <= 8; i++) {
            if (d["gold_list_" + i]) {
                let gold: Number = Number(d["gold_list_" + i]);
                if (gold >= 0) {
                    if (gold < min) {
                        callback(new Error(errorCode2));
                        return false;
                    } else if (gold > max) {
                        callback(new Error(errorCode3));
                        return false;
                    }
                }
            }
        }
        if (flag && result) {
            callback();
        }
    }

    // qr code 验证
    private validateUpload(rule: any, value: any, callback: any) {
        let errorCode4: any = this.$t("coin_receive_payment_channel.errorCode4")
        if (this.myProxy.uploadData.fileList.length === 0) {
            callback(new Error(errorCode4));
        } else {
            callback();
        }
    }

    private handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }

    // 图片上传前验证
    checkImage(file: File) {
        let errorCode5: any = this.$t("coin_receive_payment_channel.errorCode5")
        let uploadImageErrorCode: any = this.$t("common.uploadImageErrorCode")
        const isIMAGE = file.type === "image/jpeg" || "image/png" || "image/jpg";
        const isLt2M = file.size / 1024 / 1024 / 1024 < 2;
        if (file.size > 200000) {
            this.$message.error(errorCode5);
        }
        if (!isIMAGE) {
            this.$message.error(uploadImageErrorCode);
        }
        return isLt2M && isIMAGE;
    }

    // 显示上传完后的图片名
    upload() {}

    removeImage(file: File, fileList = []) {
        this.myProxy.uploadData.fileList.push(...fileList);
    }

    fileChange(file: any, fileList: Object[]) {
        this.myProxy.uploadData.file = file.raw;
        this.myProxy.imageUpload();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

::v-deep .gold_list {
    > div {
        display: flex;
        justify-content: space-between;
    }
}
.upload_group {
    margin-top: 0 !important;
    display: flex;
}
.el-upload__tip {
    margin-left: 6px;
}
.btn_group {
    display: flex;
    justify-content: flex-end;
    position: relative;
}
::v-deep .el-upload-list {
    position: absolute;
    top: 30px;
    left: 0;
}
::v-deep .el-loading-mask {
    position: fixed !important;
}
::v-deep .el-upload-list__item:first-child {
    margin-top: -53px;
}
.notic {
    font-size: 12px;
    margin: 0;
    color: #c1c1c1;
}
::v-deep .el-scrollbar__wrap {
    overflow-y: scroll;
    overflow-x: auto;
}
</style>
