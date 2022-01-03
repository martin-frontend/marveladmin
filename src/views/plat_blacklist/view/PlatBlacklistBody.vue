<template>
    <div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            @selection-change="handleSelectionChange"
            v-loading="net_status.loading"
        >
            <el-table-column type="selection" align="center"> </el-table-column>
            <el-table-column
                prop="black_content"
                :label="tableColumns.black_content.name"
                align="center"
                column-key="accountEvent"
            >
            </el-table-column>
            <el-table-column
                prop="black_type"
                :label="tableColumns.black_type.name"
                align="center"
                column-key="accountEvent"
                width="150px"
            >
                <template slot-scope="{ row }">
                    <p>
                        {{ tableColumns.black_type.options[row.black_type] }}
                    </p>
                </template>
            </el-table-column>

            <el-table-column
                prop="plat_id"
                :label="tableColumns.plat_id.name"
                show-overflow-tooltip
                width="300px"
                align="center"
            >
                <template slot-scope="{ row }">
                    <p>
                        {{ tableColumns.plat_id.options[row.plat_id] }}
                    </p>
                </template>
            </el-table-column>
            <el-table-column
                prop="limit_type"
                :label="tableColumns.limit_type.name"
                show-overflow-tooltip
                align="center"
            >
                <template slot-scope="{ row }">
                    <div>
                        <el-tag v-for="(item, index) in row.limit_type" :key="index" size="mini">
                            {{ tableColumns.limit_type.options[item] }}
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="remark" :label="tableColumns.remark.name" show-overflow-tooltip align="center">
            </el-table-column>

            <el-table-column :label="$t('common.operating')" class-name="status-col" width="100px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handlerDelete(row)"
                        v-if="checkUnique(unique.plat_blacklist_delete)"
                        >{{ $t("common.delete") }}</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <Pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" />
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import PlatBlacklistProxy from "../proxy/PlatBlacklistProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatBlacklistBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatBlacklistProxy = this.getProxy(PlatBlacklistProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

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

    private handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }

    private handleSelectionChange(row: any) {
        this.myProxy.tableData.multipleSelection = [];
        row.forEach((item: any) => {
            this.myProxy.tableData.multipleSelection.push(item.id);
        });
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.el-tag {
    margin-left: 3px;
}
</style>
