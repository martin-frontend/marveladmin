<template>
    <el-dialog :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form
            ref="form"
            :rules="form.show_type == 1 ? rules['rules'] : rules['rules1']"
            :model="form"
            label-width="115px"
            v-loading="net_status.loading"
        >
            <el-form-item size="mini" :label="tableColumns['currency_type'].name" prop="currency_type">
                <el-select v-model="form.currency_type" filterable @change="handlerDialogSettlementTypeChange">
                    <el-option
                        v-for="(value, key) in tableColumns.currency_type.options"
                        :key="key"
                        :label="value"
                        :value="key"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['vendor_id'].name" prop="vendor_id">
                <el-select v-model="form.vendor_id" filterable @change="handlerDialogVendorChange">
                    <el-option
                        v-for="(value, key) in vendorIdOptions"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['vendor_type'].name" prop="vendor_type">
                <el-select v-model="form.vendor_type" filterable>
                    <el-option
                        v-for="(value, key) in tableColumns.vendor_type.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['show_type'].name" prop="show_type">
                <el-select v-model="form.show_type" filterable>
                    <el-option
                        v-for="(value, key) in tableColumns.show_type.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['category'].name" prop="category">
                <el-select v-model="form.category" filterable>
                    <el-option
                        v-for="(value, key) in tableColumns.category.options"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="form.show_type == 2"
                size="mini"
                :label="tableColumns['vendor_product_id'].name"
                prop="vendor_product_id"
            >
                <el-select v-model="form.vendor_product_id" filterable @change="handlerDialogVendorProductChange">
                    <el-option
                        v-for="(value, key) in venderProductData"
                        :key="key"
                        :label="value"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                v-if="form.show_type == 1"
                size="mini"
                :label="tableColumns['vendor_product_id'].name"
                prop="vendor_product_name"
            >
                <el-input v-model="form.vendor_product_name"></el-input>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['icon'].name" prop="icon">
                <el-input v-model="form.icon"></el-input>
            </el-form-item>

            <el-form-item size="mini" :label="tableColumns['app_types'].name" prop="app_types">
                <el-checkbox-group v-model="form.app_types">
                    <el-checkbox
                        v-for="(value, key) in tableColumns['app_types'].options"
                        :label="Number(key)"
                        :key="value"
                    >
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item :label="tableColumns['list_type'].name" prop="list_type" v-if="form.show_type != 2">
                <el-radio-group v-model="form.list_type">
                    <el-radio v-for="(value, key) in tableColumns['list_type'].options" :key="key" :label="key">{{
                        value
                    }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item
                size="mini"
                :label="tableColumns['vendor_languages'].name"
                prop="vendor_languages"
                v-if="form.show_type == 2 && form.vendor_product_id"
            >
                <el-tag v-for="(value, key) in vendorProductVendorLanguageOptions" :key="key" :label="value">
                    {{ tableColumns["vendor_languages"].options[value] }}
                </el-tag>
            </el-form-item>

            <el-form-item
                size="mini"
                :label="tableColumns['languages'].name"
                prop="languages"
                v-if="form.show_type == 2 && form.vendor_product_id"
            >
                <el-checkbox-group v-model="form.languages">
                    <el-checkbox v-for="(value, key) in vendorProductLanguageOptions" :key="key" :label="key">
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button
                    v-if="isStatusUpdate && checkUnique(unique.lobby_model_product_delete)"
                    type="danger"
                    size="mini"
                    @click="handleDelete()"
                    >{{ LangUtil("删除") }}</el-button
                >
                <el-button
                    type="primary"
                    @click="
                        isStatusUpdate && checkUnique(unique.lobby_model_product_update) ? handleUpdate() : handleAdd()
                    "
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
import LobbyModelProductProxy from "@/views/lobby_model_product/proxy/LobbyModelProductProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";

@Component
export default class LobbyModelProductDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: LobbyModelProductProxy = this.getProxy(LobbyModelProductProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;

    get form() {
        return this.myProxy.dialogData.form;
    }

    get vendorIdOptions() {
        return this.myProxy.vendorIdOptions;
    }

    get vendorProductLanguageOptions() {
        return this.myProxy.tableData.columns.languages.options;
    }

    get vendorProductVendorLanguageOptions() {
        return this.myProxy.dialogData.form.vendor_languages;
    }

    textMap = {
        update: LangUtil("编辑"),
        create: LangUtil("新增"),
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

    get venderProductData() {
        if (this.form.vendor_id && this.form.vendor_type) {
            return this.tableColumns.vendor_product_id.options_key[this.form.vendor_id][this.form.vendor_type];
            // return this.tableColumns.vendor_product_id.options_key[this.form.vendor_id];
        }
        return [];
    }

    get isStatusUpdate() {
        return this.status == DialogStatus.update;
    }

    get rules() {
        const rules = {
            currency_type: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            vendor_id: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            vendor_type: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            app_types: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            show_type: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            category: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            vendor_product_name: [{ required: true, message: LangUtil("必须填写"), trigger: "change" }],
            // icon: [{ required: true, message: LangUtil('必须填写'), trigger: "change" }],
            list_type: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
        };
        const rules1 = {
            currency_type: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            vendor_id: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            vendor_type: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            app_types: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            show_type: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            category: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            vendor_product_id: [{ required: true, message: LangUtil("必须选择"), trigger: "change" }],
            languages: [{ type: "array", required: true, message: LangUtil("必须选择"), trigger: "change" }],
            // icon: [{ required: true, message: LangUtil('必须填写'), trigger: "change" }],
        };
        return { rules, rules1 };
    }

    handlerDialogVendorChange() {
        this.myProxy.onGetVendor();
    }

    handlerDialogSettlementTypeChange() {
        this.myProxy.getVendorId();
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
        this.myProxy.onDelete(this.form.lobby_model_product_id);
    }

    handlerDialogVendorProductChange() {
        this.myProxy.getVendorProduct();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
