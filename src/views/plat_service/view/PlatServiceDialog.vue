<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow" width="700px">
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="115px"
            label-position="left"
            v-loading="net_status.loading"
        >
            <el-form-item :label="`${tableColumns.plat_id.name}`" prop="plat_id" label-width="100px">
                <el-select
                    style="width:100%"
                    v-model="form.plat_id"
                    filterable
                    clearable
                    :placeholder="LangUtil('请选择')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="`${tableColumns.module.name}`" prop="module" label-width="100px">
                <el-select
                    style="width:100%"
                    v-model="form.module"
                    filterable
                    clearable
                    :placeholder="LangUtil('请选择')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.module.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label-width="0" prop="name">
                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        type="textarea"
                        maxlength="200"
                        filterable
                        clearable
                        show-word-limit
                        :placeholder="LangUtil('请输入问题标题')"
                        v-model="form.name"
                    ></el-input>
                    <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate('name')"
                        >翻译</el-button
                    >
                </div>
            </el-form-item>

            <el-form-item label-width="0" prop="content">
                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        type="textarea"
                        maxlength="2000"
                        filterable
                        clearable
                        show-word-limit
                        :rows="6"
                        :placeholder="LangUtil('请输入问题解答内容')"
                        v-model="form.content"
                    ></el-input>
                    <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate('content')"
                        >翻译</el-button
                    >
                </div>
            </el-form-item>

            <el-form-item class="dialog-footer">
                <el-button v-if="isStatusUpdate" type="danger" size="mini" @click="handleDelete()">{{
                    LangUtil("删除")
                }}</el-button>
                <el-button type="primary" @click="isStatusUpdate ? handleUpdate() : handleAdd()">{{
                    LangUtil("确认保存")
                }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatServiceProxy from "@/views/plat_service/proxy/PlatServiceProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";

@Component
export default class PlatServiceDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatServiceProxy = this.getProxy(PlatServiceProxy);
    langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
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
            plat_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            content: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            module: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
        };
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
        data.type = LanguageType.TYPE_QUESTION;
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
