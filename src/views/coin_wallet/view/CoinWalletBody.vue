<template>
    <div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col" width>
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.admin_user_id.name}`" class-name="status-col" width>
                <template slot-scope="{ row }">
                    {{ row.admin_user_id }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.admin_username.name}`" class-name="status-col" width>
                <template slot-scope="{ row }">
                    {{ row.admin_username }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.gold.name}`" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ row.gold }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.type.name}`" class-name="status-col" prop="type" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns.type.options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" :width="width">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="success"
                        @click="onDeposit(row)"
                        v-if="checkUnique(unique.coin_wallet_deposit)"
                        >{{ LangUtil("上分") }}</el-button
                    >
                    <el-button
                        size="mini"
                        type="info"
                        @click="onWithdraw(row)"
                        v-if="checkUnique(unique.coin_wallet_withdraw)"
                        >{{ LangUtil("下分") }}</el-button
                    >
                    <el-button
                        size="mini"
                        type="primary"
                        @click="onRecord(row.admin_user_id)"
                        v-if="checkUnique(unique.coin_wallet_log)"
                        >{{ LangUtil("记录查询") }}</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <DepositDialog></DepositDialog>
        <WithdrawDialog></WithdrawDialog>
        <RecordQueryDialog v-if="myProxy.logDialogData.isCoinWalletShow" ref="record"></RecordQueryDialog>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import CoinWalletProxy from "../proxy/CoinWalletProxy";
import GlobalVar from "@/core/global/GlobalVar";
// components
import DepositDialog from "./DepositDialog.vue";
import WithdrawDialog from "./WithdrawDialog.vue";
import RecordQueryDialog from "./RecordQueryDialog.vue";
import Pagination from "@/components/Pagination.vue";
import Cookies from "js-cookie";

@Component({
    components: {
        DepositDialog,
        WithdrawDialog,
        RecordQueryDialog,
        Pagination,
    },
})
export default class CoinWalletBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: CoinWalletProxy = this.getProxy(CoinWalletProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    //  tableData = this.myProxy.tableData.list;
    get tableData() {
        this.$forceUpdate();
        return this.myProxy.tableData.list;
    }
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerQuery() {
        this.myProxy.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    get width() {
        let _w: string = "270px";
        if (Cookies.get("language") === "vi") {
            _w = "330px";
        }
        return _w;
    }

    // 上分
    onDeposit(data: any) {
        this.myProxy.showDeposit(data);
    }

    // 下分
    onWithdraw(data: any) {
        this.myProxy.showWithdraw(data);
    }

    // 记录查询
    onRecord(admin_user_id: string) {
        this.myProxy.logDialogData.isCoinWalletShow = true;
        this.myProxy.showLog(admin_user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.el-button--info {
    background-color: #54bcbe;
    border-color: #43acad;
}
</style>
