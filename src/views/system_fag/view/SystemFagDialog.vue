<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item label-width="0" prop="name">
                <el-input
                    style="width: 100%"
                    :value="``"
                    :placeholder="$t('system_fag.questionTitle')"
                    v-model="form.name"
                    maxlength="30"
                    clearable
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item label-width="0" prop="content">
                <el-input
                    :maxlength="contentRemnant"
                    :rows="6"
                    type="textarea"
                    filterable
                    clearable
                    class="select"
                    :placeholder="$t('system_fag.questionContent')"
                    v-model="form.content"
                    show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button
                    v-if="checkUnique(unique.system_fag_update)"
                    type="primary"
                    size="mini"
                    @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                    >{{ $t("common.save") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import SystemFagProxy from "@/views/system_fag/proxy/SystemFagProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class SystemFagDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: SystemFagProxy = this.getProxy(SystemFagProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

    private contentRemnant: number = 2000;

    private textMap = {
        update: this.$t("common.update"),
        create: this.$t("common.create"),
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

    private handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
