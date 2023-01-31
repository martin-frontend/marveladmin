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
            <el-table-column :label="LangUtil('序号')" type="index" width="50" align="center"></el-table-column>
            <el-table-column :label="tableColumns['name'].name" prop="name" align="center"></el-table-column>
            <el-table-column :label="tableColumns['type'].name" align="center">
                <template slot-scope="{ row }">
                    {{ tableColumns["type"].options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column
                :label="tableColumns['app_platform'].name"
                prop="app_platform"
                class-name="status-col"
                width="150"
                align="center"
            >
                <template slot-scope="scope" align="center">
                    <div>
                        <span v-for="(item, index) in scope.row.app_platform" :key="index">
                            <el-tag
                                type="primary"
                                effect="dark"
                                size="mini"
                                v-if="tableColumns.app_platform.options[item]"
                                style="margin-right: 5px"
                            >
                                {{ tableColumns["app_platform"].options[item] }}
                            </el-tag>
                        </span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns['type_position'].name" align="center">
                <template slot-scope="{ row }">
                    {{ tableColumns["type_position"].options[row.type_position] }}
                </template>
            </el-table-column>

            <el-table-column
                :label="tableColumns['start_time'].name"
                prop="start_time"
                width="160"
                align="center"
            ></el-table-column>
            <el-table-column
                :label="tableColumns['end_time'].name"
                prop="end_time"
                width="160"
                align="center"
            ></el-table-column>
            <el-table-column :label="tableColumns['status'].name" align="center">
                <template slot-scope="{ row }">
                    {{ tableColumns["status"].options[row.status] }}
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="220">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        v-if="checkUnique(unique.plats_notice_update)"
                        type="primary"
                        @click="handleEdit(row)"
                    >
                        {{ LangUtil("编辑") }}
                    </el-button>
                    <el-button
                        size="mini"
                        type="warning"
                        @click="handlerRevertItem(row, 99)"
                        v-if="row.status == 21 && checkUnique(unique.plats_notice_cancel)"
                    >
                        {{ LangUtil("撤销") }}
                    </el-button>
                    <el-button
                        size="mini"
                        v-if="checkUnique(unique.plats_notice_delete)"
                        type="danger"
                        @click="handlerDelete(row)"
                    >
                        {{ LangUtil("删除") }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('排序')" class-name="status-col" width="280px">
                <template slot-scope="{ row }">
                    <div>
                        <el-button size="mini" type="primary" @click="onUpdate(row, 2)">
                            {{ LangUtil("置顶") }}
                        </el-button>
                        <el-button size="mini" type="primary" @click="onUpdate(row, 1)">
                            {{ LangUtil("置底") }}
                        </el-button>
                        <el-button size="mini" icon="el-icon-top" @click="onUpdate(row, 3)"></el-button>
                        <el-button size="mini" icon="el-icon-bottom" @click="onUpdate(row, 4)"></el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatsNoticeProxy from "../proxy/PlatsNoticeProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatsNoticeBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatsNoticeProxy = this.getProxy(PlatsNoticeProxy);
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

    onUpdate(row: any, opt: any) {
        this.myProxy.tableCtrlData.id = row.id;
        this.myProxy.tableCtrlData.opt = opt;
        this.myProxy.onUpdate(true);
    }

    handlerRevertItem(row: any, status: any) {
        this.myProxy.tableCtrlData.id = row.id;
        this.myProxy.tableCtrlData.status = status;
        this.myProxy.onRemoveItem();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
::v-deep .el-table_1_column_8,
::v-deep .el-table_9_column_38 {
    > div {
        width: 100% !important;
        display: flex;
        justify-content: space-between;
    }
    &.status-col {
        &.is-leaf {
            .cell {
                justify-content: center;
            }
        }
    }
}
</style>
