<template>
    <div v-loading="net_status.loading">
        <div class="statistics">
            <template v-if="listQuery[`created_at-{>=}`]">
                <span>{{ listQuery["created_at-{>=}"] }} </span>{{ $t("common.to") }}<span>{{ dateTo }}</span>
            </template>
            <a style="margin-left: 1rem">{{ $t("plat_users_backwater_log.totalPeople") }}</a>
            <span>{{ myProxy.tableData.total_people }}</span>
            {{ $t("plat_users_backwater_log.settleMoney") }}<span>{{ myProxy.tableData.total_water }}</span>
            {{ $t("plat_users_backwater_log.rewardMoney") }}<span>{{ myProxy.tableData.total_backwater }}</span>
        </div>
        <el-table :data="tableData" border fit highlight-current-row style="width: 100%" size="mini">
            <el-table-column
                :label="`${tableColumns.backwater_id.name}`"
                class-name="status-col"
                prop="backwater_id"
                min-width="60px"
            >
            </el-table-column>
            <el-table-column :label="`${tableColumns.plat_id.name}`" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns.plat_id.options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.user_id.name}`"
                class-name="status-col"
                prop="user_id"
                min-width="90px"
            >
                <template slot-scope="{ row }">
                    <span @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline">{{
                        row.user_id
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.nick_name.name}`"
                class-name="status-col"
                prop="nick_name"
                min-width="80px"
            >
            </el-table-column>
            <el-table-column :label="`${tableColumns.settlement_type.name}`" class-name="status-col">
                <template slot-scope="{ row }">
                    {{ tableColumns.settlement_type.options[row.settlement_type] }}
                </template>
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.total_water.name}`"
                class-name="status-col"
                prop="total_water"
                min-width="80px"
            >
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.total_backwater.name}`"
                class-name="status-col"
                prop="total_backwater"
                min-width="80px"
            >
            </el-table-column>
            <el-table-column
                :label="`${tableColumns.created_at.name}`"
                class-name="status-col"
                prop="created_at"
                min-width="160px"
            >
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" width="90px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(row)"
                        v-if="checkUnique(unique.plat_users_backwater_log_show)"
                        >{{ $t("common.detail") }}</el-button
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
import PlatUsersBackwaterLogProxy from "../proxy/PlatUsersBackwaterLogProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class PlatUsersBackwaterLogBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: PlatUsersBackwaterLogProxy = this.getProxy(PlatUsersBackwaterLogProxy);
    // proxy property
    private tableColumns = this.myProxy.tableData.columns;
    private tableData = this.myProxy.tableData.list;
    private pageInfo = this.myProxy.tableData.pageInfo;
    private listQuery = this.myProxy.listQuery;

    get dateTo() {
        return this.listQuery["created_at-{<=}"];
    }

    private handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    private handleEdit(data: any) {
        this.myProxy.showDialog(DialogStatus.update, data);
    }

    private showUserDetail(user_id: number) {
        this.myProxy.showUserDetail(user_id);
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";

.statistics {
    margin: 16px 0;
    font-size: 16px;
    span {
        font-weight: bolder;
        color: green;
        margin: 0.5rem;
    }
}
</style>
