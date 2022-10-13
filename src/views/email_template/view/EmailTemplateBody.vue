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
            <el-table-column :label="tableColumns.id.name" class-name="status-col" width="60px">
                <template slot-scope="scope">
                    {{ scope.row.id }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.plat_id.name" class-name="status-col" width="120px">
                <template slot-scope="scope">
                    {{ tableColumns.plat_id.options[scope.row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.name.name" class-name="status-col" width="120px">
                <template slot-scope="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.subject.name" class-name="status-col" width="120px">
                <template slot-scope="scope">
                    {{ scope.row.subject }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.type.name" class-name="status-col" width="100px">
                <template slot-scope="scope">
                    {{ tableColumns.type.options[scope.row.type] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.content.name" class-name="status-col">
                <template slot-scope="scope">
                    {{ scope.row.content }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.replaceable_text.name" class-name="status-col" width="150px">
                <template slot-scope="scope">
                    {{ scope.row.replaceable_text }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.updated_at.name" class-name="status-col" width="150px">
                <template slot-scope="scope">
                    {{ scope.row.updated_at }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.updated_by.name" class-name="status-col" width="100px">
                <template slot-scope="scope">
                    {{ scope.row.updated_by }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" width="210px">
                <template slot-scope="{ row }">
                    <el-button class="item" type="primary" icon="el-icon-edit" @click="handleEdit(row)">{{
                        $t("common.update")
                    }}</el-button>
                    <el-button class="item" type="danger" icon="" @click="handlerDelete(row)">{{
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
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import EmailTemplateProxy from "@/views/email_template/proxy/EmailTemplateProxy";

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
export default class EmailTemplateBody extends AbstractView {
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: EmailTemplateProxy = this.getProxy(EmailTemplateProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerQuery() {
        this.myProxy.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        console.log("data=====", data);

        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
