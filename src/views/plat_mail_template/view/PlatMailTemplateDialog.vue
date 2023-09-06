<template>
    <el-dialog :title="LangUtil(textMap[status])" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <span>{{ tableColumns.plat_id.options[form.plat_id] }}</span>
            </el-form-item>

            <!-- <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <el-select v-model="form.plat_id" filterable class="select" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item> -->

            <el-form-item :label="`${tableColumns.template_name.name}`" prop="template_name">
                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        type="textarea"
                        filterable
                        clearable
                        show-word-limit
                        :placeholder="`${tableColumns.template_name.name}`"
                        v-model="form.template_name"
                    ></el-input>
                    <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate('template_name')"
                        >{{ LangUtil("翻译") }}</el-button
                    >
                </div>
            </el-form-item>

            <el-form-item :label="`${tableColumns.title.name}`" prop="title">
                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        type="textarea"
                        filterable
                        clearable
                        show-word-limit
                        :placeholder="`${tableColumns.title.name}`"
                        v-model="form.title"
                    ></el-input>
                    <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate('title')"
                        >{{ LangUtil("翻译") }}</el-button
                    >
                </div>
            </el-form-item>

            <el-form-item :label="`${tableColumns.content.name}`" prop="content">
                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        type="textarea"
                        filterable
                        clearable
                        :rows="10"
                        show-word-limit
                        :placeholder="`${tableColumns.content.name}`"
                        v-model="form.content"
                    ></el-input>
                    <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate('content')"
                        >{{ LangUtil("翻译") }}</el-button
                    >
                </div>
            </el-form-item>

            <el-form-item class="dialog-footer">
                <el-button type="primary" size="mini" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatMailTemplateProxy from "../proxy/PlatMailTemplateProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";

@Component
export default class PlatMailTemplateDialog extends AbstractView {
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    // proxy
    myProxy: PlatMailTemplateProxy = this.getProxy(PlatMailTemplateProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    LangUtil = LangUtil;
    private textMap = {
        update: "编辑",
        create: "新增",
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

    handleDelete() {
        this.myProxy.onDelete(this.form.id);
    }

    handleTranslate(source: string) {
        const data: any = {};
        // data.sentence = source;
        data.type = LanguageType.TYPE_PLAT_EMAIL;
        data.plat_id = this.form.plat_id;
        //@ts-ignore
        data.sentence = this.form[source] || source;
        data.refForm = this.form;
        data.useKey = source;
        this.langProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
