<template>
    <div>
        <el-table :data="tableData" border fit highlight-current-row style="width: 100%" size="mini" v-loading="net_status.loading">
            
            <el-table-column :label="`${tableColumns.template_id.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.template_id }}
                </template>
            </el-table-column>
            
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>

            <el-table-column :label="`${tableColumns.template_name.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.template_name }}
                </template>
            </el-table-column>

            <el-table-column :label="`${tableColumns.title.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.title }}
                </template>
            </el-table-column>

            <el-table-column :label="`${tableColumns.content.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.content }}
                </template>
            </el-table-column>

            <el-table-column :label="`${tableColumns.updated_at.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.updated_at }}
                </template>
            </el-table-column>

            <el-table-column :label="`${tableColumns.updated_by.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.updated_by }}
                </template>
            </el-table-column>


            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handlerDelete(row)"
                        >{{LangUtil("删除")}}</el-button
                    >
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        >{{LangUtil("编辑")}}</el-button
                    >
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
import PlatMailTemplateProxy from "../proxy/PlatMailTemplateProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";

@Component({
    components: {
        Pagination,
    }
})
export default class PlatMailTemplateBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatMailTemplateProxy = this.getProxy(PlatMailTemplateProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    LangUtil = LangUtil;
    handlerPageSwitch(page:number){
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.template_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
