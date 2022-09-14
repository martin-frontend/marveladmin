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
                :label="tableColumns['app_types'].name"
                prop="app_types"
                class-name="status-col"
                width="162px"
            >
                <template slot-scope="scope">
                    <div v-show="scope.row.app_types.length > 0">
                        <el-tag
                            v-for="(item, index) in scope.row.app_types"
                            :key="index"
                            type="primary"
                            effect="dark"
                            size="mini"
                            style="margin-right: 5px"
                        >
                            {{ tableColumns.app_types.options[item] }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['vendor_id'].name" prop="vendor_id">
                <template slot-scope="{ row }">
                    {{ tableColumns.vendor_id.options[row.vendor_id] }}
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['show_type'].name" prop="show_type">
                <template slot-scope="{ row }">
                    {{ tableColumns.show_type.options[row.show_type] }}
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['category'].name" prop="category">
                <template slot-scope="{ row }">
                    {{ tableColumns.category.options[row.category] }}
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['vendor_product_name'].name" prop="vendor_product_name">
            </el-table-column>
            <el-table-column align="left" :label="tableColumns['languages'].name" prop="languages" min-width="260px">
                <template slot-scope="{ row }">
                    <el-tag v-for="item of row.languages" :key="item">{{
                        tableColumns["languages"].options[item]
                    }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                align="left"
                :label="tableColumns['vendor_languages'].name"
                prop="vendor_languages"
                min-width="260px"
            >
                <template slot-scope="{ row }">
                    <el-tag v-for="item of row.vendor_languages" :key="item">{{
                        tableColumns["vendor_languages"].options[item]
                    }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column min-width="100" :label="tableColumns['list_type'].name" prop="list_type">
                <template slot-scope="{ row }">
                    {{
                        tableColumns.list_type.options[row.list_type]
                            ? tableColumns.list_type.options[row.list_type]
                            : "-"
                    }}
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['status'].name" class-name="status-col" width="80px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column :label="$t('common.operating')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="checkUnique(unique.lobby_model_product_update)"
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        >{{ $t("common.update") }}
                    </el-button>
                    <!--                    <el-button size="mini" type="danger" @click="onDelete(scope.$index, scope.row)"> 删除 </el-button>-->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import LobbyModelProductProxy from "../proxy/LobbyModelProductProxy";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
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
export default class LobbyModelProductBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: LobbyModelProductProxy = this.getProxy(LobbyModelProductProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    // private tableData = this.myProxy.tableDataFilter;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    get tableData() {
        return this.myProxy.tableDataFilter;
    }

    private handlerQuery() {
        this.myProxy.onQuery();
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
