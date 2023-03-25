<template>
    <el-dialog :title="LangUtil('模板上传')" :visible.sync="myProxy.templateDialogData.bShow" width="500px">
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="80px"
            label-position="left"
            v-loading="net_status.loading"
        >
            <el-form-item size="mini" :label="tableColumns.plat_id.name" prop="plat_id">
                {{ tableColumns["plat_id"].options[form.plat_id] }}
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns.channel_id.name" prop="channel_id">
                {{ form.channel_id }}
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['model_type'].name" prop="model_type">
                <el-radio-group v-model="form.model_type">
                    <el-radio
                        v-for="(value, key) in tableColumns['model_type'].options"
                        :key="key"
                        :label="Number(key)"
                    >
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-upload
                v-if="form.model_type == 2"
                :file-list="myProxy.templateDialogData.fileList"
                :limit="1"
                action="#"
                :http-request="handleUpload"
                :show-file-list="false"
                accept=".gz"
            >
                <el-button size="small" type="primary">{{ LangUtil("上传自定义内容") }}</el-button>
            </el-upload>
            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="handleUpdate()">{{ LangUtil("确认保存") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatLoadPageDomainProxy from "../proxy/PlatLoadPageDomainProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword, getUrl } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import JsonEditor from "@/components/JsonEditor/index.vue";
import { HttpType } from "@/views/plat_load_page_domain/setting";
import { Message } from "element-ui";

@Component({
    components: {
        JsonEditor,
    },
})
export default class TemplateDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatLoadPageDomainProxy = this.getProxy(PlatLoadPageDomainProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    GlobalVar = GlobalVar;

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get rules() {
        return {};
    }

    handleUpload(options: any) {
        this.myProxy.templateDialogData.fileList = [options.file];
        return this.myProxy.uploadTemplate();
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdate();
            }
        });
    }

    // beforeUpload(file: any) {
    //     const isTarGz = file.type == "";
    //     if (!isTarGz) {
    //         Message.error(LangUtil("只能上传tar.gz包"));
    //         return false;
    //     }
    // }

    // get action() {
    //     const { id } = this.form;
    //     const url = getUrl(HttpType.admin_plat_load_page_domain_uploadTemplate, { id });
    //     return GlobalVar.host + url;
    // }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
