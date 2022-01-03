<template>
    <el-dialog :title="$t('recharge_orders.topUpOrder')" width="500px" :visible.sync="myProxy.dialogData.bShow">
        <el-form
            :model="form"
            status-icon
            ref="form"
            :rules="rules"
            class="demo-ruleForm"
            v-loading="net_status.loading"
        >
            <div class="info_group">
                <span>{{ tableColumns.order_no.name }}</span
                ><span>{{ form.order_no }}</span>
            </div>
            <div class="info_group">
                <span>{{ tableColumns.gold.name }}</span
                ><span>{{ form.gold }}</span>
            </div>

            <el-form-item :label="$t('recharge_orders.replenishmentAmount')" prop="actual_gold">
                <el-input type="number" v-model.number="form.actual_gold"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleClose">{{ $t("common.cancel") }}</el-button>
                <el-button type="primary" @click="handleUpdate()">{{ $t("common.determine") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import RechargeOrdersProxy from "@/views/recharge_orders/proxy/RechargeOrdersProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class RechargeOrdersDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: RechargeOrdersProxy = this.getProxy(RechargeOrdersProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

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
    private regex = /^[+-]?\d*\.?\d*$/;
    private langObj: any = {
        required: this.$t("common.requiredInput"),
        errorCode1: this.$t("recharge_orders.makeErrorCode1"),
        errorCode2: this.$t("recharge_orders.makeErrorCode2"),
        errorCode3: this.$t("recharge_orders.makeErrorCode3"),
    };
    get rules() {
        return {
            actual_gold: [
                { required: true, message: this.langObj.required, trigger: "blur" },
                { pattern: this.regex, message: this.$t("recharge_orders.makeErrorCode1") },
                { validator: this.validateMethod, trigger: "blur" },
            ],
        };
    }

    private validateMethod(rule: any, value: any, callback: any) {
        if (value > this.form.gold) {
            callback(new Error(this.langObj.errorCode2));
        } else if (value < 0) {
            this.form.actual_gold = value.toString().split("-")[1];
        } else if (value.toString().indexOf(".") > 0) {
            if (value.toString().split(".")[1].length > 3) {
                callback(new Error(this.langObj.errorCode3));
            } else {
                callback();
            }
        } else {
            callback();
        }
    }

    private handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    private handleClose() {
        this.myProxy.hideDialog();
    }
}
</script>

<style scoped lang="scss">
// @import "@/styles/common.scss";
.info_group {
    margin-bottom: 8px;
    display: flex;
    span {
        display: inline-block;
        width: 70px;
        text-align: left;
        margin-right: 16px;
        position: relative;

        + span {
            display: flex;
            flex: 1;
        }
    }
}
::v-deep .el-form-item__content {
    display: flex;
}
::v-deep .el-form-item__label {
    font-weight: 400;
    color: #606266;
    font-size: 14px;
    word-break: normal;
    line-height: 1;
    margin-left: -10px;
}
::v-deep .el-form-item__content {
    justify-content: center;
}

::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
}
</style>
