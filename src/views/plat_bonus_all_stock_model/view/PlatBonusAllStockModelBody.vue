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
                :label="tableColumns['all_bonus_model_id'].name"
                prop="all_bonus_model_id"
                min-width="80px"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['name'].name"
                prop="name"
                min-width="120px"
                align="center"
            ></el-table-column>
            <el-table-column :label="tableColumns['desc'].name" prop="desc" min-width="120px" align="center">
            </el-table-column>
            <el-table-column :label="tableColumns['calc_type'].name" prop="calc_type" width="160" align="center">
                <template slot-scope="{ row }">
                    {{ tableColumns["calc_type"].options[row.calc_type] }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        v-if="checkUnique(unique.plat_bonus_all_stock_model_update)"
                        type="primary"
                        @click="handleEdit(row)"
                        >{{ $t("common.update") }}</el-button
                    >
                    <el-button
                        size="mini"
                        v-if="checkUnique(unique.plat_bonus_all_stock_model_update)"
                        type="danger"
                        @click="handlerDelete(row)"
                        >{{ $t("common.delete") }}</el-button
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
import PlatBonusAllStockModelProxy from "../proxy/PlatBonusAllStockModelProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatBonusAllStockModelBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatBonusAllStockModelProxy = this.getProxy(PlatBonusAllStockModelProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private handlerDelete(data: any) {
        this.myProxy.onDelete(data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
