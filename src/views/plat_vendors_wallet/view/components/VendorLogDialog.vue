<template>
    <!-- 上下分记录查询 -->
    <el-dialog
        :title="$t('plat_vendors_wallet.logSearch')"
        :visible.sync="myProxy.vendorDialogData.log.bShow"
        width="980px"
    >
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.created_at.name"
                :startDate.sync="listQuery['created_at-{>}']"
                :endDate.sync="listQuery['created_at-{<}']"
            />
            <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{
                $t("common.search")
            }}</el-button>
            <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{
                $t("common.reset")
            }}</el-button>
        </div>
        <el-table border :data="tableData" v-loading="net_status.loading">
            <el-table-column property="plat_id" :label="tableColumns['plat_id'].name" align="center" width="150px">
            </el-table-column>
            <el-table-column
                property="vendor_id"
                :label="tableColumns['vendor_id'].name"
                align="center"
            ></el-table-column>
            <el-table-column
                property="created_at"
                :label="tableColumns['created_at'].name"
                align="center"
                width="160px"
            ></el-table-column>
            <el-table-column
                property="created_by"
                :label="tableColumns['created_by'].name"
                align="center"
            ></el-table-column>

            <el-table-column property="type" :label="tableColumns['type'].name" align="center">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.type.options[row.type] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="gold" :label="tableColumns['gold'].name" align="center"></el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
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
import Pagination from "@/components/Pagination.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        Pagination,
        SearchDatePicker,
    },
})
export default class PlatVendorsWalletDialog extends AbstractView {
    // 权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatVendorsWalletProxy = this.getProxy(PlatVendorsWalletProxy);
    // proxy property
    private tableColumns = this.myProxy.logData.columns;
    private tableData = this.myProxy.logData.list;
    private pageInfo = this.myProxy.logData.pageInfo;
    private listQuery = this.myProxy.logListQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onLogQuery();
    }

    handlerSearch() {
        this.myProxy.onLogQuery();
    }

    handlerReset() {
        this.myProxy.resetLogListQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
