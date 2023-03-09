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
                :label="LangUtil('厂商ID')"
                prop="vendor_id"
                class-name="status-col"
                width="80px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['vendor_name'].name"
                prop="vendor_name"
                class-name="status-col"
                width="150px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['vendor_desc'].name"
                prop="vendor_desc"
                min-width="150"
                class-name="status-col"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['vendor_name_unique'].name"
                prop="vendor_name_unique"
                class-name="status-col"
                width="150px"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['languages'].name"
                prop="languages"
                class-name="status-col"
                width="300px"
            >
                <template slot-scope="{ row }">
                    <span v-for="(type, index) in row.languages" :key="type">
                        {{ tableColumns["languages"].options[type] }}
                        <span v-if="index < row.languages.length - 1">,</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['settle_coin_name_unique'].name"
                prop="settle_coin_name_unique"
                width="100px"
                align="center"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['proxy_key'].name"
                prop="proxy_key"
                class-name="status-col"
                min-width="150px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.proxy_key.options[row.proxy_key] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['cron_id'].name" class-name="status-col" prop="cron_id" width="100px">
            </el-table-column>
            <el-table-column
                :label="tableColumns['time_region_hour_interval'].name"
                class-name="status-col"
                prop="time_region_hour_interval"
                width="100px"
            >
            </el-table-column>
            <el-table-column
                :label="tableColumns['vendor_wallet_type'].name"
                prop="vendor_wallet_type"
                class-name="status-col"
                min-width="100px"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.vendor_wallet_type.options[row.vendor_wallet_type] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['status'].name" class-name="status-col" width="100px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="150px">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="checkUnique(unique.test_vendor)"
                        size="mini"
                        type="danger"
                        @click="handleTest(row)"
                        >{{ LangUtil("测试") }}</el-button
                    >
                    <el-button
                        v-if="checkUnique(unique.vendor_update)"
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        >{{ LangUtil("编辑") }}</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" v-show="tableData.length > 0"></pagination>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import VendorProxy from "../proxy/VendorProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

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
export default class VendorBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: VendorProxy = this.getProxy(VendorProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerQuery() {
        this.listQuery.page_count = 1;
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

    handleTest(data: any) {
        this.myProxy.testDialogData.bShow = true;
        this.myProxy.testDialogData.form.vendor_id = data.vendor_id;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
