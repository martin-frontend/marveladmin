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
            <el-table-column label="ID" class-name="status-col" width="100px" prop="id" />
            <el-table-column :label="tableColumns.name.name" class-name="status-col" prop="name" />
            <el-table-column :label="tableColumns.currency_type.name" class-name="status-col" width="80px">
                <template slot-scope="{ row }">
                    {{ row.currency_type }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.currency_scale.name" class-name="status-col" width="80px">
                <template slot-scope="{ row }">
                    {{ row.currency_scale }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.payment_method_type.name" class-name="status-col">
                <template slot-scope="scope">
                    <el-tag class="tagClass" v-for="item in scope.row.payment_method_type" :key="item">{{
                        tableColumns.payment_method_type.options[item]
                    }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.payment_method_type.name.toString()" class-name="status-col">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status.toString()" :class="[scope.row.status == 1 ? '' : 'denger']">
                        {{ scope.row.status | statusFilter }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="120px">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="checkUnique(unique.exchange_vendors_update)"
                        class="item"
                        type="primary"
                        @click="handleEdit(row)"
                        >{{ LangUtil("编辑") }}</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" v-show="tableData.length > 0" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import ExchangeVendorsProxy from "../proxy/ExchangeVendorsProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import i18n from "@/lang";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: LangUtil("正常"),
                98: LangUtil("禁用"),
            };
            return statusMap[status];
        },
    },
})
export default class ExchangeVendorsBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: ExchangeVendorsProxy = this.getProxy(ExchangeVendorsProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerQuery() {
        this.myProxy.onQuery();
    }

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
