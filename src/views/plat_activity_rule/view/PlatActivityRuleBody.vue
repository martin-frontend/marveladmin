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
                class-name="status-col"
                min-width="80px"
                :label="tableColumns['id'].name"
                prop="id"
            ></el-table-column>
            <el-table-column
                class-name="status-col"
                min-width="100px"
                :label="tableColumns['name'].name"
                prop="name"
            ></el-table-column>
            <el-table-column class-name="status-col" :label="tableColumns['type'].name">
                <template slot-scope="{ row }">
                    {{ tableColumns["type"].options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" min-width="140px" :label="tableColumns['settlement_types'].name">
                <template slot-scope="{ row }">
                    {{ row.settlement_types | settleTypeFilter(tableColumns) }}
                </template>
            </el-table-column>
            <el-table-column
                class-name="status-col"
                min-width="80px"
                :label="tableColumns['class'].name"
                prop="class"
            ></el-table-column>
            <el-table-column
                class-name="status-col"
                min-width="100px"
                :label="tableColumns['params_name'].name"
                prop="params_name"
            ></el-table-column>
            <el-table-column class-name="status-col" min-width="120px" :label="tableColumns['params_type'].name">
                <template slot-scope="{ row }">
                    {{ tableColumns["params_type"].options[row.params_type] }}
                </template>
            </el-table-column>
            <el-table-column
                class-name="status-col"
                :label="tableColumns['desc'].name"
                min-width="120px"
                prop="desc"
            ></el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="checkUnique(unique.plat_activity_rule_show)"
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        >{{ LangUtil("编辑") }}</el-button
                    >
                </template>
            </el-table-column>
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
import PlatActivityRuleProxy from "../proxy/PlatActivityRuleProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    filters: {
        settleTypeFilter(types: string[], columns: any) {
            const options = columns.settlement_types.options;
            let typeNames = "";
            types.forEach((item, index) => {
                typeNames += index > 0 ? "," + options[item] : options[item];
            });
            return typeNames;
        },
    },
    components: {
        Pagination,
    },
})
export default class PlatActivityRuleBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatActivityRuleProxy = this.getProxy(PlatActivityRuleProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
