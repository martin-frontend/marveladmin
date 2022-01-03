<template>
    <div>
        <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="500px">
            <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
                <el-form-item :label="tableColumns.type.name" prop="type">
                    <el-select
                        v-model="myProxy.dialogData.form.type"
                        filterable
                        class="select"
                        :placeholder="$t('common.pleaseChoose')"
                    >
                        <el-option
                            v-for="(value, key) in tableColumns.type.options"
                            :key="key"
                            :label="value"
                            :value="key"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-upload
                    ref="upload"
                    action="#"
                    :before-upload="beforeAvatarUpload"
                    :auto-upload="false"
                    :on-remove="fileChange"
                    :on-change="fileChange"
                    :multiple="true"
                    :file-list="myProxy.imgBatchDialogData.fileList"
                    class="el_upload"
                >
                    <el-button class="item" type="primary" icon="el-icon-circle-plus-outline">{{
                        $t("common.uploadImage")
                    }}</el-button>
                </el-upload>
                <div style="text-align: right; margin-top: 2rem" v-if="myProxy.imgBatchDialogData.fileList.length > 0">
                    <el-button @click="handleAdd" class="item" type="primary" icon="">{{
                        $t("common.save")
                    }}</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import SystemResourceProxy from "@/views/system_resource/proxy/SystemResourceProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { BatchStatus } from "../proxy/ISystemResourceProxy";

@Component
export default class SystemResourceDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: SystemResourceProxy = this.getProxy(SystemResourceProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;

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
        return {
            type: [{ required: true, message: "", trigger: "change" }],
        };
    }

    private confirmObj: any = {
        str1: this.$t("system_resource.confirmSubmit"),
        prompt: this.$t("common.prompt"),
        determine: this.$t("common.determine"),
        cancel: this.$t("common.cancel"),
        errorCode1: this.$t("system_resource.uploadSizeLimit"),
        errorCode2: this.$t("system_resource.uploadImageErrorCode"),
    };

    private handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.$confirm(this.confirmObj.str1, this.confirmObj.prompt, {
                    confirmButtonText: this.confirmObj.determine,
                    cancelButtonText: this.confirmObj.cancel,
                    type: "warning",
                }).then(() => {
                    this.myProxy.showBatchDialog(BatchStatus.Upload);
                });
            }
        });
    }

    // 图片上传前验证
    beforeAvatarUpload(file: File) {
        const isIMAGE = file.type === "image/jpeg" || "image/png" || "image/jpg";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            this.$message.error(this.confirmObj.errorCode1);
        }
        if (!isIMAGE) {
            this.$message.error(this.confirmObj.errorCode2);
        }
        return isLt2M && isIMAGE;
    }
    // 上传图片变动
    fileChange(file: File, fileList: Object[]) {
        this.myProxy.fileChange(fileList);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.el_upload {
    text-align: right;
    margin-top: 3rem;
}
</style>
