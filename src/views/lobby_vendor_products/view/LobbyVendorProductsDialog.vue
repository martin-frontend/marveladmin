<template>
    <el-dialog :title="textMap.update" :visible.sync="myProxy.dialogData.bShow">
        <el-form ref="form" :rules="rules" :model="form" label-width="115px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['languages'].name" prop="languages">
                <el-checkbox-group v-model="form.languages">
                    <el-checkbox v-for="(value, key) in tableColumns['languages'].options" :key="key" :label="key">
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="handleUpdate()">{{ $t("common.save") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import LobbyVendorProductsProxy from "@/views/lobby_vendor_products/proxy/LobbyVendorProductsProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";

@Component
export default class LobbyVendorProductsDialog extends AbstractView {
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: LobbyVendorProductsProxy = this.getProxy(LobbyVendorProductsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;

    get form() {
        return this.myProxy.dialogData.form;
    }

    textMap = {
        update: i18n.t("common.update"),
        create: i18n.t("common.create"),
    };

    @Watch("myProxy.dialogData.bShow")
    onWatchShow() {
        this.$nextTick(() => {
            (this.$refs["form"] as Vue & { clearValidate: () => void }).clearValidate();
        });
    }

    get rules() {
        return {
            languages: [{ type: "array", required: true, message: this.$t("common.requiredInput"), trigger: "change" }],
        };
    }

    handleUpdate() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onUpdateLanguages();
            }
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
