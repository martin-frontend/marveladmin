<template>
    <!-- 公共钱包上下分记录查询 -->
    <el-dialog
        :title="LangUtil('公共钱包上下分记录查询')"
        :visible.sync="myProxy.publicDialogData.log.bShow"
        width="980px"
        :before-close="handlerClose"
    >
        <div class="group">
            <SearchDatePicker
                :title="tableColumns.created_at.name"
                :startDate.sync="listQuery['created_at-{>}']"
                :endDate.sync="listQuery['created_at-{<}']"
            />
            <el-button @click="handlerSearch()" type="primary" icon="el-icon-search">{{ LangUtil("查询") }}</el-button>
            <el-button @click="handlerReset()" type="primary" icon="el-icon-refresh">{{ LangUtil("重置") }}</el-button>
        </div>
        <el-table border :data="tableData" v-loading="net_status.loading">
            <el-table-column
                property="plat_id"
                :label="tableColumns['plat_id'].name"
                align="center"
                width="150px"
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
                        {{ tableColumns["type"].options[row.type] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="gold" :label="tableColumns['gold'].name" align="center"></el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
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
import Pagination from "@/components/Pagination.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";

@Component({
    components: {
        Pagination,
        SearchDatePicker,
    },
})
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
    tableColumns = this.myProxy.logData.columns;
    tableData = this.myProxy.logData.list;
    pageInfo = this.myProxy.logData.pageInfo;
    listQuery = this.myProxy.logListQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onLogQuery();
    }

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onLogQuery();
    }

    handlerReset() {
        this.myProxy.resetLogListQuery();
    }

    handlerClose() {
        this.myProxy.publicDialogData.isPublicCtrl = false;
        this.myProxy.hideDialog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
