<template>
    <el-dialog :title="textMap[status]" width="900px" :visible.sync="myProxy.dialogData.bShow">
        <el-scrollbar style="height: 700px">
            <el-form ref="form" :rules="rules[status]" :model="form" label-width="160px" v-loading="net_status.loading">
                <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                    <el-select filterable v-model="form.plat_id" :placeholder="LangUtil('请选择')">
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
                    <el-radio v-model="form.is_fixed_gold" label="1">{{ LangUtil("是") }}</el-radio>
                    <el-radio v-model="form.is_fixed_gold" label="0">{{ LangUtil("否") }}</el-radio>
                </el-form-item>
                <el-form-item :label="tableColumns.fixed_gold_list.name" prop="fixed_gold_list">
                    <div class="gold_list">
                        <div>
                            <el-input
                                v-model="form.gold_list_1"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="LangUtil('金额') + 1"
                            ></el-input>
                            <el-input
                                v-model="form.gold_list_2"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="LangUtil('金额') + 2"
                            ></el-input>
                            <el-input
                                v-model="form.gold_list_3"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="LangUtil('金额') + 3"
                            ></el-input>
                            <el-input
                                v-model="form.gold_list_4"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="LangUtil('金额') + 4"
                            ></el-input>
                        </div>
                        <div>
                            <el-input
                                v-model="form.gold_list_5"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="LangUtil('金额') + 5"
                            ></el-input>
                            <el-input
                                v-model="form.gold_list_6"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="LangUtil('金额') + 6"
                            ></el-input>
                            <el-input
                                v-model="form.gold_list_7"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="LangUtil('金额') + 7"
                            ></el-input>
                            <el-input
                                v-model="form.gold_list_8"
                                oninput="value=value.replace(/[^\d]/g,'');"
                                :placeholder="LangUtil('金额') + 8"
                            ></el-input>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item :label="tableColumns.gold_random.name" prop="gold_random">
                    <el-radio v-model="form.gold_random" label="1">{{ LangUtil("是") }}</el-radio>
                    <el-radio v-model="form.gold_random" label="0">{{ LangUtil("否") }}</el-radio>
                    <p class="notic">{{ goldNotice }}</p>
                </el-form-item>
                <el-form-item :label="tableColumns.total_limit_gold.name" prop="total_limit_gold">
                    <el-input v-model="form.total_limit_gold" oninput="value=value.replace(/[^\d]/g,'');"></el-input>
                </el-form-item>
                <el-form-item :label="tableColumns.day_limit_gold.name" prop="day_limit_gold">
                    <el-input v-model="form.day_limit_gold"></el-input>
                </el-form-item>

                <el-form-item :label="tableColumns.user_total_recharge.name" prop="user_total_recharge">
                    <el-input
                        v-model="form.user_total_recharge"
                        max="1000000"
                        min="0"
                        type="number"
                        onkeyup="value=value.replace(/[^\d]/g,'')"
                    ></el-input>
                </el-form-item>

                <el-form-item :label="tableColumns.type.name" prop="type">
                    <div v-if="isStatusUpdate">
                        <el-input v-model="form.type" :disabled="isStatusUpdate !== null"></el-input>
                    </div>
                    <div v-else>
                        <el-select filterable v-model="form.type" :placeholder="LangUtil('请选择')">
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
                <el-form-item :label="`${tableColumns.receive_notice.name}` + LangUtil('信息')">
                    <el-input
                        type="textarea"
                        :placeholder="LangUtil('请输入')"
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
                    <el-form-item :label="LangUtil('开户行')" prop="bank">
                        <el-select
                            filterable
                            v-model="form.bank"
                            :placeholder="LangUtil('请选择')"
                            :disabled="isStatusUpdate"
                        >
                            <el-option v-for="(item, key) of bankList" :label="item" :value="key" :key="key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="LangUtil('开户支行')" prop="account_bank">
                        <el-input v-model="form.account_bank" :disabled="isStatusUpdate"></el-input>
                    </el-form-item>
                    <el-form-item :label="LangUtil('银行卡号')" prop="account">
                        <el-input v-model="form.account" :disabled="isStatusUpdate"></el-input>
                    </el-form-item>
                </div>
                <el-form-item
                    :label="LangUtil('支付宝账号')"
                    prop="account"
                    v-if="form.type === '2' || form.type === '支付宝'"
                >
                    <el-input v-model="form.account" :disabled="isStatusUpdate"></el-input>
                </el-form-item>
                <el-form-item
                    :label="LangUtil('微信账号')"
                    prop="account"
                    v-if="form.type === '3' || form.type === '微信'"
                >
                    <el-input v-model="form.account" :disabled="isStatusUpdate"></el-input>
                </el-form-item>

                <div v-if="form.type == '2' || form.type == '支付宝' || form.type == '3' || form.type == '微信'">
                    <el-form-item :label="LangUtil('上传二维码')" prop="qr_code">
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
                                <el-button class="item upload_btn" type="primary" icon="el-icon-circle-plus-outline">{{
                                    LangUtil("上传图片")
                                }}</el-button>
                                <div slot="tip" class="el-upload__tip">
                                    {{ LangUtil("图片正方形，JPG后者PNG，最大不要超过200kb") }}
                                </div>
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
                        :placeholder="LangUtil('请选择')"
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
                    <el-radio v-model="form.status" label="1">{{ LangUtil("是") }}</el-radio>
                    <el-radio v-model="form.status" label="98">{{ LangUtil("否") }}</el-radio>
                </el-form-item>
            </el-form>
        </el-scrollbar>
        <div class="btn_group">
            <el-button type="danger" v-if="isStatusUpdate" @click="handleDelete()">{{ LangUtil("删除") }}</el-button>
            <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                LangUtil("确认保存")
            }}</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: CoinReceivePaymentChannelProxy = this.getProxy(CoinReceivePaymentChannelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;

    form = this.myProxy.dialogData.form;

    goldNotice = this.myProxy.goldNotice;

    bankList = this.myProxy.bankList;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

    get platIdOptions() {
        return this.myProxy.dialogPlatIdOptions;
    }

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
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
            plat_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            title: [
                { required: true, message: this.LangUtil("必须填写"), trigger: "blur" },
                { max: 20, message: this.LangUtil("长度在20个字符"), trigger: "blur" },
            ],
            min_gold: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            max_gold: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            is_fixed_gold: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            fixed_gold_list: [{ required: true, validator: this.validateGoldList, trigger: "blur" }],
            type: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            receive_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            bank: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            account_bank: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            account: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            qr_code: [{ required: true, validator: this.validateUpload, trigger: "blur" }],
            status: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            user_total_recharge: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
        };
        return {
            create: commonRules,
            update: commonRules,
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    validateGoldList(rule: any, value: any, callback: any) {
        let d: any = this.form;
        let errorCode1: any = this.LangUtil("请输入金额");
        let errorCode7: any = this.LangUtil("最大金额或最小金额没填写");
        let errorCode2: any = this.LangUtil("金额不能小于最小金额");
        let errorCode3: any = this.LangUtil("金额不能大于最大金额");
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
    validateUpload(rule: any, value: any, callback: any) {
        let errorCode4: any = this.LangUtil("请上传QR Code");
        if (this.myProxy.uploadData.fileList.length === 0) {
            callback(new Error(errorCode4));
        } else {
            callback();
        }
    }

    handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }

    // 图片上传前验证
    checkImage(file: File) {
        let errorCode5: any = this.LangUtil("上传图片大小不能超过 2KB!");
        let uploadImageErrorCode: any = this.LangUtil("上传文件只能是 jpeg/jpg/png");
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
