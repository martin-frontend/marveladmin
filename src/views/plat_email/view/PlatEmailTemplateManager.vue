<template>
    <el-dialog :title="LangUtil('平台邮件模版')" :visible.sync="myProxy.platEmailTemplateManager_data.bShow">
        <div class="header-content">
            <div class="group">
                <SearchSelect
                    v-model="listQuery.plat_id"
                    :title="tableColumns.plat_id.name"
                    :options="tableColumns.plat_id.options"
                    @change="handlerSearch"
                    :clearable="false"
                />
                <el-button @click="handlerCreate()" class="btn" type="primary" icon="el-icon-circle-plus-outline">{{
                    LangUtil("新增")
                }}</el-button>
            </div>
        </div>

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
                        <el-button size="mini" type="danger" @click="handlerDelete(row)">{{
                            LangUtil("删除")
                        }}</el-button>
                        <el-button size="mini" type="primary" @click="handleEdit(row)">{{
                            LangUtil("编辑")
                        }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :pageInfo="pageInfo" @pageSwitch="handlerPageSwitch"></pagination>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import LangUtil from "@/core/global/LangUtil";
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import PlatEmailProxy from "../proxy/PlatEmailProxy";
import { DialogStatus } from "@/core/global/Constant";
import { checkUnique, unique } from "@/core/global/Permission";
import SearchSelect from "@/components/SearchSelect.vue";
import GlobalVar from "@/core/global/GlobalVar";
import Pagination from "@/components/Pagination.vue";

@Component({
    components: {
        SearchSelect,
        Pagination,
    },
})
export default class PlatEmailHeader extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    // proxy
    myProxy: PlatEmailProxy = this.getProxy(PlatEmailProxy);
    // proxy property
    tableColumns = this.myProxy.platEmailTemplateManager_data.columns;
    listQuery = this.myProxy.platEmailTemplateManager_listQuery;
    tableData = this.myProxy.platEmailTemplateManager_data.list;
    pageInfo = this.myProxy.platEmailTemplateManager_data.pageInfo;
    net_status = GlobalVar.net_status;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery_templateManager();
    }

    handlerCreate() {
        this.myProxy.showDialog_templateManager(DialogStatus.create);
    }
    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery_templateManager();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog_templateManager(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete_templateManager(data.template_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
.btn {
    margin-bottom: 10px;
}
</style>
