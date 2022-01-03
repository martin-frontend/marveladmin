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
            <el-table-column :label="tableColumns.id.name" class-name="status-col" min-width="80px">
                <template slot-scope="{ row }">
                    {{ row.id }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.plat_id.name" class-name="status-col" min-width="140px">
                <template slot-scope="{ row }">
                    {{ tableColumns["plat_id"].options[row.plat_id] }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.userMsg')" min-width="150px">
                <template slot-scope="{ row }">
                    <div @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline">
                        {{ $t("common.id") }}：{{ row.user_id }}
                    </div>
                    <div>{{ $t("common.account") }}：{{ row.username }}</div>
                    <div>{{ $t("common.nickName") }}：{{ row.nick_name }}</div>
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.created_at.name" class-name="status-col" min-width="160px">
                <template slot-scope="{ row }">
                    {{ row.created_at }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.type.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns["type"].options[row.type] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.gold.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ row.gold }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.water_multiple.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ row.water_multiple }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.water_limit.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ row.water_limit }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.water.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ row.water }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.status.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ tableColumns["status"].options[row.status] }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.pass_type.name" class-name="status-col" min-width="160px">
                <template slot-scope="{ row }">
                    {{ row.pass_type === 0 ? "-" : tableColumns["pass_type"].options[row.pass_type] }}
                </template>
            </el-table-column>
            <el-table-column :label="$t('common.operating')" class-name="status-col" min-width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="row.status === 0 && checkUnique(unique.gold_water_approved)"
                        type="primary"
                        size="small"
                        @click="handlerUpdate(row.id)"
                        >{{ $t("gold_water.btnText") }}</el-button
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
import GoldWaterProxy from "../proxy/GoldWaterProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class GoldWaterBody extends AbstractView {
    //权限标识
    private unique = unique;
    private checkUnique = checkUnique;
    //网络状态
    private net_status = GlobalVar.net_status;
    // proxy
    private myProxy: GoldWaterProxy = this.getProxy(GoldWaterProxy);
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

    private handlerUpdate(id: any) {
        this.myProxy.approvedId = id;
        this.myProxy.onUpdate();
    }

    private showUserDetail(user_id: string) {
        this.myProxy.userDetailId = user_id;
        this.myProxy.onShowUserDetail();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
