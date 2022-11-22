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
            <el-table-column
                :label="tableColumns['created_at'].name"
                prop="created_at"
                class-name="status-col"
                min-width="110px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['plat_id'].name"
                prop="plat_id"
                class-name="status-col"
                min-width="110px"
            >
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.plat_id.options[row.plat_id] }}</div>
                </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns['user_id'].name"
                prop="user_id"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>

            <el-table-column
                :label="tableColumns['nick_name'].name"
                prop="nick_name"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>

            <el-table-column :label="tableColumns['type'].name" prop="type" class-name="status-col" min-width="110px">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns.type.options[row.type] }}</div>
                </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns['plat_swap_pair'].name"
                prop="plat_swap_pair"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>

            <el-table-column :label="LangUtil('添加数量')" prop="type" class-name="status-col" min-width="110px">
                <template slot-scope="{ row }"> {{ row.coin_a_amount }} / {{ row.coin_b_amount }} </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns['updated_by'].name"
                prop="updated_by"
                class-name="status-col"
                min-width="100px"
            ></el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatSwapLiquidityLogProxy from "../proxy/PlatSwapLiquidityLogProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatSwapLiquidityLogBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatSwapLiquidityLogProxy = this.getProxy(PlatSwapLiquidityLogProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
