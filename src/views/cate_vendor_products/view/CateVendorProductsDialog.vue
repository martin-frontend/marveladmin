<template>
    <el-dialog width="700px" :title="textMap[status]" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name" prop="plat_id">
                <span>{{ tableColumns.plat_id.options[form.plat_id] }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns['category'].name" prop="category">
                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        :placeholder="LangUtil('请输入')"
                        v-model="form.category"
                        maxlength="200"
                    ></el-input>
                    <el-button
                        style="max-height: 35px"
                        type="primary"
                        size="mini"
                        @click="handleTranslate(form.category)"
                        >{{ LangUtil("翻译") }}
                    </el-button>
                </div>
            </el-form-item>

            <el-form-item :label="tableColumns['icon_name'].name" prop="icon_name">
                <div class="flex d-flex">
                    <el-input
                        style="margin-right: 0.8rem"
                        :placeholder="LangUtil('请输入')"
                        v-model="form.icon_name"
                        maxlength="200"
                    ></el-input>
                </div>
            </el-form-item>

            <el-form-item :label="tableColumns.vendor_id.name" prop="vendor_id">
                <el-select
                    @change="form.vendor_product_id = ''"
                    v-model="form.vendor_id"
                    filterable
                    :placeholder="LangUtil('请选择')"
                >
                    <el-option
                        v-for="(item, key) of tableColumns.vendor_id.options[form.plat_id]"
                        :key="key"
                        :label="item"
                        :value="Number(key)"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="tableColumns.vendor_product_id.name" prop="vendor_product_id">
                <el-select v-model="form.vendor_product_id" filterable :placeholder="LangUtil('请选择')">
                    <template v-for="items of tableColumns.vendor_product_id.options[form.vendor_id]">
                        <el-option
                            v-for="(item, key2) of items"
                            :key="key2"
                            :label="item"
                            :value="Number(key2)"
                        ></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="danger" @click="handleDelete()" v-if="isStatusUpdate">{{
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
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import CateVendorProductsProxy from "@/views/cate_vendor_products/proxy/CateVendorProductsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import CommonLangProxy from "@/views/language_dialog/proxy/CommonLangProxy";
import { LanguageType } from "@/core/enum/UserType";

@Component
export default class CateVendorProductsDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: CateVendorProductsProxy = this.getProxy(CateVendorProductsProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.dialogData.form;
    langProxy: CommonLangProxy = this.getProxy(CommonLangProxy);
    private listQuery = this.myProxy.listQuery;

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
        return {
            vendor_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            vendor_product_id: [{ required: true, message: this.LangUtil("必须选择"), trigger: "blur" }],
            category: [{ required: true, message: this.LangUtil("必须填写"), trigger: "blur" }],
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
        data.type = LanguageType.TYPE_VENDER_GAME_LANGUAGE;
        data.plat_id = this.form.plat_id;
        this.langProxy.showDialog(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
