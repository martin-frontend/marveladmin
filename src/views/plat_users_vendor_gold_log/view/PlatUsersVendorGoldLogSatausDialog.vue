<template>
    <el-dialog width="350px" :title="LangUtil('交易状态')" :visible.sync="myProxy.statusDialog.bShow">
        <el-form ref="form" :model="form" label-width="100px" v-loading="net_status.loading">
            <el-form-item size="mini" :label="tableColumns['status'].name">
                {{ statusOptions[`${form.status}`] }}
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['gold'].name">
                {{ form.gold == -1 ? "-" : form.gold }}
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatUsersVendorGoldLogProxy from "@/views/plat_users_vendor_gold_log/proxy/PlatUsersVendorGoldLogProxy";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import { DialogStatus } from "@/core/global/Constant";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class PlatUsersVendorGoldLogDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatUsersVendorGoldLogProxy = this.getProxy(PlatUsersVendorGoldLogProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    form = this.myProxy.statusDialog.form;

    statusOptions = {
        "1": LangUtil("交易成功"),
        "2": LangUtil("交易状态未知"),
        "3": LangUtil("交易失败"),
    };

    handleCancel() {
        this.myProxy.statusDialog.bShow = false;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
