<template>
    <div>
        <el-form ref="form" :model="listFilter" label-width="80px" label-position="left" style="padding-left: 10px">
            <el-form-item size="mini" :label="tableColumns['app_type'].name">
                <el-radio-group v-model="listFilter.app_type" filterable @change="onFilterChange">
                    <el-radio class="radio" :label="null">{{ LangUtil("全部") }}</el-radio>
                    <el-radio
                        class="radio"
                        v-for="(value, key) in tableColumns.app_type.options"
                        :key="key"
                        :label="key"
                        >{{ value }}</el-radio
                    >
                </el-radio-group>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['languages'].name">
                <el-radio-group v-model="listFilter.languages" filterable @change="onFilterChange">
                    <el-radio class="radio" :label="null">{{ LangUtil("全部") }}</el-radio>
                    <el-radio
                        class="radio"
                        v-for="(value, key) in tableColumns.languages.options"
                        :key="key"
                        :label="key"
                        >{{ value }}</el-radio
                    >
                </el-radio-group>
            </el-form-item>
            <el-form-item size="mini" :label="tableColumns['category'].name">
                <el-radio-group v-model="listFilter.category" filterable @change="onFilterChange">
                    <el-radio class="radio" :label="null">{{ LangUtil("全部") }}</el-radio>
                    <el-radio
                        class="radio"
                        v-for="(value, key) in tableColumns.category.options"
                        :key="key"
                        :label="key"
                        >{{ value }}</el-radio
                    >
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-table
            :data="myProxy.tableData.tableDataFilter"
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
            <el-table-column align="center" :label="tableColumns['vendor_id'].name" prop="vendor_id" min-width="120px">
                <template slot-scope="{ row }">
                    {{ tableColumns["vendor_id"].options[row.vendor_id] }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                :label="tableColumns['app_type'].name"
                class-name="status-col"
                prop="app_type"
                min-width="80px"
            >
                <template slot-scope="{ row }">
                    <el-tag type="primary" effect="dark" size="mini">
                        {{ tableColumns.app_type.options[row.app_type] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="tableColumns['show_type'].name" prop="show_type" min-width="80px">
                <template slot-scope="{ row }">
                    {{ tableColumns.show_type.options[row.show_type] }}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="tableColumns['category'].name" prop="category" min-width="120px">
                <template slot-scope="{ row }">
                    {{ tableColumns.category.options[row.category] }}
                </template>
            </el-table-column>

            <el-table-column
                align="center"
                :label="tableColumns['vendor_product_name'].name"
                prop="vendor_product_name"
                min-width="120px"
            ></el-table-column>
            <el-table-column align="center" :label="tableColumns['icon'].name" prop="icon" min-width="140px">
                <template slot-scope="{ row }">
                    <div v-if="row.icon" style="margin-bottom: 5px">{{ row.icon }}</div>
                    <el-button size="mini" type="primary" @click="handlerUpdate(row)">{{ LangUtil("编辑") }}</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="tableColumns.status.name" class-name="status-col" min-width="70px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">{{ tableColumns.status.options[row.status] }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                :label="tableColumns['tags'].name"
                prop="tags"
                class-name="status-col"
                min-width="140px"
            >
                <template slot-scope="{ row }">
                    <el-checkbox-group v-model="row.tags" @change="handlerTags(row)">
                        <el-checkbox v-for="(value, key) in tableColumns.tags.options" :key="key" :label="Number(key)"
                            >{{ value }}
                        </el-checkbox>
                    </el-checkbox-group>
                </template>
            </el-table-column>

            <el-table-column aling="left" :label="tableColumns['languages'].name" prop="languages" min-width="200px">
                <template slot-scope="{ row }">
                    <el-tag class="mr-1" v-for="item of row.languages" :key="item">{{
                        tableColumns["languages"].options[item]
                    }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" :label="LangUtil('操作')" class-name="status-col" width="350px">
                <template slot-scope="{ row, $index }">
                    <el-button
                        v-if="checkUnique(unique.lobby_product_order)"
                        size="mini"
                        @click="handlerOpt(row, { opt: 1 })"
                        :disabled="$index == 0"
                        >{{ LangUtil("置顶") }}
                    </el-button>
                    <el-button
                        v-if="checkUnique(unique.lobby_product_order)"
                        size="mini"
                        @click="handlerOpt(row, { opt: 2 })"
                        :disabled="$index == myProxy.tableData.tableDataFilter.length - 1"
                        >{{ LangUtil("置底") }}</el-button
                    >
                    <el-button
                        v-if="checkUnique(unique.lobby_product_order)"
                        size="mini"
                        icon="el-icon-top"
                        @click="handlerOpt(row, { opt: 3 })"
                        :disabled="$index == 0"
                    ></el-button>
                    <el-button
                        v-if="checkUnique(unique.lobby_product_order)"
                        size="mini"
                        icon="el-icon-bottom"
                        @click="handlerOpt(row, { opt: 4 })"
                        :disabled="$index == myProxy.tableData.tableDataFilter.length - 1"
                    ></el-button>

                    <el-button
                        v-if="checkUnique(unique.lobby_product_delete)"
                        size="mini"
                        type="danger"
                        @click="handlerDelete(row)"
                        >{{ LangUtil("删除") }}</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import LobbyProductProxy from "../proxy/LobbyProductProxy";
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
export default class LobbyProductBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: LobbyProductProxy = this.getProxy(LobbyProductProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    listFilter = this.myProxy.tableData.listFilter;

    handlerDelete(data: any) {
        this.myProxy.onDelete(data);
    }

    /**筛选 */
    onFilterChange() {
        this.myProxy.onFilterChange();
    }
    /**更新标签 */
    handlerTags(row: any) {
        this.myProxy.onUpdateTags(row);
    }
    /**更新排序 */
    handlerOpt(row: any, value: any) {
        const { lobby_product_id } = row;
        const { opt } = value;
        this.myProxy.onUpdateOpt({ lobby_product_id: lobby_product_id, opt: opt });
    }

    handlerUpdate(row: any) {
        this.myProxy.showIconDialog(row);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.radio {
    width: 65px;
}
</style>
