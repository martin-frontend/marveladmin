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
            <el-table-column :label="tableColumns.id.name" class-name="status-col" width="60px" prop="id">
                <template slot-scope="{ row }">
                    {{ row.id }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.plat_id.name" class-name="status-col" prop="name">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.name.name" class-name="status-col" prop="name">
                <template slot-scope="{ row }">
                    {{ row.name }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.vendor_name.name" class-name="status-col" prop="name">
                <template slot-scope="{ row }">
                    {{ row.vendor_name }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.account.name" class-name="status-col" prop="name">
                <template slot-scope="{ row }">
                    {{ row.account }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.secret.name" class-name="status-col" prop="name">
                <template slot-scope="{ row }">
                    {{ row.secret }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.payment_method_type.name" class-name="status-col" width="150px">
                <template slot-scope="{ row }">
                    <div v-for="(key, value) in row.payment_method_type" :key="value" style="margin-top: 0.5rem">
                        <el-button
                            :type="getBtnStatus(row, row.payment_method_type[value])"
                            @click="handlePayMethodEdit(row, row.payment_method_type[value])"
                            style="margin-bottom: 0.25rem"
                        >
                            {{ tableColumns.payment_method_type.options[row.payment_method_type[value]] }}
                        </el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.status.name" class-name="status-col" width="80px">
                <template slot-scope="{ row }">
                    <el-switch
                        v-model="row.status"
                        v-if="checkUnique(unique.exchange_channel_update)"
                        @change="switchEvent(row)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="120px">
                <template slot-scope="{ row }">
                    <el-button
                        class="item"
                        type="primary"
                        icon="el-icon-edit"
                        v-if="checkUnique(unique.exchange_channel_update)"
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
import ExchangeChannelProxy from "../proxy/ExchangeChannelProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class ExchangeChannelBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: ExchangeChannelProxy = this.getProxy(ExchangeChannelProxy);
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

    getBtnStatus(row: any, type: string) {
        let detail = row.payment_method_detail.filter((item: any) => {
            return item.payment_method_type == type;
        });
        if (detail.length > 0) {
            if (detail[0].status == "1") {
                return "success";
            } else {
                return "warning";
            }
        } else {
            return "info";
        }
    }

    switchEvent(row: any) {
        this.myProxy.updateStatus(row);
    }

    handlePayMethodEdit(row: any, type: string) {
        let detail = row.payment_method_detail.filter((item: any) => {
            return item.payment_method_type == type;
        });
        if (detail.length > 0) {
            this.myProxy.showPayMethodDialog(DialogStatus.update, { row: row, type: type, detail: detail[0] });
        } else {
            this.myProxy.showPayMethodDialog(DialogStatus.create, { row: row, type: type });
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
