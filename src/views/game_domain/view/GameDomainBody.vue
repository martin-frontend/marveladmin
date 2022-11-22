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
            <el-table-column prop="id" :label="tableColumns.id.name" width="80" align="center"> </el-table-column>
            <el-table-column prop="plat_id" :label="tableColumns.plat_id.name" width="110" align="center">
            </el-table-column>
            <el-table-column prop="plat_id" :label="LangUtil('平台名称')" width="110" align="center">
                <template slot-scope="{ row }">
                    <p>
                        {{ tableColumns.plat_id.options[row.plat_id] }}
                    </p>
                </template>
            </el-table-column>
            <el-table-column prop="channel_id" :label="tableColumns.channel_id.name" width="110" align="center">
            </el-table-column>
            <el-table-column prop="domain" :label="tableColumns.domain.name" align="center"> </el-table-column>
            <el-table-column prop="api_domain" :label="tableColumns.api_domain.name" align="center"> </el-table-column>
            <el-table-column prop="cdn_domain" :label="tableColumns.cdn_domain.name" align="center"> </el-table-column>
            <el-table-column prop="remark" :label="tableColumns.remark.name" align="center"> </el-table-column>
            <el-table-column :label="LangUtil('操作')" class-name="status-col" width="160px">
                <template slot-scope="{ row }">
                    <el-button
                        size="mini"
                        v-if="checkUnique(unique.game_domain_update)"
                        type="primary"
                        @click="handleEdit(row)"
                        >{{ LangUtil("编辑") }}</el-button
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
import GameDomainProxy from "../proxy/GameDomainProxy";
import Pagination from "@/components/Pagination.vue";
import GlobalVar from "@/core/global/GlobalVar";

@Component({
    components: {
        Pagination,
    },
})
export default class GameDomainBody extends AbstractView {
    LangUtil = LangUtil;
    //权限标识
    unique = unique;
    checkUnique = checkUnique;
    //网络状态
    net_status = GlobalVar.net_status;
    // proxy
    myProxy: GameDomainProxy = this.getProxy(GameDomainProxy);
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
}
</script>

<style scoped lang="scss">
@import "@/styles/common.scss";
</style>
