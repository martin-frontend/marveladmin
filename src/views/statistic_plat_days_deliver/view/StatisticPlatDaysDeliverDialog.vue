<template>
    <el-dialog :title="LangUtil(textMap[status])" :visible.sync="myProxy.dialogData.bShow" width="550px">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.deliver_use.name" prop="deliver_use">
                <el-input
                    clearable
                    v-model="myProxy.dialogData.form.deliver_use"
                    @input="restrictToNumbersAndDecimal"
                ></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button @click="myProxy.hideDialog()">
                    {{ LangUtil("取消") }}
                </el-button>
                <el-button type="primary" @click="handleUpdate">
                    {{ LangUtil("确定") }}
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import StatisticPlatDaysDeliverProxy from "../proxy/StatisticPlatDaysDeliverProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class StatisticPlatDaysDeliverDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: StatisticPlatDaysDeliverProxy = this.getProxy(StatisticPlatDaysDeliverProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    LangUtil = LangUtil;
    private textMap = {
        update: LangUtil("编辑"),
        create: LangUtil("新增"),
    };

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
        return {};
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

    restrictToNumbersAndDecimal() {
        // 获取输入的值
        let inputValue = this.myProxy.dialogData.form.deliver_use;

        // 去除除了数字和小数点之外的字符
        inputValue = inputValue.replace(/[^0-9.]/g, "");

        // 确保只有一个小数点
        const decimalCount = inputValue.split(".").length - 1;
        if (decimalCount > 1) {
            inputValue = inputValue.replace(/\.+$/, ""); // 删除多余的小数点
        }

        // 更新输入框的值
        this.myProxy.dialogData.form.deliver_use = inputValue;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
