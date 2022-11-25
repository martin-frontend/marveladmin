<template>
    <div>
        <div class="header-content">
            <div class="group">
                <SearchInput
                    :title="tableColumns.content_id.name"
                    :placeholder="LangUtil('请选择')"
                    v-model="listQuery.content_id"
                />
                <SearchInput
                    :title="tableColumns.title.name"
                    :placeholder="LangUtil('请选择')"
                    v-model="listQuery.title"
                />
                <SearchInput
                    :title="tableColumns.user_id.name"
                    :placeholder="LangUtil('请选择')"
                    v-model="listQuery.user_id"
                />
                <SearchInput
                    :title="tableColumns.nick_name.name"
                    :placeholder="LangUtil('请选择')"
                    v-model="listQuery.nick_name"
                />
                <SearchSelect
                    v-model="listQuery.attachment_type"
                    :title="tableColumns.attachment_type.name"
                    :options="tableColumns.attachment_type.options"
                    :placeholder="LangUtil('请选择')"
                />
                <SearchDatePicker
                    :title="tableColumns['created_at'].name"
                    :startDate.sync="listQuery['created_at-{>=}']"
                    :endDate.sync="listQuery['created_at-{<=}']"
                    :showTime="true"
                />
                <div class="header-button">
                    <el-button @click="handlerSearch" type="primary" icon="el-icon-search">{{
                        LangUtil("查询")
                    }}</el-button>
                    <el-button @click="handlerReset" type="primary" icon="el-icon-refresh">{{
                        LangUtil("重置")
                    }}</el-button>
                    <el-button @click="handlerExport" type="primary" icon="el-icon-download">{{
                        LangUtil("导出")
                    }}</el-button>
                </div>
            </div>
        </div>
        <div class="statistics">
            <div>
                {{ LangUtil("统计用户一共收到{0}封邮件，{1}封已阅读，{2}封已领取附件", statistic.total_num, statistic.read_num, statistic.total_attachment_read) }}
            </div>
            <div>
                {{ LangUtil("附件奖励") }}
                <span>{{ LangUtil("金币") }}</span>
                <span v-html="getAccessInfo(statistic.total_attachment_content)"></span>
            </div>
            <div>
                {{ LangUtil("已领取奖励") }}
                <span>{{ LangUtil("金币") }}</span>
                <span v-html="getAccessInfo(statistic.total_attachment_content_read)"></span>
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
            <el-table-column
                prop="content_id"
                :label="tableColumns.content_id.name"
                class-name="status-col"
                min-width="50px"
            >
            </el-table-column>
            <el-table-column :label="tableColumns.plat_id.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="user_id"
                :label="`${tableColumns.user_id.name}`"
                class-name="status-col"
                min-width="80px"
            >
                <template slot-scope="{ row }">
                    <div @click="showUserDetail(row.user_id)" class="user_id">{{ row.user_id }}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="nick_name"
                :label="tableColumns.nick_name.name"
                class-name="status-col"
                min-width="100px"
            >
            </el-table-column>
            <el-table-column prop="title" :label="tableColumns.title.name" class-name="status-col" min-width="100px">
            </el-table-column>
            <el-table-column
                prop="content"
                :label="tableColumns.content.name"
                class-name="status-col"
                min-width="150px"
            >
            </el-table-column>
            <el-table-column :label="tableColumns.send_type.name" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ tableColumns.send_type.options[row.send_type] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.type.name" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ tableColumns.type.options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.cate.name" class-name="status-col" min-width="70px">
                <template slot-scope="{ row }">
                    {{ tableColumns.cate.options[row.cate] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.is_read.name" class-name="status-col" min-width="70px">
                <template slot-scope="{ row }">
                    {{ tableColumns.is_read.options[row.is_read] }}
                </template>
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.created_by.name}`"
                prop="created_by"
                class-name="status-col"
                min-width="100px"
            >
            </el-table-column>
            <el-table-column
                prop="created_at"
                :label="tableColumns.created_at.name"
                class-name="status-col"
                min-width="120px"
            >
            </el-table-column>

            <el-table-column
                :label="tableColumns.attachment_content.name"
                prop="attachment_content"
                class-name="status-col"
                min-width="120px"
            >
                <template slot-scope="{ row }">
                    <div align="left">
                        <span v-html="getAccessInfo1(row.attachment_content)"></span>
                    </div>
                </template>
            </el-table-column>

            <el-table-column :label="tableColumns.attachment_status.name" class-name="status-col" min-width="60px">
                <template slot-scope="{ row }">
                    {{ tableColumns.attachment_status.options[row.attachment_status] }}
                </template>
            </el-table-column>
            <el-table-column
                prop="attachment_open_at"
                :label="tableColumns.attachment_open_at.name"
                class-name="status-col"
                min-width="120px"
            >
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
import GlobalVar from "@/core/global/GlobalVar";
import Pagination from "@/components/Pagination.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchSelect from "@/components/SearchSelect.vue";
import SearchRange from "@/components/SearchRange.vue";
import SearchDatePicker from "@/components/SearchDatePicker.vue";
import PlatUserProxy from "@/views/plat_user/proxy/PlatUserProxy";

@Component({
    components: {
        SearchSelect,
        SearchInput,
        Pagination,
        SearchDatePicker,
    },
})
export default class PlatEmailUserList extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: PlatEmailProxy = this.getProxy(PlatEmailProxy);
    userProxy: PlatUserProxy = this.getProxy(PlatUserProxy);
    // proxy property
    tableColumns = this.myProxy.platUserTableData.columns;
    tableData = this.myProxy.platUserTableData.list;
    pageInfo = this.myProxy.platUserTableData.pageInfo;
    listQuery = this.myProxy.userListQuery;

    get statistic() {
        return this.myProxy.platUserTableData;
    }
    handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onUserQuery();
    }
    handlerReset() {
        this.myProxy.resetUserListQuery();
    }
    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onUserQuery();
    }

    handlerExport() {
        this.myProxy.onQueryAll();
    }

    // 打开用户详情
    showUserDetail(user_id: number) {
        this.userProxy.onShowDetail(user_id);
    }

    getAccessInfo(data: any) {
        let infoStr = "";
        if (data) {
            const keys = Object.keys(data);
            for (const key of keys) {
                infoStr += key + "：";
                infoStr += data[key] + "&nbsp;&nbsp;&nbsp;&nbsp;";
            }
        }
        return infoStr;
    }

    getAccessInfo1(data: any) {
        let infoStr = "";
        if (data) {
            const keys = Object.keys(data);
            for (const key of keys) {
                infoStr += key + "：";
                infoStr += data[key] + "<br>";
            }
        }
        return infoStr;
    }
}
</script>
<style scoped lang="scss">
@import "@/styles/common.scss";
.statistics {
    margin-bottom: 16px;
    font-size: 14px;
    width: 100%;
    span {
        margin: 0.5rem;
        font-weight: bolder;
        color: green;
    }
}
</style>
