<template>
    <!-- 新增厂商钱包 -->
    <el-dialog :title="LangUtil('新增')" :visible.sync="myProxy.vendorDialogData.create.bShow" width="768px">
        <el-form ref="form" :rules="rules" :model="form" :label-width="width" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name">
                {{ tableColumns.plat_id.options[myProxy.listQuery.plat_id] }}
            </el-form-item>
            <el-form-item :label="LangUtil('选择厂商')" prop="data">
                <el-checkbox-group v-model="form.data">
                    <el-checkbox :label="item.key" v-for="item in form.checkboxData" :key="item.key">{{
                        item.value
                    }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="handleAdd">{{ LangUtil("确认保存") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatVendorsWalletProxy from "@/views/plat_vendors_wallet/proxy/PlatVendorsWalletProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";
import Cookies from "js-cookie";

@Component
export default class PlatVendorsWalletDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatVendorsWalletProxy = this.getProxy(PlatVendorsWalletProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.vendorDialogData.create.form;

    get rules() {
        return {
            data: [{ type: "array", required: true, message: LangUtil("必须选择"), trigger: "change" }],
        };
    }

    handleAdd() {
        (this.$refs["form"] as Vue & { validate: (cb: any) => void }).validate((valid: boolean) => {
            if (valid) {
                this.myProxy.onAdd();
            }
        });
    }

    get width() {
        let _w: string = "115px";
        if (Cookies.get("language") === "vi") {
            _w = "180px";
        }
        return _w;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
