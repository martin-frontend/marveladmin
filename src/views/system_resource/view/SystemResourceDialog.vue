<template>
    <div>
        <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="500px">
            <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
                <el-form-item :label="tableColumns.type.name" prop="type">
                    <el-select
                        v-model="myProxy.dialogData.form.type"
                        filterable
                        class="select"
                        :placeholder="LangUtil('请选择')"
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
                        LangUtil("上传图片")
                    }}</el-button>
                </el-upload>
                <div style="text-align: right; margin-top: 2rem" v-if="myProxy.imgBatchDialogData.fileList.length > 0">
                    <el-button @click="handleAdd" class="item" type="primary" icon="">{{
                        LangUtil("确认保存")
                    }}</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
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
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: SystemResourceProxy = this.getProxy(SystemResourceProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };

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
        return {
            type: [{ required: true, message: "", trigger: "change" }],
        };
    }

    confirmObj: any = {
        str1: this.LangUtil("确定上传?"),
        prompt: this.LangUtil("提示"),
        determine: this.LangUtil("确定"),
        cancel: this.LangUtil("取消"),
        errorCode1: this.LangUtil("上传图片大小不能超过 2MB!"),
        errorCode2: this.LangUtil("上传文件只能是 jpeg/jpg/png"),
    };

    handleAdd() {
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
