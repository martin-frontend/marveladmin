<template>
    <el-dialog :title="LangUtil('用户充值地址')" :append-to-body="true" :visible.sync="dialogRechargeAddress.bShow">
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
                :label="LangUtil('链名')"
                prop="block_name"
                class-name="status-col"
                min-width="80px"
            ></el-table-column>
            <el-table-column
                :label="LangUtil('充值地址')"
                prop="address"
                class-name="status-col"
                min-width="200px"
            ></el-table-column>
        </el-table>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { checkUnique, unique } from "@/core/global/Permission";
import { Message, MessageBox } from "element-ui";
import TabWalletProxy from "../proxy/TabWalletProxy";
import { Component } from "vue-property-decorator";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";

@Component
export default class DeductGoldDialog extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: TabWalletProxy = getProxy(TabWalletProxy);
    tableColumns = this.myProxy.tableColumns;
    dialogRechargeAddress = this.myProxy.dialogRechargeAddress;

    constructor() {
        super();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
