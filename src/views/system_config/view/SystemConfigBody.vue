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
            <!-- 参数名称 -->
            <el-table-column prop="name" :label="tableColumns.name.name" align="center" min-width="130">
            </el-table-column>
            <!-- 参数描述 -->
            <el-table-column prop="des" :label="tableColumns.des.name" align="center" min-width="380">
            </el-table-column>
            <!-- 参数标识 -->
            <el-table-column prop="key" :label="tableColumns.key.name" align="center" min-width="130">
            </el-table-column>
            <!-- 参数分類 -->
            <el-table-column prop="category" :label="tableColumns.category.name" align="center" min-width="130">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.category.options[row.category] }}
                    </div>
                </template>
            </el-table-column>
            <!-- 参数类型 -->
            <el-table-column prop="type" :label="tableColumns.type.name" align="center" min-width="130">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.type.options[row.type] }}
                    </div>
                </template>
            </el-table-column>
            <!-- 参数值 -->
            <el-table-column prop="value" :label="tableColumns.value.name" align="center" min-width="130">
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="checkUnique(unique.system_config_update)"
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        >{{ $t("common.update") }}</el-button
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
import SystemConfigProxy from "../proxy/SystemConfigProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class SystemConfigBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: SystemConfigProxy = this.getProxy(SystemConfigProxy);
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
