<template>
    <el-dialog :title="`${textMap[status]}`" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select
                    v-model="form.plat_id"
                    :disabled="isStatusUpdate"
                    filterable
                    :placeholder="$t('common.pleaseChoose')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="tableColumns.name.name" prop="name">
                <div class="flex d-flex">
                    <el-input
                        clearable
                        maxlength="30"
                        :placeholder="$t('common.pleaseEnter')"
                        v-model="form.name"
                        style="margin-right: 0.8rem"
                    ></el-input>
                    <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate(form.name)">
                        {{ $t("user_detail.translate") }}
                    </el-button>
                </div>
            </el-form-item>

            <el-form-item :label="tableColumns.type.name" prop="type">
                <el-select v-model="form.type" filterable :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(value, key) in tableColumns.type.options"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="tableColumns.subject.name" prop="subject">
                <div class="flex d-flex">
                    <el-input
                        clearable
                        maxlength="30"
                        :placeholder="$t('common.pleaseEnter')"
                        v-model="form.subject"
                        style="margin-right: 0.8rem"
                    ></el-input>
                    <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate(form.subject)"
                    >
                        {{ $t("user_detail.translate") }}</el-button
                    >
                </div>
            </el-form-item>

            <el-form-item :label="`${tableColumns.content.name}`" prop="content">
                <div class="flex d-flex">
                    <el-input
                        maxlength="300"
                        :rows="6"
                        type="textarea"
                        filterable
                        clearable
                        class="select"
                        :placeholder="`${tableColumns.content.name}`"
                        v-model="form.content"
                        show-word-limit
                        style="margin-right: 0.8rem"
                    ></el-input>
                    <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate(form.content)"
                    >
                        {{ $t("user_detail.translate") }}</el-button
                    >
                </div>
            </el-form-item>

            <el-form-item :label="tableColumns.replaceable_text.name" prop="replaceable_text">
                <el-input clearable :placeholder="$t('common.pleaseEnter')" v-model="form.replaceable_text"></el-input>
            </el-form-item>

            <el-form-item class="dialog-footer">
                <el-button type="danger" size="mini" @click="handleDelete()">{{ $t("common.delete") }}</el-button>
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    $t("common.save")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue, Watch } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { unique, checkUnique } from "@/core/global/Permission";
import JsonEditor from "@/components/JsonEditor/index.vue";
import EmailTemplateProxy from "../proxy/EmailTemplateProxy";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";

@Component({
    components: {
        JsonEditor,
    },
})
export default class EmailTemplateDialog extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: EmailTemplateProxy = this.getProxy(EmailTemplateProxy);
    private langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
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
            type: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            plat_id: [{ required: true, message: this.$t("common.requiredSelect"), trigger: "change" }],
            name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            content: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            area_code: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            subject: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            replaceable_text: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
        };
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

    handleTranslate(source: string) {
        const data: any = {};
        data.sentence = source;
        data.type = LanguageType.TYPE_SYSTEM_EMAIL_MODEl;
        data.plat_id = this.form.plat_id;
        this.langProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.area_code {
    width: 120px;
}
</style>
