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
            <el-table-column :label="tableColumns['plat_id'].name" prop="plat_id" align="center">
                <template slot-scope="{ row }">
                    <div>{{ tableColumns["plat_id"].options[row.plat_id] }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['channel_id'].name" prop="channel_id" align="center">
            </el-table-column>
            <el-table-column :label="tableColumns['domain'].name" prop="domain" align="center"> </el-table-column>
            <el-table-column :label="tableColumns['version'].name" prop="version" align="center"> </el-table-column>
            <el-table-column :label="tableColumns['template'].name" prop="template" align="center">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="handleDownloadTemplate(row.download_uri_url)">{{
                        row.template
                    }}</el-button>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['model_type'].name" prop="model_type" align="center">
                <template slot-scope="{ row }">
                    <div v-if="row.model_type != 2">{{ tableColumns["model_type"].options[row.model_type] }}</div>
                    <el-button v-else type="text" @click="handleDownloadTemplate(row.template_uri_url)">
                        {{ tableColumns["model_type"].options[row.model_type] }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns['remark'].name" prop="remark" align="center"> </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="220">
                <template slot-scope="{ row }">
                    <el-button size="mini" type="primary" @click="handleEdit(row)">
                        {{ LangUtil("编辑配置") }}
                    </el-button>
                    <el-button size="mini" type="primary" @click="handleAddTemplate(row)">
                        {{ LangUtil("模板上传") }}
                    </el-button>
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
import PlatLoadPageDomainProxy from "../proxy/PlatLoadPageDomainProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatLoadPageDomainBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatLoadPageDomainProxy = this.getProxy(PlatLoadPageDomainProxy);
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

    handleAddTemplate(data: any) {
        this.myProxy.showTemplateDialog(data);
    }

    handleDownloadTemplate(url: string) {
        window.open(url);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.row_status {
    display: flex;
}
</style>
