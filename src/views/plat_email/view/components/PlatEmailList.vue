<template>
    <div>
        <div class="header-content">
            <div class="group">
                <SearchInput
                    :title="tableColumns.content_id.name"
                    :placeholder="LangUtil('请输入')"
                    v-model="listQuery.content_id"
                />
                <SearchInput
                    :title="tableColumns.title.name"
                    :placeholder="LangUtil('请输入')"
                    v-model="listQuery.title"
                />
                <SearchSelect
                    v-model="listQuery.send_type"
                    :title="tableColumns.send_type.name"
                    :options="tableColumns.send_type.options"
                    :placeholder="LangUtil('请选择')"
                />
                <SearchSelect
                    v-model="listQuery.type"
                    :title="tableColumns.type.name"
                    :options="tableColumns.type.options"
                    :placeholder="LangUtil('请选择')"
                />
                <SearchSelect
                    v-model="listQuery.cate"
                    :title="tableColumns.cate.name"
                    :options="tableColumns.cate.options"
                    :placeholder="LangUtil('请选择')"
                />
                <SearchSelect
                    v-model="listQuery.status"
                    :title="tableColumns.status.name"
                    :options="tableColumns.status.options"
                    :placeholder="LangUtil('请选择')"
                />
                <SearchDatePicker
                    :title="tableColumns['created_at'].name"
                    :startDate.sync="listQuery['created_at-{>=}']"
                    :endDate.sync="listQuery['created_at-{<=}']"
                    :showTime="true"
                />
                <SearchInput
                    :title="tableColumns.receive_users.name"
                    :placeholder="LangUtil('请输入')"
                    v-model="listQuery.receive_users"
                />

                <SearchInput
                    :title="tableColumns.remark.name"
                    :placeholder="LangUtil('请输入')"
                    v-model="listQuery.remark"
                />

                <div class="header-button">
                    <el-button @click="handlerSearch" type="primary" icon="el-icon-search">
                        {{ LangUtil("查询") }}
                    </el-button>
                    <el-button @click="handlerReset" type="primary" icon="el-icon-refresh">
                        {{ LangUtil("重置") }}
                    </el-button>
                    <el-button
                        @click="handlerExport"
                        type="primary"
                        icon="el-icon-download"
                        :disabled="list.length == 0"
                    >
                        {{ LangUtil("导出") }}
                    </el-button>
                </div>
            </div>
        </div>
        <el-table
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%"
            size="mini"
            v-loading="net_status.loading"
        >
            <el-table-column :label="`${tableColumns.content_id.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.content_id }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.title.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.title }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.content.name}`" class-name="status-col" min-width="120px">
                <template slot-scope="{ row }">
                    {{ row.content }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.send_type.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ tableColumns.send_type.options[row.send_type] }}
                </template>
            </el-table-column>

            <el-table-column :label="`${tableColumns.receive_users.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.receive_users }}
                </template>
            </el-table-column>

            <el-table-column :label="`${tableColumns.remark.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.remark }}
                </template>
            </el-table-column>

            <el-table-column :label="`${tableColumns.type.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ tableColumns.type.options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.cate.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ tableColumns.cate.options[row.cate] }}
                </template>
            </el-table-column>

            <el-table-column :label="LangUtil('收到/阅读/奖励/发送')" class-name="status-col" width="140px">
                <template slot-scope="{ row }">
                    {{ row.member_analyze }}
                </template>
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.created_by.name}`"
                prop="created_by"
                class-name="status-col"
                min-width="100px"
            >
            </el-table-column>
            <el-table-column :label="`${tableColumns.created_at.name}`" class-name="status-col" min-width="145px">
                <template slot-scope="{ row }">
                    {{ row.created_at }}
                </template>
            </el-table-column>
            <el-table-column :label="`${tableColumns.status.name}`" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    <el-tag :type="row.status | statusFilter">
                        {{ tableColumns.status.options[row.status] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" min-width="150px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="checkUnique(unique.plat_email_show)"
                        >{{ LangUtil("详情") }}</el-button
                    >
                    <el-button
                        v-if="EmailStatus.Sended == row.status && checkUnique(unique.plat_email_update)"
                        size="mini"
                        type="danger"
                        @click="handlerDelete(row)"
                        >{{ LangUtil("撤销") }}</el-button
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
import PlatEmailProxy from "../../proxy/PlatEmailProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import { EmailStatus } from "../../proxy/IPlatEmailProxy";

@Component({
    components: {
        SearchInput,
        SearchSelect,
        SearchDatePicker,
        Pagination,
    },
    filters: {
        statusFilter(status: any) {
            const statusMap: any = {
                1: "success",
                99: "danger",
            };
            return statusMap[status];
        },
    },
})
export default class PlatEmailList extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatEmailProxy = this.getProxy(PlatEmailProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;
    // Iproxy property
    EmailStatus = EmailStatus;
    list = this.myProxy.tableData.list;

    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onQuery();
    }

    handlerReset() {
        this.myProxy.resetListQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    handlerDelete(data: any) {
        this.myProxy.onDelete(data.content_id);
    }

    handlerExport() {
        this.myProxy.showEmailFieldSelectionDialog();
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
