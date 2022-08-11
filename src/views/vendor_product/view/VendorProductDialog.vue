<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['vendor_id'].name" prop="vendor_id">
                <el-select
                    v-model="form.vendor_id"
                    filterable
                    :placeholder="$t('common.pleaseChoose')"
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
                <el-select v-model="form.vendor_type" filterable :placeholder="$t('common.pleaseChoose')">
                    <el-option
                        v-for="(value, key) in myProxy.vendorTypesOptions"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_product_name'].name" prop="vendor_product_name">
                <!-- <el-input v-model="form.vendor_product_name" :placeholder="$t('common.pleaseEnter')"></el-input> -->

                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        type="textarea"
                        filterable
                        clearable
                        :placeholder="$t('common.pleaseEnter')"
                        v-model="form.vendor_product_name"
                    ></el-input>
                    <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate(form.vendor_product_name)"
                        >翻译</el-button
                    >
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
                <el-input v-model="form.ori_product_id" :placeholder="$t('common.pleaseEnter')"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['icon'].name" prop="icon">
                <el-input v-model="form.icon" :placeholder="$t('common.pleaseEnter')"></el-input>
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
            <el-form-item class="dialog-footer">
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.vendor_product_delete)"
                    type="danger"
                    size="mini"
                    @click="handleDelete(form)"
                    >{{ $t("common.delete") }}</el-button
                >
                <el-button
                    v-if="checkUnique(unique.vendor_product_update)"
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
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: VendorProductProxy = this.getProxy(VendorProductProxy);
    private langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;
    // get form() {
    // return this.myProxy.dialogData.form;
    // }

    private textMap = {
        update: this.$t("common.update"),
        create: this.$t("common.create"),
    };
    private extendsData = {};
    @Watch("myProxy.dialogData.bShow")
    private onWatchShow() {
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
            vendor_id: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            vendor_type: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            vendor_product_name: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            ori_product_id: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            icon: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
            languages: [{ required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
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
