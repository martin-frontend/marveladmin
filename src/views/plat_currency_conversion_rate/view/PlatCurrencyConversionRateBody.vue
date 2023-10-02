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
            <el-table-column prop="plat_id" :label="`${tableColumns.plat_id.name}`" class-name="status-col">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column prop="from_coin" :label="`${tableColumns.from_coin.name}`" class-name="status-col">
            </el-table-column>
            <el-table-column prop="to_coin" :label="`${tableColumns.to_coin.name}`" class-name="status-col">
            </el-table-column>
            <el-table-column :label="tableColumns['status'].name" class-name="status-col">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="rate" :label="`${tableColumns.rate.name}`" class-name="status-col">
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ LangUtil("编辑") }}</el-button>
                    <el-button size="mini" type="danger" @click="handlerDelete(row)">{{ LangUtil("删除") }}</el-button>
                    <el-button size="mini" type="primary" @click="handlerShowLog(row)">
                        {{ LangUtil("查看") }}
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
import PlatCurrencyConversionRateProxy from "../proxy/PlatCurrencyConversionRateProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "success",
                98: "danger",
                99: "info",
            };
            return statusMap[status];
        },
    },
})
export default class PlatCurrencyConversionRateBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatCurrencyConversionRateProxy = this.getProxy(PlatCurrencyConversionRateProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    logListQuery = this.myProxy.logListQuery;
    LangUtil = LangUtil;

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

    handlerShowLog(data: any) {
        this.logListQuery.id = data.id;
        this.myProxy.onShowLog();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
