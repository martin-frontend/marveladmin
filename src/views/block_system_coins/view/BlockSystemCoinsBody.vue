<template>
    <div>
        <el-table :data="tableData" border fit highlight-current-row style="width: 100%" size="mini" v-loading="net_status.loading">
            <el-table-column
                prop="id"
                :label="`${tableColumns.id.name}`"
                class-name="status-col"
                width="60px"
            >
            </el-table-column>
            <el-table-column
                prop="coin_name_unique"
                :label="`${tableColumns.coin_name_unique.name}`"
                class-name="status-col"
                width="90px"
            >
            </el-table-column>
            <el-table-column
                prop="coin_name"
                :label="`${tableColumns.coin_name.name}`"
                class-name="status-col"
                width="90px"
            >
            </el-table-column>
            <el-table-column
                prop="remark"
                :label="`${tableColumns.remark.name}`"
                class-name="status-col"
            >
            </el-table-column>
            <el-table-column label="操作" class-name="status-col" width="90px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        >{{ $t("common.update") }}</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import BlockSystemCoinsProxy from "../proxy/BlockSystemCoinsProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    }
})
export default class BlockSystemCoinsBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: BlockSystemCoinsProxy = this.getProxy(BlockSystemCoinsProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page:number){
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
