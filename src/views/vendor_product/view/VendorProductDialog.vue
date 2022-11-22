<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['vendor_id'].name" prop="vendor_id">
                <el-select
                    v-model="form.vendor_id"
                    filterable
                    :placeholder="LangUtil('请选择')"
                    @change="handlerVendorChange"
                >
                    <el-option
                        v-for="(value, key) in tableColumns.vendor_id.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type'].name" prop="vendor_type">
                <el-select v-model="form.vendor_type" filterable :placeholder="LangUtil('请选择')">
                    <el-option
                        v-for="(value, key) in myProxy.vendorTypesOptions"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_product_name'].name" prop="vendor_product_name">
                <!-- <el-input v-model="form.vendor_product_name" :placeholder="LangUtil('请输入')"></el-input> -->

                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        type="textarea"
                        filterable
                        clearable
                        :placeholder="LangUtil('请输入')"
                        v-model="form.vendor_product_name"
                    ></el-input>
                    <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate(form.vendor_product_name)"
                    >
                        <!-- 翻译 -->
                        {{ LangUtil("翻译") }}
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['languages'].name" prop="languages" v-if="isStatusUpdate">
                <el-checkbox-group v-model="form.languages">
                    <el-checkbox v-for="(value, key) in tableColumns.languages.options" :key="key" :label="key">
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['ori_product_id'].name" prop="ori_product_id">
                <el-input v-model="form.ori_product_id" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['icon'].name" prop="icon">
                <el-input v-model="form.icon" :placeholder="LangUtil('请输入')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['ori_vendor_extend'].name" prop="ori_vendor_extend">
                <div class="editor-container">
                    <json-editor ref="jsonEditor" v-model="form.ori_vendor_extend" />
                </div>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['status'].name" prop="status">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="(value, key) in tableColumns.status.options" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['open_mode'].name" prop="open_mode">
                <el-radio-group v-model="form.open_mode">
                    <el-radio v-for="(value, key) in tableColumns.open_mode.options" :key="key" :label="Number(key)">
                        {{ value }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.vendor_product_delete)"
                    type="danger"
                    size="mini"
                    @click="handleDelete(form)"
                    >{{ LangUtil("删除") }}</el-button
                >
                <el-button
                    v-if="checkUnique(unique.vendor_product_update)"
                    type="primary"
                    size="mini"
                    @click="isStatusUpdate ? handleUpdate() : handleAdd()"
                    >{{ LangUtil("确认保存") }}</el-button
                >
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import VendorProductProxy from "@/views/vendor_product/proxy/VendorProductProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import JsonEditor from "@/components/JsonEditor/index.vue";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";
import { LanguageType } from "@/core/enum/UserType";

@Component({
    components: {
        JsonEditor,
    },
})
export default class VendorProductDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: VendorProductProxy = this.getProxy(VendorProductProxy);
    langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.dialogData.form;
    // get form() {
    // return this.myProxy.dialogData.form;
    // }

    textMap = {
        update: this.LangUtil("编辑"),
        create: this.LangUtil("新增"),
    };
    extendsData = {};
    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    @Watch("myProxy.dialogData.update")
    onWatchUpdate() {
        this.$forceUpdate();
    }

    get status() {
        return this.myProxy.dialogData.status;
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        return {
            vendor_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            vendor_type: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            vendor_product_name: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            ori_product_id: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            icon: [{ required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
            languages: [{ type: "array", required: true, message: this.LangUtil("必须填写"), trigger: "change" }],
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
        this.myProxy.onDelete(this.form.vendor_product_id);
    }

    handlerVendorChange() {
        this.myProxy.dialogData.form.vendor_type = "";
        this.myProxy.getVendorTypes();
    }

    handleTranslate(source: string) {
        const data: any = {};
        data.sentence = source;
        data.type = LanguageType.TYPE_VENDER_GAME_LANGUAGE;
        this.langProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
