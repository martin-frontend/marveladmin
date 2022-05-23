<template>
    <div>
        <div class="header-content">
            <div class="group">
                <SearchInput
                    :title="tableColumns.content_id.name"
                    :placeholder="$t('common.pleaseChoose')"
                    v-model="listQuery.content_id"
                />
                <SearchInput
                    :title="tableColumns.title.name"
                    :placeholder="$t('common.pleaseChoose')"
                    v-model="listQuery.title"
                />
                <SearchInput
                    :title="tableColumns.user_id.name"
                    :placeholder="$t('common.pleaseChoose')"
                    v-model="listQuery.user_id"
                />
                <SearchInput
                    :title="tableColumns.nick_name.name"
                    :placeholder="$t('common.pleaseChoose')"
                    v-model="listQuery.nick_name"
                />
                <SearchSelect
                    v-model="listQuery.attachment_type"
                    :title="tableColumns.attachment_type.name"
                    :options="tableColumns.attachment_type.options"
                    :placeholder="$t('common.pleaseChoose')"
                />
                <SearchDatePicker
                    :title="tableColumns['created_at'].name"
                    :startDate.sync="listQuery['created_at-{>=}']"
                    :endDate.sync="listQuery['created_at-{<=}']"
                    :showTime="true"
                />
                <div class="header-button">
                    <el-button @click="handlerSearch" type="primary" icon="el-icon-search">{{
                        $t("common.search")
                    }}</el-button>
                    <el-button @click="handlerReset" type="primary" icon="el-icon-refresh">{{
                        $t("common.reset")
                    }}</el-button>
                    <el-button @click="handlerExport" type="primary" icon="el-icon-download">{{
                        $t("plat_email.export")
                    }}</el-button>
                </div>
            </div>
        </div>
        <div class="statistics">
            <div>
                {{
                    $t("plat_email.statisticDesc", {
                        "0": statistic.total_num,
                        "1": statistic.read_num,
                        "2": statistic.total_attachment_read,
                    })
                }}
            </div>
            <div>
                {{ $t("plat_email.attachReward") }}
                <span>{{ $t("plat_email.gold") }}</span> 
                <span v-html="getAccessInfo(statistic.total_attachment_content)"></span>
            </div>
            <div>
                {{ $t("plat_email.receivedReward")}}
                <span>{{ $t("plat_email.gold") }}</span>
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

<script lang='ts'>
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

@Component({
    components: {
        SearchSelect,
        SearchInput,
        Pagination,
        SearchDatePicker,
    },
})
export default class PlatEmailUserList extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatEmailProxy = this.getProxy(PlatEmailProxy);
    // proxy property
    private tableColumns = this.myProxy.platUserTableData.columns;
    private tableData = this.myProxy.platUserTableData.list;
    private pageInfo = this.myProxy.platUserTableData.pageInfo;
    private listQuery = this.myProxy.userListQuery;

    get statistic() {
        return this.myProxy.platUserTableData;
    }
    private handlerSearch() {
        this.listQuery.page_count = 1;
        this.myProxy.onUserQuery();
    }
    private handlerReset() {
        this.myProxy.resetUserListQuery();
    }
    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onUserQuery();
    }

    private handlerExport() {
        this.myProxy.onQueryAll();
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
<style scoped lang='scss'>
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