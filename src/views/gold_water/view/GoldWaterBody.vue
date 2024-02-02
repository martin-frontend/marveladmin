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
            <el-table-column :label="LangUtil('用户信息')" min-width="150px">
                <template slot-scope="{ row }">
                    <div @click="showUserDetail(row.user_id)" style="cursor: pointer; text-decoration: underline">
                        {{ LangUtil("ID") }}：{{ row.user_id }}
                    </div>
                    <div>{{ LangUtil("账号") }}：{{ row.username }}</div>
                    <div>{{ LangUtil("昵称") }}：{{ row.nick_name }}</div>
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
            <el-table-column
                :label="tableColumns.coin_name_unique.name"
                class-name="status-col"
                min-width="100px"
                prop="coin_name_unique"
            >
            </el-table-column>
            <el-table-column :label="tableColumns.gold.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    {{ row.gold }}
                </template>
            </el-table-column>
            <el-table-column :label="tableColumns.scale.name" class-name="status-col" min-width="100px" prop="scale">
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
            <el-table-column :label="tableColumns.relation_ids.name" class-name="status-col" min-width="100px">
                <template slot-scope="{ row }">
                    <span v-if="row.relation_ids"> {{ LangUtil("厂商注单") }}:{{ row.relation_ids }} </span>
                    <span v-else> - </span>
                </template>
            </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" min-width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="row.status === 0 && checkUnique(unique.gold_water_approved)"
                        type="primary"
                        size="small"
                        @click="handlerUpdate(row.id)"
                        >{{ LangUtil("设置通过") }}</el-button
                    >
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
import GoldWaterProxy from "../proxy/GoldWaterProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class GoldWaterBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: GoldWaterProxy = this.getProxy(GoldWaterProxy);
    // proxy property
    tableColumns = this.myProxy.tableData.columns;
    tableData = this.myProxy.tableData.list;
    pageInfo = this.myProxy.tableData.pageInfo;
    listQuery = this.myProxy.listQuery;

    handlerQuery() {
        this.myProxy.onQuery();
    }

    handlerPageSwitch(page: number) {
        this.listQuery.page_count = page;
        this.myProxy.onQuery();
    }

    handlerUpdate(id: any) {
        this.myProxy.approvedId = id;
        this.myProxy.onUpdate();
    }

    showUserDetail(user_id: string) {
        this.myProxy.userDetailId = user_id;
        this.myProxy.onShowUserDetail();
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
