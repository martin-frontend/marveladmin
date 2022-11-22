<template>
    <el-dialog :title="LangUtil('查看定时任务')" :visible.sync="myProxy.cronQueuePreviewDialogData.bShow" width="550px">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" v-loading="net_status.loading">
            <!-- id -->
            <el-form-item :label="tableColumns.id.name + ':'">
                {{ form.id }}
            </el-form-item>
            <!-- 任务ID -->
            <el-form-item :label="tableColumns.worker_id.name + ':'">
                {{ form.worker_id }}
            </el-form-item>
            <!-- 任务名称 -->
            <el-form-item :label="tableColumns.cron_id.name + ':'">
                {{ form.cron_id }}
            </el-form-item>
            <!-- 唯一标记 -->
            <el-form-item :label="tableColumns.unique.name + ':'">
                {{ form.unique }}
            </el-form-item>
            <!-- 运行时长(秒) -->
            <el-form-item :label="tableColumns.runtime.name + ':'">
                {{ form.runtime }}
            </el-form-item>
            <!-- 超时时长(秒) -->
            <el-form-item :label="tableColumns.timeout.name + ':'">
                {{ form.timeout }}
            </el-form-item>
            <!-- 运行状态 -->
            <el-form-item :label="tableColumns.status.name + ':'">
                {{ form.status }}
            </el-form-item>
            <!-- 运行状态 -->
            <el-form-item :label="tableColumns.result.name + ':'">
                {{ form.result }}
            </el-form-item>
            <!-- 创建时间 -->
            <el-form-item :label="tableColumns.created_at.name + ':'">
                {{ form.created_at }}
            </el-form-item>
            <!-- 更新时间 -->
            <el-form-item :label="tableColumns.updated_at.name + ':'">
                {{ form.updated_at }}
            </el-form-item>
            <el-form-item>
                <div class="footer">
                    <el-button type="primary" @click="handleClose">{{ LangUtil("关闭") }}</el-button>
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
    listQuery = this.myProxy.cronQueuePreviewDialogData.form;

    get form() {
        return this.myProxy.cronQueuePreviewDialogData.form;
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
