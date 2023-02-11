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
            :header-cell-style="{
                'text-align': 'center',
            }"
        >
            <el-table-column
                :label="`${tableColumns.coin_username.name}`"
                class-name="status-col"
                min-width="80px"
                prop="coin_username"
            >
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.order_no.name}`"
                class-name="status-col"
                min-width="100px"
                prop="order_no"
            >
            </el-table-column>
            <el-table-column :label="`${tableColumns.payment_method.name}`" min-width="200px">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.receive_payment_type.name }}：{{
                            tableColumns.receive_payment_type.options[row.receive_payment_type]
                        }}
                    </div>
                    <div>
                        {{ tableColumns.payment_method.options[row.receive_payment_type].bank }}：{{
                            row.payment_method.bank
                        }}
                        <el-button
                            type="text"
                            size="mini"
                            :id="`bank`"
                            :data-clipboard-text="row.payment_method.bank"
                            icon="el-icon-copy-document"
                            @click="onCopy(`bank`)"
                        ></el-button>
                    </div>
                    <div>
                        {{ tableColumns.payment_method.options[row.receive_payment_type].account }}：{{
                            row.payment_method.account
                        }}
                        <el-button
                            type="text"
                            size="mini"
                            :id="`account`"
                            :data-clipboard-text="row.payment_method.account"
                            icon="el-icon-copy-document"
                            @click="onCopy(`account`)"
                        ></el-button>
                    </div>
                    <div>
                        {{ tableColumns.payment_method.options[row.receive_payment_type].account_name }}：{{
                            row.payment_method.account_name
                        }}
                        <el-button
                            type="text"
                            size="mini"
                            :id="`account_name`"
                            :data-clipboard-text="row.payment_method.account_name"
                            icon="el-icon-copy-document"
                            @click="onCopy(`account_name`)"
                        ></el-button>
                    </div>
                    <div>
                        {{ tableColumns.payment_method.options[row.receive_payment_type].account_bank }}：{{
                            row.payment_method.account_bank
                        }}
                        <el-button
                            type="text"
                            size="mini"
                            :id="`account_bank`"
                            :data-clipboard-text="row.payment_method.account_bank"
                            icon="el-icon-copy-document"
                            @click="onCopy(`account_bank`)"
                        ></el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.money.name}`"
                class-name="status-col"
                min-width="80px"
                prop="money"
            >
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.status.name}`"
                class-name="status-col"
                min-width="100px"
                prop="status"
            >
                <template slot-scope="{ row }">
                    {{ tableColumns.status.options[row.status] }}
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('订单时间')" align="left" min-width="120px">
                <template slot-scope="{ row }">
                    <p>{{ tableColumns["created_at"].name }}：<br />{{ row.created_at }}</p>
                    <p>{{ tableColumns["updated_at"].name }}：<br />{{ row.updated_at }}</p>
                </template>
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.updated_id.name}`"
                class-name="status-col"
                min-width="80px"
                prop="updated_id"
            >
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.remark.name}`"
                class-name="status-col"
                min-width="100px"
                prop="remark"
            >
                <template slot-scope="{ row }">
                    {{ row.remark }}
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="120px">
                <template slot-scope="{ row }">
                    <el-button v-if="row.status == 11" size="mini" type="primary" @click="handleEdit(row)">{{
                        LangUtil('订单操作')
                    }}</el-button>
                    <template v-else>-</template>
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
import CoinExchangeOrdersProxy from "../proxy/CoinExchangeOrdersProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
//@ts-ignore
import Clipboard from "clipboard";
import { Message } from "element-ui";

@Component({
    components: {
        Pagination,
    },
})
export default class CoinExchangeOrdersBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: CoinExchangeOrdersProxy = this.getProxy(CoinExchangeOrdersProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(row: any) {
        this.myProxy.showDialog(row);
    }

    // 复制ID
    onCopy(target: any) {
        const clipboard = new Clipboard(`#${target}`);
        clipboard.on("success", () => {
            Message.info(LangUtil("复制成功"));
            clipboard.destroy(); // 释放内存
        });
        clipboard.on("error", () => {
            // 不支持复制
            Message.info(LangUtil("该浏览器不支持自动复制"));
            clipboard.destroy(); // 释放内存
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
