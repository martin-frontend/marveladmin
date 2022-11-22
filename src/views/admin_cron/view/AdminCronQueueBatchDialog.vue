<template>
    <el-dialog :title="LangUtil('批量更新')" :visible.sync="myProxy.cronQueueBatchDialogData.bShow" width="550px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <!-- 任务名称 -->
            <el-form-item :label="tableColumns.cron_id.name" prop="cron_id">
                <el-select filterable clearable v-model="listQuery.cron_id" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(item, key) of tableColumns.cron_id.options"
                        :key="key"
                        :label="item"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>
            <!-- 执行数量 -->
            <el-form-item :label="tableColumns.num_rows.name" prop="num_rows">
                <el-input v-model="listQuery.num_rows" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>

            <el-form-item>
                <div class="footer">
                    <el-button type="primary" @click="handleBatchUpdata()">{{ LangUtil("确定执行") }}</el-button>
                    <el-button @click="handleClose()">{{ LangUtil("取消") }}</el-button>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import AdminCronProxy from "@/views/admin_cron/proxy/AdminCronProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class AdminCronDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: AdminCronProxy = this.getProxy(AdminCronProxy);
    // proxy property
    tableColumns = this.myProxy.cronQueueTableData.columns;
    listQuery = this.myProxy.cronQueueBatchDialogData.form;

    get form() {
        return this.myProxy.cronQueueBatchDialogData.form;
    }

    @Watch("myProxy.cronQueueBatchDialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get status() {
        return this.myProxy.cronQueueBatchDialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            cron_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            num_rows: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
        };
    }

    handleBatchUpdata() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onBatchUpdate();
            }
        });
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onCronUpdate();
            }
        });
    }

    handleClose() {
        this.myProxy.hideDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.footer {
    display: flex;
    justify-content: flex-end;
}
</style>
