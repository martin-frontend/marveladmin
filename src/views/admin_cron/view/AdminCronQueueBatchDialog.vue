<template>
    <el-dialog :title="$t('admin_cron.batchUpdate')" :visible.sync="myProxy.cronQueueBatchDialogData.bShow" width="550px">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <!-- 任务名称 -->
            <el-form-item :label="tableColumns.cron_id.name" prop="cron_id">
                <el-select
                    filterable
                    clearable
                    v-model="listQuery.cron_id"
                    :placeholder="$t('common.pleaseChoose')"
                >
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
                <el-input v-model="listQuery.num_rows" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>

            <el-form-item>
                <div class="footer">
                    <el-button type="primary" @click="handleBatchUpdata()">{{ $t("admin_cron.action") }}</el-button>
                    <el-button @click="handleClose()">{{ $t("common.cancel") }}</el-button>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import AdminCronProxy from "@/views/admin_cron/proxy/AdminCronProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class AdminCronDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: AdminCronProxy = this.getProxy(AdminCronProxy);
    // proxy property
    private tableColumns = this.myProxy.cronQueueTableData.columns;
    private listQuery = this.myProxy.cronQueueBatchDialogData.form;

    get form() {
        return this.myProxy.cronQueueBatchDialogData.form;
    }

    @Watch("myProxy.cronQueueBatchDialogData.bShow")
    private onWatchShow() {
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
            cron_id: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "blur" }],
            num_rows: [{ required: true, message: this.$t("common.requiredInput"), trigger: "blur" }],
        };
    }

    private handleBatchUpdata() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onBatchUpdate();
            }
        });
    }

    private handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onCronUpdate();
            }
        });
    }

    private handleClose() {
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
