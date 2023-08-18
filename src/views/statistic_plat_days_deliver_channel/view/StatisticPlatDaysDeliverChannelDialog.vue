<template>
    <el-dialog :title="LangUtil(textMap[status])" :visible.sync="myProxy.dialogData.bShow" width="550px">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-loading="net_status.loading">
            <el-form-item
                v-if="myProxy.tabName == 'channel'"
                :label="tableColumns.deliver_name.name"
                prop="deliver_name"
            >
                <el-input clearable v-model="myProxy.dialogData.form.deliver_name"></el-input>
            </el-form-item>
            <el-form-item v-if="myProxy.tabName == 'group'" :label="tableColumns.group_name.name" prop="group_name">
                <el-input clearable v-model="myProxy.dialogData.form.group_name"></el-input>
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
import StatisticPlatDaysDeliverChannelProxy from "../proxy/StatisticPlatDaysDeliverChannelProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class StatisticPlatDaysDeliverChannelDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy = this.$parent.myProxy;
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
        if (this.myProxy.tabName == "channel") {
            return {
                deliver_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            };
        } else {
            return {
                group_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
            };
        }
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

    handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
