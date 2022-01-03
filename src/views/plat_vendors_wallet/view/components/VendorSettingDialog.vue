<template>
    <el-dialog
        :title="$t('plat_vendors_wallet.VendorSetting')"
        width="580px"
        :visible.sync="myProxy.vendorDialogData.setting.bShow"
    >
        <el-form :model="form" label-width="130px" v-loading="net_status.loading">
            <el-form-item :label="tableColumns.plat_id.name">
                <span>{{ tableColumns.plat_id.options[form.plat_id] }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns.vendor_id.name">
                <span>{{ tableColumns.vendor_id.options[form.vendor_id] }}</span>
            </el-form-item>
            <el-form-item :label="tableColumns.type.name">
                <el-radio-group v-model="form.type">
                    <el-radio :label="1">{{ $t("plat_vendors_wallet.publicWallet") }}</el-radio>
                    <el-radio :label="2">{{ $t("plat_vendors_wallet.venderWallet") }}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="tableColumns.status.name">
                <el-radio-group v-model="form.status">
                    <el-radio :label="1">{{ $t("common.open") }}</el-radio>
                    <el-radio :label="99">{{ $t("common.close") }}</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="handleUpdate">{{ $t("common.save") }}</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatVendorsWalletProxy from "@/views/plat_vendors_wallet/proxy/PlatVendorsWalletProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatVendorsWalletDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatVendorsWalletProxy = this.getProxy(PlatVendorsWalletProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private form = this.myProxy.vendorDialogData.setting.form;

    private handleUpdate() {
        this.myProxy.onSettingUpdate();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
::v-deep .el-form-item {
    margin-bottom: 6px;
}
</style>
