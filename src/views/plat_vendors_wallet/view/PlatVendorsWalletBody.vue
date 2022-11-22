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
            <el-table-column prop="plat_id" :label="tableColumns['plat_id'].name" align="center" min-width="120px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["plat_id"].options[row.plat_id] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="vendor_id" :label="tableColumns['vendor_id'].name" align="center" width="80px">
            </el-table-column>
            <el-table-column prop="vendor_name" :label="tableColumns['vendor_name'].name" align="center" width="150px">
            </el-table-column>
            <el-table-column prop="gold" :label="tableColumns['gold'].name" align="center" width="200px">
            </el-table-column>
            <el-table-column prop="type" :label="tableColumns['type'].name" align="center" width="120px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns["type"].options[row.type] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="currency_type"
                :label="tableColumns['currency_type'].name"
                align="center"
                width="120px"
            >
            </el-table-column>
            <el-table-column prop="status" :label="tableColumns['status'].name" align="center" width="80px">
                <template slot-scope="{ row }">
                    <div>
                        <el-tag :type="row.status === 1 ? 'success' : 'danger'">{{
                            tableColumns["status"].options[row.status]
                        }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="user_recharge_max"
                :label="tableColumns['user_recharge_max'].name"
                width="170px"
                align="center"
            >
                <template slot-scope="{ row }">
                    <div>
                        {{ row.user_recharge_max == -1 ? "∞" : row.user_recharge_max }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" align="center" :width="width">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="warning"
                        @click="handlerVendorLimit(scope.row.id)"
                        v-if="checkUnique(unique.plat_vendors_wallet_quota)"
                        >{{ LangUtil("额度设置") }}</el-button
                    >
                    <el-button
                        size="mini"
                        type="success"
                        @click="handerVenderWallet(scope.row.id, 1)"
                        v-if="checkUnique(unique.plat_vendors_wallet_add_points)"
                        >{{ LangUtil("上分") }}</el-button
                    >
                    <el-button
                        size="mini"
                        type="info"
                        @click="handerVenderWallet(scope.row.id, 2)"
                        v-if="checkUnique(unique.plat_vendors_wallet_minus_points)"
                        >{{ LangUtil("下分") }}</el-button
                    >
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handlerLog(scope.row)"
                        v-if="checkUnique(unique.plat_vendors_wallet_log)"
                        >{{ LangUtil("记录查询") }}</el-button
                    >
                    <el-button
                        size="mini"
                        class="setting_btn"
                        @click="handlerSetting(scope.row)"
                        v-if="checkUnique(unique.plat_vendors_wallet_setting)"
                        >{{ LangUtil("设定") }}</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatVendorsWalletProxy from "../proxy/PlatVendorsWalletProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import Cookies from "js-cookie";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatVendorsWalletBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatVendorsWalletProxy = this.getProxy(PlatVendorsWalletProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    // 记录查询
    handlerLog(row: any) {
        this.myProxy.onLog(row);
    }

    // 设置
    handlerSetting(row: any) {
        this.myProxy.onSettingDialog(row);
    }

    // 厂商上下分
    handerVenderWallet(id: any, type: any) {
        this.myProxy.vendorDialogData.wallet.form.type = type;
        this.myProxy.vendorDialogData.wallet.form.id = id;
        this.myProxy.onShowVenderWalletDialog();
    }

    // 额度设置
    handlerVendorLimit(id: any) {
        this.myProxy.vendorDialogData.limit.form.id = id;
        this.myProxy.onShowVendorLimitDialog();
    }
    get width() {
        let _w: string = "420px";
        if (Cookies.get("language") === "vi") {
            _w = "520px";
        }
        return _w;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.wallet_btn {
    margin-bottom: 16px;
}

.el-button--info {
    background-color: #54bcbe;
    border-color: #43acad;
}
.setting_btn {
    background-color: #459ad0;
    border-color: #409d9e;
    color: #fff;
}
</style>
