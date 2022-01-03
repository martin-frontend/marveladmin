<template>
    <div>
        <el-table :data="tableData" border fit highlight-current-row style="width: 100%" size="mini" v-loading="net_status.loading">
            <!-- 参数语言 -->
            <el-table-column :label="tableColumns.language.name" align="center" min-width="400">
                <template slot-scope="{ row }">
                   <p v-for="(value, key, index) in row.language" :key="key" class="align-left">
                        {{ Object.keys(row.language)[index] }}：
                        {{ Object.values(row.language)[index] }}
                    </p>
                </template>
            </el-table-column>
            <!-- 参数模组 -->
            <el-table-column prop="module" :label="tableColumns.module.name" align="center" min-width="280">
            </el-table-column>
            <!-- 参数类型 -->
            <el-table-column prop="type" :label="tableColumns.type.name" align="center" min-width="130">
                <template slot-scope="{ row }">
                    <div>
                        {{ tableColumns.type.options[row.type] }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">{{ $t("common.update") }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
    </div>
</template>
<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SystemLangProxy from "../proxy/SystemLangProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    }
})
export default class SystemLangBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: SystemLangProxy = this.getProxy(SystemLangProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    private handlerPageSwitch(page:number){
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
.align-left{
    text-align: left;
}
</style>
