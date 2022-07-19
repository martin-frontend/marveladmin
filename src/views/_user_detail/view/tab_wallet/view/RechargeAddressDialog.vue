<template>
    <el-dialog
        :title="$t('user_detail.userRechargeAddress')"
        :append-to-body="true"
        :visible.sync="dialogRechargeAddress.bShow"
    >
        <el-table
            :data="dialogRechargeAddress.addressList"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column
                :label="$t('user_detail.block_name')"
                prop="block_name"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="$t('user_detail.address')"
                prop="address"
                class-name="status-col"
                min-width="200px"
            ></el-table-column>
        </el-table>
    </el-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Message, MessageBox } from "element-ui";
import TabWalletProxy from "../proxy/TabWalletProxy";
import { Component } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";

@Component
export default class DeductGoldDialog extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabWalletProxy = getProxy(TabWalletProxy);
    private tableColumns = this.myProxy.tableColumns;
    private dialogRechargeAddress = this.myProxy.dialogRechargeAddress;

    constructor() {
        super();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
