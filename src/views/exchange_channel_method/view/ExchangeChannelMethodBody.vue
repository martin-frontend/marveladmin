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

            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="150px">
                <template slot-scope="{ row }">
                    <el-button type="primary" size="mini" @click="handleSetting(row)">
                        <!-- 兑换参数设置 -->
                        {{ LangUtil("兑换参数设置") }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('排序')" class-name="status-col" width="320px">
                <template slot-scope="{ row, $index }">
                    <div>
                        <el-button size="mini" @click="handlerOrder(row.id, 1)" :disabled="$index == 0">
                            {{ LangUtil("置顶") }}
                        </el-button>
                        <el-button
                            size="mini"
                            @click="handlerOrder(row.id, 2)"
                            :disabled="$index == myProxy.tableData.list.length - 1"
                        >
                            {{ LangUtil("置底") }}
                        </el-button>
                        <el-button
                            size="mini"
                            icon="el-icon-top"
                            @click="handlerOrder(row.id, 3)"
                            :disabled="$index == 0"
                        ></el-button>
                        <el-button
                            size="mini"
                            icon="el-icon-bottom"
                            @click="handlerOrder(row.id, 4)"
                            :disabled="$index == myProxy.tableData.list.length - 1"
                        ></el-button>
                    </div>
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
import ExchangeChannelMethodProxy from "../proxy/ExchangeChannelMethodProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class ExchangeChannelMethodBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: ExchangeChannelMethodProxy = this.getProxy(ExchangeChannelMethodProxy);
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.methodTableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerQuery() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }
    // 兑换参数设置
    handleSetting(row: any) {
        console.log("兑换参数设置 >>", row);
        Object.assign(this.myProxy.dialogDataChannelData.row, row);
        this.myProxy.methodQuery.exchange_channel_id = row.id;
        console.log("this.myProxy.methodQuery", this.myProxy.methodQuery);
        this.myProxy.api_admin_exchange_channel_method_index();
    }

    handlerOrder(id: any, opt: string) {
        this.myProxy.tableData.orderData.id = id;
        this.myProxy.tableData.orderData.opt = opt;
        this.myProxy.tableData.orderData.plat_id = this.listQuery.plat_id;
        this.myProxy.onOrderList();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
