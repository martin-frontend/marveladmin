<template>
    <el-dialog :title="LangUtil('充值补单')" width="500px" :visible.sync="myProxy.dialogData.bShow">
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

            <el-form-item :label="LangUtil('补单金额')" prop="actual_gold">
                <el-input type="number" v-model.number="form.actual_gold"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleClose">{{ LangUtil("取消") }}</el-button>
                <el-button type="primary" @click="handleUpdate()">{{ LangUtil("确定") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import RechargeOrdersProxy from "@/views/recharge_orders/proxy/RechargeOrdersProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class RechargeOrdersDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: RechargeOrdersProxy = this.getProxy(RechargeOrdersProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

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
    regex = /^[+-]?\d*\.?\d*$/;
    langObj: any = {
        required: this.LangUtil("必须填写"),
        errorCode1: this.LangUtil("只能输入正数字，正浮点数，小数点后三位"),
        errorCode2: this.LangUtil("补单金格不能超过订单金额"),
        errorCode3: this.LangUtil("只能输入小数点后三位"),
    };
    get rules() {
        return {
            actual_gold: [
                { required: true, message: this.langObj.required, trigger: "blur" },
                { pattern: this.regex, message: this.LangUtil("只能输入正数字，正浮点数，小数点后三位") },
                { validator: this.validateMethod, trigger: "blur" },
            ],
        };
    }

    validateMethod(rule: any, value: any, callback: any) {
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

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    handleClose() {
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
