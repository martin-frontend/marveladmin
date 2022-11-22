<template>
    <el-dialog :visible.sync="myProxy.logDialogData.bShow" :title="LangUtil('记录')" width="85%">
        <div class="header-content">
            <div class="search_style">
                <div class="search_space">
                    <div class="item_group">
                        <date-picker :date.sync="queryDate" :title="columnInfo.created_at.name"></date-picker>
                    </div>
                    <div class="item_group">
                        <div class="cust_title">{{ columnInfo.type.name }}</div>
                        <el-select v-model="listQuery.type" filterable class="select" :placeholder="LangUtil('请选择')">
                            <el-option
                                v-for="(value, key) in columnInfo.type.options"
                                :key="key"
                                :label="value"
                                :value="key"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="item_group">
                        <el-button @click="onSearch()" class="item" type="primary" icon="el-icon-search">{{
                            LangUtil("查询")
                        }}</el-button>
                        <el-button @click="onReset()" class="item" type="primary" icon="el-icon-refresh">{{
                            LangUtil("重置")
                        }}</el-button>
                    </div>
                </div>
                <div>
                    <el-button class="header-button" @click="exportExcel" type="primary" icon="el-icon-download">{{
                        LangUtil("导出")
                    }}</el-button>
                </div>
            </div>

            <el-table
                :data="logData"
                border
                fit
                highlight-current-row
                style="width: 100%"
                size="mini"
                v-loading="net_status.loading"
            >
                <el-table-column :label="`${columnInfo.admin_user_id.name}`" min-width="80px" class-name="status-col">
                    <template slot-scope="{ row }">
                        {{ row.admin_user_id }}
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="!isCoinUser"
                    :label="`${columnInfo.created_by.name}`"
                    min-width="80px"
                    class-name="status-col"
                >
                    <template slot-scope="{ row }">
                        {{ row.created_by }}
                    </template>
                </el-table-column>

                <el-table-column :label="`${columnInfo.admin_username.name}`" min-width="80px" class-name="status-col">
                    <template slot-scope="{ row }">
                        {{ row.admin_username }}
                    </template>
                </el-table-column>
                <el-table-column :label="`${columnInfo.created_at.name}`" class-name="status-col" min-width="150px">
                    <template slot-scope="{ row }">
                        {{ row.created_at }}
                    </template>
                </el-table-column>
                <el-table-column :label="`${columnInfo.order_no.name}`" min-width="130px" class-name="status-col">
                    <template slot-scope="{ row }">
                        {{ row.order_no || "-" }}
                    </template>
                </el-table-column>
                <el-table-column :label="`${columnInfo.type.name}`" class-name="status-col" min-width="60px">
                    <template slot-scope="{ row }">
                        {{ columnInfo.type.options[row.type] }}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="`${columnInfo.gold_before.name}`"
                    class-name="status-col"
                    min-width="80px"
                    prop="gold_before"
                >
                </el-table-column>
                <el-table-column :label="`${columnInfo.gold.name}`" class-name="status-col">
                    <template slot-scope="{ row }">
                        {{ row.gold }}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="`${columnInfo.gold_after.name}`"
                    class-name="status-col"
                    min-width="80px"
                    prop="gold_after"
                >
                </el-table-column>
            </el-table>
            <pagination :pageInfo="pageInfo" @pageSwitch="pagwSwitch"></pagination>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "../../../core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import CoinWalletProxy from "@/views/coin_wallet/proxy/CoinWalletProxy";
import { checkUnique, unique } from "@/core/global/Permission";
import GlobalVar from "@/core/global/GlobalVar";
import SelfModel from "@/core/model/SelfModel";
// components
import DatePicker from "@/components/DateRangePicker.vue";
import Pagination from "@/components/Pagination.vue";
import { UserType } from "@/core/enum/UserType";

@Component({
    components: {
        DatePicker,
        Pagination,
    },
})
export default class RecordQueryDialog extends AbstractView {
    LangUtil = LangUtil;
    // 权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: CoinWalletProxy = this.getProxy(CoinWalletProxy);
    SelfModel: SelfModel = this.getProxy(SelfModel);
    // proxy property
    columnInfo = this.myProxy.logDialogData.columns;
    listQuery = this.myProxy.logListQuery;
    logData = this.myProxy.logDialogData.list;
    pageInfo = this.myProxy.logDialogData.pageInfo;

    set queryDate(time: string[]) {
        this.myProxy.logListQuery["created_at-{>=}"] = time[0];
        this.myProxy.logListQuery["created_at-{<=}"] = time[1];
    }
    get queryDate() {
        return [this.myProxy.logListQuery["created_at-{>=}"], this.myProxy.logListQuery["created_at-{<=}"]];
    }

    // 是否为币商代收
    get isCoinUser() {
        return (
            this.SelfModel.userInfo.type == UserType.COIN || this.SelfModel.userInfo.type == UserType.COINUSEREXCHANGE
        );
    }

    pagwSwitch(page: number) {
        this.myProxy.logListQuery.page_count = page;
        this.myProxy.onLogQuery();
    }

    onSearch() {
        this.myProxy.logListQuery.page_count = 1;
        this.myProxy.onLogQuery();
    }

    onReset() {
        this.myProxy.resetLogQuery();
    }

    exportExcel() {
        this.myProxy.onQueryAll();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.search_style {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
