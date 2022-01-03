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
            <el-table-column :label="tableColumns.sms_id.name" class-name="status-col" width="100px">
                <template slot-scope="scope">
                    {{ scope.row.sms_id }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.name.name" class-name="status-col">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.area_code.name" class-name="status-col" width="100px">
                <template slot-scope="{ row }">
                    {{ row.area_code }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.status.name" class-name="status-col" width="100px">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">
                        {{ tableColumns.status.options[scope.row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.updated_at.name" class-name="status-col">
                <template slot-scope="scope">
                    {{ scope.row.updated_at }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" width="210px">
                <template slot-scope="{ row }">
                    <el-button v-if="checkUnique(unique.sms_update)" class="item" type="primary" icon="el-icon-edit" @click="handleEdit(row)">{{
                        $t("common.update")
                    }}</el-button>
                    <el-button v-if="checkUnique(unique.sms_delete)" class="item" type="danger" icon="" @click="handlerDelete(row)">{{
                        $t("common.delete")
                    }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch" v-show="tableData.length > 0"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SmsProxy from "../proxy/SmsProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
    filters: {
        statusFilter(status: number) {
            const statusMap: { [key: number]: string } = {
                1: "success",
                98: "danger",
            };
            return statusMap[status];
        },
    },
})
export default class SmsBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: SmsProxy = this.getProxy(SmsProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerQuery() {
        this.myProxy.listQuery.page_count = 1;
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
        this.myProxy.onDelete(data.sms_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
