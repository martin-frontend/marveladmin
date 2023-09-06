<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="150px" v-loading="net_status.loading">
            <el-form-item :label="`${tableColumns.sms_id.name}`" prop="sms_id">
                <el-select v-model="form.sms_id" filterable class="select" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns.sms_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="`${tableColumns.plat_id.name}`" prop="plat_id">
                <el-select v-model="form.plat_id" filterable class="select" :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in tableColumns.plat_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="`${tableColumns.sms_api_uname.name}`" prop="sms_api_uname">
                <el-input clearable :placeholder="LangUtil('请输入')" v-model="form.sms_api_uname"></el-input>
            </el-form-item>
            <el-form-item :label="`${tableColumns.sms_api_key.name}`" prop="sms_api_key">
                <el-input clearable :placeholder="LangUtil('请输入')" v-model="form.sms_api_key"></el-input>
            </el-form-item>
            <el-form-item :label="`${tableColumns.tpl_id.name}`" prop="tpl_id">
                <div class="flex d-flex">
                    <el-input
                        clearable
                        maxlength="30"
                        :placeholder="LangUtil('请输入')"
                        v-model="form.tpl_id"
                        style="margin-right: 0.8rem"
                    ></el-input>
                    <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate('tpl_id')">
                        <!-- 翻译 -->
                        {{ LangUtil("翻译") }}
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item :label="`${tableColumns.type.name}`" prop="type">
                <el-select
                    style="margin-right: 0.5rem; width: 10rem"
                    v-model="form.type"
                    filterable
                    class="select"
                    :placeholder="LangUtil('请选择')"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.type.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="`${tableColumns.head_sign.name}`" prop="head_sign">
                <div class="flex d-flex">
                    <el-input
                        clearable
                        maxlength="30"
                        :placeholder="LangUtil('请输入')"
                        v-model="form.head_sign"
                        style="margin-right: 0.8rem"
                    ></el-input>
                    <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate('head_sign')"
                    >
                        <!-- 翻译 -->
                        {{ LangUtil("翻译") }}
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item :label="`${tableColumns.template.name}`" prop="template">
                <div class="flex d-flex">
                    <el-input
                        clearable
                        :placeholder="LangUtil('请输入')"
                        v-model="form.template"
                        style="margin-right: 0.8rem"
                    ></el-input>
                    <el-button style="max-height: 35px" type="primary" size="mini" @click="handleTranslate('template')">
                        <!-- 翻译 -->
                        {{ LangUtil("翻译") }}
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item :label="`${tableColumns.status.name}`" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">{{
                        value
                    }}</el-radio>
                </el-radio-group>
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
import PlatSmsProxy from "@/views/plat_sms/proxy/PlatSmsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import { LanguageType } from "@/core/enum/UserType";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";

@Component
export default class PlatSmsDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatSmsProxy = this.getProxy(PlatSmsProxy);
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
            sms_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            head_sign: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            tpl_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            status: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            sms_api_key: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            sms_api_uname: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            type: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
            template: [{ required: true, message: this.LangUtil("必须选择"), trigger: "change" }],
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
        data.type = LanguageType.TYPE_PLAT_SMS;
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
