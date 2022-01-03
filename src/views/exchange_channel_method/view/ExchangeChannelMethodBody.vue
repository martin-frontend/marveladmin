<template>
    <div>
        <el-table :data="tableData" border fit highlight-current-row style="width: 100%" size="mini" v-loading="net_status.loading">
            <el-table-column :label="`${tableColumns.id.name}`" class-name="status-col" width="60px">
                <template slot-scope="{ row }">
                    {{ row.id }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.name.name}`" class-name="status-col">
                <template slot-scope="{ row }">
                    {{ row.name }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.vendor_name.name}`" class-name="status-col">
                <template slot-scope="{ row }">
                    {{ row.vendor_name }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.payment_method_type.name}`" class-name="status-col" width="200px">
                <template slot-scope="{ row }">
                    <el-button
                        v-for="(key, value) in row.payment_method_type"
                        :key="value"
                        :type="getBtnStatus(row, row.payment_method_type[value])"
                        @click="handleEdit(row, key)"
                        style="margin-bottom: 0.25rem"
                    >
                        {{ tableColumns.payment_method_type.options[row.payment_method_type[value]] }}
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
import ExchangeChannelMethodProxy from "../proxy/ExchangeChannelMethodProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class ExchangeChannelMethodBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    // proxy
    private myProxy: ExchangeChannelMethodProxy = this.getProxy(ExchangeChannelMethodProxy);
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerQuery() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any, type: string) {
        let detail = data.payment_method_detail.filter((item: { payment_method_type: string }) => {
            return item.payment_method_type == type;
        });
        if (detail.length > 0) {
            this.myProxy.showDialog(DialogStatus.update, detail[0]);
        } else {
            this.myProxy.resetDialogForm();
            this.myProxy.dialogData.form.plat_id = data.plat_id;
            this.myProxy.dialogData.form.exchange_channel_id = data.id;
            this.myProxy.dialogData.form.payment_method_type = type;
            this.myProxy.showDialog(DialogStatus.create, data);
        }
    }

    private handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }

    private getBtnStatus(row: any, type: string) {
        let detail = row.payment_method_detail.filter((item: { payment_method_type: string }) => {
            return item.payment_method_type == type;
        });

        if (detail.length > 0) {
            if (detail[0].status == 1) {
                return "success";
            } else {
                return "warning";
            }
        } else {
            return "info";
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
