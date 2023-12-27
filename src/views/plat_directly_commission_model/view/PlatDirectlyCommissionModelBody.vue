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
                :label="tableColumns['commission_model_id'].name"
                prop="commission_model_id"
                min-width="80px"
                align="center"
            >
            </el-table-column>
            <el-table-column :label="tableColumns['name'].name" prop="name" min-width="120px" align="center">
            </el-table-column>
            <el-table-column
                :label="tableColumns['settlement_type'].name"
                prop="settlement_type"
                min-width="120px"
                align="center"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns["settlement_type"].options[row.settlement_type] }}
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['settlement_period'].name"
                prop="settlement_period"
                min-width="120px"
                align="center"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns["settlement_period"].options[row.settlement_period] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['desc'].name" prop="desc" min-width="120px" align="center">
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">
                        {{ LangUtil("编辑") }}
                    </el-button>
                    <el-button size="mini" type="danger" @click="handlerDelete(row)">
                        {{ LangUtil("删除") }}
                    </el-button>
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
import PlatDirectlyCommissionModelProxy from "../proxy/PlatDirectlyCommissionModelProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatDirectlyCommissionModelBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatDirectlyCommissionModelProxy = this.getProxy(PlatDirectlyCommissionModelProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.commission_model_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
