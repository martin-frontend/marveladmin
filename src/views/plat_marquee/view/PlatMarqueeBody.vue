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
            <el-table-column :label="`${tableColumns.id.name}`" class-name="status-col" min-width="60px">
                <template slot-scope="{ row }">
                    {{ row.id }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template></el-table-column
            >
            <el-table-column :label="`${tableColumns.app_types.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-tag
                        v-for="type in row.app_types"
                        :key="type"
                        type="primary"
                        effect="dark"
                        size="mini"
                        style="margin-right: 5px"
                    >
                        {{ tableColumns.app_types.options[type] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.content.name}`" class-name="status-col" min-width="200px">
                <template slot-scope="{ row }">
                    {{ row.content }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.start_time.name}`" class-name="status-col" min-width="130px">
                <template slot-scope="{ row }">
                    {{ getTypeDesc(row) }}
                </template></el-table-column
            >
            <el-table-column :label="`${tableColumns.status.name}`" class-name="status-col" width="100px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter" effect="dark" size="mini">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column :label="LangUtil('操作')" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        v-if="checkUnique(unique.plat_marquee_show)"
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
import PlatMarqueeProxy from "../proxy/PlatMarqueeProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import { TimeType } from "../proxy/IPlatMarqueeProxy";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: string) {
            const statusMap: any = {
                1: "info",
                2: "success",
            };
            return statusMap[status];
        },
    },
})
export default class PlatMarqueeBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatMarqueeProxy = this.getProxy(PlatMarqueeProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

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

    getTypeDesc(data: any) {
        if (data.type == TimeType.Now) {
            return this.LangUtil("即时生效");
        }
        return data.start_time;
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
