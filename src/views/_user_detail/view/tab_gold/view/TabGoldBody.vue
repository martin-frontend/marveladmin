<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 100%"
            border
            size="mini"
            :header-cell-style="{
                'text-align': 'center',
            }"
            :cell-style="{
                'text-align': 'center',
            }"
            v-loading="net_status.loading"
        >
            <el-table-column :label="tableColumns['type'].name" prop="type">
                <template slot-scope="{ row }">
                    <span>{{ tableColumns["type"].options[row.type] }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['gold_before'].name"
                prop="gold_before"
                min-width="100px"
            ></el-table-column>
            <el-table-column :label="tableColumns['gold'].name" prop="gold" min-width="100px"></el-table-column>
            <el-table-column :label="tableColumns['balance'].name" prop="balance" min-width="100px"></el-table-column>
            <el-table-column
                :label="tableColumns['coin_name_unique'].name"
                prop="coin_name_unique"
                min-width="100px"
            ></el-table-column>
            <el-table-column :label="tableColumns['remark'].name" prop="remark" min-width="100px"></el-table-column>
            <el-table-column
                :label="tableColumns['created_at'].name"
                min-width="155px"
                prop="created_at"
            ></el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></Pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { checkUnique, unique } from "@/core/global/Permission";
import TabGoldProxy from "../proxy/TabGoldProxy";
import GlobalVar from "@/core/global/GlobalVar";
import { getProxy } from "@/views/_user_detail/PageSetting";
import Pagination from "@/components/Pagination.vue";

@Component({
    components: {
        Pagination,
    },
})
export default class TabGoldBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: TabGoldProxy = getProxy(TabGoldProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
